
import { supabase } from '@/integrations/supabase/client';

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = async (baseUrl: string): Promise<string> => {
  try {
    // Get all public posts
    const { data: posts, error: postsError } = await supabase.functions.invoke('get-public-posts');
    
    if (postsError) {
      console.error('Error fetching posts for sitemap:', postsError);
      throw postsError;
    }
    
    // Define static pages
    const staticPages: SitemapURL[] = [
      { loc: `${baseUrl}/`, priority: 1.0, changefreq: 'weekly' },
      { loc: `${baseUrl}/newsletters`, priority: 0.8, changefreq: 'weekly' },
      { loc: `${baseUrl}/pricing`, priority: 0.7, changefreq: 'monthly' },
      { loc: `${baseUrl}/search`, priority: 0.6, changefreq: 'monthly' },
    ];
    
    // Add dynamic pages from posts
    const postPages: SitemapURL[] = (posts?.data || []).map((post: any) => ({
      loc: `${baseUrl}/${post.slug}`,
      lastmod: post.modified_at || post.publish_date,
      priority: 0.9,
      changefreq: 'monthly'
    }));
    
    // Combine all URLs
    const allUrls = [...staticPages, ...postPages];
    
    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;
    
    return xml;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
};
