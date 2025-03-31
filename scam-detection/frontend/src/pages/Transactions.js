import { useState } from "react";
import { checkFraud } from "../services/fraudDetection";

const Transactions = () => {
    const [features, setFeatures] = useState([]);
    const [result, setResult] = useState(null);

    const handleCheck = async () => {
        const response = await checkFraud(features);
        setResult(response);
    };

    return (
        <div>
            <h2>Fraud Detection</h2>
            <input
                type="text"
                placeholder="Enter features (comma-separated)"
                onChange={(e) => setFeatures(e.target.value.split(",").map(Number))}
            />
            <button onClick={handleCheck}>Check Fraud</button>
            {result && <p>Fraud: {result.fraud ? "Yes" : "No"}</p>}
        </div>
    );
};

export default Transactions;
