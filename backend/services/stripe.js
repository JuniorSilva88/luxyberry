const Stripe = require("stripe");

console.log("STRIPE_SECRET_KEY loaded:", process.env.STRIPE_SECRET_KEY?.slice(0, 12));

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("WARNING: STRIPE_SECRET_KEY is not set.");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;
