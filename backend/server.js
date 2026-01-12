require("dotenv").config();
const express = require("express");
const cors = require("cors");

const checkoutRoute = require("./routes/checkout");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/checkout", checkoutRoute);

const PORT = 4242;
app.listen(PORT, () =>
  console.log(`Stripe backend running on port ${PORT}`)
);
