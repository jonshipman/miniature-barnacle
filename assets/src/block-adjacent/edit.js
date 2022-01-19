import {
	InspectorControls,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	Button,
	ButtonGroup,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const LEFT = 0;
const RIGHT = 1;

/**
 * The Edit component function.
 *
 * Renders in the block editor.
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Attribute state.
 * @param {Function} props.setAttributes Function to update attribute state.
 */
export default function AdjacentEdit( { attributes, setAttributes } ) {
	const { background, position } = attributes;
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

	const containerProps = { className: 'w-50 bg-gray' };
	const textAreaProps = { className: 'w-50 pa5' };

	if ( image ) {
		containerProps.style = { backgroundImage: `url("${ image }")` };
		containerProps.className += ' cover bg-center';
	}

	const leftProps = {
		onClick: () =>
			setAttributes( {
				...attributes,
				position: LEFT,
			} ),
	};

	const rightProps = {
		onClick: () =>
			setAttributes( {
				...attributes,
				position: RIGHT,
			} ),
	};

	if ( position === LEFT ) {
		leftProps.isPrimary = true;
		containerProps.className += ' order-2';
		textAreaProps.className += ' bg-near-white';
	} else {
		rightProps.isPrimary = true;
		textAreaProps.className += ' bg-primary white';
	}

	return (
		<div { ...useBlockProps() } style={ { maxWidth: '100%' } }>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'smc-textdomain' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										...attributes,
										background: media.id,
									} )
								}
								allowedTypes={ ALLOWED_MEDIA_TYPES }
								value={ background }
								render={ ( { open } ) => (
									<Button
										className="w-100 justify-center"
										isPrimary
										label={ __( 'Change image', 'smc-textdomain' ) }
										onClick={ open }
									>
										{ __( 'Change image', 'smc-textdomain' ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					</PanelRow>

					<PanelRow>
						<div className="w-100 flex items-center">
							<div className="mr2 flex-auto">
								{ __( 'Image on the', 'smc-textdomain' ) }&hellip;
							</div>
							<ButtonGroup className="ml-auto">
								<Button { ...leftProps }>
									{ __( 'Left', 'smc-textdomain' ) }
								</Button>
								<Button { ...rightProps }>
									{ __( 'Right', 'smc-textdomain' ) }
								</Button>
							</ButtonGroup>
						</div>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div className="flex items-stretch">
				<div { ...containerProps } />

				<div { ...textAreaProps }>
					<InnerBlocks
						template={ [ [ 'core/paragraph', {} ] ] }
						templateLock={ false }
					/>
				</div>
			</div>
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
