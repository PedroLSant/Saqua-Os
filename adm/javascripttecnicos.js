const campoPesquisa =
    document.getElementById(
        "pesquisaTecnico"
    );


const btnLimpar =
    document.getElementById(
        "btnLimpar"
    );


const mensagemPesquisa =
    document.getElementById(
        "mensagemPesquisa"
    );


const semResultado =
    document.getElementById(
        "semResultado"
    );


const cards =
    document.querySelectorAll(
        ".tecnico-card"
    );



/* =========================================
   PESQUISAR TÉCNICO
========================================= */

function pesquisarTecnicos() {

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


        const especialidade =
            card
            .getAttribute("data-especialidade")
            .toLowerCase();


        const encontrado =

            nome.includes(pesquisa) ||

            email.includes(pesquisa) ||

            especialidade.includes(pesquisa);


        if (encontrado) {

            card.style.display = "";

            encontrou = true;

        } else {

            card.style.display = "none";

        }

    });


    if (
        pesquisa !== "" &&
        !encontrou
    ) {

        mensagemPesquisa.textContent =
            "Nenhum técnico encontrado.";

        semResultado.classList.add(
            "mostrar"
        );

    } else {

        mensagemPesquisa.textContent = "";

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
        pesquisarTecnicos
    );


    campoPesquisa.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                pesquisarTecnicos();

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


            mensagemPesquisa.textContent = "";


            semResultado.classList.remove(
                "mostrar"
            );


            campoPesquisa.focus();

        }
    );

}



/* =========================================
   NOVO TÉCNICO
========================================= */

const btnNovo =
    document.getElementById(
        "btnNovo"
    );


if (btnNovo) {

    btnNovo.addEventListener(
        "click",
        function() {

            alert(
                "O cadastro de novos técnicos será integrado ao sistema posteriormente."
            );

        }
    );

}



/* =========================================
   EDITAR
========================================= */

const botoesEditar =
    document.querySelectorAll(
        ".btn-editar"
    );


botoesEditar.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            alert(
                "A edição dos dados do técnico será integrada ao sistema posteriormente."
            );

        }
    );

});



/* =========================================
   VER OS
========================================= */

const botoesOS =
    document.querySelectorAll(
        ".btn-os"
    );


botoesOS.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            alert(
                "As Ordens de Serviço deste técnico serão integradas ao sistema posteriormente."
            );

        }
    );

});



/* =========================================
   APROVAR
========================================= */

const botoesAprovar =
    document.querySelectorAll(
        ".btn-aprovar"
    );


botoesAprovar.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            const confirmar =
                confirm(
                    "Deseja aprovar este técnico?"
                );


            if (confirmar) {

                alert(
                    "Técnico aprovado com sucesso!"
                );

            }

        }
    );

});



/* =========================================
   EXCLUIR
========================================= */

const botoesExcluir =
    document.querySelectorAll(
        ".btn-excluir"
    );


botoesExcluir.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            const confirmar =
                confirm(
                    "Deseja realmente excluir este técnico?"
                );


            if (confirmar) {

                alert(
                    "A exclusão será integrada ao sistema posteriormente."
                );

            }

        }
    );

});



/* =========================================
   SUBMENU
========================================= */

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
                "aberto"
            );


            btnUsuarios.classList.toggle(
                "fechado"
            );

        }
    );

}



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
                "Você possui 4 notificações:\n\n" +

                "• 1 técnico aguarda aprovação.\n" +

                "• 2 novos clientes aguardam aprovação.\n" +

                "• A OS #1024 está em execução.\n" +

                "• A OS #1021 foi aberta recentemente."
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