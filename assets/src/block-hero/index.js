import { registerBlockType } from '@wordpress/blocks';
import save from './save';
import edit from './edit';
import metadata from './block.json';

const { name } = metadata;

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
const settings = {
	...metadata,
	edit,
	save,
};

registerBlockType( name, settings );
