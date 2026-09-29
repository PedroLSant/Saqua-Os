const campoPesquisa =
    document.getElementById(
        "pesquisaAtendente"
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
        ".atendente-card"
    );



/* =========================================
   PESQUISAR
========================================= */

function pesquisarAtendentes() {

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


        const telefone =
            card
            .getAttribute("data-telefone")
            .toLowerCase();


        const encontrado =

            nome.includes(pesquisa) ||

            email.includes(pesquisa) ||

            telefone.includes(pesquisa);


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
            "Nenhum atendente encontrado.";

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
        pesquisarAtendentes
    );


    campoPesquisa.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                pesquisarAtendentes();

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
   NOVO ATENDENTE
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
                "O cadastro de novos atendentes será integrado ao sistema posteriormente."
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
                "A edição dos dados do atendente será integrada ao sistema posteriormente."
            );

        }
    );

});



/* =========================================
   ATIVIDADE
========================================= */

const botoesAtividade =
    document.querySelectorAll(
        ".btn-atividade"
    );


botoesAtividade.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            alert(
                "O histórico de atividades do atendente será integrado aos relatórios posteriormente."
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
                    "Deseja aprovar este atendente?"
                );


            if (confirmar) {

                alert(
                    "Atendente aprovado com sucesso!"
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
                    "Deseja realmente excluir este atendente?"
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

                "• 1 atendente aguarda aprovação.\n" +

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