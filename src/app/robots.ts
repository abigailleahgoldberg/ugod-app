import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/bookmarks'],
      },
    ],
    sitemap: 'https://u-god.com/sitemap.xml',
  };
}
