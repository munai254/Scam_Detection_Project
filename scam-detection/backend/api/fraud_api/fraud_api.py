# fraud_api.py
import os
import logging
import numpy as np
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import joblib

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Configure logging
logging.basicConfig(
    filename='api.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Set up rate limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Load model with validation
MODEL_PATH = "credit_card_model.pkl"
MODEL_VERSION = "1.2.0"

try:
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file {MODEL_PATH} not found")
    model = joblib.load(MODEL_PATH)
except Exception as e:
    logging.error(f"Model loading failed: {str(e)}")
    raise

@app.route('/predict', methods=['POST'])
@limiter.limit("10/minute")  # Adjust based on your needs
def predict():
    """Endpoint for fraud prediction"""
    try:
        # Validate request
        data = request.json
        if not data or 'features' not in data:
            abort(400, "Request must contain 'features' array")
        
        features = np.array(data['features'])
        
        # Validate feature format (replace 10 with your actual feature count)
        if features.shape != (10,) and features.shape != (1, 10):
            abort(400, f"Invalid feature shape. Expected 10 features, got {features.shape}")

        # Make prediction
        prediction = model.predict(features.reshape(1, -1))[0]
        probability = model.predict_proba(features.reshape(1, -1))[0][1]
        
        # Log successful prediction
        logging.info(f"Prediction made - Fraud: {prediction}, Confidence: {probability:.2f}")
        
        return jsonify({
            'fraud': bool(prediction),
            'confidence': float(probability),
            'model_version': MODEL_VERSION,
            'feature_count': len(features),
            'timestamp': datetime.datetime.now().isoformat()
        })

    except ValueError as e:
        logging.error(f"Value error: {str(e)}")
        abort(400, f"Invalid input format: {str(e)}")
    except Exception as e:
        logging.error(f"Prediction failed: {str(e)}")
        abort(500, "Internal server error")

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_version': MODEL_VERSION,
        'timestamp': datetime.datetime.now().isoformat()
    })

@app.errorhandler(404)
@app.errorhandler(400)
@app.errorhandler(500)
def handle_errors(e):
    """Standard error responses"""
    return jsonify({
        'error': e.description if hasattr(e, 'description') else str(e),
        'status_code': e.code,
        'model_version': MODEL_VERSION
    }), e.code

if __name__ == '__main__':
    # Run in production mode (disable debug in production)
    app.run(host='0.0.0.0', port=5001, debug=False)