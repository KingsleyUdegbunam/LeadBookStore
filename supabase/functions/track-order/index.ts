import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_SECRET_KEYS = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")!);

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  SUPABASE_SECRET_KEYS["default"],
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return Response.json({ message: "OK" }, { headers: corsHeaders });
  }

  const { reference, email } = await req.json();

  if (!reference || !email) {
    return Response.json(
      {
        error: "Order reference and email is required",
      },
      { status: 400, headers: corsHeaders },
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedRef = reference.trim();

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("reference", normalizedRef)
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }

  if (!order) {
    return Response.json(
      {
        error: "We couldn't find that order.",
      },
      { status: 404, headers: corsHeaders },
    );
  }

  return Response.json(order, { headers: corsHeaders });
});
