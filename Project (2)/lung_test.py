import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image

# Load model and labels
model = load_model("myapp/lung_cancer_model.keras")
class_labels = ['Benign', 'Malignant', 'Normal']

# Folder path
base_path = r"D:\SEM 7\The IQ-OTHNCCD lung cancer dataset\The IQ-OTHNCCD lung cancer dataset"

# Loop through subfolders
for folder_name in os.listdir(base_path):
    folder_path = os.path.join(base_path, folder_name)

    if os.path.isdir(folder_path):
        print(f"\n📁 Scanning Folder: {folder_name}")

        for file_name in os.listdir(folder_path):
            if file_name.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(folder_path, file_name)

                try:
                    # Load and preprocess image
                    img = Image.open(file_path).convert('RGB')
                    img = img.resize((224, 224))
                    img_array = np.array(img) / 255.0
                    img_array = np.expand_dims(img_array, axis=0)

                    # Predict
                    prediction = model.predict(img_array)
                    predicted_index = np.argmax(prediction)
                    predicted_label = class_labels[predicted_index]
                    confidence = float(np.max(prediction))

                    print(f"🖼 {file_name}: {predicted_label} ({confidence:.2f})")

                except Exception as e:
                    print(f"⚠️ Error with file {file_name}: {e}")
