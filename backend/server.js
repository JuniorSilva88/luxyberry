require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const checkoutRoute = require("./routes/checkout");

const app = express();

/**
 * CORS (aplicado SOMENTE nas rotas /api)
 * - Evita quebrar o carregamento do frontend no Render
 * - Mantém Netlify -> Render e Local -> Local funcionando
 */
const allowedOrigins = [
  "https://luxyberry.netlify.app",
  "https://luxyberry1.onrender.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Algumas requisições (ex.: navegação direta, curl) não enviam Origin
    if (!origin) return callback(null, true);

    // Permite variações do Render (útil em previews/testes)
    if (origin.endsWith(".onrender.com")) return callback(null, true);

    if (allowedOrigins.includes(origin)) return callback(null, true);

    console.log("CORS blocked origin:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

// Preflight APENAS para /api
app.options("/api/*", cors(corsOptions));

// Middlewares
app.use(express.json());

// CORS apenas na API
app.use("/api", cors(corsOptions));

// API
app.use("/api/checkout", checkoutRoute);

// (Opcional) servir frontend só se você quiser (Render single-service)
if (process.env.SERVE_FRONTEND === "true") {
  const frontendPath = path.join(__dirname, "../frontend");
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`LuxyBerry running on port ${PORT}`));