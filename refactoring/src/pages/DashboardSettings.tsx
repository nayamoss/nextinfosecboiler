
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SettingsSidebar from '@/components/SettingsSidebar';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

const DashboardSettings = () => {
  const [siteTitle, setSiteTitle] = useState('Security for the Rest of Us');
  const [metaDescription, setMetaDescription] = useState('Essential security guides and best practices for developers');
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  
  const [publisherName, setPublisherName] = useState('Security for the Rest of Us');
  const [publisherLogo, setPublisherLogo] = useState('');
  const [publisherDescription, setPublisherDescription] = useState('');
  
  const [robotsTxt, setRobotsTxt] = useState('');
  const [sitemapConfig, setSitemapConfig] = useState('');
  
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save these changes to your backend
    console.log('Settings saved');
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
              <BreadcrumbPage>Site Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Site Settings</h2>
          <p className="text-muted-foreground mb-8">Configure your site's core settings and metadata</p>
        </div>
        
        <form onSubmit={handleSaveChanges}>
          {/* General Site Settings */}
          <div className="mb-8 rounded-lg bg-card p-6 shadow-sm border border-border">
            <h3 className="mb-4 text-lg font-medium">General Information</h3>
            
            <div className="mb-4">
              <label htmlFor="site-title" className="mb-2 block text-sm font-medium">
                Site Title
              </label>
              <Input
                id="site-title"
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                The name of your site, appears in browser tabs and search results
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="meta-description" className="mb-2 block text-sm font-medium">
                Default Meta Description
              </label>
              <Textarea
                id="meta-description"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={4}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Brief description of your site. Used in search results and social shares
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="og-image" className="mb-2 block text-sm font-medium">
                Default OG Image URL
              </label>
              <Input
                id="og-image"
                type="text"
                value={ogImageUrl}
                onChange={(e) => setOgImageUrl(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Image used when your site is shared on social media
              </p>
            </div>
            
            <div>
              <label htmlFor="twitter-handle" className="mb-2 block text-sm font-medium">
                Twitter Handle
              </label>
              <Input
                id="twitter-handle"
                type="text"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Without the @ symbol (e.g. "securityblog")
              </p>
            </div>
          </div>
          
          {/* Publisher Information */}
          <div className="mb-8 rounded-lg bg-card p-6 shadow-sm border border-border">
            <h3 className="mb-4 text-lg font-medium">Publisher Information</h3>
            
            <div className="mb-4">
              <label htmlFor="publisher-name" className="mb-2 block text-sm font-medium">
                Publisher Name
              </label>
              <Input
                id="publisher-name"
                type="text"
                value={publisherName}
                onChange={(e) => setPublisherName(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                The name of the publishing organization
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="publisher-logo" className="mb-2 block text-sm font-medium">
                Publisher Logo URL
              </label>
              <Input
                id="publisher-logo"
                type="text"
                value={publisherLogo}
                onChange={(e) => setPublisherLogo(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Used in structured data for search engines (recommended size: 600x60px)
              </p>
            </div>
            
            <div>
              <label htmlFor="publisher-description" className="mb-2 block text-sm font-medium">
                Publisher Description
              </label>
              <Textarea
                id="publisher-description"
                value={publisherDescription}
                onChange={(e) => setPublisherDescription(e.target.value)}
                rows={4}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Brief description of the publishing organization
              </p>
            </div>
          </div>
          
          {/* Robots.txt Configuration */}
          <div className="mb-8 rounded-lg bg-card p-6 shadow-sm border border-border">
            <h3 className="mb-4 text-lg font-medium">Robots.txt Configuration</h3>
            
            <div>
              <label htmlFor="robots-txt" className="mb-2 block text-sm font-medium">
                Enter your robots.txt configuration
              </label>
              <Textarea
                id="robots-txt"
                value={robotsTxt}
                onChange={(e) => setRobotsTxt(e.target.value)}
                rows={6}
                className="w-full font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Control how search engines crawl your site
              </p>
            </div>
          </div>
          
          {/* Sitemap Configuration */}
          <div className="mb-8 rounded-lg bg-card p-6 shadow-sm border border-border">
            <h3 className="mb-4 text-lg font-medium">Sitemap Configuration</h3>
            
            <div>
              <label htmlFor="sitemap-config" className="mb-2 block text-sm font-medium">
                Enter your sitemap configuration in JSON format
              </label>
              <Textarea
                id="sitemap-config"
                value={sitemapConfig}
                onChange={(e) => setSitemapConfig(e.target.value)}
                rows={6}
                className="w-full font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Configure how your sitemap is generated
              </p>
            </div>
          </div>
          
          <div className="sticky bottom-0 bg-background pt-4 pb-6 border-t border-border mt-8">
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="default"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardSettings;
