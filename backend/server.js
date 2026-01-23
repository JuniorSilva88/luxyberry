require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const checkoutRoute = require("./routes/checkout");

const app = express();

const allowedOrigins = [
  "https://luxyberry.netlify.app",
  "https://luxyberry1.onrender.com",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5500",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

// API
app.use("/api/checkout", checkoutRoute);

// FRONTEND
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// SERVER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`LuxyBerry running on port ${PORT}`);
});
