import {
	faAngleDoubleLeft,
	faAngleDoubleRight,
	faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	PanelRow,
	RangeControl,
	TextControl,
} from '@wordpress/components';
import { cloneElement, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * The Edit component function.
 *
 * Renders in the block editor.
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Attribute state.
 * @param {Function} props.setAttributes Function to update attribute state.
 */
export default function HeroEdit( { attributes, setAttributes } ) {
	const [ selectedBackground, setSelectedBackground ] = useState( 0 );
	const { backgrounds, opacity } = attributes;

	const containerProps = {
		className:
			'b--blue pa4 relative z-1 ba bg-gray cover flex items-center',
		style: { height: '32rem' },
	};

	if ( backgrounds[ selectedBackground ]?.background_src ) {
		const _bg = `url("${ backgrounds[ selectedBackground ].background_src }")`;
		containerProps.style.backgroundImage = _bg;
	}

	const addSlide = () => {
		setAttributes( {
			...attributes,
			backgrounds: [
				...backgrounds,
				{
					background_id: 0,
					background_src: '',
					text: '',
					link: '',
				},
			],
		} );

		setSelectedBackground( selectedBackground + 1 );
	};

	const deleteSlide = () => {
		const _new = backgrounds.filter(
			( _, index ) => index !== selectedBackground,
		);

		setAttributes( {
			...attributes,
			backgrounds: _new,
		} );

		if ( ! _new[ selectedBackground ] ) {
			setSelectedBackground( selectedBackground - 1 );
		}
	};

	const updateText = ( v ) => {
		const _b = {
			...backgrounds[ selectedBackground ],
			text: v,
		};

		setAttributes( {
			...attributes,
			backgrounds: [
				...backgrounds.filter( ( _v, index ) => index !== selectedBackground ),
				_b,
			],
		} );
	};

	const updateLink = ( v ) => {
		const _b = {
			...backgrounds[ selectedBackground ],
			link: v,
		};

		setAttributes( {
			...attributes,
			backgrounds: [
				...backgrounds.filter( ( _v, index ) => index !== selectedBackground ),
				_b,
			],
		} );
	};

	const goNext = () => {
		let _n = selectedBackground + 1;

		if ( ! backgrounds[ _n ] ) {
			_n = 0;
		}

		setSelectedBackground( _n );
	};

	const goPrev = () => {
		let _n = selectedBackground + 1;

		if ( ! backgrounds[ _n ] ) {
			_n = backgrounds.length - 1;
		}

		setSelectedBackground( _n );
	};

	const showButtons = backgrounds.length > 1;

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'smc-textdomain' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<div className="w-100">
							<div className="flex nl1 nr1">
								<div className="ph1 w-100">
									<Button
										className="w-100 flex justify-center"
										isPrimary
										label={ __( 'Add Slide', 'smc-textdomain' ) }
										onClick={ addSlide }
									>
										{ __( 'Add', 'smc-textdomain' ) }
									</Button>
								</div>

								<div className="ph1 w-100">
									<Button
										className="w-100 flex justify-center"
										isDestructive
										label={ __( 'Delete Current Slide', 'smc-textdomain' ) }
										onClick={ deleteSlide }
									>
										{ __( 'Delete', 'smc-textdomain' ) }
									</Button>
								</div>
							</div>
						</div>
					</PanelRow>

					<PanelRow>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) => {
									const _b = {
										...backgrounds[ selectedBackground ],
										background_id: media.id,
										background_src: media.url,
									};

									setAttributes( {
										...attributes,
										backgrounds: [
											...backgrounds.filter(
												( _v, index ) => index !== selectedBackground
											),
											_b,
										],
									} );
								} }
								allowedTypes={ ALLOWED_MEDIA_TYPES }
								value={ backgrounds.map( ( x ) => x.background_id ) }
								render={ ( { open } ) => (
									<Button
										className="w-100 justify-center"
										isPrimary
										label={ __( 'Change background', 'smc-textdomain' ) }
										onClick={ open }
									>
										{ __( 'Change background', 'smc-textdomain' ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					</PanelRow>

					<PanelRow>
						<TextControl
							value={ backgrounds[ selectedBackground ]?.link || '' }
							onChange={ updateLink }
							label={ __( 'Read More Link', 'smc-textdomain' ) }
						/>
					</PanelRow>

					<PanelRow>
						<RangeControl
							label={ __( 'Background Opacity', 'smc-textdomain' ) }
							value={ opacity || 0 }
							onChange={ ( value ) =>
								setAttributes( {
									...attributes,
									opacity: value,
								} )
							}
							step={ 5 }
							min={ 0 }
							max={ 100 }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div { ...containerProps }>
				<div className="ph4 relative z-2 white w-100 flex">
					<div className="flex-auto">
						<div className="f2 fw7 ttu lh-solid">
							<RichText
								placeholder="Slide Text"
								value={ backgrounds[ selectedBackground ]?.text || '' }
								onChange={ updateText }
								allowedFormats={ [ 'core/bold' ] }
							/>
						</div>

						<div className="mt5 flex nl2 nr2">
							{ backgrounds[ selectedBackground ].link && (
								<StyleButton bg="primary">Read More</StyleButton>
							) }
							<StyleButton bg="white">Apply Now</StyleButton>
						</div>
					</div>

					{ showButtons && (
						<div>
							<NavButton cn="mb3" onClick={ goNext }>
								<FontAwesomeIcon icon={ faAngleDoubleRight } />
							</NavButton>
							<NavButton onClick={ goPrev }>
								<FontAwesomeIcon icon={ faAngleDoubleLeft } />
							</NavButton>
						</div>
					) }
				</div>
				<div
					className="z-1 absolute absolute--fill bg-black"
					style={ { opacity: opacity ? opacity / 100 : 0 } }
				/>
			</div>
		</div>
	);
}

function StyleButton( { children, bg } ) {
	let className = `bg-${ bg } br-pill ph4 pv3 ttu f7 fw7`;
	let color = '#fff';

	if ( bg === 'white' ) {
		className += ' primary';
		color = '#ff5e14';
	}

	return (
		<div className="ph2">
			<div { ...{ className } }>
				<div className="mr2 dib no-select">{ children }</div>
				<FontAwesomeIcon icon={ faPaperPlane } { ...{ color } } />
			</div>
		</div>
	);
}

function NavButton( {
	children, cn = '', onClick,
} ) {
	const props = {
		className: `db br2 bg-primary pa3 pointer ${ cn }`,
		onClick,
		role: 'button',
		tabIndex: 0,
	};

	props.onKeyDown = ( evt ) => evt.key === 'Enter' && onClick( evt );

	const icon = cloneElement( children, { color: '#fff' } );

	return <div { ...props }>{ icon }</div>;
}

/**
 * List of Media types allowed on the image upload.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_MEDIA_TYPES = [ 'image' ];
