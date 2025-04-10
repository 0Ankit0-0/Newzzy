const express = require("express");
const cors = require("cors");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

app.use(express.json());


app.use(
  cors({
    origin: [],
    methods: ["POST", 'GET'],
    credentials: true,
  })
);

// === Routes ===
app.use("/api/auth", require("./routes/authRoute"));

// Root route
app.get("/", (req, res) => {
  res.send("News API is running 🚀");
});

// === Rate Limiter for News API ===
const newsLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per minute
  message: { message: "Too many requests. Please try again later." },
});

// News API route
app.get("/api/news", newsLimiter, async (req, res) => {
  const {
    country = "us",
    category = "general",
    page = 1,
    pageSize = 10,
  } = req.query;
  const apiKey = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("News API error:", error.message);
    res
      .status(error.response?.status || 500)
      .json({ message: error.response?.data?.message || "Internal Server Error" });
  }
});

// === 404 Handler ===
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
