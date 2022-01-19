import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Attribute state.
 */
export default function LeafSave( { attributes } ) {
	const { text, center, color } = attributes;
	const props = { ...useBlockProps.save() };

	if ( color ) {
		props[ 'data-color' ] = color;
	}

	if ( center ) {
		props[ 'data-center' ] = true;
	}

	return (
		<div { ...props } dangerouslySetInnerHTML={ { __html: text } } />
	);
}
