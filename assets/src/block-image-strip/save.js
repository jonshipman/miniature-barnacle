import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Attribute state.
 */
export default function ImageStripSave( { attributes } ) {
	const { images } = attributes;
	const props = {
		...useBlockProps.save(), 'data-images': images.join( ',' ),
	};

	return (
		<div { ...props } />
	);
}
