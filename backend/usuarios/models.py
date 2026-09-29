from django.db import models


class Usuario(models.Model):

    nome = models.CharField(max_length=100)

    email = models.EmailField(unique=True)

    firebase_uid = models.CharField(
        max_length=200,
        unique=True
    )

    role = models.CharField(
        max_length=20,
        default="cliente"
    )

    status = models.CharField(
        max_length=20,
        default="pendente"
    )

    def __str__(self):
        return self.nome