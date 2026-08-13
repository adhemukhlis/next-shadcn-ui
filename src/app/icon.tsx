import { ImageResponse } from 'next/og'

import type { CSSProperties } from 'react'

export const size = { height: 36, width: 36 }

const iconStyle: CSSProperties = {
	alignItems: 'center',
	background: '#111111',
	color: 'white',
	display: 'flex',
	fontSize: 24,
	height: '100%',
	justifyContent: 'center',
	width: '100%',
}

export const contentType = 'image/png'

export default function Icon(): ImageResponse {
	return new ImageResponse(<div style={iconStyle}>S</div>, { ...size })
}
