
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

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
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Verify Stripe API key
    const stripeStatus = await verifyStripeKey(Deno.env.get('STRIPE_SECRET_KEY') ?? '');
    
    // Verify Replicate API key
    const replicateStatus = await verifyReplicateKey(Deno.env.get('REPLICATE_API_KEY') ?? '');

    return new Response(
      JSON.stringify({
        stripe: {
          isValid: stripeStatus.isValid,
          message: stripeStatus.message
        },
        replicate: {
          isValid: replicateStatus.isValid,
          message: replicateStatus.message
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in verify-api-keys:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

async function verifyStripeKey(apiKey: string): Promise<{isValid: boolean, message: string}> {
  if (!apiKey) return { isValid: false, message: 'No API key provided' };
  
  try {
    // Make a simple request to Stripe API to verify the key
    const response = await fetch('https://api.stripe.com/v1/account', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return { 
        isValid: true, 
        message: `Connected to Stripe account: ${data.display_name || data.id}`
      };
    } else {
      const error = await response.json();
      return { 
        isValid: false, 
        message: error.error?.message || 'Invalid API key'
      };
    }
  } catch (error) {
    console.error('Error verifying Stripe key:', error);
    return { isValid: false, message: 'Failed to verify key' };
  }
}

async function verifyReplicateKey(apiKey: string): Promise<{isValid: boolean, message: string}> {
  if (!apiKey) return { isValid: false, message: 'No API key provided' };
  
  try {
    // Make a simple request to Replicate API to verify the key
    const response = await fetch('https://api.replicate.com/v1/collections', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      return { 
        isValid: true, 
        message: 'Connected to Replicate successfully'
      };
    } else {
      const error = await response.json();
      return { 
        isValid: false, 
        message: error.detail || 'Invalid API key'
      };
    }
  } catch (error) {
    console.error('Error verifying Replicate key:', error);
    return { isValid: false, message: 'Failed to verify key' };
  }
}
