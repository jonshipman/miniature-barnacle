import { render, StrictMode, lazy, Suspense } from '@wordpress/element';

const Strip = lazy( () => import( './strip' ) );

const renderTargets = document.querySelectorAll(
	'.wp-block-smc-textdomain-image-strip'
);

if ( renderTargets?.length > 0 ) {
	for ( const renderTarget of renderTargets ) {
		const images = renderTarget.getAttribute( 'data-images' );

		render(
			<StrictMode>
				<Suspense fallback={ null }>
					<Strip images={ images.split( ',' ) } />
				</Suspense>
			</StrictMode>,
			renderTarget
		);
	}
}
