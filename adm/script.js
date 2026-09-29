const btnNotificacao =
    document.getElementById("btnNotificacao");

const painelNotificacao =
    document.getElementById("painelNotificacao");


btnNotificacao.addEventListener(
    "click",
    function () {

        painelNotificacao.classList.toggle(
            "mostrar"
        );

    }
);


document.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.closest(".notificacao")
        ) {

            painelNotificacao.classList.remove(
                "mostrar"
            );

        }

    }
);


const btnSair =
    document.getElementById("btnSair");


btnSair.addEventListener(
    "click",
    function (event) {

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