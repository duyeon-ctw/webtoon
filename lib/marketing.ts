// Simplified marketing utilities for demonstration

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

/**
 * Generate SEO metadata for a page
 */
export function generateSEOMetadata(
  title: string,
  description: string,
  image?: string
): SEOMetadata {
  return {
    title: `${title} - Global Webtoon Platform`,
    description,
    keywords: ['webtoon', 'manhwa', 'manga', 'comics', 'digital comics'],
    ogImage: image || '/default-og-image.jpg',
    ogTitle: title,
    ogDescription: description,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image || '/default-twitter-image.jpg',
  };
}

/**
 * Track a page view (simplified mock)
 */
export function trackPageView(path: string, userAgent?: string, referer?: string): void {
  // In production, implement actual analytics tracking
  console.log({
    path,
    userAgent,
    referer,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Generate sitemap XML content
 */
export function generateSitemap(baseUrl: string = 'https://example.com'): string {
  const pages = [
    '',
    '/discover',
    '/popular',
    '/new',
    '/genres',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`;

  return sitemap;
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(baseUrl: string = 'https://example.com'): string {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/

Sitemap: ${baseUrl}/sitemap.xml`;
}

/**
 * Generate social media share links
 */
export function generateShareLinks(url: string, title: string): Record<string, string> {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };
}