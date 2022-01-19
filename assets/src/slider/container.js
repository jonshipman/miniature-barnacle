/* eslint-disable jsx-a11y/anchor-has-content */
import { Children, useEffect } from '@wordpress/element';

import { SliderProvider, useSlider } from './context';

function Container( { children, opacity } ) {
	const slides = Children.count( children );
	const {
		setSlideCount, setOpacity,
	} = useSlider();

	useEffect( () => {
		setSlideCount( slides );
	}, [ slides, setSlideCount ] );

	useEffect( () => {
		setOpacity( opacity );
	}, [ opacity, setOpacity ] );

	const links = [];
	for ( let i = 0; i < slides; i++ ) {
		links.push(
			<a
				key={ i }
				className="slider__navlink"
				href={ `#slides__${ i }` }
			>
			</a>
		);
	}

	return (
		<div className="slider-container">
			<div className="slider">
				<div className="slides">{ children }</div>

				<div className="slider__nav">{ links }</div>
			</div>
		</div>
	);
}

export default function ContainerWrapper( props ) {
	return (
		<SliderProvider>
			<Container { ...props } />
		</SliderProvider>
	);
}
