import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PlainText,
	useBlockProps,
} from '@wordpress/block-editor';
import { Button, PanelBody, PanelRow, RangeControl } from '@wordpress/components';
import { store as coreStore, useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { RawHTML } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * The Edit component function.
 *
 * Renders in the block editor.
 *
 * @param {Object}   props                  Block props.
 * @param {Object}   props.attributes       Attribute state.
 * @param {Function} props.setAttributes    Function to update attribute state.
 * @param {Object}   props.context          Context.
 * @param {string}   props.context.postType Post Type.
 * @param {number}   props.context.postId   WPPost ID.
 * @param {string}   props.context.queryId  Query ID.
 * @return {WPElement} React element.
 */
export default function PageTitleEdit( {
	attributes,
	setAttributes,
	context: { postType, postId, queryId },
} ) {
	const { background, opacity } = attributes;
	const isDescendentOfQueryLoop = Number.isFinite( queryId );

	const userCanEdit = useSelect(
		( select ) =>
			select( coreStore ).canUserEditEntityRecord( 'postType', postType, postId ),
		[ postType, postId ]
	);

	const [ rawTitle = '', setTitle, fullTitle ] = useEntityProp(
		'postType',
		postType,
		'title',
		postId
	);

	const blockProps = { ...useBlockProps(), style: { maxWidth: '100%' } };

	if ( background ) {
		blockProps.style = { backgroundImage: `url("${ background }")` };
		blockProps.className += ' ph4 pv6 cover bg-center';
	}

	let titleElement = __( 'Post Title', 'smc-textdomain' );

	if ( postType && postId ) {
		titleElement =
			userCanEdit && ! isDescendentOfQueryLoop ? (
				<PlainText
					placeholder={ __( 'No Title' ) }
					value={ rawTitle }
					onChange={ setTitle }
					__experimentalVersion={ 2 }
					className="color-inherit"
				/>
			) : (
				<RawHTML key="html">{ fullTitle?.rendered }</RawHTML>
			);
	}

	return (
		<div { ...blockProps }>
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

					<PanelRow>
						<RangeControl
							label={ __( 'Background Opacity', 'smc-textdomain' ) }
							value={ opacity || 0 }
							onChange={ ( value ) =>
								setAttributes( {
									...attributes,
									opacity: value,
								} )
							}
							step={ 5 }
							min={ 0 }
							max={ 100 }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div className="f1-l f2 tc fw7 lh-title">
				<div className="relative z-2">
					{ titleElement }
				</div>

				<div
					className="z-1 absolute absolute--fill bg-black"
					style={ { opacity: opacity ? opacity / 100 : 0 } }
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
