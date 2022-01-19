import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import apiFetch from '@wordpress/api-fetch';
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { FormContext } from './context';
import RecaptchaProvider, { useRecaptcha } from './recaptcha';

/**
 * Form context.
 *
 * @param {Object} props          JSX properties.
 * @param {Object} props.children JSX.
 * @param {string} props.formName Form name to use for submission.
 * @return {Object} JSX.
 */
function FormProvider( { children, formName = 'default' } ) {
	const [ schema, setSchema ] = useState( { required: [], properties: {} } );
	const [ errorMessages, setErrorMessages ] = useState( {} );
	const [ loading, setLoading ] = useState();
	const [ { error, success }, setStatus ] = useState( {} );
	const [ form, setForm ] = useState( {} );
	const { getToken, usesRecaptcha } = useRecaptcha();
	const messageRef = useRef();
	const validate = useRef();
	const emptyForm = useRef( {} );

	/**
	 * Updates the field with setForm.
	 *
	 * @param {string} field The id of the field.
	 * @param {string} value Value being set.
	 */
	const updateField = useCallback( ( field, value ) => {
		setForm( ( f ) => ( { ...f, [ field ]: value } ) );
	}, [] );

	// Gets the schema for the form.
	useEffect( () => {
		const _getSchema = async () => {
			const path = `smc-textdomain/v1/form-schema/${ formName }`;
			let results = {};

			try {
				results = await apiFetch( { path } );
				if ( ! results ) {
					setStatus( { error: [ 'Server Error' ] } );
				}
			} catch ( e ) {
				setStatus( { error: [ e?.message || 'Server Error' ] } );
			}

			try {
				validate.current = ajv.getSchema( `form-${ formName }` );
				if ( ! validate.current ) {
					ajv.addSchema( results.schema, `form-${ formName }` );
					validate.current = ajv.getSchema( `form-${ formName }` );
				}
			} catch ( e ) {
				setStatus( { error: [ e?.message || 'ajv error' ] } );
			}

			try {
				const properties = results.schema.properties;

				const fields = {};
				for ( const id in properties ) {
					const type = properties[ id ].type;
					const defaultValue = properties[ id ].default;

					if ( type === 'string' ) {
						fields[ id ] = defaultValue || '';
					} else if ( type === 'number' || type === 'integer' ) {
						fields[ id ] = defaultValue || 0;
					} else if ( type === 'boolean' ) {
						fields[ id ] = defaultValue || false;
					} else if ( type === 'array' ) {
						fields[ id ] = defaultValue ? [ defaultValue ] : [];
					}
				}

				emptyForm.current = { ...fields };
				setForm( fields );
				setSchema( results.schema );
				setErrorMessages( results.errorMessages );
			} catch ( e ) {
				setStatus( { error: [ e?.message || 'error' ] } );
			}
		};

		_getSchema();
	}, [ formName ] );

	/**
	 * @typedef validityReport
	 * @type {Array}
	 * @property {boolean} 0 - Whether this was a success.
	 * @property {Array}   1 - Errors, if any.
	 */

	/**
	 * Validates against the schema for a field and value.
	 * Uses the examples in the schema to only check the current field.
	 *
	 * @param {string} field Field id.
	 * @param {string} value Field value.
	 * @return {validityReport} Result of validity check.
	 */
	const validateField = ( field, value ) => {
		const mockData = { ...schema.examples[ 0 ] };
		mockData[ field ] = value;
		const valid = validate.current( mockData );

		return [ valid, validate.current?.errors ];
	};

	// Submission.
	const onSubmit = () => {
		const _submit = async () => {
			const dataSubmission = { ...form };

			try {
				if ( usesRecaptcha ) {
					dataSubmission.gToken = await getToken();
				}

				const results = await apiFetch( {
					path: `smc-textdomain/v1/form/${ formName }`,
					method: 'POST',
					data: dataSubmission,
				} );

				if ( results ) {
					setStatus( {
						success: __(
							'Thank you, we have received your response.',
							'smc-textdomain'
						),
					} );
					setForm( { ...emptyForm.current } );
				}
			} catch ( e ) {
				const _message = [ e?.message || 'Server Error' ];

				if ( e?.additional_errors ) {
					for ( const __i of e.additional_errors ) {
						_message.push( __i.message );
					}
				}

				setStatus( { error: _message } );
			}

			setLoading( false );

			if ( messageRef.current ) {
				messageRef.current.scrollIntoView( {
					behavior: 'smooth',
					block: 'center',
				} );
			}
		};

		setLoading( true );
		_submit();
	};

	return (
		<RecaptchaProvider>
			<FormContext.Provider
				value={ {
					loading,
					form,
					onSubmit,
					updateField,
					schema,
					errorMessages,
					validateField,
				} }
			>
				<div ref={ messageRef }>
					{ !! error?.length && (
						<div className="mv3">
							{ error.map( ( e ) => (
								<div
									className="f6 fw7 red"
									key={ e }
									dangerouslySetInnerHTML={ { __html: e } }
								/>
							) ) }
						</div>
					) }
					{ success && <div className="f3 fw7 green mb3">{ success }</div> }
				</div>
				{ !! schema.$id && children }
			</FormContext.Provider>
		</RecaptchaProvider>
	);
}

/**
 * Wrapper for the FormProvider to layer on the RecaptchaProvider.
 *
 * @param {Object} props JSX props.
 * @return {Object} JSX.
 */
export default function Form( props ) {
	return (
		<RecaptchaProvider>
			<FormProvider { ...props } />
		</RecaptchaProvider>
	);
}

const ajv = new Ajv();
addFormats( ajv );
