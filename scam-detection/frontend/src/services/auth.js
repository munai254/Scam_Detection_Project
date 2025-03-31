import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Change if needed

export const loginUser = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/login`, { email, password });
        return res.data; // Expecting { token, user }
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        return null;
    }
};

export const registerUser = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/register`, { email, password });
        return res.data;
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        return null;
    }
};
