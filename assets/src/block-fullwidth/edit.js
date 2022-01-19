import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { Button, PanelBody, PanelRow } from '@wordpress/components';
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
export default function FullWidthEdit( { attributes, setAttributes } ) {
	const { background } = attributes;

	const containerProps = { className: '' };

	if ( background ) {
		containerProps.style = { backgroundImage: `url("${ background }")` };
		containerProps.className += ' pa4 cover bg-center';
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
								onSelect={ ( media ) => {
									setAttributes( {
										...attributes,
										background: media.url,
									} );
								} }
								allowedTypes={ ALLOWED_MEDIA_TYPES }
								value={ background }
								render={ ( { open } ) => (
									<Button
										className="w-100 justify-center"
										isPrimary
										label={ __( 'Background Image', 'smc-textdomain' ) }
										onClick={ open }
									>
										{ __( 'Background Image', 'smc-textdomain' ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div { ...containerProps }>
				<InnerBlocks
					template={ [ [ 'core/paragraph', {} ] ] }
					templateLock={ false }
				/>
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
