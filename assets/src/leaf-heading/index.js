import { render, StrictMode, lazy, Suspense } from '@wordpress/element';

const Heading = lazy( () => import( './heading' ) );

const renderTargets = document.querySelectorAll( '.wp-block-smc-textdomain-leaf-heading' );

if ( renderTargets?.length > 0 ) {
	for ( const renderTarget of renderTargets ) {
		const text = renderTarget.innerText;
		const color = renderTarget.getAttribute( 'data-color' );
		const center = renderTarget.getAttribute( 'data-center' );

		render(
			<StrictMode>
				<Suspense fallback={ null }>
					<Heading { ...{ color, center } }>{ text }</Heading>
				</Suspense>
			</StrictMode>,
			renderTarget
		);
	}
}
