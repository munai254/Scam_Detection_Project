from fastapi import FastAPI
import pickle
import numpy as np
import uvicorn

app = FastAPI()

# Load trained model
with open("fraud_model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

@app.post("/predict")
async def predict(data: dict):
    try:
        features = np.array(data["features"]).reshape(1, -1)
        prediction = model.predict(features)
        return {"prediction": int(prediction[0])}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
