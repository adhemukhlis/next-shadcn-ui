import { Geist } from 'next/font/google'

import type { PropsWithChildren } from '@/types/common'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import '@/styles/global.css'

const geist = Geist({ display: 'swap', subsets: ['latin'], variable: '--font-sans' })

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'

const themeInit = `try{const t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}`

export const metadata: Metadata = {
	description: 'A lean, agnostic Next.js + shadcn/ui component baseline on Base UI.',
	metadataBase: new URL(siteUrl),
	openGraph: { description: 'A lean, agnostic Next.js + shadcn/ui component baseline on Base UI.', siteName: 'next-shadcn-ui', title: 'next-shadcn-ui', type: 'website' },
	title: { default: 'next-shadcn-ui', template: '%s · next-shadcn-ui' },
}

export const viewport: Viewport = {
	colorScheme: 'light dark',
	initialScale: 1,
	maximumScale: 1,
	minimumScale: 1,
	themeColor: '#FAFAFA',
	userScalable: false,
	viewportFit: 'contain',
}

export default function Layout({ children }: PropsWithChildren): ReactNode {
	return (
		<html
			className={geist.variable}
			lang="en"
			suppressHydrationWarning>
			<body>
				<script>{themeInit}</script>
				{children}
			</body>
		</html>
	)
}
