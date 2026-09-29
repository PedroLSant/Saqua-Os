const campoPesquisa =
    document.getElementById("pesquisaCliente");

const btnLimpar =
    document.getElementById("btnLimpar");

const mensagemPesquisa =
    document.getElementById("mensagemPesquisa");

const semResultado =
    document.getElementById("semResultado");

const cards =
    document.querySelectorAll(".cliente-card");


function filtrarClientes() {

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


        const corresponde =
            pesquisa === "" ||
            nome.includes(pesquisa) ||
            email.includes(pesquisa) ||
            telefone.includes(pesquisa);


        if (corresponde) {

            card.style.display = "";

            encontrou = true;

        } else {

            card.style.display = "none";

        }

    });


    if (pesquisa !== "" && !encontrou) {

        mensagemPesquisa.textContent =
            "Nenhum cliente encontrado.";

        semResultado.classList.add("mostrar");

    } else {

        mensagemPesquisa.textContent = "";

        semResultado.classList.remove("mostrar");

    }

}


if (campoPesquisa) {

    campoPesquisa.addEventListener(
        "input",
        filtrarClientes
    );

}


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
   MODAL NOVO CLIENTE
   ========================================= */

const modalCliente =
    document.getElementById("modalCliente");

const btnNovoCliente =
    document.getElementById("btnNovoCliente");

const btnFecharModal =
    document.getElementById("btnFecharModal");

const btnCancelar =
    document.getElementById("btnCancelar");

const formCliente =
    document.getElementById("formCliente");


function abrirModal() {

    modalCliente.classList.add("mostrar");

}


function fecharModal() {

    modalCliente.classList.remove("mostrar");

}


if (btnNovoCliente) {

    btnNovoCliente.addEventListener(
        "click",
        abrirModal
    );

}


if (btnFecharModal) {

    btnFecharModal.addEventListener(
        "click",
        fecharModal
    );

}


if (btnCancelar) {

    btnCancelar.addEventListener(
        "click",
        fecharModal
    );

}


/* =========================================
   CADASTRAR CLIENTE
   ========================================= */

if (formCliente) {

    formCliente.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nome =
                document.getElementById(
                    "nomeCliente"
                ).value;


            const email =
                document.getElementById(
                    "emailCliente"
                ).value;


            if (
                nome.trim() === "" ||
                email.trim() === ""
            ) {

                alert(
                    "Preencha os campos obrigatórios."
                );

                return;

            }


            alert(
                "Cliente cadastrado com sucesso!"
            );


            formCliente.reset();

            fecharModal();

        }
    );

}


/* =========================================
   EDITAR CLIENTE
   ========================================= */

const botoesEditar =
    document.querySelectorAll(
        ".btn-editar"
    );


botoesEditar.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            const cliente =
                botao.getAttribute(
                    "data-cliente"
                );


            alert(
                "Edição do cliente " +
                cliente +
                " será integrada ao banco de dados posteriormente."
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

            const cliente =
                botao.getAttribute(
                    "data-cliente"
                );


            alert(
                "Consulta das OS de " +
                cliente +
                " será integrada posteriormente."
            );

        }
    );

});


/* =========================================
   EXCLUIR CLIENTE
   ========================================= */

const botoesExcluir =
    document.querySelectorAll(
        ".btn-excluir"
    );


botoesExcluir.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            const cliente =
                botao.getAttribute(
                    "data-cliente"
                );


            const confirmar =
                confirm(
                    "Deseja realmente excluir o cliente " +
                    cliente +
                    "?"
                );


            if (confirmar) {

                alert(
                    "A exclusão será integrada ao banco de dados posteriormente."
                );

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