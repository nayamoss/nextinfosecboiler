
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const url = new URL(req.url);
    const baseUrl = url.searchParams.get('baseUrl') || 'https://yourdomain.com';

    // Get all public posts
    const { data: posts, error: postsError } = await supabaseClient
      .from('posts')
      .select('*')
      .eq('status', 'golive');
    
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
    const postPages: SitemapURL[] = (posts || []).map((post: any) => ({
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
    
    return new Response(xml, { 
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/xml',
        'Cache-Control': 'max-age=1800' // 30 minutes cache
      } 
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(
      JSON.stringify({ error: 'Error generating sitemap' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
