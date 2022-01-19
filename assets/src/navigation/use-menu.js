import { useSettings } from '../hooks';

export default function useMenu() {
	const { headerMenu } = useSettings();

	return { menuItems: headerMenu };
}
