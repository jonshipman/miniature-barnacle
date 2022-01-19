import { useMemo } from '@wordpress/element';
import Submenu from './submenu';
import { Anchor } from '../components';
import { ReactComponent as Carat } from './carat.svg';
import { useUiContext } from '../context';

export function MenuItem( {
	setHover, hover, className, item, subMenu = {},
} ) {
	const { pathname, origin } = useMemo( () => window.location, [] );
	const { isDesktop } = useUiContext();

	const DivProps = { className: 'relative', key: item.id };

	const AnchorProps = {
		className,
		onClick: () => setHover( item.id ),
	};

	if ( isDesktop ) {
		AnchorProps.onMouseEnter = () => setHover( item.id );
	}

	const SpanProps = { className: 'db' };

	if ( origin + pathname === item.url || hover === item.id ) {
		AnchorProps.className += ' primary';
	} else {
		AnchorProps.className += ' color-inherit';
	}

	if ( item.classes ) {
		SpanProps.className += ' ' + item.classes;
	}

	if ( hover === item.id ) {
		DivProps.className += ' z-2';
	} else {
		DivProps.className += ' z-1';
	}

	const hasChildren = item.children?.length > 0;

	return (
		<div { ...DivProps }>
			<div className="flex items-center">
				<Anchor href={ item.url } { ...AnchorProps }>
					{ /* dangerouslySetInnerHTML to catch html entities. */ }
					<span
						{ ...SpanProps }
						dangerouslySetInnerHTML={ { __html: item.label } }
					/>
				</Anchor>
				{ ! isDesktop && hasChildren ? (
					<span
						className="ml-auto db pa1 pointer"
						onClick={ () => setHover( item.id ) }
						onKeyDown={ ( evt ) =>
							evt.key === 'Enter' || evt.key === 'Space'
								? setHover( item.id )
								: null
						}
						tabIndex="0"
						role="button"
					>
						<Carat />
					</span>
				) : null }
			</div>

			{ hasChildren && hover === item.id ? (
				<Submenu items={ item.children } { ...subMenu } />
			) : null }
		</div>
	);
}

export default MenuItem;
