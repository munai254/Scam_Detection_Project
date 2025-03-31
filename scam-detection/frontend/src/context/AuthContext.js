// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Define logout first
    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    }, [navigate]);

    // 2. Then define checkExistingToken
    const checkExistingToken = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
                
                await axios.get("http://localhost:5000/api/auth/verify", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
            } catch (error) {
                logout();
            }
        }
        setLoading(false);
    }, [logout]); // Add logout to dependencies

    // 3. useEffect for initial check
    useEffect(() => {
        checkExistingToken();
    }, [checkExistingToken]);

    // 4. Login function
    const login = useCallback(async (email, password) => {
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password }
            );
            
            localStorage.setItem("token", data.token);
            setUser(jwtDecode(data.token));
            navigate("/dashboard");
            
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || "Error");
            throw error;
        }
    }, [navigate]);

    // 5. Register function
    const register = useCallback(async (email, password) => {
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/auth/register",
                { email, password }
            );
            
            localStorage.setItem("token", data.token);
            const decodedUser = jwtDecode(data.token);
            setUser(decodedUser);
            navigate("/dashboard");
            return true;
        } catch (error) {
            console.error("Registration failed:", error.response?.data?.message || error.message);
            throw error;
        }
    }, [navigate]);

    // 6. Context value
    const value = {
        user,
        loading,
        login,
        logout,
        register
    };

    // 7. Render with loading state
    return (
        <AuthContext.Provider value={value}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};