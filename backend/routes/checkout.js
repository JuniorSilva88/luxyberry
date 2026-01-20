const express = require("express");
const router = express.Router();
const stripe = require("../services/stripe");

router.post("/", async (req, res) => {
  try {
    const { cart } = req.body;

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart empty" });
    }

    const FRONTEND_URL = process.env.FRONTEND_URL || "https://luxyberry1.onrender.com";

    // Monta line_items com descrição rica + frete separado
    const line_items = [];

    for (const item of cart) {
      const size = String(item.size || "box").toUpperCase();
      const chocolate = item.chocolate ? String(item.chocolate) : "Not informed";
      const toppings = Array.isArray(item.toppings) && item.toppings.length ? item.toppings.join(", ") : "None";
      const deliveryDate = item.deliveryDate ? String(item.deliveryDate) : "Not informed";
      const regionLabel = item.regionLabel ? String(item.regionLabel) : (item.region ? String(item.region) : "Not informed");
      const notes = item.notes ? String(item.notes) : "";

      // Preferimos trabalhar com pricePer (unitário) e quantity (quantidade real).
      // Se não existir, caímos para total/quantity.
      const quantity = Math.max(1, Number(item.quantity || 1));

      // item.pricePer deve ser número (AUD). Se não tiver, tentamos derivar.
      let unitPrice = Number(item.pricePer);
      if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
        const total = Number(item.total);
        unitPrice = Number.isFinite(total) && total > 0 ? total / quantity : 0;
      }

      if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
        return res.status(400).json({ error: "Invalid item pricing" });
      }

      const descriptionParts = [
        `Chocolate: ${chocolate}`,
        `Toppings: ${toppings}`,
        `Delivery date: ${deliveryDate}`,
        `Region: ${regionLabel}`,
      ];

      if (notes) descriptionParts.push(`Notes: ${notes}`);

      line_items.push({
        price_data: {
          currency: "aud",
          product_data: {
            name: `LuxyBerry — ${size} Box`,
            description: descriptionParts.join(" | ").slice(0, 500) // Stripe limita tamanho; 500 é seguro
          },
          unit_amount: Math.round(unitPrice * 100)
        },
        quantity
      });

      // Frete separado (se existir)
      const deliveryFee = Number(item.deliveryFee || 0);
      if (Number.isFinite(deliveryFee) && deliveryFee > 0) {
        line_items.push({
          price_data: {
            currency: "aud",
            product_data: {
              name: "Delivery fee",
              description: `Delivery to: ${regionLabel}`
            },
            unit_amount: Math.round(deliveryFee * 100)
          },
          quantity: 1
        });
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"], // Apple Pay entra automaticamente quando disponível no Stripe
      line_items,
      success_url: `${FRONTEND_URL}/#success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/#build`
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    res.status(500).json({ error: "Stripe error" });
  }
});

module.exports = router;
