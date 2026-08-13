import { Geist } from 'next/font/google'

import type { PropsWithChildren } from '@/types/common'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import '@/styles/global.css'

const geist = Geist({ adjustFontFallback: false, display: 'swap', subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = { description: 'next-shadcn-ui', title: 'next-shadcn-ui' }

export const viewport: Viewport = { colorScheme: 'light', initialScale: 1, maximumScale: 1, minimumScale: 1, themeColor: '#FAFAFA', userScalable: false, viewportFit: 'contain' }

export default function Layout({ children }: PropsWithChildren): ReactNode {
	return (
		<html
			className={geist.variable}
			lang="en">
			<body>{children}</body>
		</html>
	)
}
