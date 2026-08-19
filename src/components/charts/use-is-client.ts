'use client'

import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

/**
 * Returns true once the component is mounted on the client. Use to guard
 * client-only work (portals, DOM refs) without the extra render from the
 * `useState` + `setMounted(true)` effect pattern.
 */
export function useIsClient(): boolean {
	return useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false,
	)
}
