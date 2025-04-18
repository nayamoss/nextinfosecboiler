
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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

const AdvancedSettings = () => {
  const [gaTrackingId, setGaTrackingId] = useState('');
  const [mailchimpApiKey, setMailchimpApiKey] = useState('');
  const [mailchimpListId, setMailchimpListId] = useState('');
  
  const [globalDisclaimer, setGlobalDisclaimer] = useState('');
  const [cookieNotice, setCookieNotice] = useState('');
  
  const [lazyLoadImages, setLazyLoadImages] = useState(true);
  const [minifyHtml, setMinifyHtml] = useState(true);
  const [cacheControl, setCacheControl] = useState(true);
  
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save these changes to your backend
    console.log('Advanced Settings saved');
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
              <BreadcrumbPage>Advanced Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Advanced Settings</h2>
          <p className="text-muted-foreground mb-8">Configure integrations and performance settings</p>
        </div>
        
        <form onSubmit={handleSaveChanges}>
          {/* API Integrations */}
          <div className="mb-8 rounded-lg bg-card p-6 shadow-sm border border-border">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-medium mr-2">API Integrations</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Connect your site with third-party services.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="mb-4">
              <label htmlFor="ga-tracking" className="mb-2 block text-sm font-medium">
                Google Analytics Tracking ID
              </label>
              <Input
                id="ga-tracking"
                type="text"
                value={gaTrackingId}
                onChange={(e) => setGaTrackingId(e.target.value)}
                className="w-full"
                placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Your Google Analytics tracking ID (UA-XXXXXXXXX-X or G-XXXXXXXXXX)
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="mailchimp-api" className="mb-2 block text-sm font-medium">
                Mailchimp API Key
              </label>
              <Input
                id="mailchimp-api"
                type="password"
                value={mailchimpApiKey}
                onChange={(e) => setMailchimpApiKey(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Your Mailchimp API key for newsletter integration
              </p>
            </div>
            
            <div>
              <label htmlFor="mailchimp-list" className="mb-2 block text-sm font-medium">
                Mailchimp List ID
              </label>
              <Input
                id="mailchimp-list"
                type="text"
                value={mailchimpListId}
                onChange={(e) => setMailchimpListId(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                The Mailchimp list ID for subscriber management
              </p>
            </div>
          </div>
          
          {/* Custom Global Fields */}
          <div className="mb-8 rounded-lg bg-card p-6 shadow-sm border border-border">
            <h3 className="mb-4 text-lg font-medium">Custom Global Fields</h3>
            
            <div className="mb-4">
              <label htmlFor="global-disclaimer" className="mb-2 block text-sm font-medium">
                Global Disclaimer
              </label>
              <Textarea
                id="global-disclaimer"
                value={globalDisclaimer}
                onChange={(e) => setGlobalDisclaimer(e.target.value)}
                rows={4}
                className="w-full"
                placeholder="This site contains security information..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                A disclaimer that will appear on all pages of your site
              </p>
            </div>
            
            <div>
              <label htmlFor="cookie-notice" className="mb-2 block text-sm font-medium">
                Cookie Notice Text
              </label>
              <Textarea
                id="cookie-notice"
                value={cookieNotice}
                onChange={(e) => setCookieNotice(e.target.value)}
                rows={4}
                className="w-full"
                placeholder="This site uses cookies to enhance your experience..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                Text for your cookie consent notice
              </p>
            </div>
          </div>
          
          {/* Performance Options */}
          <div className="mb-8 rounded-lg bg-card p-6 shadow-sm border border-border">
            <h3 className="mb-4 text-lg font-medium">Performance Options</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="lazy-load" className="text-sm font-medium">
                    Lazy Load Images
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Load images only when they enter the viewport
                  </p>
                </div>
                <Switch
                  id="lazy-load"
                  checked={lazyLoadImages}
                  onCheckedChange={setLazyLoadImages}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="minify-html" className="text-sm font-medium">
                    Minify HTML
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Remove whitespace and comments from HTML
                  </p>
                </div>
                <Switch
                  id="minify-html"
                  checked={minifyHtml}
                  onCheckedChange={setMinifyHtml}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="cache-control" className="text-sm font-medium">
                    Enable Cache Control
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Add cache control headers to improve performance
                  </p>
                </div>
                <Switch
                  id="cache-control"
                  checked={cacheControl}
                  onCheckedChange={setCacheControl}
                />
              </div>
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

export default AdvancedSettings;
