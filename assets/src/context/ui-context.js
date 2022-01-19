import {
	createContext,
	useContext,
	useState,
	useRef,
	useEffect,
} from '@wordpress/element';

const mobile = window.matchMedia( 'screen and max-width: 30rem)' ).matches;

export function UiProvider( { children } ) {
	const mobileCheckRef = useRef();
	const [ isDesktop, setIsDesktop ] = useState( ! mobile );

	useEffect( () => {
		const w = mobileCheckRef.current?.ownerDocument?.defaultView;
		let timeout;

		const UpdateView = () => {
			clearTimeout( timeout );

			timeout = setTimeout( () => {
				if ( mobileCheckRef.current ) {
					setIsDesktop(
						mobileCheckRef.current.offsetParent === null
					);
				}
			}, 25 );
		};

		UpdateView();

		if ( w ) {
			w.addEventListener( 'resize', UpdateView );
		}

		return () => {
			clearTimeout( timeout );
			if ( w ) {
				w.removeEventListener( 'resize', UpdateView );
			}
		};
	}, [] );

	return (
		<UiContext.Provider
			value={ {
				isMobile: ! isDesktop,
				isDesktop,
			} }
		>
			{ children }
			<div ref={ mobileCheckRef } className="db dn-l" />
		</UiContext.Provider>
	);
}

const UiContext = createContext( {} );
export const useUiContext = () => useContext( UiContext );
