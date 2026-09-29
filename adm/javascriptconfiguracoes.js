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


/* SALVAR */

const btnSalvar =
    document.getElementById(
        "btnSalvar"
    );


if (btnSalvar) {

    btnSalvar.addEventListener(
        "click",
        function() {

            alert(
                "Configurações salvas com sucesso!\n\n" +
                "As alterações serão integradas ao sistema posteriormente."
            );

        }
    );

}


/* RESTAURAR */

const btnRestaurar =
    document.getElementById(
        "btnRestaurar"
    );


if (btnRestaurar) {

    btnRestaurar.addEventListener(
        "click",
        function() {

            const confirmar =
                confirm(
                    "Deseja restaurar as configurações padrão?"
                );


            if (!confirmar) {
                return;
            }


            document.getElementById(
                "nomeSistema"
            ).value = "Saqua OS";


            document.getElementById(
                "descricaoSistema"
            ).value =
                "Sistema de Gestão de Serviços";


            document.getElementById(
                "emailSistema"
            ).value =
                "contato@saquaos.com";


            document.getElementById(
                "prazoOS"
            ).value = "2";


            document.getElementById(
                "prioridade"
            ).value = "normal";


            document.getElementById(
                "notificarAlteracoes"
            ).checked = true;


            document.getElementById(
                "aprovacaoClientes"
            ).checked = true;


            document.getElementById(
                "cadastroPublico"
            ).checked = true;


            document.getElementById(
                "loginGoogle"
            ).checked = true;


            document.getElementById(
                "notificarNovaOS"
            ).checked = true;


            document.getElementById(
                "notificarConclusao"
            ).checked = true;


            document.getElementById(
                "alertasPrioritarios"
            ).checked = true;


            alert(
                "Configurações padrão restauradas."
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
                "Você possui 4 notificações:\n\n" +
                "• A OS #1021 está aguardando técnico.\n" +
                "• A OS #1024 está em execução.\n" +
                "• A OS #1018 está em análise.\n" +
                "• A OS #1015 foi concluída."
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