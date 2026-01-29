require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const checkoutRoute = require("./routes/checkout");

const app = express();

/* =========================================================
   CORS CONFIG — API ONLY (Render backend)
   ========================================================= */

const allowedOrigins = [
  // Produção
  "https://luxyberry.com.au",
  "https://www.luxyberry.com.au",

  // Vercel
  "https://luxyberry.vercel.app",

  // Netlify
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
    // Permite requisições sem origin (curl, healthcheck, etc)
    if (!origin) return callback(null, true);

    // Permite previews da Vercel
    if (origin.endsWith(".vercel.app")) return callback(null, true);

    // Permite Render
    if (origin.endsWith(".onrender.com")) return callback(null, true);

    if (allowedOrigins.includes(origin)) return callback(null, true);

    console.log("❌ CORS blocked origin:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

/* =========================================================
   MIDDLEWARES
   ========================================================= */

// Preflight GLOBAL (ESSENCIAL para CORS funcionar)
app.options("*", cors(corsOptions));

// Body parser
app.use(express.json());

// CORS aplicado SOMENTE na API
app.use("/api", cors(corsOptions));

/* =========================================================
   API ROUTES
   ========================================================= */

app.use("/api/checkout", checkoutRoute);

/* =========================================================
   OPTIONAL — SERVE FRONTEND (apenas se quiser)
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
