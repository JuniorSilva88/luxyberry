const express = require("express");
const router = express.Router();
const stripe = require("../services/stripe");

router.post("/", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items missing" });
    }

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
      payment_method_types: ["card"],
      mode: "payment",
      line_items: line_items,

      success_url:
        "https://luxyberry.com.au/success.html?session_id={CHECKOUT_SESSION_ID}",

      cancel_url:
        "https://luxyberry.com.au/cancel.html",
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
