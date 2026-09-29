from django.urls import path
from . import views

urlpatterns = [

    path(
        "cadastro/",
        views.cadastro
    ),

    path(
        "usuario/<str:firebase_uid>/",
        views.buscar_usuario
    ),

    path(
        "usuarios/",
        views.listar_usuarios
    ),

    path(
        "usuario/<int:id>/aprovar/",
        views.aprovar_usuario
    ),

]