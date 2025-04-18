import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Moon, Sun, Share, Twitter, Facebook, Linkedin, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useGetPostBySlug } from '@/hooks/use-posts';
import { Button } from '@/components/ui/button';
import PostDate from '@/components/PostDate';
import ReadingTime from '@/components/ReadingTime';
import PostTag from '@/components/PostTag';
import FeedbackThankYou from '@/components/FeedbackThankYou';
import FeedbackModal from '@/components/FeedbackModal';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { theme, setTheme } = useTheme();
  const { data: article, isLoading, error } = useGetPostBySlug(slug || '');
  const navigate = useNavigate();
  
  // Feedback state
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  // Handle feedback button clicks
  const handleFeedbackClick = (type: 'love' | 'helpful' | 'ok' | 'lost') => {
    if (type === 'lost') {
      setFeedbackModalOpen(true);
    } else {
      setThankYouOpen(true);
    }
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme.mode === 'dark' ? { mode: 'light' } : { mode: 'dark' });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Article Not Found</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Security for the Rest of Us
          </Link>

          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
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

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300">{article.title}</span>
        </div>
      </div>

      {/* Article header */}
      <main className="container mx-auto px-4 py-8">
        <article className="mx-auto max-w-3xl">
          <header className="mb-8">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              {article.tag === 'Data Protection' && '🔒 '}
              {article.tag === 'Encryption' && '🔐 '}
              {article.tag === 'Deployments' && '🚀 '}
              {article.tag === 'AI' && '🤖 '}
              {article.tag === 'Basics' && '📚 '}
              {article.tag === 'Coding' && '💻 '}
              {article.tag === 'Best Practice' && '✅ '}
              {article.title}
            </h1>
            
            <div className="mb-6 flex items-center space-x-4">
              <PostDate dateString={article.publish_date} />
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <ReadingTime content={article.content} />
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <PostTag tag={article.tag} />
            </div>
            
            {/* Share buttons */}
            <div className="flex items-center space-x-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
                <Twitter className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
                <Facebook className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
                <Linkedin className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
                <Share className="h-4 w-4" />
              </div>
            </div>
          </header>
          
          {/* Featured image */}
          {article.header_image && (
            <div className="mb-8">
              <img 
                src={article.header_image} 
                alt={article.title}
                className="h-auto w-full rounded-lg object-cover shadow-md"
              />
            </div>
          )}
          
          {/* Article content */}
          <div 
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 prose-headings:dark:text-white prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-a:text-blue-600 prose-a:dark:text-blue-400"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />
          
          {/* Article footer */}
          <div className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-700">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h3 className="text-xl font-semibold dark:text-white">What did you think of this post?</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <button 
                  onClick={() => handleFeedbackClick('love')}
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Loved it
                </button>
                <button 
                  onClick={() => handleFeedbackClick('helpful')}
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Helpful
                </button>
                <button 
                  onClick={() => handleFeedbackClick('ok')}
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Ok
                </button>
                <button 
                  onClick={() => handleFeedbackClick('lost')}
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Lost me
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Newsletter */}
      <section className="bg-gray-100 py-16 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Stay Updated</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-300">
            Get the latest security tips and insights delivered straight to your inbox.
          </p>
          <div className="mx-auto flex max-w-md flex-col space-y-4 md:flex-row md:space-y-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
            <button className="rounded-md bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
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

      {/* Feedback Thank You Dialog */}
      <FeedbackThankYou 
        open={thankYouOpen} 
        onClose={() => setThankYouOpen(false)} 
      />

      {/* Feedback Modal */}
      <FeedbackModal 
        open={feedbackModalOpen} 
        onOpenChange={setFeedbackModalOpen} 
        articleTitle={article.title} 
      />
    </div>
  );
};

export default ArticlePage;
