import { createElement, Fragment, isValidElement, type ReactElement, type ReactNode } from 'react'

/** Marker on wrapper components whose single child should inherit clip classification. */
export const CHART_CLIP_PASSTHROUGH = '__chartClipPassthrough' as const

/** Walk chart children, flattening React fragments (studio often groups layers in `<>...</>`). */
export function forEachChartChild(children: ReactNode, callback: (child: ReactElement, index: number) => void) {
	let index = 0

	const visit = (nodes: ReactNode) => {
		toChildArray(nodes).forEach((child) => {
			if (!isValidElement(child)) {
				return
			}

			if (child.type === Fragment) {
				visit((child.props as { children?: ReactNode }).children)

				return
			}

			callback(child, index)
			index += 1
		})
	}

	visit(children)
}

export function isChartClipPassthrough(type: unknown): boolean {
	return typeof type === 'function' && (type as { [CHART_CLIP_PASSTHROUGH]?: boolean })[CHART_CLIP_PASSTHROUGH] === true
}

const CLIP_EXCLUDED_COMPONENT_NAMES = new Set(['Background', 'Grid', 'XAxis', 'YAxis', 'BarXAxis', 'BarYAxis', 'LiveXAxis', 'LiveYAxis'])

const UNDERLAY_COMPONENT_NAMES = new Set(['ReferenceArea', 'BarColumnTrack'])

/** Grid and axes stay visible during series clip reveal (e.g. loading → ready). */
export function isClipExcludedComponent(child: ReactElement): boolean {
	const childType = child.type as { displayName?: string; name?: string }

	const componentName = typeof child.type === 'function' ? childType.displayName || childType.name || '' : ''

	return CLIP_EXCLUDED_COMPONENT_NAMES.has(componentName)
}

/** Markers render after the interaction overlay so they stay clickable. */
export function isPostOverlayComponent(child: ReactElement): boolean {
	const childType = child.type as {
		__isChartMarkers?: boolean
		__isPostOverlay?: boolean
		displayName?: string
		name?: string
	}

	if (childType.__isChartMarkers || childType.__isPostOverlay) {
		return true
	}

	const componentName = typeof child.type === 'function' ? childType.displayName || childType.name || '' : ''

	return componentName === 'ChartMarkers' || componentName === 'MarkerGroup' || componentName === 'ChartBrush'
}

/** Renders above grid/axes but below series; excluded from grow-clip reveal. */
export function isUnderlayComponent(child: ReactElement): boolean {
	const childType = child.type as { displayName?: string; name?: string }

	const componentName = typeof child.type === 'function' ? childType.displayName || childType.name || '' : ''

	return UNDERLAY_COMPONENT_NAMES.has(componentName)
}

/** SVG layer lists from chart shells need stable keys when rendered as arrays. */
export function renderKeyedChartLayers(children: ReactElement[]) {
	return children.map((child, index) => createElement(Fragment, { key: child.key ?? `chart-layer-${index}` }, child))
}

/** Unwrap visibility wrappers so `Grid` / axes stay outside the series clip. */
export function resolveChartChildElement(child: ReactElement): ReactElement {
	if (isChartClipPassthrough(child.type)) {
		const inner = (child.props as { children?: unknown }).children

		if (isValidElement(inner)) {
			return resolveChartChildElement(inner)
		}
	}

	return child
}

/** Normalize React children to a flat array without the `Children` API. */
export function toChildArray(children: ReactNode): ReactNode[] {
	const nodes: ReactNode[] = []

	const visit = (node: ReactNode) => {
		if (node == null || typeof node === 'boolean') {
			return
		}

		if (Array.isArray(node)) {
			for (const child of node) {
				visit(child)
			}

			return
		}

		nodes.push(node)
	}

	visit(children)

	return nodes
}
