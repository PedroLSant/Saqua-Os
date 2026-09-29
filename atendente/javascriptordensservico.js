const campoPesquisa =
    document.getElementById("pesquisaOS");

const filtroStatus =
    document.getElementById("filtroStatus");

const btnLimpar =
    document.getElementById("btnLimpar");

const mensagemPesquisa =
    document.getElementById("mensagemPesquisa");

const semResultado =
    document.getElementById("semResultado");


const cards =
    document.querySelectorAll(".os-card");


/* =========================================
   FILTRAR OS
   ========================================= */

function filtrarOS() {

    const pesquisa =
        campoPesquisa.value
        .trim()
        .toLowerCase();

    const statusSelecionado =
        filtroStatus.value;


    let encontrou = false;


    cards.forEach(function(card) {

        const numero =
            card
            .getAttribute("data-os")
            .toLowerCase();

        const cliente =
            card
            .getAttribute("data-cliente")
            .toLowerCase();

        const status =
            card
            .getAttribute("data-status");


        const correspondePesquisa =
            pesquisa === "" ||
            numero.includes(pesquisa) ||
            cliente.includes(pesquisa);


        const correspondeStatus =
            statusSelecionado === "" ||
            status === statusSelecionado;


        if (
            correspondePesquisa &&
            correspondeStatus
        ) {

            card.style.display = "";

            encontrou = true;

        } else {

            card.style.display = "none";

        }

    });


    if (!encontrou) {

        mensagemPesquisa.textContent =
            "Nenhuma Ordem de Serviço encontrada.";

        mensagemPesquisa.classList.add(
            "mostrar"
        );

        semResultado.classList.add(
            "mostrar"
        );

    } else {

        mensagemPesquisa.classList.remove(
            "mostrar"
        );

        semResultado.classList.remove(
            "mostrar"
        );

    }

}


/* =========================================
   PESQUISA
   ========================================= */

if (campoPesquisa) {

    campoPesquisa.addEventListener(
        "input",
        filtrarOS
    );


    campoPesquisa.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                filtrarOS();

            }

        }
    );

}


/* =========================================
   FILTRO STATUS
   ========================================= */

if (filtroStatus) {

    filtroStatus.addEventListener(
        "change",
        filtrarOS
    );

}


/* =========================================
   LIMPAR
   ========================================= */

if (btnLimpar) {

    btnLimpar.addEventListener(
        "click",
        function() {

            campoPesquisa.value = "";

            filtroStatus.value = "";


            cards.forEach(function(card) {

                card.style.display = "";

            });


            mensagemPesquisa.classList.remove(
                "mostrar"
            );

            semResultado.classList.remove(
                "mostrar"
            );


            campoPesquisa.focus();

        }
    );

}


/* =========================================
   VER DETALHES
   ========================================= */

const botoesDetalhes =
    document.querySelectorAll(
        ".btn-detalhes"
    );


botoesDetalhes.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            const numeroOS =
                botao.getAttribute(
                    "data-os"
                );

            const detalhes =
                document.getElementById(
                    "detalhes-" + numeroOS
                );


            if (!detalhes) {

                return;

            }


            const aberto =
                detalhes.classList.contains(
                    "mostrar"
                );


            if (aberto) {

                detalhes.classList.remove(
                    "mostrar"
                );

                botao.classList.remove(
                    "aberto"
                );

                botao.innerHTML =
                    'Ver detalhes <i class="fa-solid fa-arrow-right"></i>';

            } else {

                detalhes.classList.add(
                    "mostrar"
                );

                botao.classList.add(
                    "aberto"
                );

                botao.innerHTML =
                    'Ocultar detalhes <i class="fa-solid fa-arrow-right"></i>';

            }

        }
    );

});


/* =========================================
   NOTIFICAÇÕES
   ========================================= */

const btnNotificacao =
    document.getElementById(
        "btnNotificacao"
    );


if (btnNotificacao) {

    btnNotificacao.addEventListener(
        "click",
        function() {

            alert(
                "Você possui 3 notificações:\n\n" +

                "• A OS #1021 foi aberta recentemente.\n" +

                "• A OS #1018 está em análise.\n" +

                "• Um cliente aguarda atualização."
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