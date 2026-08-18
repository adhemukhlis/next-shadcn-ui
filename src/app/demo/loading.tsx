import type { ReactNode } from 'react'

const skeletonSections = ['overview', 'activity', 'analytics'] as const

export default function Loading(): ReactNode {
	return (
		<div
			aria-busy="true"
			className="flex flex-1 flex-col gap-4">
			<div className="h-7 w-48 animate-pulse rounded-sm bg-muted" />
			{skeletonSections.map((section) => (
				<div
					className="rounded-xl border bg-card p-6"
					key={section}>
					<div className="h-5 w-40 animate-pulse rounded-sm bg-muted" />
					<div className="mt-3 space-y-2">
						<div className="h-3 w-full animate-pulse rounded-sm bg-muted" />
						<div className="h-3 w-11/12 animate-pulse rounded-sm bg-muted" />
						<div className="h-3 w-2/3 animate-pulse rounded-sm bg-muted" />
					</div>
				</div>
			))}
		</div>
	)
}
