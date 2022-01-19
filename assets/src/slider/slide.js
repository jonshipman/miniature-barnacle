import {
	faAngleDoubleLeft,
	faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, cloneElement } from '@wordpress/element';
import { useSlider } from './context';
import NavButton from './nav-button';

export default function Slide( { index, children } ) {
	const {
		slideCount, opacity,
	} = useSlider();
	const thisSlide = useRef();

	let next = index + 1;
	let prev = index - 1;

	if ( next >= slideCount ) {
		next = 0;
	}

	if ( prev < 0 ) {
		prev = slideCount - 1;
	}

	const slide = cloneElement( children, {
		ref: thisSlide,
		children: (
			<div>
				{ slideCount > 1 && (
					<>
						<NavButton
							className="slide__prev mb3"
							href={ `#slides__${ prev }` }
							title="Prev"
						>
							<FontAwesomeIcon icon={ faAngleDoubleRight } />
						</NavButton>
						<NavButton
							className="slide__next"
							href={ `#slides__${ next }` }
							title="Next"
						>
							<FontAwesomeIcon icon={ faAngleDoubleLeft } />
						</NavButton>
					</>
				) }
			</div>
		),
	} );

	useEffect( () => {
		if ( opacity && thisSlide.current ) {
			const _opele = document.createElement( 'div' );
			_opele.classList.add( 'z-1', 'absolute', 'absolute--fill', 'bg-black' );
			_opele.style.opacity = opacity / 100;

			thisSlide.current.appendChild( _opele );
			thisSlide.current.firstChild.classList.add( 'z-2' );
		}
	}, [ opacity ] );

	return (
		<div id={ `slides__${ index }` } className="slide">
			<div style={ { width: '100vw' } }>
				{ slide }
			</div>
		</div>
	);
}
