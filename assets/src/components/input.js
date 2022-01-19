import { forwardRef } from '@wordpress/element';
import { useSettings } from '../hooks';

export const Input = forwardRef( function(
	{
		type = 'text', className: classNameProp, options, rows, ...props
	},
	ref
) {
	const { input: InputClasses } = useSettings();
	const className = `${ InputClasses } ${ classNameProp || '' }`;

	const ComponentProps = {
		ref, className, ...props,
	};

	let sanitizedOptions;

	if ( options ) {
		sanitizedOptions = options.map( ( item ) => ( {
			value: item?.value || item,
			label: item?.label || item?.value || item,
		} ) );
	}

	switch ( type ) {
		case 'select':
			return (
				<select { ...ComponentProps }>
					{ options
						? sanitizedOptions.map( ( { value, label } ) => (
							<option key={ value } { ...{ value } }>
								{ label }
							</option>
						) )
						: ComponentProps.children }
				</select>
			);
		case 'textarea':
			return <textarea { ...{ rows } } { ...ComponentProps } />;
		case 'radio':
		case 'checkbox':
			ComponentProps.type = type;
			const {
				className: _className, // eslint-disable-line
				value: fieldValue,
				id,
				...CheckboxProps
			} = ComponentProps;
			return (
				<div>
					{ sanitizedOptions.map( ( { value, label }, index ) => {
						return (
							<label
								key={ `${ id }${ value }` }
								htmlFor={ `${ id }${ index }` }
								className="db mv3 pointer"
							>
								<input
									name={ id }
									key={ value }
									id={ `${ id }${ index }` }
									checked={
										Array.isArray( fieldValue )
											? fieldValue.includes( value )
											: fieldValue === value
									}
									{ ...{ value } }
									{ ...CheckboxProps }
									className="mr2 dib"
								/>
								{ label }
							</label>
						);
					} ) }
				</div>
			);
		default:
			ComponentProps.type = type;
			return <input { ...ComponentProps } />;
	}
} );

export default Input;
