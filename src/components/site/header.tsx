import Link from 'next/link'

import { ThemeToggle } from '@/components/internal/theme-toggle'

function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
			<div className="mx-auto flex h-12 w-full max-w-5xl items-center justify-between px-4">
				<Link
					className="text-sm font-medium"
					href="/">
					next-shadcn-ui
				</Link>
				<nav className="flex items-center gap-2 text-sm">
					<Link
						className="text-muted-foreground transition-colors hover:text-foreground"
						href="/">
						Home
					</Link>
					<Link
						className="text-muted-foreground transition-colors hover:text-foreground"
						href="/components">
						Components
					</Link>
					<Link
						className="text-muted-foreground transition-colors hover:text-foreground"
						href="/demo">
						Demo
					</Link>
					<ThemeToggle />
				</nav>
			</div>
		</header>
	)
}

export { Header }
