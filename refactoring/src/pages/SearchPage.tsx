
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/integrations/supabase/client';
import ArticleCard from '@/components/ArticleCard';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Post } from '@/hooks/use-posts';

const SearchPage = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme.mode === 'dark' ? { mode: 'light' } : { mode: 'dark' });
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .or(`title.ilike.%${query}%,meta_description.ilike.%${query}%,content.ilike.%${query}%`)
          .eq('status', 'golive')
          .order('publish_date', { ascending: false });

        if (error) throw error;
        setResults(data || []);
      } catch (err) {
        console.error('Error searching posts:', err);
        setError('Failed to search posts. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Security for the Rest of Us
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme.mode === 'dark' ? 
                <Sun className="h-5 w-5" /> : 
                <Moon className="h-5 w-5" />
              }
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white py-8 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="mb-4 flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Search Results
            </h1>
          </div>
          
          <div className="mx-auto max-w-md">
            <SearchBar value={query} />
          </div>
          
          {query && (
            <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
              {isLoading
                ? 'Searching...'
                : `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
            </p>
          )}
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center">
              <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="rounded-md bg-red-50 p-4 text-center dark:bg-red-900/20">
              <p className="text-red-800 dark:text-red-300">{error}</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => (
                <Link to={`/article/${post.slug}`} key={post.id} className="block h-full">
                  <ArticleCard post={post} />
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="text-center">
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                No articles found matching your search.
              </p>
              <Link to="/">
                <Button>View All Articles</Button>
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-700 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 Security for the Rest of Us
            </p>
            <div className="flex space-x-6">
              <Link to="/about" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                about
              </Link>
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                privacy
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                terms
              </Link>
              <Link to="/rss" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                rss
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchPage;
