import { createContext, useContext, useState } from '@wordpress/element';

const SliderContext = createContext( {} );
export function useSlider() {
	return useContext( SliderContext );
}

export function SliderProvider( { children } ) {
	const [ slideCount, setSlideCount ] = useState();
	const [ opacity, setOpacity ] = useState( 0 );

	return (
		<SliderContext.Provider
			value={ {
				slideCount,
				setSlideCount,
				opacity,
				setOpacity,
			} }
		>
			{ children }
		</SliderContext.Provider>
	);
}
