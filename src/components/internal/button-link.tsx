'use client'

import Link from 'next/link'

import { Button } from '@/components/internal/button'

import type { InternalButtonProps } from '@/components/internal/button'
import type { ComponentProps } from 'react'

type ButtonLinkProps = Omit<InternalButtonProps, 'render'> & { href: ComponentProps<typeof Link>['href'] }

function ButtonLink({ href, ...props }: ButtonLinkProps) {
	return (
		<Button
			nativeButton={false}
			render={<Link href={href} />}
			{...props}
		/>
	)
}

export { ButtonLink }
