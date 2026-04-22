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
    console.log("🌐 Origin:", origin);

    // Permite chamadas sem origin (Stripe, curl, etc)
    if (!origin) return callback(null, true);

    // Permite Vercel
    if (origin.endsWith(".vercel.app")) return callback(null, true);

    // Permite seu domínio oficial
    if (origin === "https://luxyberry.com.au") return callback(null, true);
    if (origin === "https://www.luxyberry.com.au") return callback(null, true);

    // Permite localhost QUALQUER PORTA (IMPORTANTE)
    if (origin.startsWith("http://localhost")) return callback(null, true);
    if (origin.startsWith("http://127.0.0.1")) return callback(null, true);

    console.warn("❌ CORS blocked:", origin);

    return callback(null, false);
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
app.use(cors(corsOptions));

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
