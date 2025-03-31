import axios from "axios";
const axios = require("axios");

const FRAUD_API_URL = "http://127.0.0.1:8000/predict";

async function detectFraud(transactionData) {
    try {
        const response = await axios.post(FRAUD_API_URL, { features: transactionData });
        return response.data;
    } catch (error) {
        console.error("Fraud API Error:", error.message);
        return { error: "Failed to detect fraud" };
    }
}

module.exports = { detectFraud };


export const checkFraud = async (features) => {
    try {
        const { data } = await axios.post("http://localhost:5000/api/fraud-check", { features });
        return data;
    } catch (error) {
        console.error("Fraud detection error:", error);
        return { error: "Detection failed." };
    }
};
