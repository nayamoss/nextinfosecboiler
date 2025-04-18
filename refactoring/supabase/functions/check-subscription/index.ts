
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.0.0?dts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client - using service role key to perform writes
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Initialize Supabase client with the Auth context of the logged in user for reading user data
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the user from the request
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', details: userError?.message }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401
        }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-10-16',
    });

    // Check if user has a Stripe customer
    const customersResponse = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    if (customersResponse.data.length === 0) {
      // No customer found, user is not subscribed
      return new Response(
        JSON.stringify({ 
          subscribed: false,
          subscription_tier: null,
          subscription_end: null
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const customerId = customersResponse.data[0].id;

    // Check for active subscriptions
    const subscriptionsResponse = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      expand: ['data.items.data.price.product'],
    });

    if (subscriptionsResponse.data.length === 0) {
      // No active subscription
      return new Response(
        JSON.stringify({ 
          subscribed: false,
          subscription_tier: null,
          subscription_end: null
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get subscription details
    const subscription = subscriptionsResponse.data[0];
    const priceId = subscription.items.data[0].price.id;

    // Map price ID to subscription tier
    let subscriptionTier = 'basic';
    
    if (priceId === 'price_professional') {
      subscriptionTier = 'professional';
    } else if (priceId === 'price_enterprise') {
      subscriptionTier = 'enterprise';
    }

    // Update user roles in the database
    // First, check if the user already has a role
    const { data: existingRoles } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id);

    if (existingRoles && existingRoles.length > 0) {
      // Update the existing role
      await supabaseAdmin
        .from('user_roles')
        .update({ role: subscriptionTier })
        .eq('user_id', user.id);
    } else {
      // Insert a new role
      await supabaseAdmin
        .from('user_roles')
        .insert({ user_id: user.id, role: subscriptionTier });
    }

    return new Response(
      JSON.stringify({
        subscribed: true,
        subscription_tier: subscriptionTier,
        subscription_end: new Date(subscription.current_period_end * 1000).toISOString(),
        customer_id: customerId,
        subscription_id: subscription.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in check-subscription function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
