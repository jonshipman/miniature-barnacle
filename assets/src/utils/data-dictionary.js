/**
 * Creates a dictionary from an element's data attributes.
 *
 * @param {HTMLElement} el HTML element.
 * @return {Object} Key/value pairs.
 */
export default function dataDictionary( el ) {
	const data = {};
	[].forEach.call( el.attributes, function( attr ) {
		if ( /^data-/.test( attr.name ) ) {
			const camelCaseName = attr.name
				.substr( 5 )
				.replace( /-(.)/g, function( _, $1 ) {
					return $1.toUpperCase();
				} );
			data[ camelCaseName ] = attr.value;
		}
	} );

	return data;
}
