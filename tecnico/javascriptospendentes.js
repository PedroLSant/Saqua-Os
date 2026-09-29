// =========================================
// SAQUA OS
// OS PENDENTES - TÉCNICO
// =========================================


// =========================================
// ELEMENTOS
// =========================================

const campoPesquisa =
    document.getElementById("pesquisaOS");

const btnLimpar =
    document.getElementById("btnLimpar");

const mensagemPesquisa =
    document.getElementById("mensagemPesquisa");

const semResultado =
    document.getElementById("semResultado");

const cards =
    document.querySelectorAll(".pendente-card");


// =========================================
// PESQUISAR OS
// =========================================

function filtrarOS() {

    const pesquisa =
        campoPesquisa.value
            .trim()
            .toLowerCase();

    let encontrou = false;


    cards.forEach(function(card) {

        const numero =
            card.getAttribute("data-os")
                .toLowerCase();

        const cliente =
            card.getAttribute("data-cliente")
                .toLowerCase();


        const corresponde =
            pesquisa === "" ||
            numero.includes(pesquisa) ||
            cliente.includes(pesquisa);


        if (corresponde) {

            card.style.display = "";

            encontrou = true;

        } else {

            card.style.display = "none";

        }

    });


    // =====================================
    // RESULTADO
    // =====================================

    if (pesquisa !== "" && !encontrou) {

        mensagemPesquisa.textContent =
            "Nenhuma OS pendente encontrada.";

        mensagemPesquisa.classList.add("mostrar");

        semResultado.classList.add("mostrar");

    } else {

        mensagemPesquisa.classList.remove("mostrar");

        semResultado.classList.remove("mostrar");

    }

}


// =========================================
// CAMPO DE PESQUISA
// =========================================

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


// =========================================
// LIMPAR PESQUISA
// =========================================

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


// =========================================
// BOTÃO ATENDER OS
// =========================================

const botoesAtender =
    document.querySelectorAll(".btn-atender");


botoesAtender.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            const numeroOS =
                botao.getAttribute("data-os");


            const confirmar =
                confirm(
                    "Deseja iniciar o atendimento da OS #" +
                    numeroOS +
                    "?"
                );


            if (!confirmar) {
                return;
            }


            // ---------------------------------
            // ALTERAÇÃO VISUAL
            // ---------------------------------

            botao.innerHTML =
                '<i class="fa-solid fa-check"></i> OS em andamento';


            botao.disabled = true;


            botao.style.opacity = "0.6";


            // ---------------------------------
            // AVISO
            // ---------------------------------

            alert(
                "A OS #" +
                numeroOS +
                " foi direcionada para atendimento."
            );

        }
    );

});


// =========================================
// SAIR
// =========================================

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


// =========================================
// NOTIFICAÇÕES
// =========================================

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