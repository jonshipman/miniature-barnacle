import { Slide, Slides } from '../slider';
import Single from './single';

export default function Hero( { opacity, backgrounds } ) {
	return (
		<div className="fullwidth white">
			<Slides { ...{ opacity } }>
				{ backgrounds.map( ( b, i ) => {
					return (
						<Slide key={ b.id } index={ i }>
							<Single slide={ b } />
						</Slide>
					);
				} ) }
			</Slides>
		</div>
	);
}
