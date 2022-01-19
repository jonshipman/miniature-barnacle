import { render, StrictMode } from '@wordpress/element';
import { PageWidth } from '../components';

const renderTargets = document.querySelectorAll(
	'.wp-block-smc-textdomain-page-container'
);

if ( renderTargets?.length > 0 ) {
	for ( const renderTarget of renderTargets ) {
		const html = renderTarget.innerHTML;

		render(
			<StrictMode>
				<PageWidth>
					<div dangerouslySetInnerHTML={ { __html: html } } />
				</PageWidth>
			</StrictMode>,
			renderTarget
		);
	}
}
