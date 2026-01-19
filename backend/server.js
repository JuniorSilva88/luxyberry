require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const checkoutRoute = require("./routes/checkout");

const app = express();

app.use(cors());
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
