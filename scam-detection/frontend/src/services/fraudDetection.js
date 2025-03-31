import axios from "axios";

const API_URL = "http://localhost:4000/api/transactions/check";

export const checkFraud = async (features) => {
    try {
        const response = await axios.post(API_URL, { features });
        return response.data;
    } catch (error) {
        console.error("Error checking fraud:", error);
        return { error: "Failed to check fraud" };
    }
};
