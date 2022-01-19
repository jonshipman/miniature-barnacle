import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props                       Block props.
 * @param {Object} props.attributes            Attribute state.
 * @param {string} props.attributes.background The background color.
 * @param {string} props.attributes.text       Text of the button.
 * @param {string} props.attributes.href       Link for the button.
 */
export default function ButtonSave( {
	attributes: {
		background, text, href,
	},
} ) {
	const props = {
		...useBlockProps.save(), 'data-background': background, href,
	};

	return (
		<div { ...props } dangerouslySetInnerHTML={ { __html: text } }>
			<a { ...{ href } }>{ text }</a>
		</div>
	);
}
