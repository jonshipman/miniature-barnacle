import { render, StrictMode, lazy, Suspense } from '@wordpress/element';

const Block = lazy( () => import( './blocks' ) );

const renderTargets = document.querySelectorAll(
	'.wp-block-smc-textdomain-adjacent'
);

if ( renderTargets?.length > 0 ) {
	for ( const renderTarget of renderTargets ) {
		const text = renderTarget.innerHTML;
		const position = renderTarget.getAttribute( 'data-position' );
		const background = renderTarget.getAttribute( 'data-background' );

		render(
			<StrictMode>
				<Suspense fallback={ null }>
					<Block { ...{ position, background } }>{ text }</Block>
				</Suspense>
			</StrictMode>,
			renderTarget
		);
	}
}
