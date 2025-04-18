
import React from 'react';
import { useGetNewsletters } from '@/hooks/use-newsletters';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import SiteLayout from '@/components/SiteLayout';
import PostTag from '@/components/PostTag';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';

const NewsletterPage = () => {
  const { data: newsletters, isLoading } = useGetNewsletters();
  
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-2">Security Newsletters</h1>
            <p className="text-muted-foreground mb-8">
              Stay updated with our expert insights on the latest security trends, best practices, and alerts.
            </p>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : newsletters && newsletters.length > 0 ? (
              <div className="space-y-8">
                {newsletters.map((newsletter) => (
                  <div key={newsletter.id} className="border border-border rounded-lg p-6 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="mb-2">
                          <PostTag tag={newsletter.tag} />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">
                          <Link to={`/newsletters/${newsletter.id}`} className="hover:underline">
                            {newsletter.title}
                          </Link>
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">
                          {format(new Date(newsletter.publish_date), 'MMMM d, yyyy')}
                        </p>
                        <p className="text-muted-foreground">
                          {newsletter.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link 
                        to={`/newsletters/${newsletter.id}`}
                        className="text-primary flex items-center hover:underline text-sm font-medium"
                      >
                        Read full newsletter <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-border rounded-lg">
                <p className="text-muted-foreground">No newsletters found</p>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <NewsletterSubscribe />
              
              <div className="mt-8 bg-muted rounded-lg p-6">
                <h3 className="font-medium mb-2">About Our Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our newsletter provides actionable security insights and best practices for developers,
                  IT professionals, and anyone interested in digital security.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    Security insights for all technical levels
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    Weekly or monthly delivery options
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    Special alerts for critical vulnerabilities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default NewsletterPage;
