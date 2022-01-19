import {
	useEffect,
	createContext,
	useCallback,
	useContext,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSettings } from '../../hooks';

const RecaptchaUrl = 'https://recaptcha.net/recaptcha/api.js';

const RecaptchaContext = createContext( {} );
export function useRecaptcha() {
	return useContext( RecaptchaContext );
}

export default function RecaptchaProvider( { children } ) {
	const { recaptcha: RecaptchaSiteKey } = useSettings();

	/**
	 * Promise. Get a token.
	 *
	 * @param {string} action Action name. Defaults to leadform.
	 * @return {Promise} Resolves with token.
	 */
	const getToken = useCallback(
		( action = 'leadform' ) => {
			return new Promise( ( res, rej ) => {
				if ( RecaptchaSiteKey && window.grecaptcha ) {
					window.grecaptcha
						.execute( RecaptchaSiteKey, { action } )
						.then( ( token ) => {
							res( token );
						}, rej );
				} else {
					rej(
						new Error(
							__( 'Unable to resolve captcha.', 'smc-textdomain' )
						)
					);
				}
			} );
		},
		[ RecaptchaSiteKey ]
	);

	return (
		<RecaptchaContext.Provider
			value={ {
				getToken,
				usesRecaptcha: !! RecaptchaSiteKey,
				RecaptchaSiteKey,
			} }
		>
			{ children }
		</RecaptchaContext.Provider>
	);
}

export function RecaptchaLoader() {
	const { RecaptchaSiteKey } = useRecaptcha();

	useEffect( () => {
		const src = `${
			RecaptchaUrl
		}?onload=__recaptchaLoaded&render=${
			RecaptchaSiteKey
		}`;

		if ( RecaptchaSiteKey && ! window.recaptcha_loaded ) {
			const s = document.createElement( 'script' );
			s.type = 'text/javascript';
			s.async = true;
			s.defer = true;
			s.src = src;
			document.getElementsByTagName( 'HEAD' )[ 0 ].appendChild( s );
		}
	}, [] );

	return null;
}

window.__recaptchaLoaded = function() {
	window.recaptcha_loaded = true;
};
