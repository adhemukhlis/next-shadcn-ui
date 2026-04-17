import { Geist } from 'next/font/google'

import { cn } from '@/lib/utils'

import type { Metadata, Viewport } from 'next'
import type { FC, PropsWithChildren } from 'react'

import '@/styles/global.css'

const nextFont = Geist({
	style: ['normal'],
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-sans',
	adjustFontFallback: false
})

export const metadata: Metadata = {
	title: 'next-shadcn-ui',
	description: 'Next.js shadcn ui'
}

export const viewport: Viewport = {
	themeColor: '#FAFAFA'
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html
			lang="en"
			className={cn('font-sans', nextFont.variable)}>
			<body>{children}</body>
		</html>
	)
}

export default RootLayout
