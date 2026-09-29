import json

import firebase_admin

from firebase_admin import credentials
from firebase_admin import auth

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Usuario


if not firebase_admin._apps:

    credencial = credentials.Certificate(
        settings.FIREBASE_CREDENTIALS
    )

    firebase_admin.initialize_app(
        credencial
    )


@csrf_exempt
def cadastro(request):

    if request.method != "POST":
        return JsonResponse(
            {"erro": "Use o método POST."},
            status=405
        )

    try:

        dados = json.loads(request.body)

        nome = dados.get("nome")
        email = dados.get("email")
        firebase_uid = dados.get("firebase_uid")

        if not nome or not email or not firebase_uid:
            return JsonResponse(
                {
                    "erro": "Nome, email e Firebase UID são obrigatórios."
                },
                status=400
            )

        if Usuario.objects.filter(
            firebase_uid=firebase_uid
        ).exists():

            return JsonResponse(
                {
                    "mensagem": "Usuário já cadastrado.",
                    "status": "existente"
                },
                status=200
            )

        quantidade = Usuario.objects.count()

        if quantidade == 0:

            role = "admin"
            status = "aprovado"

        else:

            role = "cliente"
            status = "pendente"

        usuario = Usuario.objects.create(
            nome=nome,
            email=email,
            firebase_uid=firebase_uid,
            role=role,
            status=status
        )

        return JsonResponse(
            {
                "mensagem": "Cadastro realizado com sucesso.",
                "id": usuario.id,
                "nome": usuario.nome,
                "email": usuario.email,
                "role": usuario.role,
                "status": usuario.status
            },
            status=201
        )

    except json.JSONDecodeError:

        return JsonResponse(
            {"erro": "JSON inválido."},
            status=400
        )

    except Exception as erro:

        return JsonResponse(
            {"erro": str(erro)},
            status=500
        )


def buscar_usuario(request, firebase_uid):

    try:

        usuario = Usuario.objects.get(
            firebase_uid=firebase_uid
        )

        return JsonResponse(
            {
                "id": usuario.id,
                "nome": usuario.nome,
                "email": usuario.email,
                "role": usuario.role,
                "status": usuario.status
            },
            status=200
        )

    except Usuario.DoesNotExist:

        return JsonResponse(
            {
                "erro": "Usuário não encontrado."
            },
            status=404
        )


def listar_usuarios(request):

    if request.method != "GET":

        return JsonResponse(
            {"erro": "Use o método GET."},
            status=405
        )

    usuarios = Usuario.objects.all()

    lista = []

    for usuario in usuarios:

        lista.append(
            {
                "id": usuario.id,
                "nome": usuario.nome,
                "email": usuario.email,
                "firebase_uid": usuario.firebase_uid,
                "role": usuario.role,
                "status": usuario.status
            }
        )

    return JsonResponse(
        lista,
        safe=False,
        status=200
    )


@csrf_exempt
def aprovar_usuario(request, id):

    if request.method != "POST":

        return JsonResponse(
            {"erro": "Use o método POST."},
            status=405
        )

    try:

        usuario = Usuario.objects.get(id=id)

        usuario.status = "aprovado"

        usuario.save()

        return JsonResponse(
            {
                "mensagem": "Usuário aprovado com sucesso.",
                "id": usuario.id,
                "nome": usuario.nome,
                "email": usuario.email,
                "role": usuario.role,
                "status": usuario.status
            },
            status=200
        )

    except Usuario.DoesNotExist:

        return JsonResponse(
            {"erro": "Usuário não encontrado."},
            status=404
        )