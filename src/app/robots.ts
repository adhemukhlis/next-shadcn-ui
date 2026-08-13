import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return { rules: { allow: '/', userAgent: '*' }, sitemap: `https://next-shadcn-ui.vercel.app/sitemap.xml` }
}
