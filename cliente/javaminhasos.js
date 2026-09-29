/* =========================================================
   MINHAS OS - SAQUA OS
   ========================================================= */


/* =========================================================
   ELEMENTOS
   ========================================================= */

const campoPesquisa = document.getElementById("pesquisaOS");

const btnPesquisar = document.getElementById("btnPesquisar");

const btnLimpar = document.getElementById("btnLimpar");

const mensagemPesquisa =
    document.getElementById("mensagemPesquisa");

const semResultado =
    document.getElementById("semResultado");


/* =========================================================
   PESQUISAR OS
   ========================================================= */

function pesquisarOS() {

    const numeroDigitado =
        campoPesquisa.value.trim();

    const cards =
        document.querySelectorAll(".os-card");


    /* Se estiver vazio, mostra todas */

    if (numeroDigitado === "") {

        cards.forEach(function(card) {

            card.style.display = "";

        });

        mensagemPesquisa.classList.remove("mostrar");

        semResultado.classList.remove("mostrar");

        return;
    }


    let encontrou = false;


    /* Procura pelo número */

    cards.forEach(function(card) {

        const numeroOS =
            card.getAttribute("data-os");


        if (numeroOS === numeroDigitado) {

            card.style.display = "";

            encontrou = true;

        } else {

            card.style.display = "none";

        }

    });


    /* Resultado */

    if (encontrou) {

        mensagemPesquisa.classList.remove("mostrar");

        semResultado.classList.remove("mostrar");

    } else {

        mensagemPesquisa.textContent =
            "Nenhuma OS encontrada com o número " +
            numeroDigitado +
            ".";

        mensagemPesquisa.classList.add("mostrar");

        semResultado.classList.add("mostrar");

    }

}


/* =========================================================
   BOTÃO PESQUISAR
   ========================================================= */

btnPesquisar.addEventListener(
    "click",
    pesquisarOS
);


/* =========================================================
   ENTER NO CAMPO DE PESQUISA
   ========================================================= */

campoPesquisa.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            pesquisarOS();

        }

    }
);


/* =========================================================
   BOTÃO LIMPAR
   ========================================================= */

btnLimpar.addEventListener(
    "click",
    function() {

        campoPesquisa.value = "";


        const cards =
            document.querySelectorAll(".os-card");


        cards.forEach(function(card) {

            card.style.display = "";

        });


        mensagemPesquisa.classList.remove("mostrar");

        semResultado.classList.remove("mostrar");

        campoPesquisa.focus();

    }
);


/* =========================================================
   BOTÕES DE DETALHES
   ========================================================= */

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


            /* Muda o texto do botão */

            if (detalhes.classList.contains("aberto")) {

                botao.innerHTML =
                    '<i class="fa-solid fa-chevron-up"></i> Fechar detalhes';

            } else {

                botao.innerHTML =
                    '<i class="fa-solid fa-eye"></i> Ver detalhes';

            }

        }
    );

});


/* =========================================================
   BOTÃO SAIR
   ========================================================= */

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


/* =========================================================
   NOTIFICAÇÕES
   ========================================================= */

const btnNotificacao =
    document.getElementById("btnNotificacao");


if (btnNotificacao) {

    btnNotificacao.addEventListener(
        "click",
        function() {

            alert(
                "Você possui 2 notificações."
            );

        }
    );

}


/* =========================================================
   ABRIR OS ATRAVÉS DA URL
   Exemplo:
   minhas-os.html?os=1024
   ========================================================= */

const parametros =
    new URLSearchParams(
        window.location.search
    );


const osURL =
    parametros.get("os");


if (osURL) {

    campoPesquisa.value = osURL;

    pesquisarOS();

}