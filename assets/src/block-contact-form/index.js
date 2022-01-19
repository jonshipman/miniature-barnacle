import { registerBlockType } from '@wordpress/blocks';
import save from './save';
import edit from './edit';
import metadata from './block.json';
import { Dashicon } from '@wordpress/components';

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
	icon: <Dashicon icon="clipboard" className="primary" />,
};

registerBlockType( name, settings );
