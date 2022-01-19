import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Attribute state.
 */
export default function AdjacentSave( { attributes } ) {
	const { background, position } = attributes;

	const props = { ...useBlockProps.save() };

	if ( position === 0 ) {
		props[ 'data-position' ] = 'left';
	} else {
		props[ 'data-position' ] = 'right';
	}

	if ( background ) {
		props[ 'data-background' ] = background;
	}

	return (
		<div { ...props }>
			<InnerBlocks.Content />
		</div>
	);
}
