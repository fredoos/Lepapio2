import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { settings } = await req.json();

    if (!settings || !settings.opening_hours) {
      return new Response(
        JSON.stringify({ error: "Missing opening_hours in request" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Mettre à jour les horaires d'ouverture
    const { error: hoursError } = await supabase
      .from("settings")
      .upsert(
        {
          key: "opening_hours",
          value: settings.opening_hours,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "key",
        }
      );

    if (hoursError) {
      console.error("Error updating opening hours:", hoursError);
      return new Response(
        JSON.stringify({ error: hoursError.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Mettre à jour le logo si fourni
    if (settings.logo_url) {
      const { error: logoError } = await supabase
        .from("settings")
        .upsert(
          {
            key: "logo_url",
            value: settings.logo_url,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "key",
          }
        );

      if (logoError) {
        console.error("Error updating logo:", logoError);
      }
    }

    // Mettre à jour la note de fermeture si fournie
    if (settings.closure_note) {
      const { error: closureError } = await supabase
        .from("settings")
        .upsert(
          {
            key: "closure_note",
            value: settings.closure_note,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "key",
          }
        );

      if (closureError) {
        console.error("Error updating closure note:", closureError);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Settings synchronized" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in sync-settings:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});