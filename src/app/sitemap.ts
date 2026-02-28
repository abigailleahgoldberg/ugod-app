import { traditions } from '@/data/passages';
import { holidays } from '@/data/holidays';
import { traditionConfigs } from '@/lib/sacred-apis';
import { blogPosts } from '@/data/blog';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://u-god.com';
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/library`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/search`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/daily`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/calendar`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/explore`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/topics`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.70 },
    { url: `${baseUrl}/world-religions`, lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.30 },
  ];

  // Holiday pages
  const holidayPages: MetadataRoute.Sitemap = holidays.map(h => ({
    url: `${baseUrl}/holidays/${h.slug}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.75,
  }));

  // Tradition pages
  const traditionPages: MetadataRoute.Sitemap = traditions.map(t => ({
    url: `${baseUrl}/library/${t.key}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Book/text pages for traditions with APIs
  const bookPages: MetadataRoute.Sitemap = [];
  for (const [key, config] of Object.entries(traditionConfigs)) {
    try {
      const books = await config.fetchBooks();
      for (const book of books) {
        bookPages.push({
          url: `${baseUrl}/library/${key}/${encodeURIComponent(book.id)}`,
          lastModified: now,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    } catch {}
  }

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.80,
  }));

  return [...staticPages, ...traditionPages, ...bookPages, ...holidayPages, ...blogPages];
}
