import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	cacheComponents: true,
	compiler: {
		...(process.env.NODE_ENV === 'production' ? { reactRemoveProperties: { properties: ['^data-testid$'] }, removeConsole: { exclude: ['error', 'warn', 'info', 'table'] } } : {}),
	},
	experimental: { turbopackRustReactCompiler: true, useLightningcss: true, useOffline: true },
	images: { dangerouslyAllowSVG: true, remotePatterns: [{ hostname: 'api.dicebear.com', protocol: 'https' }] },
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
}

export default nextConfig
