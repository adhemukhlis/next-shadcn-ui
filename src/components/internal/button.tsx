import { type VariantProps } from 'class-variance-authority'

import { Button as BaseButton } from '@/components/base/button'
import { cn } from '@/lib/utils'

import type { buttonVariants } from '@/components/base/button'
import type { Button as ButtonPrimitive } from '@base-ui/react/button'

/**
 * Internal Button — customized copy of the shadcn Base UI button.
 *
 * Adds a local `inverse` variant on top of the upstream variants. Everything
 * else forwards to the base component so upstream updates stay easy to diff.
 */
type BaseVariant = VariantProps<typeof buttonVariants>['variant']

type InternalButtonProps = Omit<ButtonPrimitive.Props & VariantProps<typeof buttonVariants>, 'variant'> & { variant?: 'inverse' | BaseVariant }

const internalVariantStyles: Record<string, string> = { inverse: 'border-transparent bg-foreground text-background hover:bg-foreground/90' }

function Button({ className, variant = 'default', ...props }: InternalButtonProps) {
	const isInverse = variant === 'inverse'

	return (
		<BaseButton
			className={cn('cursor-pointer', isInverse && internalVariantStyles.inverse, className)}
			variant={isInverse ? 'secondary' : variant}
			{...props}
		/>
	)
}

export { Button }

export type { InternalButtonProps }

export { buttonVariants } from '@/components/base/button'
