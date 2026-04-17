import RegularArrowsLeftRight from './svgs/regular/arrows-left-right'
import RegularAtomSimple from './svgs/regular/atom-simple'
import RegularCheck from './svgs/regular/check'
import RegularChevronRight from './svgs/regular/chevron-right'
import RegularSidebar from './svgs/regular/sidebar'
import RegularXmark from './svgs/regular/xmark'

import type { FC, SVGProps } from 'react'

export const IconRegularArrowsLeftRight: FC<SVGProps<SVGSVGElement>> = (props) => <RegularArrowsLeftRight {...props} />

export const IconRegularAtomSimple: FC<SVGProps<SVGSVGElement>> = (props) => <RegularAtomSimple {...props} />

export const IconRegularCheck: FC<SVGProps<SVGSVGElement>> = (props) => <RegularCheck {...props} />

export const IconRegularChevronRight: FC<SVGProps<SVGSVGElement>> = (props) => <RegularChevronRight {...props} />

export const IconRegularSidebar: FC<SVGProps<SVGSVGElement>> = (props) => <RegularSidebar {...props} />

export const IconRegularXmark: FC<SVGProps<SVGSVGElement>> = (props) => <RegularXmark {...props} />
