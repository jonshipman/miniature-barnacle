import { useState } from '@wordpress/element';
import MenuItem from './menu-item';
import useMenu from './use-menu';
import { PageWidth } from '../components';
import { ReactComponent as Bars } from './bars.svg';
import { useUiContext } from '../context';

const hasAdminBar = !! document.getElementById( 'wpadminbar' );

export function Menu( { children } ) {
	const [ open, setOpen ] = useState();
	const [ hover, setHover ] = useState( '' );
	const { isDesktop } = useUiContext();
	const { menuItems } = useMenu();

	const DrawerBackground = { className: 'relative-l z-2', style: {} };
	const MobileDrawer = { className: '', style: {} };

	if ( open ) {
		DrawerBackground.className += ' db';
	} else {
		DrawerBackground.className += ' dn db-l';
	}

	if ( ! isDesktop ) {
		DrawerBackground.className +=
			' bg-white-30 absolute absolute--fill pointer';

		if ( hasAdminBar ) {
			DrawerBackground.style.top = '46px';
		}

		MobileDrawer.className += ' bg-dark-gray white pa3 min-h-100';
		MobileDrawer.style.width = '85vw';
		MobileDrawer.style.cursor = 'default';

		if ( open ) {
			MobileDrawer.className += ' animate__animated animate__slideInLeft';
		}

		DrawerBackground.onClick = () => {
			setOpen( false );
		};

		MobileDrawer.onClick = ( event ) => {
			event.stopPropagation();
		};
	} else {
		DrawerBackground.onMouseLeave = () => setHover( '' );
	}

	return (
		<div>
			<div className="db dn-l bg-near-black pa2 mb2">
				<div className="flex items-center">
					<div
						className="pointer"
						onClick={ () => setOpen( ! open ) }
						onKeyDown={ ( evt ) =>
							evt.key === 'Enter' || evt.key === 'Space'
								? setOpen( ! open )
								: null
						}
						tabIndex="0"
						role="button"
					>
						<Bars />
					</div>
				</div>
			</div>
			<PageWidth>
				<nav className="flex-l items-center-l justify-between-l w-100">
					<div className="flex items-center justify-center db-l">
						{ children }
					</div>
					<div { ...DrawerBackground }>
						<div { ...MobileDrawer }>
							<div className="ma0">
								<div className="flex-l items-center-l justify-between-l nowrap-l">
									{ menuItems?.length > 0 &&
										menuItems.map( ( item, index ) => (
											<MenuItem
												key={ item.id }
												className="db no-underline pv2 pv4-l ph3-l"
												subMenu={ { className: 'nt3-l' } }
												{ ...{
													item,
													hover,
													setHover,
													index,
												} }
											/>
										) ) }
								</div>
							</div>
						</div>
					</div>
				</nav>
			</PageWidth>
		</div>
	);
}

export default Menu;
