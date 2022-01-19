import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Attribute state.
 */
export default function FullWidthSave( { attributes } ) {
	const { background } = attributes;

	const props = { style: {}, ...useBlockProps.save() };
	props.className += ' fullwidth';

	if ( background ) {
		props.style.backgroundImage = `url("${ background }")`;
		props.className += ' pa4 cover bg-center';
	}

	return (
		<div { ...props }>
			<InnerBlocks.Content />
		</div>
	);
}
