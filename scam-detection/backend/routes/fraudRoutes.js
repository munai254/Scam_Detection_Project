const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/fraud-check", async (req, res) => {
    try {
        const response = await axios.post("http://localhost:5001/predict", {
            features: req.body.features,
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Fraud detection failed." });
    }
});

module.exports = router;
