import { render, StrictMode, lazy, Suspense } from '@wordpress/element';
import dataDictionary from '../utils/data-dictionary';

const Hero = lazy( () => import( './hero' ) );

const renderTargets = document.querySelectorAll( '.wp-block-smc-textdomain-hero' );

if ( renderTargets?.length > 0 ) {
	for ( const renderTarget of renderTargets ) {
		const data = dataDictionary( renderTarget );

		const backgrounds = [];
		for ( const [ _key, _value ] of Object.entries( data ) ) {
			if ( _key.indexOf( 'background' ) === 0 ) {
				const index = _key.slice( 10, 11 ) - 1;

				if ( ! backgrounds[ index ] ) {
					backgrounds.push( {} );
				}

				let newKey = _key.slice( 11 );
				newKey = newKey.charAt( 0 ).toLowerCase() + newKey.slice( 1 );

				backgrounds[ index ][ newKey ] = _value;
			}
		}

		render(
			<StrictMode>
				<Suspense fallback={ null }>
					<Hero { ...data } { ...{ backgrounds } } />
				</Suspense>
			</StrictMode>,
			renderTarget
		);
	}
}
