import { render, StrictMode } from '@wordpress/element';
import { Button } from '../components';

const renderTargets = document.querySelectorAll( '.wp-block-smc-textdomain-button' );

if ( renderTargets?.length > 0 ) {
	for ( const renderTarget of renderTargets ) {
		const bg = renderTarget.getAttribute( 'data-background' );
		const href = renderTarget.getAttribute( 'href' );
		const text = renderTarget.innerText;

		render(
			<StrictMode>
				<Button { ...{ href, bg } }>{ text }</Button>
			</StrictMode>,
			renderTarget
		);
	}
}
