const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const CASHFREE_APP_ID = "124826716f628950481443ae1857628421";
const CASHFREE_SECRET_KEY = Deno.env.get("RAZORPAY_KEY_SECRET")!;
const CASHFREE_API_URL = "https://api.cashfree.com/pg";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { action } = body;

    if (action === "create_order") {
      const { amount, customer_name, customer_email, customer_phone } = body;

      if (!amount || amount < 1) {
        return new Response(JSON.stringify({ error: "Invalid amount" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const orderId = `cv_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

      const res = await fetch(`${CASHFREE_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": CASHFREE_APP_ID,
          "x-client-secret": CASHFREE_SECRET_KEY,
          "x-api-version": "2023-08-01",
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: amount,
          order_currency: "INR",
          customer_details: {
            customer_id: `cust_${Date.now()}`,
            customer_name: customer_name || "Customer",
            customer_email: customer_email || "customer@example.com",
            customer_phone: customer_phone || "9999999999",
          },
          order_meta: {
            return_url: `${req.headers.get("origin") || "https://cvdotcom.lovable.app"}/builder?order_id={order_id}`,
          },
        }),
      });

      const order = await res.json();

      if (!res.ok) {
        console.error("Cashfree order error:", JSON.stringify(order));
        return new Response(JSON.stringify({ error: order.message || "Order creation failed" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({
        order_id: order.order_id,
        payment_session_id: order.payment_session_id,
        order_status: order.order_status,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "verify_payment") {
      const { order_id } = body;

      if (!order_id) {
        return new Response(JSON.stringify({ error: "Missing order_id" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const res = await fetch(`${CASHFREE_API_URL}/orders/${order_id}`, {
        method: "GET",
        headers: {
          "x-client-id": CASHFREE_APP_ID,
          "x-client-secret": CASHFREE_SECRET_KEY,
          "x-api-version": "2023-08-01",
        },
      });

      const order = await res.json();

      if (order.order_status === "PAID") {
        return new Response(JSON.stringify({ verified: true, order_status: order.order_status }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else {
        return new Response(JSON.stringify({ verified: false, order_status: order.order_status }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
