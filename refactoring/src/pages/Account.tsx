
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteLayout from '@/components/SiteLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck, CreditCard, User, Calendar, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/components/ui/sonner';
import { SEO } from '@/components/SEO';

const Account = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
  const [managingSubscription, setManagingSubscription] = useState(false);

  useEffect(() => {
    // Redirect if not logged in
    if (!user && !loading) {
      navigate('/auth');
      return;
    }

    const checkSubscription = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase.functions.invoke('check-subscription');
        
        if (error) {
          console.error('Error checking subscription:', error);
          return;
        }
        
        setSubscriptionDetails(data);
      } catch (error) {
        console.error('Failed to retrieve subscription details:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [user, navigate]);

  const handleManageSubscription = async () => {
    if (!subscriptionDetails?.subscribed) {
      navigate('/pricing');
      return;
    }

    try {
      setManagingSubscription(true);
      
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        throw error;
      }
      
      // Redirect to Stripe customer portal
      window.location.href = data.url;
    } catch (error) {
      console.error('Customer portal error:', error);
      toast("Error", {
        description: "Failed to open subscription management portal. Please try again."
      });
      setManagingSubscription(false);
    }
  };

  if (!user) {
    return (
      <SiteLayout>
        <SEO 
          title="Account"
          description="Log in to view your account details"
          noIndex={true}
        />
        <div className="container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please log in to view your account</h1>
            <Button onClick={() => navigate('/auth')}>Go to Login</Button>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <SEO 
        title="Your Account"
        description="Manage your profile and subscription settings"
        noIndex={true}
      />
      <div className="container max-w-4xl py-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Your Account</h1>
          <p className="text-muted-foreground mt-2">Manage your profile and subscription</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Profile Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email Address</h3>
                  <p className="text-lg">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <CardTitle>Subscription</CardTitle>
              </div>
              {subscriptionDetails?.subscribed && (
                <CardDescription>
                  You are currently on the {subscriptionDetails.subscription_tier.charAt(0).toUpperCase() + subscriptionDetails.subscription_tier.slice(1)} plan
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                  </div>
                </div>
              ) : subscriptionDetails?.subscribed ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Plan</h3>
                      <p className="text-lg capitalize">{subscriptionDetails.subscription_tier}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Renewal Date</h3>
                      <p className="text-lg flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(subscriptionDetails.subscription_end).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Subscription Benefits</h3>
                    <ul className="space-y-2">
                      {subscriptionDetails.subscription_tier === 'professional' ? (
                        <>
                          <li className="flex items-start">
                            <ShieldCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Premium security guides</span>
                          </li>
                          <li className="flex items-start">
                            <ShieldCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Vulnerability assessment templates</span>
                          </li>
                          <li className="flex items-start">
                            <ShieldCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Priority support</span>
                          </li>
                        </>
                      ) : subscriptionDetails.subscription_tier === 'enterprise' ? (
                        <>
                          <li className="flex items-start">
                            <ShieldCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Custom security audits</span>
                          </li>
                          <li className="flex items-start">
                            <ShieldCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Dedicated security advisor</span>
                          </li>
                          <li className="flex items-start">
                            <ShieldCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Team collaboration tools</span>
                          </li>
                        </>
                      ) : (
                        <li className="text-muted-foreground">Basic plan benefits</li>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">You don't have an active subscription.</p>
                  <Button onClick={() => navigate('/pricing')}>View Pricing Plans</Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleManageSubscription}
                disabled={managingSubscription || (!subscriptionDetails?.subscribed && !loading)}
                className="flex items-center gap-2"
              >
                {managingSubscription ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                    Processing...
                  </>
                ) : subscriptionDetails?.subscribed ? (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Manage Subscription
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-4 w-4" />
                    Get a Subscription
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Account;
