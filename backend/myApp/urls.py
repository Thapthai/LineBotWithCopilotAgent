from django.urls import path
from myApp import views

urlpatterns = [
    path("", views.index),
    path("about", views.about),
]
