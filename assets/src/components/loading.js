import './_loading.scss';

export function Loading( p ) {
	const { color, ...props } = p;

	const style = {};
	if ( color ) {
		style.borderTopColor = color;
	}

	return (
		<span { ...props }>
			<span className="loading">
				{ Array.from( new Array( 3 ) ).map( () => (
					<span key={ Math.random() } { ...{ style } } />
				) ) }
			</span>
		</span>
	);
}

export default Loading;
