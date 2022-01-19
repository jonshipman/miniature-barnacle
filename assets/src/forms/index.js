import {
	render, StrictMode, lazy, Suspense,
} from '@wordpress/element';
const Form = lazy( () => import( './form/provider.js' ) );
const DefaultFormLayout = lazy( () => import( './form-default.js' ) );

const renderTargets = document.querySelectorAll( '.wp-block-smc-textdomain-contact-form' );

if ( renderTargets?.length > 0 ) {
	for ( const renderTarget of renderTargets ) {
		render(
			<StrictMode>
				<Suspense fallback={ null }>
					<Form>
						<Suspense fallback={ null }>
							<DefaultFormLayout />
						</Suspense>
					</Form>
				</Suspense>
			</StrictMode>,
			renderTarget
		);
	}
}
