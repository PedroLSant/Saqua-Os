const btnUsuarios =
    document.getElementById(
        "btnUsuarios"
    );

const submenuUsuarios =
    document.getElementById(
        "submenuUsuarios"
    );


if (
    btnUsuarios &&
    submenuUsuarios
) {

    btnUsuarios.addEventListener(
        "click",
        function() {

            submenuUsuarios.classList.toggle(
                "mostrar"
            );

            btnUsuarios.classList.toggle(
                "aberto"
            );

        }
    );

}


/* NOTIFICAÇÕES */

const btnNotificacao =
    document.getElementById(
        "btnNotificacao"
    );


if (btnNotificacao) {

    btnNotificacao.addEventListener(
        "click",
        function() {

            alert(
                "Você possui 4 notificações:\n\n" +
                "• A OS #1021 está aguardando técnico.\n" +
                "• A OS #1024 está em execução.\n" +
                "• A OS #1018 está em análise.\n" +
                "• A OS #1015 foi concluída."
            );

        }
    );

}


/* SAIR */

const btnSair =
    document.getElementById(
        "btnSair"
    );


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