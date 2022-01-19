import { cloneElement } from '@wordpress/element';

export default function NavButton( {
	children, className: cn = '', ..._p
} ) {
	const props = { className: `db br2 bg-primary pa3 pointer ${ cn }`, ..._p };

	const icon = cloneElement( children, { color: '#fff' } );

	return <a { ...props }>{ icon }</a>;
}
