const btnUsuarios =
    document.getElementById(
        "btnUsuarios"
    );

const submenuUsuarios =
    document.getElementById(
        "submenuUsuarios"
    );


/* MENU USUÁRIOS */

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


/* CAMPOS */

const btnEditar =
    document.getElementById(
        "btnEditar"
    );

const btnCancelar =
    document.getElementById(
        "btnCancelar"
    );

const btnSalvar =
    document.getElementById(
        "btnSalvar"
    );

const campos =
    document.querySelectorAll(
        ".formulario input"
    );


const valoresOriginais = {};


campos.forEach(
    function(campo) {

        valoresOriginais[campo.id] =
            campo.value;

    }
);


/* EDITAR */

if (btnEditar) {

    btnEditar.addEventListener(
        "click",
        function() {

            campos.forEach(
                function(campo) {

                    campo.disabled = false;

                    campo.classList.add(
                        "editando"
                    );

                }
            );


            btnEditar.style.display =
                "none";

            btnCancelar.classList.add(
                "mostrar"
            );

            btnSalvar.classList.add(
                "mostrar"
            );


            campos[0].focus();

        }
    );

}


/* CANCELAR */

if (btnCancelar) {

    btnCancelar.addEventListener(
        "click",
        function() {

            campos.forEach(
                function(campo) {

                    campo.value =
                        valoresOriginais[
                            campo.id
                        ];

                    campo.disabled = true;

                    campo.classList.remove(
                        "editando"
                    );

                }
            );


            btnEditar.style.display =
                "block";

            btnCancelar.classList.remove(
                "mostrar"
            );

            btnSalvar.classList.remove(
                "mostrar"
            );

        }
    );

}


/* SALVAR DADOS */

if (btnSalvar) {

    btnSalvar.addEventListener(
        "click",
        function() {

            const nome =
                document
                .getElementById("nome")
                .value
                .trim();


            const email =
                document
                .getElementById("email")
                .value
                .trim();


            if (
                nome === "" ||
                email === ""
            ) {

                alert(
                    "Preencha os campos obrigatórios."
                );

                return;

            }


            campos.forEach(
                function(campo) {

                    valoresOriginais[
                        campo.id
                    ] = campo.value;

                    campo.disabled = true;

                    campo.classList.remove(
                        "editando"
                    );

                }
            );


            btnEditar.style.display =
                "block";

            btnCancelar.classList.remove(
                "mostrar"
            );

            btnSalvar.classList.remove(
                "mostrar"
            );


            alert(
                "Dados atualizados com sucesso!"
            );

        }
    );

}


/* ALTERAR SENHA */

const btnAlterarSenha =
    document.getElementById(
        "btnAlterarSenha"
    );

const areaSenha =
    document.getElementById(
        "areaSenha"
    );


if (btnAlterarSenha) {

    btnAlterarSenha.addEventListener(
        "click",
        function() {

            areaSenha.classList.toggle(
                "mostrar"
            );


            if (
                areaSenha.classList.contains(
                    "mostrar"
                )
            ) {

                btnAlterarSenha.innerHTML =
                    'Fechar <i class="fa-solid fa-chevron-up"></i>';

            } else {

                btnAlterarSenha.innerHTML =
                    'Alterar senha <i class="fa-solid fa-arrow-right"></i>';

            }

        }
    );

}


/* SALVAR SENHA */

const btnSalvarSenha =
    document.getElementById(
        "btnSalvarSenha"
    );


if (btnSalvarSenha) {

    btnSalvarSenha.addEventListener(
        "click",
        function() {

            const novaSenha =
                document
                .getElementById("novaSenha")
                .value;


            const confirmarSenha =
                document
                .getElementById("confirmarSenha")
                .value;


            if (
                novaSenha.length < 6
            ) {

                alert(
                    "A senha deve possuir pelo menos 6 caracteres."
                );

                return;

            }


            if (
                novaSenha !==
                confirmarSenha
            ) {

                alert(
                    "As senhas não são iguais."
                );

                return;

            }


            alert(
                "Senha alterada com sucesso!"
            );


            document
                .getElementById("novaSenha")
                .value = "";


            document
                .getElementById("confirmarSenha")
                .value = "";


            areaSenha.classList.remove(
                "mostrar"
            );


            btnAlterarSenha.innerHTML =
                'Alterar senha <i class="fa-solid fa-arrow-right"></i>';

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