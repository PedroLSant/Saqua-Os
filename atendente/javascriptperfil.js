/* =========================================
   EDITAR DADOS
   ========================================= */

const btnEditar =
    document.getElementById("btnEditar");

const btnCancelar =
    document.getElementById("btnCancelar");

const btnSalvar =
    document.getElementById("btnSalvar");

const formEdicao =
    document.getElementById("formEdicao");


if (btnEditar) {

    btnEditar.addEventListener(
        "click",
        function() {

            formEdicao.classList.add(
                "mostrar"
            );

            btnEditar.style.display =
                "none";

        }
    );

}


if (btnCancelar) {

    btnCancelar.addEventListener(
        "click",
        function() {

            formEdicao.classList.remove(
                "mostrar"
            );

            btnEditar.style.display =
                "flex";

        }
    );

}


/* =========================================
   SALVAR DADOS
   ========================================= */

if (btnSalvar) {

    btnSalvar.addEventListener(
        "click",
        function() {

            const nome =
                document.getElementById(
                    "inputNome"
                ).value.trim();

            const email =
                document.getElementById(
                    "inputEmail"
                ).value.trim();

            const telefone =
                document.getElementById(
                    "inputTelefone"
                ).value.trim();

            const cpf =
                document.getElementById(
                    "inputCpf"
                ).value.trim();

            const endereco =
                document.getElementById(
                    "inputEndereco"
                ).value.trim();


            if (
                nome === "" ||
                email === ""
            ) {

                alert(
                    "Preencha pelo menos o nome e o e-mail."
                );

                return;

            }


            document.getElementById(
                "nome"
            ).textContent = nome;

            document.getElementById(
                "email"
            ).textContent = email;

            document.getElementById(
                "telefone"
            ).textContent = telefone;

            document.getElementById(
                "cpf"
            ).textContent = cpf;

            document.getElementById(
                "endereco"
            ).textContent = endereco;


            formEdicao.classList.remove(
                "mostrar"
            );

            btnEditar.style.display =
                "flex";


            alert(
                "Dados atualizados com sucesso!"
            );

        }
    );

}


/* =========================================
   ALTERAR SENHA
   ========================================= */

const btnAlterarSenha =
    document.getElementById(
        "btnAlterarSenha"
    );

const senhaForm =
    document.getElementById(
        "senhaForm"
    );


if (btnAlterarSenha) {

    btnAlterarSenha.addEventListener(
        "click",
        function() {

            senhaForm.classList.toggle(
                "mostrar"
            );

        }
    );

}


/* =========================================
   SALVAR SENHA
   ========================================= */

const btnSalvarSenha =
    document.getElementById(
        "btnSalvarSenha"
    );


if (btnSalvarSenha) {

    btnSalvarSenha.addEventListener(
        "click",
        function() {

            const novaSenha =
                document.getElementById(
                    "novaSenha"
                ).value;

            const confirmarSenha =
                document.getElementById(
                    "confirmarSenha"
                ).value;


            if (novaSenha.length < 6) {

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
                "Senha atualizada com sucesso!"
            );


            document.getElementById(
                "novaSenha"
            ).value = "";

            document.getElementById(
                "confirmarSenha"
            ).value = "";

            senhaForm.classList.remove(
                "mostrar"
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