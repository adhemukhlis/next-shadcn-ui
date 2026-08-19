'use client'

import { motion } from 'motion/react'
import { memo, useMemo } from 'react'
import { createPortal } from 'react-dom'

import { useChart, useChartStable } from './chart-context'
import { intFmt } from './chart-formatters'
import { useIsClient } from './use-is-client'
import { cn } from '@/lib/utils'

export type BarYAxisProps = {
	/** Maximum number of labels to show. Default: 20 */
	maxLabels?: number
	/** Number of numeric ticks for vertical bar charts. Default: 5 */
	numTicks?: number
	/** Whether to show all labels or skip some for dense data. Default: true */
	showAllLabels?: boolean
	/** Unit label rendered above the axis (e.g. "IDR"). Vertical charts only. */
	unit?: string
}

type BarYAxisLabelProps = {
	bandHeight: number
	isHovered: boolean
	label: string
	y: number
}

type BarYAxisTickProps = {
	label: string
	y: number
}

export function BarYAxis(props: BarYAxisProps) {
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
		<BarYAxisInner
			{...props}
			container={container}
		/>
	)
}

function BarYAxisLabel({ bandHeight, isHovered, label, y }: BarYAxisLabelProps) {
	return (
		<div
			className="absolute right-0 flex items-center justify-end pr-2"
			style={{
				height: bandHeight,
				top: y,
			}}>
			<motion.span
				animate={{
					color: isHovered ? 'var(--foreground)' : 'var(--chart-label, var(--color-zinc-500))',
					opacity: isHovered ? 1 : 0.7,
				}}
				className={cn('truncate text-right text-xs whitespace-nowrap')}
				initial={{
					color: 'var(--chart-label, var(--color-zinc-500))',
					opacity: 0.7,
				}}
				style={{ maxWidth: 70 }}
				transition={{ duration: 0.15 }}>
				{label}
			</motion.span>
		</div>
	)
}

function BarYAxisTick({ label, y }: BarYAxisTickProps) {
	return (
		<div
			className="absolute right-0 flex items-center justify-end pr-2"
			style={{
				top: y,
				transform: 'translateY(-50%)',
			}}>
			<span className="text-xs whitespace-nowrap text-chart-label tabular-nums">{label}</span>
		</div>
	)
}

const BarYAxisInner = memo(function BarYAxisInner({ container, maxLabels = 20, numTicks = 5, showAllLabels = true, unit }: BarYAxisProps & { container: HTMLDivElement }) {
	const { bandWidth, barScale, barXAccessor, data, hoveredBarIndex, innerHeight, margin, orientation, yScale } = useChart()

	const isHorizontal = orientation === 'horizontal'

	// For horizontal bar charts the y-axis is the category axis, so labels
	// come from `barXAccessor`. For vertical charts it's the value axis, so
	// render numeric ticks from the y-scale.
	const categoryLabels = useMemo(() => {
		if (isHorizontal) {
			if (!(barScale && bandWidth && barXAccessor)) {
				return []
			}

			const allLabels = data.map((d, i) => {
				const label = barXAccessor(d)
				const bandY = barScale(label) ?? 0
				// Center the label vertically within the band
				const y = bandY + margin.top

				return { bandHeight: bandWidth, index: i, label, y }
			})

			// If showAllLabels is true or we have fewer than maxLabels, show all
			if (showAllLabels || allLabels.length <= maxLabels) {
				return allLabels
			}

			// Otherwise, skip some labels to avoid crowding
			const step = Math.ceil(allLabels.length / maxLabels)

			return allLabels.filter((_, i) => i % step === 0)
		}

		return []
	}, [barScale, bandWidth, barXAccessor, data, isHorizontal, margin.top, maxLabels, showAllLabels])

	const valueTicks = useMemo(() => {
		if (isHorizontal) {
			return []
		}

		const ticks = yScale.ticks ? yScale.ticks(numTicks) : []

		return ticks.map((value) => ({
			label: intFmt(value),
			y: (yScale(value) ?? innerHeight) + margin.top,
		}))
	}, [innerHeight, isHorizontal, margin.top, numTicks, yScale])

	return createPortal(
		<div
			className="pointer-events-none absolute inset-y-0"
			style={{
				left: 0,
				width: margin.left,
			}}>
			{unit && !isHorizontal && (
				<div className="absolute top-0 right-0 flex items-center justify-end pr-2">
					<span className="text-xs whitespace-nowrap text-chart-label">{unit}</span>
				</div>
			)}
			{isHorizontal
				? categoryLabels.map((item) => (
						<BarYAxisLabel
							bandHeight={item.bandHeight}
							isHovered={hoveredBarIndex === item.index}
							key={`${item.label}-${item.y}`}
							label={item.label}
							y={item.y}
						/>
					))
				: valueTicks.map((tick) => (
						<BarYAxisTick
							key={`${tick.label}-${tick.y}`}
							label={tick.label}
							y={tick.y}
						/>
					))}
		</div>,
		container,
	)
})

BarYAxis.displayName = 'BarYAxis'

export default BarYAxis
