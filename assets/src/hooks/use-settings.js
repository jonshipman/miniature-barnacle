import { useMemo } from '@wordpress/element';

export function useSettings() {
	const settings = useMemo( () => window.smcTheme, [] );

	return { ...settings };
}
