require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const checkoutRoute = require("./routes/checkout");

const app = express();

/* =========================================================
   ENV VALIDATION (FAIL FAST)
   ========================================================= */

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY is missing");
  process.exit(1);
}

/* =========================================================
   CORS CONFIG — API ONLY
   ========================================================= */

const allowedOrigins = [
  // Production
  "https://luxyberry.com.au",
  "https://www.luxyberry.com.au",

  // Vercel
  "https://luxyberry.vercel.app",

  // Netlify (legacy / preview)
  "https://luxyberry.netlify.app",

  // Render
  "https://luxyberry1.onrender.com",

  // Local dev
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow server-to-server, healthchecks, curl, Stripe webhooks
    if (!origin) return callback(null, true);

    // Allow preview deployments
    if (origin.endsWith(".vercel.app")) return callback(null, true);
    if (origin.endsWith(".onrender.com")) return callback(null, true);

    if (allowedOrigins.includes(origin)) return callback(null, true);

    if (process.env.NODE_ENV !== "production") {
      console.log("❌ CORS blocked origin:", origin);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

/* =========================================================
   MIDDLEWARES
   ========================================================= */

// Preflight (ESSENTIAL for CORS)
app.options("*", cors(corsOptions));

// Body parser
app.use(express.json());

// CORS applied ONLY to API
app.use("/api", cors(corsOptions));

/* =========================================================
   API ROUTES
   ========================================================= */

app.use("/api/checkout", checkoutRoute);

/* =========================================================
   OPTIONAL — SERVE FRONTEND
   ========================================================= */

if (process.env.SERVE_FRONTEND === "true") {
  const frontendPath = path.join(__dirname, "../frontend");

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

/* =========================================================
   SERVER
   ========================================================= */

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`✅ LuxyBerry API running on port ${PORT}`);
});
