
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import SettingsSidebar from '@/components/SettingsSidebar';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { 
  CreditCard, 
  Mail, 
  Home, 
  Info,
  Check,
  AlertCircle,
  Brain,
  Loader2
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from '@/components/ui/sonner';
import { supabase } from "@/integrations/supabase/client";

const IntegrationsSettings = () => {
  const [stripePublishableKey, setStripePublishableKey] = useState('');
  const [resendApiKey, setResendApiKey] = useState('');
  const [replicateApiKey, setReplicateApiKey] = useState('');
  
  const [stripeEnabled, setStripeEnabled] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [replicateEnabled, setReplicateEnabled] = useState(false);
  
  const [isStripeConnected, setIsStripeConnected] = useState(false);
  const [isResendConnected, setIsResendConnected] = useState(false);
  const [isReplicateConnected, setIsReplicateConnected] = useState(false);
  
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Verify API keys on component mount
    verifyApiKeys();
  }, []);

  const verifyApiKeys = async () => {
    setIsVerifying(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-api-keys');
      
      if (error) {
        console.error('Error verifying API keys:', error);
        toast("Error", {
          description: "Failed to verify API keys",
          className: "bg-destructive text-destructive-foreground"
        });
        return;
      }

      if (data.stripe.isValid) {
        setIsStripeConnected(true);
        setStripeEnabled(true);
      }
      
      if (data.replicate.isValid) {
        setIsReplicateConnected(true);
        setReplicateEnabled(true);
      }
    } catch (err) {
      console.error('Error invoking function:', err);
      toast("Error", {
        description: "Failed to connect to API verification service",
        className: "bg-destructive text-destructive-foreground"
      });
    } finally {
      setIsVerifying(false);
    }
  };
  
  const handleSaveStripe = () => {
    if (!stripePublishableKey) {
      toast("Error", {
        description: "Stripe publishable key is required",
        // Using the correct property for error styling in sonner
        className: "bg-destructive text-destructive-foreground"
      });
      return;
    }
    
    // In a real app, you would validate and save this to your backend/Supabase
    setIsStripeConnected(true);
    setStripeEnabled(true);
    toast("Success", {
      description: "Stripe integration saved successfully",
    });
  };
  
  const handleSaveResend = () => {
    if (!resendApiKey) {
      toast("Error", {
        description: "Resend API key is required",
        // Using the correct property for error styling in sonner
        className: "bg-destructive text-destructive-foreground"
      });
      return;
    }
    
    // In a real app, you would validate and save this to your backend/Supabase
    setIsResendConnected(true);
    setResendEnabled(true);
    toast("Success", {
      description: "Resend integration saved successfully",
    });
  };

  const handleSaveReplicate = () => {
    if (!replicateApiKey) {
      toast("Error", {
        description: "Replicate API key is required",
        className: "bg-destructive text-destructive-foreground"
      });
      return;
    }
    
    // In a real app, you would validate and save this to your backend/Supabase
    setIsReplicateConnected(true);
    setReplicateEnabled(true);
    toast("Success", {
      description: "Replicate AI integration saved successfully",
    });
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
              <BreadcrumbPage>Integrations</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Integrations</h2>
          <p className="text-muted-foreground mb-8">Connect third-party services to enhance your site's functionality</p>
        </div>
        
        {isVerifying && (
          <div className="mb-6 flex items-center space-x-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Verifying API connections...</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stripe Integration */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <CardTitle>Stripe</CardTitle>
              </div>
              {isStripeConnected && <Check className="h-5 w-5 text-green-500" />}
            </CardHeader>
            <CardDescription className="px-6">
              Accept payments and manage subscriptions
            </CardDescription>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="stripe-key" className="text-sm font-medium">
                    Publishable Key
                  </label>
                  <Input
                    id="stripe-key"
                    type="text"
                    value={stripePublishableKey}
                    onChange={(e) => setStripePublishableKey(e.target.value)}
                    className="w-full"
                    placeholder="pk_test_..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Your Stripe publishable key from the Stripe dashboard
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Enabled</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Enable or disable Stripe functionality on your site
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Switch
                    checked={stripeEnabled}
                    onCheckedChange={setStripeEnabled}
                    disabled={!isStripeConnected}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSaveStripe}
                className="w-full"
              >
                Save Stripe Settings
              </Button>
            </CardFooter>
          </Card>
          
          {/* Resend Integration */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle>Resend</CardTitle>
              </div>
              {isResendConnected && <Check className="h-5 w-5 text-green-500" />}
            </CardHeader>
            <CardDescription className="px-6">
              Send transactional emails and newsletters
            </CardDescription>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="resend-key" className="text-sm font-medium">
                    API Key
                  </label>
                  <Input
                    id="resend-key"
                    type="password"
                    value={resendApiKey}
                    onChange={(e) => setResendApiKey(e.target.value)}
                    className="w-full"
                    placeholder="re_..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Your Resend API key from the Resend dashboard
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Enabled</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Enable or disable Resend email functionality
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Switch
                    checked={resendEnabled}
                    onCheckedChange={setResendEnabled}
                    disabled={!isResendConnected}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSaveResend}
                className="w-full"
              >
                Save Resend Settings
              </Button>
            </CardFooter>
          </Card>

          {/* Replicate AI Integration */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-primary" />
                <CardTitle>Replicate AI</CardTitle>
              </div>
              {isReplicateConnected && <Check className="h-5 w-5 text-green-500" />}
            </CardHeader>
            <CardDescription className="px-6">
              Use AI models for content generation and image processing
            </CardDescription>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="replicate-key" className="text-sm font-medium">
                    API Key
                  </label>
                  <Input
                    id="replicate-key"
                    type="password"
                    value={replicateApiKey}
                    onChange={(e) => setReplicateApiKey(e.target.value)}
                    className="w-full"
                    placeholder="r8_..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Your Replicate API key from the Replicate dashboard
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Enabled</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Enable or disable Replicate AI functionality
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Switch
                    checked={replicateEnabled}
                    onCheckedChange={setReplicateEnabled}
                    disabled={!isReplicateConnected}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSaveReplicate}
                className="w-full"
              >
                Save Replicate Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-8 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Important Note</h3>
              <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                These integrations use Supabase Edge Functions to securely connect to third-party services.
                The secret keys are stored in your Supabase Edge Function secrets and are not exposed to the client.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSettings;
