import { useContext } from '@wordpress/element';
import { Button } from '../components';
import { Field, FormContext, RecaptchaLoader } from './form';

export default function FormLayout() {
	const { loading, onSubmit } = useContext( FormContext );

	return (
		<div>
			<div className="overflow-hidden">
				<Field id="yourName" />

				<div className="flex-l nl2 nr2">
					<Field
						id="email"
						className="ph2 w-50-l"
						WhenValid={ RecaptchaLoader }
					/>
					<Field id="phone" className="ph2 w-50-l" />
				</div>

				<Field id="message" rows={ 10 } />
			</div>

			<div className="flex justify-end mt4">
				<Button
					form
					onClick={ onSubmit }
					{ ...{ loading } }
				>
					Send Message
				</Button>
			</div>
		</div>
	);
}
