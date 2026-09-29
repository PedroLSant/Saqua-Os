const campoPesquisa = document.getElementById("pesquisaOS");
const filtroStatus = document.getElementById("filtroStatus");
const btnLimpar = document.getElementById("btnLimpar");
const mensagemPesquisa = document.getElementById("mensagemPesquisa");
const semResultado = document.getElementById("semResultado");

const cards = document.querySelectorAll(".os-card");


// ===============================
// FILTRAR ORDENS DE SERVIÇO
// ===============================

function filtrarOS() {

    const pesquisa =
        campoPesquisa.value.trim().toLowerCase();

    const statusSelecionado =
        filtroStatus.value;

    let encontrou = false;


    cards.forEach(function(card) {

        const numero =
            card.getAttribute("data-os").toLowerCase();

        const cliente =
            card.getAttribute("data-cliente").toLowerCase();

        const status =
            card.getAttribute("data-status");


        const correspondePesquisa =
            pesquisa === "" ||
            numero.includes(pesquisa) ||
            cliente.includes(pesquisa);


        const correspondeStatus =
            statusSelecionado === "todos" ||
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


    // ===============================
    // MOSTRAR MENSAGEM
    // ===============================

    if (
        pesquisa !== "" ||
        statusSelecionado !== "todos"
    ) {

        if (!encontrou) {

            mensagemPesquisa.textContent =
                "Nenhuma OS encontrada para os filtros informados.";

            mensagemPesquisa.classList.add("mostrar");

            semResultado.classList.add("mostrar");

        } else {

            mensagemPesquisa.classList.remove("mostrar");

            semResultado.classList.remove("mostrar");

        }

    } else {

        mensagemPesquisa.classList.remove("mostrar");

        semResultado.classList.remove("mostrar");

    }

}


// ===============================
// PESQUISA
// ===============================

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


// ===============================
// FILTRO DE STATUS
// ===============================

if (filtroStatus) {

    filtroStatus.addEventListener(
        "change",
        filtrarOS
    );

}


// ===============================
// LIMPAR FILTROS
// ===============================

if (btnLimpar) {

    btnLimpar.addEventListener(
        "click",
        function() {

            campoPesquisa.value = "";

            filtroStatus.value = "todos";


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
// ABRIR / FECHAR DETALHES
// ===============================

const botoesDetalhes =
    document.querySelectorAll(".btn-detalhes");


botoesDetalhes.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            const id =
                botao.getAttribute("data-target");

            const detalhes =
                document.getElementById(id);


            detalhes.classList.toggle("aberto");


            if (
                detalhes.classList.contains("aberto")
            ) {

                botao.innerHTML =
                    '<i class="fa-solid fa-chevron-up"></i> Fechar detalhes';

            } else {

                botao.innerHTML =
                    '<i class="fa-solid fa-eye"></i> Ver detalhes';

            }

        }
    );

});


// ===============================
// SAIR DO SISTEMA
// ===============================

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


// ===============================
// ABRIR OS PELO LINK
// Exemplo:
// minhas-os.html?os=1024
// ===============================

const parametros =
    new URLSearchParams(
        window.location.search
    );


const osURL =
    parametros.get("os");


if (osURL) {

    campoPesquisa.value = osURL;

    filtrarOS();


    const card =
        document.querySelector(
            '.os-card[data-os="' + osURL + '"]'
        );


    if (card) {

        const botao =
            card.querySelector(".btn-detalhes");


        if (botao) {

            botao.click();

        }

    }

}