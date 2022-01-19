import {
	InspectorControls,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, PanelRow, Button } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

/**
 * The Edit component function.
 *
 * Renders in the block editor.
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Attribute state.
 * @param {Function} props.setAttributes Function to update attribute state.
 */
export default function ImageStripEdit( { attributes, setAttributes } ) {
	const { images } = attributes;
	const [ srcs, setSrcs ] = useState( {} );

	useEffect( () => {
		const _getImage = async ( _i ) => {
			const results = await apiFetch( { path: `wp/v2/media/${ _i }` } );

			const url =
				results?.media_details?.sizes?.large?.source_url || results?.source_url;

			if ( url ) {
				setSrcs( ( x ) => ( { ...x, [ _i ]: url } ) );
			}
		};

		if ( images ) {
			for ( const img of images ) {
				_getImage( img );
			}
		}
	}, [ images ] );

	const containerProps = { className: 'flex nl3 nr3 items-center' };

	if ( images?.length === 0 ) {
		containerProps.className = 'pa4 bg-light-gray fw7 tc f3 gray';
		containerProps.children = __(
			'Please add images in the settings panel. 👉',
			'smc-textdomain'
		);
	} else {
		containerProps.children =
			images.length > 0 &&
			images.map( ( id ) => (
				<div
					key={ id }
					className="ph3"
				>
					{ srcs[ id ] && <img
						className="db h-auto"
						src={ srcs[ id ] }
						alt="strip"
					/> }
				</div>
			) );
	}

	let ButtonText;

	if ( images.length === 0 ) {
		ButtonText = __( 'Add Images', 'smc-textdomain' );
	} else {
		ButtonText = __( 'Edit Images', 'smc-textdomain' );
	}

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'smc-textdomain' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<MediaUploadCheck>
							<MediaUpload
								gallery
								multiple
								addToGallery={ images?.length === 0 }
								onSelect={ ( media ) => {
									setAttributes( {
										...attributes,
										images: media.map( ( x ) => x.id ),
									} );
								} }
								allowedTypes={ ALLOWED_MEDIA_TYPES }
								value={ images }
								render={ ( { open } ) => (
									<Button
										className="w-100 justify-center"
										isPrimary
										label={ ButtonText }
										onClick={ open }
									>
										{ ButtonText }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div { ...containerProps } />
		</div>
	);
}

/**
 * List of Media types allowed on the image upload.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_MEDIA_TYPES = [ 'image' ];
