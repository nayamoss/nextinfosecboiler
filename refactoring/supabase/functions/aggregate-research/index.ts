
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simulate fetching GitHub data
async function fetchGitHubData(repoUrl: string) {
  console.log(`Fetching GitHub data for: ${repoUrl}`);
  // In a real implementation, this would be an actual API call to GitHub
  // For demo purposes, we'll simulate a response
  return {
    stars: Math.floor(Math.random() * 1000),
    forks: Math.floor(Math.random() * 300),
    lastCommit: new Date().toISOString(),
    contributors: Math.floor(Math.random() * 20) + 1,
  };
}

// Simulate fetching related resources
async function fetchRelatedResources(topic: string) {
  console.log(`Fetching related resources for: ${topic}`);
  // In a real implementation, this would be an API call to another service
  // For demo purposes, we'll simulate a response
  const resources = [
    { title: `${topic} Best Practices`, url: `https://example.com/${topic.toLowerCase()}/best-practices` },
    { title: `${topic} Tutorial`, url: `https://example.com/${topic.toLowerCase()}/tutorial` },
    { title: `Advanced ${topic}`, url: `https://example.com/${topic.toLowerCase()}/advanced` },
  ];
  return resources;
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

    // Extract the tag from query parameters
    const url = new URL(req.url);
    const tag = url.searchParams.get('tag');

    // Fetch posts based on tag
    let query = supabaseClient
      .from('sftrou_posts')
      .select('*')
      .eq('status', 'golive');

    // Add tag filter if provided
    if (tag) {
      query = query.eq('tag', tag);
    }

    // Fetch the posts
    const { data: posts, error } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // For each post, enrich with additional data
    const enrichedPosts = await Promise.all(posts.map(async (post) => {
      // Extract GitHub repo from content (simulated)
      const githubRepoMatch = post.content?.match(/github\.com\/([^\/]+\/[^\/\s]+)/);
      const githubRepo = githubRepoMatch ? githubRepoMatch[0] : null;
      
      // Get GitHub data if repo exists
      const githubData = githubRepo ? await fetchGitHubData(githubRepo) : null;
      
      // Get related resources based on post tag
      const relatedResources = post.tag ? await fetchRelatedResources(post.tag) : [];
      
      // Return enriched post
      return {
        ...post,
        enriched_data: {
          github: githubData,
          related_resources: relatedResources,
          reading_time: Math.ceil((post.content?.length || 0) / 1000) + ' min read',
        }
      };
    }));

    console.log(`Successfully enriched ${enrichedPosts.length} posts with external data`);
    
    return new Response(
      JSON.stringify({ data: enrichedPosts }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Unexpected error in aggregate-research:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
