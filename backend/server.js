require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Quote = require("./models/Quote");
const Meeting = require("./models/Meeting");

const app = express();

app.use(cors());
// This lets us read JSON from the body of a request
app.use(express.json());
const MONGO_URI =
  process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// TEST ROUTE: just to confirm server is alive
app.get("/", (req, res) => {
  res.send("✅ DoDigital backend is running");
});

// NEW: Quote route
app.post("/api/quotes", async (req, res) => {
  const { businessType, services, websiteTier, deliveryPlatforms, addons } =
    req.body;

  let totalPrice = 0;

  if (services?.includes("website")) {
    if (websiteTier === "basic") totalPrice += 500;
    else if (websiteTier === "standard") totalPrice += 900;
    else if (websiteTier === "advanced") totalPrice += 1400;
  }

  if (services?.includes("delivery")) {
    if (deliveryPlatforms?.includes("ubereats")) totalPrice += 200;
    if (deliveryPlatforms?.includes("doordash")) totalPrice += 200;
    if (
      deliveryPlatforms?.includes("ubereats") &&
      deliveryPlatforms?.includes("doordash")
    ) {
      totalPrice -= 50;
    }
  }

  if (addons?.includes("seo")) totalPrice += 200;
  if (addons?.includes("logo")) totalPrice += 150;
  if (addons?.includes("photos")) totalPrice += 120;

  try {
    const quote = await Quote.create({
      businessType,
      services,
      websiteTier,
      deliveryPlatforms,
      addons,
      totalPrice,
    });

    res.json({
      success: true,
      quote,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to save quote" });
  }
});


const PORT = 3001;
app.post("/api/meetings", async (req, res) => {
  const { businessName, name, email, serviceInterest, date, time, message } =
    req.body;

  try {
    const meeting = await Meeting.create({
      businessName,
      name,
      email,
      serviceInterest,
      date,
      time,
      message,
    });

    res.json({
      success: true,
      meeting,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to schedule meeting" });
  }
});
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
