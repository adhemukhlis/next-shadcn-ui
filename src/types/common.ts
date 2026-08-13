import type { ReactNode } from 'react'

export type PropsWithChildren<P = Record<PropertyKey, unknown>> = P & { children?: ReactNode }
