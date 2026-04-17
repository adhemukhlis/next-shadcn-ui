import { useEffect, useState, useSyncExternalStore } from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
	const isClient = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false
	)

	const [isMobile, setIsMobile] = useState<boolean>(() => (isClient ? window.innerWidth < MOBILE_BREAKPOINT : false))

	useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

		const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

		mql.addEventListener('change', onChange)

		return () => mql.removeEventListener('change', onChange)
	}, [])

	return isMobile
}
