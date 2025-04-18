
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Sitemap = () => {
  const [loading, setLoading] = useState(true);
  const [sitemap, setSitemap] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('generate-sitemap', {
          body: {
            baseUrl: window.location.origin,
          },
        });

        if (error) {
          throw new Error(error.message);
        }
        
        // Set the sitemap content
        setSitemap(data);
      } catch (err) {
        console.error('Error fetching sitemap:', err);
        setError('Failed to generate sitemap');
      } finally {
        setLoading(false);
      }
    };

    fetchSitemap();
  }, []);

  // If content is loaded, display it with the correct XML formatting
  if (sitemap && !loading) {
    // Use a pre tag to display XML content properly
    return (
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {sitemap}
      </pre>
    );
  }

  // Loading or error state
  return (
    <div className="p-4">
      {loading && <p>Loading sitemap...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Sitemap;
