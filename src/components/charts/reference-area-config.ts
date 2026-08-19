import { isValidElement, type ReactElement, type ReactNode } from 'react'

import { toChildArray } from './chart-child-passthrough'
import { normalizeYAxisId } from './y-axis-scales'

export type ReferenceAreaConfig = {
	axisLabelColor?: string
	y1?: number
	y2?: number
	yAxisId: string
}

type ReferenceAreaConfigProps = {
	axisLabelColor?: string
	y1?: number
	y2?: number
	yAxisId?: number | string
}

/** Collect {@link ReferenceArea} props from chart children for axis label styling. */
export function extractReferenceAreaConfigs(children: ReactNode): ReferenceAreaConfig[] {
	const configs: ReferenceAreaConfig[] = []

	const visit = (node: ReactNode) => {
		toChildArray(node).forEach((child) => {
			if (!isValidElement(child)) {
				return
			}

			if (isReferenceAreaElement(child)) {
				const props = child.props as ReferenceAreaConfigProps | undefined

				if (props) {
					configs.push({
						axisLabelColor: props.axisLabelColor,
						y1: props.y1,
						y2: props.y2,
						yAxisId: normalizeYAxisId(props.yAxisId),
					})
				}

				return
			}

			const childProps = child.props as { children?: ReactNode } | undefined

			if (childProps?.children) {
				visit(childProps.children)
			}
		})
	}

	visit(children)

	return configs
}

function getChildComponentName(child: ReactElement) {
	const childType = child.type as { displayName?: string; name?: string }

	return typeof child.type === 'function' ? childType.displayName || childType.name || '' : ''
}

function isReferenceAreaElement(child: ReactElement): boolean {
	return getChildComponentName(child) === 'ReferenceArea'
}
