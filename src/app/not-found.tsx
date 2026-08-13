import type { ReactNode } from 'react'

export default function NotFoundPage(): ReactNode {
	return (
		<div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
			<h2>Not Found</h2>
			<p className="text-muted-foreground">Could not find requested URL</p>
		</div>
	)
}
