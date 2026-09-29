const campoPesquisa =
    document.getElementById("pesquisaTecnico");


const btnLimpar =
    document.getElementById("btnLimpar");


const mensagemPesquisa =
    document.getElementById("mensagemPesquisa");


const semResultado =
    document.getElementById("semResultado");


const cards =
    document.querySelectorAll(".tecnico-card");



/* =========================================
   FILTRAR TÉCNICOS
========================================= */

function filtrarTecnicos() {

    const pesquisa =
        campoPesquisa.value
        .trim()
        .toLowerCase();


    let encontrou = false;


    cards.forEach(function(card) {


        const nome =
            card
            .getAttribute("data-nome")
            .toLowerCase();


        const email =
            card
            .getAttribute("data-email")
            .toLowerCase();



        const corresponde =
            pesquisa === "" ||
            nome.includes(pesquisa) ||
            email.includes(pesquisa);



        if (corresponde) {

            card.style.display = "";

            encontrou = true;

        } else {

            card.style.display = "none";

        }

    });



    if (!encontrou) {

        mensagemPesquisa.textContent =
            "Nenhum técnico encontrado.";


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
        filtrarTecnicos
    );


    campoPesquisa.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                filtrarTecnicos();

            }

        }
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
   DETALHES DO TÉCNICO
========================================= */

const botoesDetalhes =
    document.querySelectorAll(
        ".btn-detalhes"
    );


botoesDetalhes.forEach(function(botao) {


    botao.addEventListener(
        "click",
        function() {


            const tecnico =
                botao.getAttribute(
                    "data-tecnico"
                );


            alert(

                "Técnico: " +
                tecnico +
                "\n\n" +

                "Área de detalhes e indicadores " +
                "será integrada ao sistema posteriormente."

            );

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

                "• A OS #1024 está em execução.\n" +

                "• A OS #1015 foi concluída."

            );

        }
    );

}



/* =========================================
   SAIR
========================================= */

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