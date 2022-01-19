import { useEffect, useState } from '@wordpress/element';

export const Anchor = ( p ) => {
	const { ...props } = p;
	const { pathname, origin: winOrigin } = window.location;
	const [ hash, setHash ] = useState();

	useEffect( () => {
		if ( hash ) {
			const element = document.getElementById( hash );

			if ( element ) {
				element.scrollIntoView( { behavior: 'smooth' } );
			}

			setHash( null );
		}
	}, [ hash ] );

	let origin = null;
	let hashOnPathname = false;

	if ( props.href ) {
		if (
			props.href.indexOf( '/' ) === 0 ||
			props.href.indexOf( '#' ) === 0
		) {
			origin = winOrigin;
		} else {
			( { origin } = new URL( props.href ) );
		}

		if ( props.href.indexOf( `${ pathname }#` ) === 0 ) {
			props.href = props.href.replace( pathname, '' );
			hashOnPathname = true;
		}

		if ( props.href.indexOf( '#' ) === 0 ) {
			hashOnPathname = true;
		}

		if ( props.href.indexOf( '#' ) !== -1 ) {
			const localHash = props.href.substring(
				props.href.indexOf( '#' ) + 1,
				props.href.length
			);

			const prevOnClick = props.onClick ? props.onClick : null;

			props.onClick = ( e ) => {
				setHash( localHash );

				if ( prevOnClick ) {
					prevOnClick( e );
				}
			};

			if ( hashOnPathname ) {
				props.className = `${ props.className || '' } pointer`;
				return <span { ...props } />;
			}
		}
	}

	if ( origin.indexOf( winOrigin ) === 0 ) {
		let to = props.href.replace( origin, '' );

		if ( to.indexOf( '#' ) === 0 ) {
			to = '/' + to;
		}

		return <a { ...props } href={ to } />; // eslint-disable-line
	}

	if ( ! props.target && props.href.indexOf( 'tel' ) !== 0 ) {
		props.target = '_new';
	}

	if ( ! props.rel ) {
		props.rel = 'noopener nofollow';
	}

	// eslint-disable-next-line
	return <a { ...props } />;
};

export default Anchor;
