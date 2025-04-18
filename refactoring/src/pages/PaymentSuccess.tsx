
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SiteLayout from '@/components/SiteLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';

const PaymentSuccess = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);

  useEffect(() => {
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
  }, [user]);

  // Extract session ID from URL if needed
  const sessionId = new URLSearchParams(search).get('session_id');

  return (
    <SiteLayout>
      <div className="container max-w-5xl py-16 md:py-24">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="text-center border-b pb-6">
            <div className="mx-auto mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl">Payment Successful!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for your subscription
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            {loading ? (
              <div className="py-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
                <p className="mt-2 text-muted-foreground">Loading your subscription details...</p>
              </div>
            ) : subscriptionDetails ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-muted-foreground">Subscription Plan</h3>
                  <p className="text-xl font-semibold capitalize">{subscriptionDetails.subscription_tier}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground">Current Period Ends</h3>
                  <p className="text-lg">{new Date(subscriptionDetails.subscription_end).toLocaleDateString()}</p>
                </div>
                
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="font-medium mb-2">What's Next?</h3>
                  <p className="text-muted-foreground">
                    You now have access to all {subscriptionDetails.subscription_tier} features. Your subscription will automatically renew at the end of the billing period.
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No subscription details found. If you just subscribed, it may take a moment to process.</p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between flex-col sm:flex-row gap-4">
            <Button variant="outline" onClick={() => navigate('/pricing')}>
              View Plans
            </Button>
            <Button onClick={() => navigate('/dashboard')} className="flex items-center gap-2">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </SiteLayout>
  );
};

export default PaymentSuccess;
