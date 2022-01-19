import { useSettings } from '../hooks';

export function Logo() {
	const { pathname } = window.location;
	const {
		siteTitle: title, siteLogo: logo, siteUrl,
	} = useSettings();
	const LogoContainer = pathname === '/' ? 'h1' : 'div';

	return (
		<LogoContainer className="ma0 lh-title f3">
			<a href={ siteUrl } className="no-underline db primary fw7">
				{ logo ? (
					<img
						src={ logo.medium }
						alt={ title }
						className="mw4 h2 h-auto-l db"
					/>
				) : (
					title
				) }
			</a>
		</LogoContainer>
	);
}

export default Logo;
