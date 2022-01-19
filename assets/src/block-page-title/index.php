<?php
/**
 * Server-side rendering of the `smc-textdomain/page-title` block.
 *
 * @package Shamrock_Partners
 */

/**
 * Renders the `smc-textdomain/page-title` block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 *
 * @return string Returns the filtered post title for the current post wrapped inside "h1" tags.
 */
function smc_prefix_title_render( $attributes, $content, $block ) {
	$background = isset( $attributes['background'] ) ? $attributes['background'] : null;
	$opacity    = isset( $attributes['opacity'] ) ? absint( $attributes['opacity'] ) : 0;

	if ( ! isset( $block->context['postId'] ) ) {
		return '';
	}

	$post_ID = $block->context['postId'];
	$title   = get_the_title();

	if ( ! $title ) {
		return '';
	}

	$tag_name   = 'h1';
	$class_name = 'fullwidth mt0 pv6 ph4 tc f2 f1-l';
	$style      = '';

	if ( $background ) {
		$class_name .= ' cover bg-center';
		$style      .= 'background-image: url("' . $background . '");';
	}

	if ( $opacity > 0 ) {
		$title = sprintf(
			'
				<span class="db relative z-2">%s</span>
				<span
					class="db z-1 absolute absolute--fill bg-black"
					style="opacity: %f;"
				></span>
			',
			$title,
			$opacity / 100
		);

		$title = str_replace( "\t", '', $title );
	}

	$wrapper_attributes = get_block_wrapper_attributes(
		array(
			'class' => $class_name,
			'style' => $style,
		)
	);

	return sprintf(
		'<%1$s %2$s>%3$s</%1$s>',
		$tag_name,
		$wrapper_attributes,
		$title
	);
}

/**
 * Registers the `smc-textdomain/page-title` block on the server.
 */
function smc_prefix_register_block_page_title() {
	register_block_type_from_metadata(
		__DIR__ . '/block.json',
		array(
			'editor_script'   => 'smc-textdomain-blocks',
			'editor_style'    => 'smc-textdomain-frontend',
			'render_callback' => 'smc_prefix_title_render',
		)
	);
}

add_action( 'init', 'smc_prefix_register_block_page_title' );
