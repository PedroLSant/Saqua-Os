/* =========================================================
   SAQUA OS - ÁREA DO TÉCNICO
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   BOTÃO SAIR
   ========================================================= */

const btnSair = document.getElementById("btnSair");

if (btnSair) {

    btnSair.addEventListener("click", function (event) {

        event.preventDefault();

        const confirmar = confirm(
            "Deseja realmente sair do sistema?"
        );

        if (confirmar) {

            window.location.href =
                "../login/login.html";

        }

    });

}


/* =========================================================
   NOTIFICAÇÕES
   ========================================================= */

const btnNotificacao =
    document.getElementById("btnNotificacao");

if (btnNotificacao) {

    btnNotificacao.addEventListener("click", function () {

        alert(
            "Você possui 2 notificações:\n\n" +
            "• A OS #1024 está em execução.\n" +
            "• A OS #1021 está aguardando diagnóstico."
        );

    });

}