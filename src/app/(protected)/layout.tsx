import LayoutComponent from '@/components/core/layout'

import type { FC, PropsWithChildren } from 'react'

const ProtectedLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<LayoutComponent>{children}</LayoutComponent>
		</>
	)
}

export default ProtectedLayout
