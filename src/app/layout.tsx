import { Rubik, Geist } from 'next/font/google'

import type { Metadata, Viewport } from 'next'
import type { FC, PropsWithChildren } from 'react'

import '@/styles/global.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const nextFont = Rubik({
	style: ['normal', 'italic'],
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-family',
	adjustFontFallback: false
})

export const metadata: Metadata = {
	title: 'next-blank',
	description: 'Next.js blank'
}

export const viewport: Viewport = {
	themeColor: '#FAFAFA'
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang="en" className={cn("font-sans", geist.variable)}>
			<body className={`${nextFont.variable}`}>{children}</body>
		</html>
	)
}

export default RootLayout
