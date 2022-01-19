import { forwardRef, useState, useEffect } from '@wordpress/element';
import { useSettings } from '../hooks';
import Loading from './loading';

function ButtonRender( {
	children,
	className = '',
	form = false,
	to,
	href,
	forwardedRef,
	...props
} ) {
	let classNames = className || '';

	if (
		! classNames.includes( 'db' ) &&
		! classNames.includes( 'dib' ) &&
		! classNames.includes( 'inline-flex' ) &&
		! classNames.includes( 'flex' )
	) {
		classNames += ' dib';
	}

	if ( props.disabled ) {
		props.onClick = () => {};
	}

	if ( href ) {
		return (
			<a
				ref={ forwardedRef }
				href={ href }
				className={ classNames }
				{ ...props }
			>
				{ children }
			</a>
		);
	}

	if ( to ) {
		return (
			<a
				ref={ forwardedRef }
				href={ to }
				className={ classNames }
				{ ...props }
			>
				{ children }
			</a>
		);
	}

	if ( form ) {
		return (
			<button
				ref={ forwardedRef }
				className={ classNames }
				type="submit"
				{ ...props }
			>
				{ children }
			</button>
		);
	}

	return (
		<div
			ref={ forwardedRef }
			className={ classNames }
			{ ...props }
		>
			{ children }
		</div>
	);
}

export const Button = forwardRef( function(
	{
		loading,
		disabled: disabledProp,
		onClick: onClickProp,
		style = {},
		className: classNameProp,
		Loading: LoadingProp,
		...props
	},
	ref
) {
	const { button: ButtonClasses } = useSettings();
	const [ executing, setExecuting ] = useState();
	const LoadingComponent = LoadingProp ? LoadingProp : Loading;

	const className = `${ ButtonClasses } ${ classNameProp || '' }`;

	const wrapperClassName =
		'items-start' +
		( className?.includes( 'db' ) ? ' flex' : ' inline-flex' );

	useEffect( () => {
		let timeout;

		if ( executing ) {
			timeout = setTimeout( () => {
				setExecuting( false );
			}, 1000 );
		}

		return () => {
			clearTimeout( timeout );
		};
	}, [ executing ] );

	const onClick = ( event ) => {
		if ( ! executing ) {
			setExecuting( true );
			if ( onClickProp ) {
				onClickProp( event );
			}
		}
	};

	const disabled = disabledProp || executing;

	if ( loading ) {
		return (
			<div className={ wrapperClassName }>
				<ButtonRender
					forwardedRef={ ref }
					style={ { ...style, flexGrow: 1 } }
					{ ...{ className, disabled: true } }
					{ ...props }
				/>
				<LoadingComponent className="ml3" />
			</div>
		);
	}

	return (
		<ButtonRender
			forwardedRef={ ref }
			{ ...{
				className, style, disabled, onClick,
			} }
			{ ...props }
		/>
	);
} );

export default Button;
