export default function Heading( { children, color, center } ) {
	const line = <div className={ `bb b--${ color } bw1 w-100 mw2 mr4` } />;
	const line2 = <div className={ `bb b--${ color } bw1 w-100 mw2 ml4` } />;

	return (
		<div
			className={ `${ color } flex fw7 f4 items-center lh-solid ${
				center ? 'justify-center' : ''
			}` }
		>
			{ line }

			{ children }

			{ center && line2 }
		</div>
	);
}
