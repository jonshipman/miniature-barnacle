import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export default function Strip( { images } ) {
	const [ srcs, setSrcs ] = useState( {} );
	const [ alts, setAlts ] = useState( {} );

	useEffect( () => {
		const _getImage = async () => {
			const results = await apiFetch( {
				path: `wp/v2/media/?include=${ images.join( ',' ) }`,
			} );

			if ( results ) {
				const _x = {};
				const _y = {};

				for ( const _r of results ) {
					_x[ _r.id ] = _r.source_url;
					_y[ _r.id ] = _r.alt_text;
				}

				setSrcs( _x );
				setAlts( _y );
			}
		};

		if ( images ) {
			_getImage();
		}
	}, [ images ] );

	return (
		<div className="flex nl3 nr3 flex-wrap flex-nowrap-l items-center">
			{ images.length > 0 &&
				images.map( ( i ) => (
					<div key={ i }>{ srcs[ i ] && <img src={ srcs[ i ] } alt={ alts[ i ] || '' } /> }</div>
				) ) }
		</div>
	);
}
