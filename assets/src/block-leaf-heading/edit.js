import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
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
export default function LeafEdit( { attributes, setAttributes } ) {
	const { text, color, center } = attributes;

	const line = <div className={ `bb b--${ color } bw1 w-100 mw2 mr4` } />;
	const line2 = <div className={ `bb b--${ color } bw1 w-100 mw2 ml4` } />;

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'smc-textdomain' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<TextControl
							value={ color || '' }
							onChange={ ( v ) => setAttributes( { ...attributes, color: v } ) }
							label={ __( 'Color', 'smc-textdomain' ) }
						/>
					</PanelRow>

					<PanelRow>
						<ToggleControl
							label={ __( 'Centered?', 'smc-textdomain' ) }
							checked={ center }
							onChange={ () => setAttributes( {
								...attributes, center: ! center,
							} ) }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div
				className={ `${ color } flex fw7 f4 items-center lh-solid ${
					center ? 'justify-center' : ''
				}` }
			>
				{ line }
				<RichText
					placeholder="Type here&hellip;"
					value={ text || '' }
					onChange={ ( v ) => setAttributes( { ...attributes, text: v } ) }
					allowedFormats={ [] }
				/>
				{ center && line2 }
			</div>
		</div>
	);
}
