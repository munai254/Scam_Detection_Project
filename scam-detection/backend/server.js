const express = require("express");
const cors = require("cors");
const fraudRoutes = require("./routes/fraudRoutes");
const transactionRoutes = require("./routes/transaction");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", fraudRoutes);
app.use("/api", transactionRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Scam Detection Backend Running...");
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});