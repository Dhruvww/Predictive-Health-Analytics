from io import BytesIO

from django.shortcuts import render
import os
import json
import base64
import numpy as np
import joblib
from PIL import Image
import pickle
from django.conf import settings
from django.shortcuts import render
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array

model_path = os.path.join(settings.BASE_DIR, 'myapp', 'models.pkl')
with open(model_path, 'rb') as file:
    loaded_models = pickle.load(file)

# Assign individual models
rf_model = loaded_models[0]
logistic_model = loaded_models[1]
dt_model = loaded_models[2]
svc_model = loaded_models[3]
knn_model = loaded_models[4]

@csrf_exempt
def predict_heart_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            features = [
                float(data.get('age')),
                float(data.get('sex')),
                float(data.get('cp')),
                float(data.get('trestbps')),
                float(data.get('chol')),
                float(data.get('fbs')),
                float(data.get('restecg')),
                float(data.get('thalach')),
                float(data.get('exang')),
                float(data.get('oldpeak')),
                float(data.get('slope')),
                float(data.get('ca')),
                float(data.get('thal'))
            ]

            prediction = rf_model.predict([features])[0]
            confidence_scores = rf_model.predict_proba([features])[0]  # returns [prob_class0, prob_class1]

            confidence = float(confidence_scores[int(prediction)])  # confidence of predicted class

            if prediction == 0:
                message = "⚠️ The patient has exercise-induced angina. (Chest pain occurs during exercise)"
            else:
                message = "✅ The patient does not have exercise-induced angina. (No chest pain during exercise)"

            return JsonResponse({
                "status": "success",
                "prediction": int(prediction),
                "confidence": round(confidence * 100, 2),  # e.g. 92.56%
                "message": message
            })

        except Exception as e:
            return JsonResponse({
                "status": "error",
                "error": str(e)
            }, status=400)

    return JsonResponse({
        "status": "error",
        "message": "Only POST method is allowed"
    }, status=405)

# ======================================================================================================================
# Brain Tumor    Predict Start Here.....
#=======================================================================================================================
from .brain_test import predict_from_folder
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import shutil

@csrf_exempt
def brain_predict_view(request):
    if request.method != 'POST':
        return JsonResponse({"error": "POST required."}, status=405)

    if 'image_file' not in request.FILES:
        return JsonResponse({"error": "No file uploaded"}, status=400)

    uploaded_file = request.FILES['image_file']

    folder_path = "/tmp/brain_uploads"
    # ✅ Clear old files
    if os.path.exists(folder_path):
        shutil.rmtree(folder_path)
    os.makedirs(folder_path, exist_ok=True)

    file_path = os.path.join(folder_path, uploaded_file.name)

    with open(file_path, 'wb+') as f:
        for chunk in uploaded_file.chunks():
            f.write(chunk)

    # ✅ Now this folder contains only the new file
    results = predict_from_folder(folder_path)
    print(results)

    return JsonResponse({"results": results})


# /#=======================================================================================================================
# Kidney Predication Start Here ..........(JSON)
#=======================================================================================================================

#==============================================pneumonia============================================
model_kideny = joblib.load('myapp/kidney_model.pkl')  # Adjust path as needed
@csrf_exempt
def kidney_predict_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Incoming data:", data)
            age = float(data.get('age'))
            bp = float(data.get('bp'))
            sg = float(data.get('sg'))
            al = float(data.get('al'))
            su = float(data.get('su'))
            rbc = float(data.get('rbc'))
            pc = float(data.get('pc'))
            pcc = float(data.get('pcc'))
            ba = float(data.get('ba'))
            bgr = float(data.get('bgr'))
            bu = float(data.get('bu'))
            sc = float(data.get('sc'))
            sod = float(data.get('sod'))
            pot = float(data.get('pot'))
            hemo = float(data.get('hemo'))
            pcv = float(data.get('pcv'))
            wc = float(data.get('wc'))
            rc = float(data.get('rc'))
            htn = float(data.get('htn'))
            dm = float(data.get('dm'))
            cad = float(data.get('cad'))
            appet = float(data.get('appet'))
            pe = float(data.get('pe'))
            ane = float(data.get('ane'))

            # Arrange input in the order used in training
            features = np.array([[age, bp, sg, al, su, rbc, pc, pcc, ba,
                                  bgr, bu, sc, sod, pot, hemo, pcv, wc,
                                  rc, htn, dm, cad, appet, pe, ane]])

            # Make prediction
            prediction = model_kideny.predict(features)[0]
            probabilities = model_kideny.predict_proba(features)[0]
            confidence = max(probabilities)

            # Format message
            if prediction == 1 and confidence >= 0.75:
                message = "✅ The patient is not likely to have kidney disease."
            elif prediction == 0 and confidence >= 0.75:
                message = "⚠️ The patient is likely to have kidney disease."
            else:
                message = f"⚠️ Result is uncertain. Please consult a doctor. (Prediction: {'Kidney Disease' if prediction == 0 else 'Healthy'}, Confidence: {confidence:.2f})"

            return JsonResponse({
                'status': 'success',
                'prediction': int(prediction),
                'confidence': round(float(confidence), 2),
                'message': message
            })

        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'error': str(e)
            }, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
import os
import numpy as np
from io import BytesIO
from PIL import Image
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image  # ✅ This is crucial

model_p = load_model(os.path.join(settings.BASE_DIR, 'pneumonia_mobilenetv2_model.keras'))
class_names_p = ['NORMAL', 'PNEUMONIA']

@csrf_exempt
def predict_pneumonia_api(request):
    results = []

    if request.method == 'POST':
        uploaded_files = request.FILES.getlist('image')  # Support multiple files

        for img_file in uploaded_files:
            try:
                # Read image from memory
                img_bytes = BytesIO(img_file.read())
                img = Image.open(img_bytes).convert('RGB')
                img = img.resize((224, 224))

                # Preprocess
                img_array = image.img_to_array(img) / 255.0
                img_array = np.expand_dims(img_array, axis=0)

                # Predict
                prediction = model_p.predict(img_array)
                label = class_names_p[int(prediction[0][0] > 0.5)]
                confidence = float(prediction[0][0])  # sigmoid output
                print(label)
                results.append({
                    "filename": img_file.name,
                    "prediction": label,
                    "confidence": round(confidence, 4)
                })

            except Exception as e:
                results.append({
                    "filename": img_file.name,
                    "error": str(e)
                })

        return JsonResponse({"results": results})

    return JsonResponse({"error": "Only POST method allowed"}, status=405)