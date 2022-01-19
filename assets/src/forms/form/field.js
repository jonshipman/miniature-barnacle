import {
	cloneElement,
	Fragment,
	useContext,
	useMemo,
	useState,
} from '@wordpress/element';

import { Input } from '../../components';
import { FormContext } from './context.js';

export function Field( {
	id,
	className,
	rows = 1,
	options: optionsProp,
	WhenValid = Fragment,
	flat,
} ) {
	const [ error, setError ] = useState();
	const {
		form,
		updateField,
		schema,
		validateField,
		errorMessages,
	} = useContext( FormContext );

	let value = `${ form?.[ id ] }` || '';
	if ( schema.properties[ id ]?.type === 'boolean' ) {
		value = form?.[ id ] || false;
	}

	const required = schema.required.includes( id );
	const label = schema.properties[ id ]?.title;

	const {
		type, multiple, options,
	} = useMemo( () => {
		let __type;

		switch ( schema.properties[ id ]?.type ) {
			case 'number':
			case 'integer':
				__type = 'number';
				break;
			case 'array':
				__type = flat === false ? 'select' : 'checkbox';
				break;
			default:
				__type = rows === 1 ? 'text' : 'textarea';
		}

		let __options;

		if ( optionsProp ) {
			__options = optionsProp;
		} else if ( schema.properties[ id ]?.enum ) {
			__options = schema.properties[ id ].enum;
		} else if ( schema.properties[ id ]?.items?.enum ) {
			__options = schema.properties[ id ].items.enum;
		}

		if ( __options && __type !== 'checkbox' ) {
			__type = 'select';
		}

		if ( __options && flat ) {
			__type = 'radio';
		}

		if (
			__type === 'select' &&
			__options[ 0 ] !== '' &&
			__options[ 0 ]?.value !== ''
		) {
			__options = [ '', ...__options ];
		}

		if (
			( __type === 'radio' || __type === 'checkbox' ) &&
			( __options[ 0 ] === '' || __options[ 0 ]?.value === '' )
		) {
			__options.shift();
		}

		return {
			type: __type,
			mulitple: schema.properties[ id ]?.type === 'array',
			options: __options,
		};
	}, [ schema, optionsProp, flat ] );

	/**
	 * onChange of the input.
	 *
	 * @param {Object} evt Event.
	 */
	const onChange = ( evt ) => {
		let va = evt.target.value;
		if ( schema.properties[ id ]?.type === 'integer' ) {
			va = parseInt( va );
		}

		if ( schema.properties[ id ]?.type === 'boolean' ) {
			va = ! form[ id ];
		}

		if ( schema.properties[ id ]?.type === 'number' ) {
			va = Number( va );
		}

		if ( schema.properties[ id ]?.type === 'array' ) {
			if ( form[ id ].includes( va ) ) {
				va = form[ id ].filter( ( x ) => x !== va );
			} else {
				va = [ ...form[ id ], va ];
			}
		}

		const [ valid, errors ] = validateField( id, va );

		updateField( id, va );

		if ( ! valid ) {
			const _errmsgs = [];

			if ( errorMessages[ id ] ) {
				_errmsgs.push( errorMessages[ id ] );
			} else {
				for ( const _errmsg of errors ) {
					_errmsgs.push( _errmsg.message );
				}
			}

			setError( _errmsgs.join( ', ' ) );
		} else {
			setError( null );
		}
	};

	if ( schema.properties[ id ]?.type === 'boolean' ) {
		return (
			<div { ...{ className } }>
				<div className="mb2 flex">
					<div className="mr2">
						<input
							type="checkbox"
							checked={ !! value }
							{ ...{
								onChange, required, id,
							} }
						/>
					</div>
					{ label && (
						<label htmlFor={ id } className="f5 no-select pointer">
							{ label } { required && <span className="red">*</span> }
						</label>
					) }
				</div>

				{ error && <div className="red f7 fw7">{ error }</div> }
				{ ! error && !! value && <WhenValid /> }
			</div>
		);
	}

	return (
		<div { ...{ className } }>
			<BasicField { ...{
				id, label, required,
			} }
			>
				<Input
					{ ...{
						value, onChange, type, options, rows, multiple,
					} }
				/>
			</BasicField>
			{ error && <div className="red f7 fw7">{ error }</div> }
			{ ! error && !! value && <WhenValid /> }
		</div>
	);
}

export function BasicField( {
	className, children, label, id, required,
} ) {
	const childrenWithId = cloneElement( children, { id, required } );
	return (
		<div { ...{ className } }>
			<div className="mb2">
				{ label && (
					<label htmlFor={ id } className="f5 mb1">
						{ label } { required && <span className="red">*</span> }
					</label>
				) }
				<div>{ childrenWithId }</div>
			</div>
		</div>
	);
}

export default Field;
