import { Button } from '@/components/ui/button'

const buttonVariants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const
const buttonSizes = ['xs', 'sm', 'default', 'lg'] as const

const Page = () => {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<div className="mx-auto max-w-3xl px-6 py-16 space-y-12">
				{/* Header */}
				<div className="space-y-2">
					<h1 className="text-3xl font-semibold tracking-tight">shadcn/ui · Nova</h1>
					<p className="text-muted-foreground text-sm">
						Style: <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">radix-nova</code> · Base color:{' '}
						<code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">neutral</code>
					</p>
				</div>

				{/* Variants */}
				<section className="space-y-4">
					<h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Variants</h2>
					<div className="flex flex-wrap gap-3">
						{buttonVariants.map((variant) => (
							<Button
								key={variant}
								variant={variant}>
								{variant.charAt(0).toUpperCase() + variant.slice(1)}
							</Button>
						))}
					</div>
				</section>

				{/* Sizes */}
				<section className="space-y-4">
					<h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Sizes</h2>
					<div className="flex flex-wrap items-center gap-3">
						{buttonSizes.map((size) => (
							<Button
								key={size}
								size={size}>
								Size {size}
							</Button>
						))}
					</div>
				</section>

				{/* Disabled state */}
				<section className="space-y-4">
					<h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Disabled</h2>
					<div className="flex flex-wrap gap-3">
						{buttonVariants.map((variant) => (
							<Button
								key={variant}
								variant={variant}
								disabled>
								{variant.charAt(0).toUpperCase() + variant.slice(1)}
							</Button>
						))}
					</div>
				</section>
			</div>
		</main>
	)
}

export default Page
