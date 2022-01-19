import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props                    Block props.
 * @param {Object} props.attributes         Attribute state.
 * @param {Object} props.attributes.padding Padding around Element.
 */
export default function ContactFormSave( { attributes: { padding } } ) {
	const props = { ...useBlockProps.save() };

	if ( padding ) {
		props.className += ` pa${ padding }`;
	}

	return (
		<div { ...props } />
	);
}
