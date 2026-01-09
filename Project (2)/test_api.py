# import requests
#
# # ✅ Replace with the actual path to your X-ray image
# image_path = r"D:\C drive data\jupyter project\kagglehub\datasets\paultimothymooney\chest-xray-pneumonia\versions\2\chest_xray\test\PNEUMONIA\person18_virus_49.jpeg"
#
# # Prepare the file payload
# files = {
#     'image': open(image_path, 'rb')
# }
#
# # Send the POST request to your Django pneumonia API
# url = "http://127.0.0.1:8000/pneumonia"
# response = requests.post(url, files=files)
#
# # Print response
# print("Status Code:", response.status_code)
# print("Response JSON:")
# print(response.json())
import requests
#
# # Replace with the actual image path (lung CT scan or X-ray)
# image_paths = [
#     "D:/SEM 7/Project/image1.jpg",
#     "D:/SEM 7/Project/image2.jpg",
#     "D:/SEM 7/Project/image3.jpg"
# ]
#
#
# # API endpoint
# url = "http://127.0.0.1:8000/predict-lung-images"
#
# # Prepare the file payload
# files = {
#     'image': open(image_path, 'rb')  # key must be 'image'
# }
#
# # Send the POST request
# response = requests.post(url, files=files)
#
# # Display results
# print("Status Code:", response.status_code)
#
# try:
#     print("Response JSON:")
#     print(response.json())
# except Exception:
#     print("Non-JSON Response:")
#     print(response.text)


import requests
import base64

def encode_image(path):
    with open(path, 'rb') as img_file:
        return base64.b64encode(img_file.read()).decode('utf-8')

image_list = [
    encode_image(r"D:\SEM 7\The IQ-OTHNCCD lung cancer dataset\Malignant\Malignant case (1).jpg"),
encode_image(r"D:\SEM 7\The IQ-OTHNCCD lung cancer dataset\Malignant\Malignant case (2).jpg"),
encode_image(r"D:\SEM 7\The IQ-OTHNCCD lung cancer dataset\Malignant\Malignant case (3).jpg"),
    ]

res = requests.post(
    'http://127.0.0.1:8000/predict-lung-images',
    json={'images': image_list}
)

print(res.json())
