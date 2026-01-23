const express = require("express");
const router = express.Router();
const stripe = require("../services/stripe");

function getBaseUrl(req) {
  const origin = req.headers.origin;
  const referer = req.headers.referer;

  // Prioriza Origin (mais confiável), cai para Referer se necessário
  if (origin) return origin;

  if (referer) {
    try {
      return new URL(referer).origin;
    } catch (e) {
      // ignore
    }
  }

  // Fallback para não quebrar em chamadas sem origin/referer
  return process.env.DEFAULT_FRONTEND_URL || "http://localhost:5500";
}

router.post("/", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items missing" });
    }

    const baseUrl = getBaseUrl(req);

    const line_items = items.map((item) => {
      // Stripe exige unit_amount em inteiro (centavos)
      const unitAmount = Number(item.unit_amount);

      if (!Number.isInteger(unitAmount) || unitAmount <= 0) {
        throw new Error("Invalid unit_amount: must be an integer in cents");
      }

      return {
        price_data: {
          currency: "brl", // troque para "aud" se for realmente Austrália agora
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

    // Retorna a mensagem real do Stripe (em DEV/TEST isso é essencial)
    return res.status(500).json({
      error: err?.message || "Stripe checkout failed",
      type: err?.type,
      code: err?.code,
    });
  }
});

module.exports = router;
