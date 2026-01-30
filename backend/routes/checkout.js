const express = require("express");
const router = express.Router();
const stripe = require("../services/stripe");

function getBaseUrl(req) {
  const origin = req.headers.origin;
  const referer = req.headers.referer;

  // Prefer Origin (most reliable)
  if (origin) return origin;

  // Fallback to Referer
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch (e) {
      // ignore
    }
  }

  // Last fallback (env-based)
  return process.env.FRONTEND_URL || "http://localhost:3000";
}

router.post("/", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items missing" });
    }

    const baseUrl = getBaseUrl(req);

    const line_items = items.map((item) => {
      const unitAmount = Number(item.unit_amount);

      if (!Number.isInteger(unitAmount) || unitAmount <= 0) {
        throw new Error("Invalid unit_amount: must be an integer in cents");
      }

      return {
        price_data: {
          currency: "aud",
          product_data: {
            name: item.name,
            description: item.description || "",
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${baseUrl}/#success`,
      cancel_url: `${baseUrl}/#build`,
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);

    return res.status(500).json({
      error: err?.message || "Stripe checkout failed",
      type: err?.type,
      code: err?.code,
    });
  }
});

module.exports = router;
