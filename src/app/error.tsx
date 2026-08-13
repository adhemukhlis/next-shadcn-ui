'use client'

import { useEffect } from 'react'

import { Button } from '@/components/internal'

import type { ReactNode } from 'react'

type ErrorPageProps = { error: Error & { digest?: string }; reset: () => void }

export default function ErrorPage({ error, reset }: ErrorPageProps): ReactNode {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
			<h2>Something went wrong!</h2>
			<pre className="max-w-full overflow-auto rounded-lg bg-muted p-4 text-sm text-muted-foreground">{error.message || 'An unexpected error occurred.'}</pre>
			<Button
				onClick={reset}
				variant="outline">
				Try again
			</Button>
		</div>
	)
}
