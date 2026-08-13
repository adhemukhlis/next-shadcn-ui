import { Badge } from '@/components/internal'
import { ButtonLink } from '@/components/internal/button-link'
import { Header } from '@/components/site/header'

import type { ReactNode } from 'react'

export default function Page(): ReactNode {
	return (
		<div className="flex min-h-dvh flex-col">
			<Header />
			<main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
				<Badge variant="outline">Next.js 16 · Turbopack · Lightning CSS · Base UI</Badge>
				<h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">next-shadcn-ui</h1>
				<p className="max-w-md text-balance text-pretty text-muted-foreground">
					A lean, agnostic component baseline. shadcn/ui on Base UI, customized through a single internal tree and kept in step with upstream.
				</p>
				<div className="flex flex-wrap items-center justify-center gap-2">
					<ButtonLink href="/components">Browse components</ButtonLink>
				</div>
			</main>
		</div>
	)
}
