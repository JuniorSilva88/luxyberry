const express = require("express");
const router = express.Router();
const stripe = require("../services/stripe");

router.post("/", async (req, res) => {
  console.log("🧾 REQUEST:", JSON.stringify(req.body, null, 2));

  try {
    const { items, customerName } = req.body;

    /* ===============================
       VALIDAÇÕES INICIAIS
    =============================== */

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items missing or invalid" });
    }

    if (!customerName || typeof customerName !== "string") {
      return res.status(400).json({ error: "Customer name missing or invalid" });
    }

    /* ===============================
       NORMALIZAÇÃO DOS ITENS
    =============================== */

    const line_items = items
      .map((item, index) => {
        try {
          if (!item) {
            console.error(`❌ Item ${index} is null/undefined`);
            return null;
          }

          const rawValue = Number(item.unit_amount);

          if (!rawValue || isNaN(rawValue) || rawValue <= 0) {
            console.error(`❌ Invalid unit_amount on item ${index}:`, item.unit_amount);
            return null;
          }

          const unitAmount = Math.round(rawValue * 100);

          if (!Number.isInteger(unitAmount) || unitAmount <= 0) {
            console.error(`❌ unit_amount conversion failed on item ${index}`);
            return null;
          }

          return {
            price_data: {
              currency: "aud",
              product_data: {
                name: item.name || `Produto ${index + 1}`,
                description: item.description || "",
              },
              unit_amount: unitAmount,
            },
            quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
          };
        } catch (err) {
          console.error(`❌ Error processing item ${index}:`, err);
          return null;
        }
      })
      .filter(Boolean);

    /* ===============================
       GARANTIA DE ITENS VÁLIDOS
    =============================== */

    if (line_items.length === 0) {
      return res.status(400).json({
        error: "No valid items to process",
      });
    }

    /* ===============================
       STRIPE SESSION
    =============================== */

    const encodedName = encodeURIComponent(customerName);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,

      success_url: `https://luxyberry.com.au/success.html?session_id={CHECKOUT_SESSION_ID}&name=${encodedName}`,
      cancel_url: "https://luxyberry.com.au/cancel.html",
    });

    return res.json({ url: session.url });

  } catch (err) {
    console.error("💥 STRIPE ERROR FULL:", err);

    return res.status(500).json({
      error: err?.message || "Stripe checkout failed",
      type: err?.type,
      code: err?.code,
    });
  }
});

module.exports = router;