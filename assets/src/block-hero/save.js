import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props                        Block props.
 * @param {Object} props.attributes             Attribute state.
 * @param {number} props.attributes.backgrounds The background attachments.
 * @param {number} props.attributes.opacity     The opacity percentage value.
 */
export default function HeroSave( { attributes: { backgrounds, opacity } } ) {
	const props = {
		...useBlockProps.save(),
		'data-opacity': opacity || 0,
	};

	let i = 0;
	for ( const background of backgrounds ) {
		i++;

		props[ `data-background-${ i }-id` ] = background.background_id || 0;
		props[ `data-background-${ i }-text` ] = background.text || '';
		props[ `data-background-${ i }-link` ] = background.link || '';
	}

	return (
		<div { ...props } />
	);
}
