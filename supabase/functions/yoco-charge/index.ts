import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Setup CORS so your React frontend can talk to this function
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amountInCents, currency, origin, metadata } = await req.json()

    // Grab the secret key from Supabase's secure vault (we will set this in Step 2)
    const YOCO_SECRET_KEY = Deno.env.get('YOCO_SECRET_KEY')

    if (!YOCO_SECRET_KEY) {
      throw new Error("Yoco Secret Key is missing from the server.")
    }

    // Call the Yoco API to create a Checkout Session
    const yocoResponse = await fetch('https://payments.yoco.com/api/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${YOCO_SECRET_KEY}`
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency: currency || 'ZAR',
        // Where Yoco sends the user after paying or cancelling
        successUrl: `${origin}/?payment=success`,
        cancelUrl: `${origin}/checkout?payment=cancelled`,
        metadata: metadata
      })
    })

    const yocoData = await yocoResponse.json()

    if (!yocoResponse.ok) {
      console.error("Yoco Error:", yocoData)
      throw new Error(yocoData.message || "Failed to initialize Yoco checkout")
    }

    // Return the secure checkout URL back to your React app
    return new Response(
      JSON.stringify({ redirectUrl: yocoData.redirectUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})