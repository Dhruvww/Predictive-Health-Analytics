from django.urls import path
from . import views

urlpatterns = [
    path('api/heart-predict/', views.predict_heart_api, name='predict_heart_api'),  #done
    path('brain',views.brain_predict_view,name="predict_view"), #done
    path('api/kidney-predict/',views.kidney_predict_api,name="kidney"),  #done
    path('pneumonia',views.predict_pneumonia_api,name="pneumonia"),  #done
]


