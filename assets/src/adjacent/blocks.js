import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export default function Blocks( { position, children, background } ) {
	const [ image, setImage ] = useState();

	useEffect( () => {
		const _getImage = async () => {
			const results = await apiFetch( { path: `wp/v2/media/${ background }` } );

			const url =
				results?.media_details?.sizes?.large?.source_url || results?.source_url;

			if ( url ) {
				setImage( url );
			}
		};

		if ( setImage && background ) {
			_getImage();
		}
	}, [ background ] );

	const containerProps = { className: 'dn db-l w-50 bg-gray' };
	const mobileImageProps = { className: 'db dn-l aspect-ratio aspect-ratio--16x9 cover bg-center w-100' };
	const textAreaProps = { className: 'w-50-l pa5-l pa4' };

	if ( image ) {
		containerProps.style = { backgroundImage: `url("${ image }")` };
		mobileImageProps.style = { backgroundImage: `url("${ image }")` };
		containerProps.className += ' cover bg-center';
	}

	if ( position === 'left' ) {
		containerProps.className += ' order-2';
		textAreaProps.className += ' bg-near-white';
	} else {
		textAreaProps.className += ' bg-primary white';
	}

	return (
		<div className="fullwidth">
			<div className="flex-l items-stretch-l">
				<div { ...containerProps } />

				<div { ...mobileImageProps } />

				<div { ...textAreaProps }>
					<div dangerouslySetInnerHTML={ { __html: children } } />
				</div>
			</div>
		</div>
	);
}
