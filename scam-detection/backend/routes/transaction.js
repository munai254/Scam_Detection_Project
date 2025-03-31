const express = require("express");
const axios = require("axios");
const router = express.Router();

// Fraud detection API configuration
const FRAUD_API_URL = "http://localhost:5001/predict"; // Changed to match correct port
const REQUIRED_FEATURES = 10; // Set to your model's expected feature count

// Input validation middleware
const validateTransaction = (req, res, next) => {
    const { features } = req.body;
    
    if (!Array.isArray(features)) {
        return res.status(400).json({ error: "Features must be an array" });
    }
    
    if (features.length !== REQUIRED_FEATURES) {
        return res.status(400).json({
            error: `Exactly ${REQUIRED_FEATURES} features required, got ${features.length}`
        });
    }
    
    if (features.some(isNaN)) {
        return res.status(400).json({ error: "All features must be numeric" });
    }
    
    next();
};

// Fraud check endpoint
router.post("/check", validateTransaction, async (req, res) => {
    try {
        const { features } = req.body;
        
        const response = await axios.post(FRAUD_API_URL, {
            features: features.map(Number)
        }, {
            timeout: 3000  // 3-second timeout
        });

        res.json({
            fraud: response.data.fraud,
            confidence: response.data.confidence,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("Fraud API Error:", error.response?.data || error.message);
        const status = error.response?.status || 500;
        res.status(status).json({
            error: "Fraud detection service unavailable",
            details: error.response?.data || error.message
        });
    }
});

module.exports = router;