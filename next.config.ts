import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	cacheComponents: true,
	compiler: {
		...(process.env.NODE_ENV === 'production' ? { reactRemoveProperties: { properties: ['^data-testid$'] }, removeConsole: { exclude: ['error', 'warn', 'info', 'table'] } } : {}),
	},
	experimental: { turbopackRustReactCompiler: true, useLightningcss: true, useOffline: true },
	output: process.env.VERCEL ? undefined : 'standalone',
	pageExtensions: ['ts', 'tsx'],
	poweredByHeader: false,
	productionBrowserSourceMaps: false,
	reactCompiler: true,
	reactStrictMode: false, // I prefer to set to false to prevent double rendering.
	trailingSlash: false,
	turbopack: { resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'] },
	typedRoutes: true,
	typescript: { ignoreBuildErrors: true, tsconfigPath: 'tsconfig.json' },
	// images: {
	// 	remotePatterns: [
	// 		{
	// 			protocol: 'https',
	// 			hostname: 'api.dicebear.com',
	// 		},
	// 	],
	// 	dangerouslyAllowSVG: true,
	// },
}

export default nextConfig
