const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Friendly routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Simple input/output test endpoint
app.get("/api/ping", (req, res) => {
  res.json({
    message: "Express is working",
    query: req.query,
    timestamp: new Date().toISOString(),
  });
});

// Fallback: if route not found, show index or 404
app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

app.listen(PORT, () => {
  console.log(`Travlr Getaways running at http://localhost:${PORT}`);
});
