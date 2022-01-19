import { render, StrictMode } from '@wordpress/element';
import { UiProvider } from '../context';
import Logo from './logo';
import Menu from './menu';
const renderTarget = document.getElementById( 'site-menu' );

if ( renderTarget ) {
	render(
		<StrictMode>
			<UiProvider>
				<Menu>
					<Logo />
				</Menu>
			</UiProvider>
		</StrictMode>,
		renderTarget
	);
}
