
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetEnrichedPosts } from '@/hooks/use-research';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, BookOpen } from 'lucide-react';

const ResearchPage = () => {
  const { data: posts, isLoading, error } = useGetEnrichedPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Security for the Rest of Us - Research
          </Link>
          <Link to="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          Research Resource Hub
        </h1>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="rounded-md bg-red-50 p-4 text-center dark:bg-red-900/20">
            <p className="text-red-800 dark:text-red-300">
              Error loading research resources. Please try again later.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Card key={post.id} className="flex h-full flex-col hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    <p className="text-sm text-gray-500">{post.enriched_data.reading_time}</p>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <p className="mb-4 text-gray-600 dark:text-gray-300">{post.meta_description}</p>
                    
                    {post.enriched_data.github && (
                      <div className="mb-4 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
                        <div className="mb-2 flex items-center gap-2">
                          <Github size={16} />
                          <span className="font-medium">GitHub Repository</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Stars: {post.enriched_data.github.stars}</div>
                          <div>Forks: {post.enriched_data.github.forks}</div>
                          <div>Contributors: {post.enriched_data.github.contributors}</div>
                          <div>Last updated: {new Date(post.enriched_data.github.lastCommit).toLocaleDateString()}</div>
                        </div>
                      </div>
                    )}
                    
                    {post.enriched_data.related_resources.length > 0 && (
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <BookOpen size={16} />
                          <span className="font-medium">Related Resources</span>
                        </div>
                        <ul className="space-y-1">
                          {post.enriched_data.related_resources.map((resource, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <ExternalLink size={14} />
                              <a 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline dark:text-blue-400"
                              >
                                {resource.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4">
                    <div className="flex items-center justify-between w-full">
                      <Badge>{post.tag}</Badge>
                      <Link to={`/article/${post.slug}`}>
                        <Button variant="outline" size="sm">Read Article</Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center">
                <p className="text-gray-500 dark:text-gray-400">No research resources found.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ResearchPage;
