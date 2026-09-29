const btnSair = document.getElementById("btnSair");

if (btnSair) {

    btnSair.addEventListener("click", function(event) {

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


const btnNotificacao =
    document.getElementById("btnNotificacao");

if (btnNotificacao) {

    btnNotificacao.addEventListener("click", function() {

        alert(
            "Você possui 3 notificações:\n\n" +

            "• A OS #1021 foi aberta recentemente.\n" +

            "• A OS #1018 está em análise.\n" +

            "• Um cliente aguarda atualização sobre sua OS."
        );

    });

}