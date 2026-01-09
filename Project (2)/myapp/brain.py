from keras.models import load_model
from keras.preprocessing import image
import numpy as np

model = load_model(r"D:/SEM 7/Project/brain_tumor_mobilenetv2_finetuned.keras")

# Load and preprocess image
img_path = r"D:\C drive data\Brain\Testing\pituitary\Te-pi_0048.jpg" # <- Replace with your image path
img = image.load_img(img_path, target_size=(160, 160))  # ✅ MobileNetV2 input size
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array = img_array / 255.0

# Predict
pred = model.predict(img_array)
print("Prediction probabilities:", pred)

# Optional: Decode prediction if using softmax with class names
class_names = ["Glioma", "Meningioma", "No Tumor", "Pituitary"]  # <- Adjust based on your labels
predicted_class = class_names[np.argmax(pred)]
print("Predicted class:", predicted_class)




