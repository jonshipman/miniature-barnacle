import { useState } from '@wordpress/element';
import { useUiContext } from '../context';
import MenuItem from './menu-item';

export function Submenu( {
	items, className, style,
} ) {
	const [ hover, setHover ] = useState( '' );
	const { isDesktop } = useUiContext();

	const SubProps = {
		className: `absolute-l z-1 ${ className || '' }`,
		style,
	};
	const BoxProps = { className: '' };

	if ( isDesktop ) {
		SubProps.onMouseLeave = () => setHover( '' );
		BoxProps.className += ' bg-white shadow-4-l';
	}

	return (
		<div { ...SubProps }>
			<div { ...BoxProps }>
				{ items.map( ( item ) => (
					<MenuItem
						key={ item.id }
						className="bg-animate no-underline pa2 pr4-l db"
						subMenu={ {
							className: 'top-0-l',
							style: { left: '100%' },
						} }
						{ ...{
							item, setHover, hover,
						} }
					/>
				) ) }
			</div>
		</div>
	);
}

export default Submenu;
