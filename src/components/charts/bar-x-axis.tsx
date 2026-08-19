'use client'

import { motion } from 'motion/react'
import { memo, useMemo } from 'react'
import { createPortal } from 'react-dom'

import { useChart, useChartStable } from './chart-context'
import { useIsClient } from './use-is-client'
import { cn } from '@/lib/utils'

export type BarXAxisProps = {
	/** Maximum number of labels to show. Default: 12 */
	maxLabels?: number
	/** Whether to show all labels or skip some for dense data. Default: false */
	showAllLabels?: boolean
	/** Width of the date ticker box for fade calculation. Default: 50 */
	tickerHalfWidth?: number
}

type BarXAxisLabelProps = {
	crosshairX: null | number
	isHovering: boolean
	label: string
	tickerHalfWidth: number
	x: number
}

export function BarXAxis(props: BarXAxisProps) {
	const { barScale, containerRef } = useChartStable()
	const isClient = useIsClient()

	const container = containerRef.current

	if (!(isClient && container)) {
		return null
	}

	if (!barScale) {
		return null
	}

	return (
		<BarXAxisInner
			{...props}
			container={container}
		/>
	)
}

function BarXAxisLabel({ crosshairX, isHovering, label, tickerHalfWidth, x }: BarXAxisLabelProps) {
	const fadeBuffer = 20
	const fadeRadius = tickerHalfWidth + fadeBuffer

	let opacity = 1

	if (isHovering && crosshairX !== null) {
		const distance = Math.abs(x - crosshairX)

		if (distance < tickerHalfWidth) {
			opacity = 0
		} else if (distance < fadeRadius) {
			opacity = (distance - tickerHalfWidth) / fadeBuffer
		}
	}

	// Zero-width container approach for perfect centering
	return (
		<div
			className="absolute"
			style={{
				bottom: 12,
				display: 'flex',
				justifyContent: 'center',
				left: x,
				width: 0,
			}}>
			<motion.span
				animate={{ opacity }}
				className={cn('text-xs whitespace-nowrap text-chart-label')}
				initial={{ opacity: 1 }}
				transition={{ duration: 0.4, ease: 'easeInOut' }}>
				{label}
			</motion.span>
		</div>
	)
}

const BarXAxisInner = memo(function BarXAxisInner({ container, maxLabels = 12, showAllLabels = false, tickerHalfWidth = 50 }: BarXAxisProps & { container: HTMLDivElement }) {
	const { bandWidth, barScale, barXAccessor, data, margin, tooltipData } = useChart()

	// Generate labels for each bar
	const labelsToShow = useMemo(() => {
		if (!(barScale && bandWidth && barXAccessor)) {
			return []
		}

		const allLabels = data.map((d) => {
			const label = barXAccessor(d)
			const bandX = barScale(label) ?? 0
			// Center the label under the bar group
			const x = bandX + bandWidth / 2 + margin.left

			return { label, x }
		})

		// If showAllLabels is true or we have fewer than maxLabels, show all
		if (showAllLabels || allLabels.length <= maxLabels) {
			return allLabels
		}

		// Otherwise, skip some labels to avoid crowding
		const step = Math.ceil(allLabels.length / maxLabels)

		return allLabels.filter((_, i) => i % step === 0)
	}, [barScale, bandWidth, barXAccessor, data, margin.left, showAllLabels, maxLabels])

	const isHovering = tooltipData !== null
	const crosshairX = tooltipData ? tooltipData.x + margin.left : null

	return createPortal(
		<div className="pointer-events-none absolute inset-0">
			{labelsToShow.map((item) => (
				<BarXAxisLabel
					crosshairX={crosshairX}
					isHovering={isHovering}
					key={`${item.label}-${item.x}`}
					label={item.label}
					tickerHalfWidth={tickerHalfWidth}
					x={item.x}
				/>
			))}
		</div>,
		container,
	)
})

BarXAxis.displayName = 'BarXAxis'

export default BarXAxis
