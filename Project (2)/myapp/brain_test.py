# brain.py

from keras.models import load_model
from keras.preprocessing import image
import numpy as np
import os

# Load the model once
model = load_model(r"D:/SEM 7/Project/brain_tumor_mobilenetv2_finetuned.keras")

# Class labels
labels = ["Glioma", "Meningioma", "No Tumor", "Pituitary"]

def predict_from_folder(folder_path):
    """
    Predicts brain tumor type for all valid images in the folder.
    Returns a list of results.
    """
    results = []
    valid_extensions = ['.jpg', '.jpeg', '.png']

    for filename in os.listdir(folder_path):
        if any(filename.lower().endswith(ext) for ext in valid_extensions):
            img_path = os.path.join(folder_path, filename)

            try:
                # Load and preprocess image
                img = image.load_img(img_path, target_size=(160, 160))
                img_array = image.img_to_array(img)
                img_array = np.expand_dims(img_array, axis=0)
                img_array = img_array / 255.0  # Normalize

                # Predict
                predictions = model.predict(img_array)
                predicted_index = np.argmax(predictions[0])
                confidence = predictions[0][predicted_index]

                result = {
                    "filename": filename,
                    "predicted_class": labels[predicted_index],
                    "confidence": f"{confidence * 100:.2f}%"
                }
                results.append(result)

            except Exception as e:
                results.append({
                    "filename": filename,
                    "error": str(e)
                })

    return results
