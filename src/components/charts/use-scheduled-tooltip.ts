'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type ScheduledTooltipControls<T> = {
	clearTooltip: () => void
	resetTooltipDedupe: () => void
	scheduleTooltip: (tooltip: T, dedupeKey?: string) => void
	setTooltipData: React.Dispatch<React.SetStateAction<null | T>>
	tooltipData: null | T
}

export function useScheduledTooltip<T>(): ScheduledTooltipControls<T> {
	const [tooltipData, setTooltipData] = useState<null | T>(null)
	const lastKeyRef = useRef<null | string>(null)
	const pendingRef = useRef<null | T>(null)
	const rafRef = useRef<null | number>(null)
	const pendingKeyRef = useRef<null | string>(null)

	useEffect(() => {
		return () => {
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current)
			}
		}
	}, [])

	const commitTooltip = useCallback((tooltip: T, dedupeKey: string) => {
		if (dedupeKey === lastKeyRef.current) {
			return
		}

		lastKeyRef.current = dedupeKey
		setTooltipData(tooltip)
	}, [])

	const scheduleTooltip = useCallback(
		(tooltip: T, dedupeKey?: string) => {
			const key = dedupeKey ?? defaultDedupeKey(tooltip)

			pendingRef.current = tooltip
			pendingKeyRef.current = key

			if (key === lastKeyRef.current) {
				return
			}

			if (rafRef.current !== null) {
				return
			}

			rafRef.current = requestAnimationFrame(() => {
				rafRef.current = null
				const next = pendingRef.current
				const nextKey = pendingKeyRef.current

				if (next && nextKey) {
					commitTooltip(next, nextKey)
				}
			})
		},
		[commitTooltip],
	)

	const clearTooltip = useCallback(() => {
		if (rafRef.current !== null) {
			cancelAnimationFrame(rafRef.current)
			rafRef.current = null
		}

		pendingRef.current = null
		pendingKeyRef.current = null
		lastKeyRef.current = null
		setTooltipData(null)
	}, [])

	const resetTooltipDedupe = useCallback(() => {
		lastKeyRef.current = null
	}, [])

	return {
		clearTooltip,
		resetTooltipDedupe,
		scheduleTooltip,
		setTooltipData,
		tooltipData,
	}
}

function defaultDedupeKey<T>(tooltip: T): string {
	if (typeof tooltip === 'object' && tooltip !== null && 'index' in tooltip && typeof (tooltip as { index: unknown }).index === 'number') {
		const { index, x } = tooltip as { index: number; x?: number }

		if (typeof x === 'number') {
			return `${index}:${Math.round(x)}`
		}

		return String(index)
	}

	return JSON.stringify(tooltip)
}
