const btnEditar =
    document.getElementById("btnEditar");

const btnCancelar =
    document.getElementById("btnCancelar");

const btnSalvar =
    document.getElementById("btnSalvar");

const acoesEdicao =
    document.getElementById("acoesEdicao");


const campos = [
    document.getElementById("nome"),
    document.getElementById("email"),
    document.getElementById("telefone"),
    document.getElementById("cpf"),
    document.getElementById("endereco")
];


function ativarEdicao() {

    campos.forEach(function(campo) {

        campo.disabled = false;

    });

    acoesEdicao.classList.add("mostrar");

    btnEditar.style.display = "none";

}


if (btnEditar) {

    btnEditar.addEventListener(
        "click",
        ativarEdicao
    );

}


if (btnCancelar) {

    btnCancelar.addEventListener(
        "click",
        function() {

            campos.forEach(function(campo) {

                campo.disabled = true;

            });

            acoesEdicao.classList.remove(
                "mostrar"
            );

            btnEditar.style.display = "flex";

        }
    );

}


if (btnSalvar) {

    btnSalvar.addEventListener(
        "click",
        function() {

            campos.forEach(function(campo) {

                campo.disabled = true;

            });

            acoesEdicao.classList.remove(
                "mostrar"
            );

            btnEditar.style.display = "flex";


            alert(
                "Dados atualizados com sucesso!"
            );

        }
    );

}


/* =========================================
   ALTERAR SENHA
   ========================================= */

const btnAlterarSenha =
    document.getElementById("btnAlterarSenha");

const formSenha =
    document.getElementById("formSenha");


if (btnAlterarSenha) {

    btnAlterarSenha.addEventListener(
        "click",
        function() {

            formSenha.classList.toggle(
                "mostrar"
            );

        }
    );

}


const btnSalvarSenha =
    document.getElementById("btnSalvarSenha");

const novaSenha =
    document.getElementById("novaSenha");

const confirmarSenha =
    document.getElementById("confirmarSenha");


if (btnSalvarSenha) {

    btnSalvarSenha.addEventListener(
        "click",
        function() {

            const senha =
                novaSenha.value.trim();

            const confirmacao =
                confirmarSenha.value.trim();


            if (senha === "") {

                alert(
                    "Digite uma nova senha."
                );

                novaSenha.focus();

                return;

            }


            if (senha.length < 6) {

                alert(
                    "A senha deve possuir pelo menos 6 caracteres."
                );

                novaSenha.focus();

                return;

            }


            if (senha !== confirmacao) {

                alert(
                    "As senhas não são iguais."
                );

                confirmarSenha.focus();

                return;

            }


            alert(
                "Senha atualizada com sucesso!"
            );


            novaSenha.value = "";

            confirmarSenha.value = "";

            formSenha.classList.remove(
                "mostrar"
            );

        }
    );

}


/* =========================================
   NOTIFICAÇÕES
   ========================================= */

const btnNotificacao =
    document.getElementById("btnNotificacao");


if (btnNotificacao) {

    btnNotificacao.addEventListener(
        "click",
        function() {

            alert(
                "Você possui 2 notificações:\n\n" +
                "• A OS #1024 está em execução.\n" +
                "• A OS #1021 está aguardando diagnóstico."
            );

        }
    );

}


/* =========================================
   SAIR
   ========================================= */

const btnSair =
    document.getElementById("btnSair");


if (btnSair) {

    btnSair.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            const confirmar =
                confirm(
                    "Deseja realmente sair do sistema?"
                );


            if (confirmar) {

                window.location.href =
                    "../login/login.html";

            }

        }
    );

}