'use client'

import { createContext, type ReactNode, use, useMemo } from 'react'

type ChartLegendHoverContextValue = {
	hoveredIndex: null | number
	setHoveredIndex: (index: null | number) => void
}

const ChartLegendHoverContext = createContext<ChartLegendHoverContextValue | null>(null)

export function ChartLegendHoverProvider({
	children,
	hoveredIndex,
	onHoverChange,
}: {
	children: ReactNode
	hoveredIndex: null | number
	onHoverChange: (index: null | number) => void
}) {
	const value = useMemo(() => ({ hoveredIndex, setHoveredIndex: onHoverChange }), [hoveredIndex, onHoverChange])

	return <ChartLegendHoverContext value={value}>{children}</ChartLegendHoverContext>
}

export function useChartLegendHover(): ChartLegendHoverContextValue {
	const context = use(ChartLegendHoverContext)

	return (
		context ?? {
			hoveredIndex: null,
			setHoveredIndex: () => {
				/* noop outside ChartLegendHoverProvider */
			},
		}
	)
}
