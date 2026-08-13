import type { ReactNode } from 'react'

export default function Loading(): ReactNode {
	return (
		<div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
			<h2>loading</h2>
		</div>
	)
}
