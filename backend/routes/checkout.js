const express = require("express");
const router = express.Router();
const stripe = require("../services/stripe");

router.post("/", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: "Items missing" });
    }

    const line_items = items.map(item => ({
      price_data: {
        currency: "aud",
        product_data: {
          name: item.name,
          description: item.description || ""
        },
        unit_amount: item.unit_amount
      },
      quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "https://luxyberry1.onrender.com/#success",
      cancel_url: "https://luxyberry1.onrender.com/#build"
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Stripe checkout failed" });
  }
});

module.exports = router;
