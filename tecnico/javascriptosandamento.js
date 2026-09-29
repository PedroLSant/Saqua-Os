const campoPesquisa = document.getElementById("pesquisaOS");
const btnLimpar = document.getElementById("btnLimpar");
const mensagemPesquisa = document.getElementById("mensagemPesquisa");
const semResultado = document.getElementById("semResultado");

const cards = document.querySelectorAll(".andamento-card");


// ===============================
// PESQUISA
// ===============================

function filtrarOS() {

    const pesquisa = campoPesquisa.value
        .trim()
        .toLowerCase();

    let encontrou = false;

    cards.forEach(function(card) {

        const numero = card
            .getAttribute("data-os")
            .toLowerCase();

        const cliente = card
            .getAttribute("data-cliente")
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


    // Nenhum resultado

    if (pesquisa !== "" && !encontrou) {

        mensagemPesquisa.textContent =
            "Nenhuma OS em andamento encontrada.";

        mensagemPesquisa.classList.add("mostrar");

        semResultado.classList.add("mostrar");

    } else {

        mensagemPesquisa.classList.remove("mostrar");

        semResultado.classList.remove("mostrar");
    }
}


// Pesquisa enquanto digita

if (campoPesquisa) {

    campoPesquisa.addEventListener(
        "input",
        filtrarOS
    );


    // Pesquisa ao apertar Enter

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


// ===============================
// LIMPAR PESQUISA
// ===============================

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


// ===============================
// ATUALIZAR OS
// ===============================

const botoesAtualizar =
    document.querySelectorAll(".btn-atualizar");


botoesAtualizar.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            const numeroOS =
                botao.getAttribute("data-os");


            const confirmar = confirm(
                "Deseja atualizar as informações da OS #" +
                numeroOS +
                "?"
            );


            if (!confirmar) {

                return;
            }


            alert(
                "A atualização da OS #" +
                numeroOS +
                " será integrada ao sistema posteriormente."
            );
        }
    );
});


// ===============================
// SAIR
// ===============================

const btnSair =
    document.getElementById("btnSair");


if (btnSair) {

    btnSair.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            const confirmar = confirm(
                "Deseja realmente sair do sistema?"
            );


            if (confirmar) {

                window.location.href =
                    "../login/login.html";
            }
        }
    );
}


// ===============================
// NOTIFICAÇÕES
// ===============================

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