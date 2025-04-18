
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SettingsSidebar from '@/components/SettingsSidebar';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Home, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSeoSettings } from '@/hooks/use-seo-settings';
import { toast } from '@/components/ui/sonner';

const SeoSettings = () => {
  const { settings, loading, error, updateSettings } = useSeoSettings();
  
  const [pageMetaTemplate, setPageMetaTemplate] = useState<string>('');
  const [postMetaTemplate, setPostMetaTemplate] = useState<string>('');
  const [newsletterMetaTemplate, setNewsletterMetaTemplate] = useState<string>('');
  
  const [blogSchema, setBlogSchema] = useState<string>('');
  const [articleSchema, setArticleSchema] = useState<string>('');
  const [organizationSchema, setOrganizationSchema] = useState<string>('');
  
  const [canonicalFormat, setCanonicalFormat] = useState<string>('');
  
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    if (!loading && settings) {
      setPageMetaTemplate(settings.pageMetaTemplate);
      setPostMetaTemplate(settings.postMetaTemplate);
      setNewsletterMetaTemplate(settings.newsletterMetaTemplate);
      setBlogSchema(settings.blogSchema);
      setArticleSchema(settings.articleSchema);
      setOrganizationSchema(settings.organizationSchema);
      setCanonicalFormat(settings.canonicalFormat);
    }
  }, [loading, settings]);
  
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const success = await updateSettings({
        pageMetaTemplate,
        postMetaTemplate,
        newsletterMetaTemplate,
        blogSchema,
        articleSchema,
        organizationSchema,
        canonicalFormat
      });
      
      if (success) {
        toast("Settings Saved", { 
          description: "Your SEO settings have been updated successfully." 
        });
      } else {
        toast("Error", { 
          description: "Failed to save settings. Please try again." 
        });
      }
    } catch (err) {
      console.error('Error saving SEO settings:', err);
      toast("Error", { 
        description: "An unexpected error occurred. Please try again." 
      });
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div className="flex h-full bg-background text-foreground">
      <SettingsSidebar />
      
      <div className="flex-1 p-6 overflow-y-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/settings">Settings</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>SEO Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">SEO Settings</h2>
          <p className="text-muted-foreground mb-8">Optimize your content for search engines</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveChanges}>
            <Tabs defaultValue="meta">
              <TabsList className="mb-6">
                <TabsTrigger value="meta">Meta Templates</TabsTrigger>
                <TabsTrigger value="schema">Structured Data</TabsTrigger>
                <TabsTrigger value="canonical">Canonical URLs</TabsTrigger>
                <TabsTrigger value="social">Social Sharing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="meta">
                <div className="mb-8 rounded-lg bg-card p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-medium mr-2">Meta Tag Templates</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Use variables like {'{title}'}, {'{description}'}, {'{site_name}'} which will be replaced with actual content.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="page-meta" className="mb-2 block text-sm font-medium">
                      Page Meta Template
                    </label>
                    <Textarea
                      id="page-meta"
                      value={pageMetaTemplate}
                      onChange={(e) => setPageMetaTemplate(e.target.value)}
                      rows={4}
                      className="w-full font-mono text-sm"
                      placeholder="<title>{title} | {site_name}</title>"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Applied to standard pages
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="post-meta" className="mb-2 block text-sm font-medium">
                      Post Meta Template
                    </label>
                    <Textarea
                      id="post-meta"
                      value={postMetaTemplate}
                      onChange={(e) => setPostMetaTemplate(e.target.value)}
                      rows={4}
                      className="w-full font-mono text-sm"
                      placeholder="<title>{title} | {site_name}</title>"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Applied to blog posts
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="newsletter-meta" className="mb-2 block text-sm font-medium">
                      Newsletter Meta Template
                    </label>
                    <Textarea
                      id="newsletter-meta"
                      value={newsletterMetaTemplate}
                      onChange={(e) => setNewsletterMetaTemplate(e.target.value)}
                      rows={4}
                      className="w-full font-mono text-sm"
                      placeholder="<title>{title} | {site_name}</title>"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Applied to newsletter issues
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="schema">
                <div className="mb-8 rounded-lg bg-card p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-medium mr-2">Structured Data (Schema.org JSON-LD)</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            JSON-LD templates for search engine rich results. Variables like {'{title}'} will be replaced.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="blog-schema" className="mb-2 block text-sm font-medium">
                      Blog Schema
                    </label>
                    <Textarea
                      id="blog-schema"
                      value={blogSchema}
                      onChange={(e) => setBlogSchema(e.target.value)}
                      rows={6}
                      className="w-full font-mono text-sm"
                      placeholder='{"@context":"https://schema.org","@type":"Blog"...}'
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="article-schema" className="mb-2 block text-sm font-medium">
                      Article Schema
                    </label>
                    <Textarea
                      id="article-schema"
                      value={articleSchema}
                      onChange={(e) => setArticleSchema(e.target.value)}
                      rows={6}
                      className="w-full font-mono text-sm"
                      placeholder='{"@context":"https://schema.org","@type":"Article"...}'
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="organization-schema" className="mb-2 block text-sm font-medium">
                      Organization Schema
                    </label>
                    <Textarea
                      id="organization-schema"
                      value={organizationSchema}
                      onChange={(e) => setOrganizationSchema(e.target.value)}
                      rows={6}
                      className="w-full font-mono text-sm"
                      placeholder='{"@context":"https://schema.org","@type":"Organization"...}'
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="canonical">
                <div className="mb-8 rounded-lg bg-card p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-medium mr-2">Canonical URL Settings</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Canonical URLs help prevent duplicate content issues.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div>
                    <label htmlFor="canonical-format" className="mb-2 block text-sm font-medium">
                      Canonical URL Format
                    </label>
                    <Input
                      id="canonical-format"
                      type="text"
                      value={canonicalFormat}
                      onChange={(e) => setCanonicalFormat(e.target.value)}
                      className="w-full"
                      placeholder="https://yourdomain.com/{slug}"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use {'{slug}'} where the page slug should appear
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="social">
                <div className="mb-8 rounded-lg bg-card p-6 shadow-sm border border-border">
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-medium mr-2">Social Sharing Defaults</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Control how your content appears when shared on social media.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    These settings control how your content appears when shared on social media platforms.
                    Individual posts can override these defaults.
                  </p>
                  
                  <div className="space-y-4">
                    <Button variant="outline">
                      Reset to Default Values
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="sticky bottom-0 bg-background pt-4 pb-6 border-t border-border mt-8">
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="default"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Saving...
                    </>
                  ) : 'Save Changes'}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SeoSettings;
