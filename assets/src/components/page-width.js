import { forwardRef } from '@wordpress/element';
import { useSettings } from '../hooks';

export const PageWidth = forwardRef( function PageWidth( props, ref ) {
	const { children, className } = props;
	const { pageWidth } = useSettings();

	return (
		<div className={ `${ pageWidth } ${ className || '' }` } { ...{ ref } }>
			{ children }
		</div>
	);
} );

export default PageWidth;
