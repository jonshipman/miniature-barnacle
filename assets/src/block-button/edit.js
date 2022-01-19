import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { Button as ThemeButton } from '../components';

/**
 * The Edit component function.
 *
 * Renders in the block editor.
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Attribute state.
 * @param {Function} props.setAttributes Function to update attribute state.
 */
export default function ButtonEdit( { attributes, setAttributes } ) {
	const {
		background, text, href,
	} = attributes;

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'smc-textdomain' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<TextControl
							value={ background || '' }
							onChange={
								( v ) => setAttributes( { ...attributes, background: v } )
							}
							label={ __( 'Background Color', 'smc-textdomain' ) }
						/>
					</PanelRow>

					<PanelRow>
						<TextControl
							value={ href || '' }
							onChange={
								( v ) => setAttributes( { ...attributes, href: v } )
							}
							label={ __( 'Link', 'smc-textdomain' ) }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<ThemeButton bg={ background }>
				<RichText
					placeholder="Click Here"
					value={ text || '' }
					onChange={ ( v ) => setAttributes( { ...attributes, text: v } ) }
					allowedFormats={ [] }
				/>
			</ThemeButton>
		</div>
	);
}
