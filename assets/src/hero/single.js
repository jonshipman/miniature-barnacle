import { forwardRef, useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import { Button, PageWidth } from '../components';

export default forwardRef( function Single( { slide, children }, ref ) {
	const [ img, setImg ] = useState();
	const {
		text, id, link,
	} = slide;

	useEffect( () => {
		const _query = async () => {
			const results = await apiFetch( { path: `wp/v2/media/${ id }?_embed` } );
			if ( results ) {
				let _x = results.media_details.sizes[ '1536x1536' ]?.source_url;

				if ( ! _x ) {
					_x = results.media_details.sizes.large?.source_url;
				}

				if ( ! _x ) {
					_x = results.source_url;
				}

				if ( _x ) {
					setImg( _x );
				}
			}
		};

		_query();
	}, [ id ] );

	const props = {
		style: {},
		ref,
		className: 'cover bg-center w-100',
	};

	if ( img ) {
		props.style.backgroundImage = `url("${ img }")`;
	}

	return (
		<div { ...props }>
			<PageWidth>
				<div className="aspect-ratio aspect-ratio--9x16 aspect-ratio--16x9-l">
					<div className="aspect-ratio--object flex items-center">
						<div className="w-100">
							<div className="flex">
								<div className="mw7">
									<div
										className="f2 fw7 ttu lh-solid"
										dangerouslySetInnerHTML={ { __html: text } }
									/>

									<div className="mt5 flex nl2 nr2">
										{ link && (
											<div className="ph2">
												<Button bg="primary" href={ link }>
													Read More
												</Button>
											</div>
										) }

										<div className="ph2">
											<Button bg="white">Apply Now</Button>
										</div>
									</div>
								</div>

								<div className="ml-auto">
									{ children }
								</div>
							</div>
						</div>
					</div>
				</div>
			</PageWidth>
		</div>
	);
} );
