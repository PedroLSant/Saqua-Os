/* ================================
   BOTÃO SAIR
================================ */

const btnSair =
    document.getElementById("btnSair");


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


/* ================================
   BOTÃO NOTIFICAÇÃO
================================ */

const btnNotificacao =
    document.getElementById("btnNotificacao");


btnNotificacao.addEventListener(
    "click",
    function() {

        alert(
            "Você possui 2 notificações."
        );

    }
);


/* ================================
   BOTÕES DE VER OS
================================ */

const botoesVer =
    document.querySelectorAll(".btn-ver");


botoesVer.forEach(
    function(botao) {

        botao.addEventListener(
            "click",
            function() {

                alert(
                    "Detalhes da Ordem de Serviço em breve."
                );

            }
        );

    }
);


/* ================================
   AÇÕES RÁPIDAS
================================ */

const acoes =
    document.querySelectorAll(".acao");


acoes.forEach(
    function(acao) {

        acao.addEventListener(
            "click",
            function() {

                const texto =
                    acao.querySelector("strong").textContent;

                alert(
                    texto + " - função em desenvolvimento."
                );

            }
        );

    }
);