import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [{ changeFrequency: 'yearly', lastModified: new Date(), priority: 1, url: 'https://next-shadcn-ui.vercel.app' }]
}
