
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@1.0.0";
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
    const { email, name } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: email' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'RESEND_API_KEY is not set in environment variables' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

    // Initialize Supabase client with service role key to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Save subscriber to database
    const { data: subscriber, error: dbError } = await supabaseAdmin
      .from('subscribers')
      .upsert({
        email,
        name: name || null,
        subscribed_at: new Date().toISOString(),
        status: 'active',
        source: 'website'
      }, {
        onConflict: 'email',
        returning: 'minimal'
      });

    if (dbError) {
      console.error('Error saving subscriber to database:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save subscriber information' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    // Send welcome email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Security Newsletter <newsletter@securityfortherestofus.com>',
      to: [email],
      subject: 'Welcome to Security for the Rest of Us Newsletter',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; margin-top: 30px;">Welcome, ${name || 'Subscriber'}!</h1>
          <p style="font-size: 16px; line-height: 1.5; color: #444;">
            Thank you for subscribing to our Security for the Rest of Us newsletter.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #444;">
            You'll now receive regular updates with the latest security insights, best practices, 
            and tips to keep you and your organization safe online.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #444; margin-top: 30px;">
            If you have any questions or feedback, feel free to reply to this email.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #444;">
            Best regards,<br>
            The Security for the Rest of Us Team
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error('Error sending welcome email:', emailError);
      return new Response(
        JSON.stringify({ error: 'Failed to send welcome email' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        email: emailData 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in newsletter-subscribe function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An unknown error occurred' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
