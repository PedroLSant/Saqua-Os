const campoPesquisa =
    document.getElementById(
        "pesquisaSupervisor"
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
        ".supervisor-card"
    );


/* PESQUISA */

function pesquisarSupervisores() {

    const pesquisa =
        campoPesquisa.value
        .trim()
        .toLowerCase();

    let encontrou = false;

    cards.forEach(function(card) {

        const nome =
            card.getAttribute(
                "data-nome"
            ).toLowerCase();

        const email =
            card.getAttribute(
                "data-email"
            ).toLowerCase();

        const setor =
            card.getAttribute(
                "data-setor"
            ).toLowerCase();


        const corresponde =
            pesquisa === "" ||
            nome.includes(pesquisa) ||
            email.includes(pesquisa) ||
            setor.includes(pesquisa);


        if (corresponde) {

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
            "Nenhum supervisor encontrado.";

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


if (campoPesquisa) {

    campoPesquisa.addEventListener(
        "input",
        pesquisarSupervisores
    );


    campoPesquisa.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                pesquisarSupervisores();

            }

        }
    );

}


/* LIMPAR */

if (btnLimpar) {

    btnLimpar.addEventListener(
        "click",
        function() {

            campoPesquisa.value = "";


            cards.forEach(
                function(card) {

                    card.style.display = "";

                }
            );


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


/* EDITAR */

const botoesEditar =
    document.querySelectorAll(
        ".btn-editar"
    );


botoesEditar.forEach(
    function(botao) {

        botao.addEventListener(
            "click",
            function() {

                const nome =
                    botao.getAttribute(
                        "data-nome"
                    );


                alert(
                    "Edição do supervisor " +
                    nome +
                    " será integrada ao sistema posteriormente."
                );

            }
        );

    }
);


/* VER OS */

const botoesVer =
    document.querySelectorAll(
        ".btn-ver"
    );


botoesVer.forEach(
    function(botao) {

        botao.addEventListener(
            "click",
            function() {

                const nome =
                    botao.getAttribute(
                        "data-nome"
                    );


                alert(
                    "As Ordens de Serviço supervisionadas por " +
                    nome +
                    " serão exibidas nesta área posteriormente."
                );

            }
        );

    }
);


/* EXCLUIR */

const botoesExcluir =
    document.querySelectorAll(
        ".btn-excluir"
    );


botoesExcluir.forEach(
    function(botao) {

        botao.addEventListener(
            "click",
            function() {

                const nome =
                    botao.getAttribute(
                        "data-nome"
                    );


                const confirmar =
                    confirm(
                        "Deseja realmente excluir o supervisor " +
                        nome +
                        "?"
                    );


                if (confirmar) {

                    alert(
                        "A exclusão de " +
                        nome +
                        " será integrada ao sistema posteriormente."
                    );

                }

            }
        );

    }
);


/* APROVAR */

const botoesAprovar =
    document.querySelectorAll(
        ".btn-aprovar"
    );


botoesAprovar.forEach(
    function(botao) {

        botao.addEventListener(
            "click",
            function() {

                const nome =
                    botao.getAttribute(
                        "data-nome"
                    );


                const confirmar =
                    confirm(
                        "Deseja aprovar o supervisor " +
                        nome +
                        "?"
                    );


                if (confirmar) {

                    alert(
                        "Supervisor " +
                        nome +
                        " aprovado com sucesso!"
                    );

                }

            }
        );

    }
);


/* NOVO SUPERVISOR */

const btnNovoSupervisor =
    document.getElementById(
        "btnNovoSupervisor"
    );


if (btnNovoSupervisor) {

    btnNovoSupervisor.addEventListener(
        "click",
        function() {

            alert(
                "O cadastro de novos supervisores será integrado ao sistema posteriormente."
            );

        }
    );

}


/* USUÁRIOS */

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
                "mostrar"
            );

            btnUsuarios.classList.toggle(
                "aberto"
            );

        }
    );

}


/* NOTIFICAÇÕES */

const btnNotificacao =
    document.getElementById(
        "btnNotificacao"
    );


if (btnNotificacao) {

    btnNotificacao.addEventListener(
        "click",
        function() {

            alert(
                "Você possui 2 notificações:\n\n" +
                "• Felipe Alves aguarda aprovação.\n" +
                "• Há uma nova solicitação de supervisão."
            );

        }
    );

}


/* SAIR */

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