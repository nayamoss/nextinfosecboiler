
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Lock, CreditCard } from 'lucide-react';
import SiteLayout from '@/components/SiteLayout';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { SEO } from '@/components/SEO';

type PricingTier = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  button: string;
  recommended?: boolean;
};

const pricingPlans: PricingTier[] = [
  {
    id: 'free',
    name: 'Basic',
    price: 0,
    description: 'Free access to essential security guides',
    features: [
      'Access to basic security guides',
      'Monthly newsletter',
      'Community forum access'
    ],
    button: 'Get Started'
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 19,
    description: 'Premium security guidance for professionals',
    features: [
      'All Basic features',
      'Premium security guides',
      'Vulnerability assessment templates',
      'Priority support'
    ],
    button: 'Subscribe',
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49,
    description: 'Advanced security solutions for teams',
    features: [
      'All Professional features',
      'Custom security audits',
      'Dedicated security advisor',
      'Team collaboration tools'
    ],
    button: 'Subscribe'
  }
];

const Pricing = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [subscriptionStatus, setSubscriptionStatus] = useState<any>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [managingSubscription, setManagingSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) {
        setCheckingStatus(false);
        return;
      }
      
      try {
        const { data, error } = await supabase.functions.invoke('check-subscription');
        
        if (error) {
          console.error('Error checking subscription:', error);
          return;
        }
        
        setSubscriptionStatus(data);
      } catch (error) {
        console.error('Failed to retrieve subscription status:', error);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkSubscription();
  }, [user]);

  const handleCheckout = async (tier: PricingTier) => {
    if (tier.price === 0) {
      // Free tier doesn't need checkout
      toast("Free Plan Selected", { 
        description: "You're already on the free plan. No payment needed!" 
      });
      return;
    }

    // Check if user is logged in
    if (!user) {
      toast("Login Required", { 
        description: "Please log in to subscribe to a plan." 
      });
      return;
    }

    // Set loading state for this button
    setLoading({ ...loading, [tier.id]: true });
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { price_id: tier.id }
      });
      
      if (error) {
        throw error;
      }
      
      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast("Error", { 
        description: "Failed to start checkout process. Please try again." 
      });
      setLoading({ ...loading, [tier.id]: false });
    }
  };

  const handleManageSubscription = async () => {
    setManagingSubscription(true);
    
    try {
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

  const isCurrentPlan = (planId: string) => {
    return subscriptionStatus?.subscribed && subscriptionStatus.subscription_tier === planId;
  };

  return (
    <SiteLayout>
      <SEO 
        title="Pricing Plans"
        description="Choose the right security plan for your needs"
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Security for the Rest of Us",
          "description": "Premium security guides and resources",
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": "0",
            "highPrice": "49",
            "offerCount": "3"
          }
        }}
      />
      <div className="container py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Transparent Pricing</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Choose the plan that best fits your security needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card key={plan.id} className={`flex flex-col ${plan.recommended ? 'border-primary shadow-md' : ''}`}>
              <CardHeader>
                {plan.recommended && (
                  <Badge className="w-fit mb-2" variant="outline">
                    Recommended
                  </Badge>
                )}
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <CardDescription className="min-h-[50px]">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isCurrentPlan(plan.id) ? (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    disabled
                  >
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant={plan.recommended ? "default" : "outline"}
                    onClick={() => handleCheckout(plan)}
                    disabled={loading[plan.id] || checkingStatus}
                  >
                    {loading[plan.id] ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      plan.button
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {subscriptionStatus?.subscribed && (
          <div className="mt-12 text-center">
            <p className="mb-4 font-medium">Need to manage your subscription?</p>
            <Button 
              variant="outline" 
              onClick={handleManageSubscription}
              disabled={managingSubscription}
              className="mx-auto flex items-center"
            >
              {managingSubscription ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Subscription
                </>
              )}
            </Button>
          </div>
        )}

        <div className="mt-16 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="divide-y divide-border">
            <div className="py-4">
              <h3 className="font-medium mb-2">Can I upgrade my plan later?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of the next billing cycle.</p>
            </div>
            <div className="py-4">
              <h3 className="font-medium mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">We offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.</p>
            </div>
            <div className="py-4">
              <h3 className="font-medium mb-2">Are there any long-term contracts?</h3>
              <p className="text-muted-foreground">No, all plans are month-to-month. You can cancel at any time without penalties.</p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Pricing;
