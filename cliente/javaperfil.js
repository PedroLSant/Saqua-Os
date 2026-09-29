/* =========================================================
   PERFIL DO CLIENTE - SAQUA OS
   ========================================================= */


/* =========================================================
   ELEMENTOS
   ========================================================= */

const btnEditar =
    document.getElementById("btnEditar");

const btnSalvar =
    document.getElementById("btnSalvar");

const formPerfil =
    document.getElementById("formPerfil");

const btnAlterarSenha =
    document.getElementById("btnAlterarSenha");

const alterarSenha =
    document.getElementById("alterarSenha");

const btnConfirmarSenha =
    document.getElementById("btnConfirmarSenha");

const btnSair =
    document.getElementById("btnSair");

const btnNotificacao =
    document.getElementById("btnNotificacao");


/* =========================================================
   CAMPOS
   ========================================================= */

const campos =
    document.querySelectorAll(
        "#formPerfil input"
    );


/* =========================================================
   BOTÃO EDITAR
   ========================================================= */

btnEditar.addEventListener(
    "click",
    function() {

        campos.forEach(function(campo) {

            campo.disabled = false;

        });


        campos[0].focus();


        btnEditar.innerHTML =
            '<i class="fa-solid fa-check"></i> Editando';

    }
);


/* =========================================================
   SALVAR DADOS
   ========================================================= */

formPerfil.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        let nome =
            document.getElementById("nome").value.trim();

        let email =
            document.getElementById("email").value.trim();

        let telefone =
            document.getElementById("telefone").value.trim();


        if (nome === "") {

            alert(
                "Digite seu nome completo."
            );

            return;

        }


        if (email === "") {

            alert(
                "Digite seu e-mail."
            );

            return;

        }


        if (telefone === "") {

            alert(
                "Digite seu telefone."
            );

            return;

        }


        /* Bloqueia novamente os campos */

        campos.forEach(function(campo) {

            campo.disabled = true;

        });


        btnEditar.innerHTML =
            '<i class="fa-solid fa-pen"></i> Editar dados';


        alert(
            "Dados atualizados com sucesso!"
        );

    }
);


/* =========================================================
   ALTERAR SENHA
   ========================================================= */

btnAlterarSenha.addEventListener(
    "click",
    function() {

        alterarSenha.classList.toggle("aberto");


        if (
            alterarSenha.classList.contains("aberto")
        ) {

            btnAlterarSenha.textContent =
                "Cancelar";

        } else {

            btnAlterarSenha.textContent =
                "Alterar senha";

        }

    }
);


/* =========================================================
   CONFIRMAR SENHA
   ========================================================= */

btnConfirmarSenha.addEventListener(
    "click",
    function() {

        const novaSenha =
            document.getElementById("novaSenha").value;

        const confirmarSenha =
            document.getElementById("confirmarSenha").value;


        if (novaSenha === "") {

            alert(
                "Digite uma nova senha."
            );

            return;

        }


        if (novaSenha.length < 6) {

            alert(
                "A senha deve possuir pelo menos 6 caracteres."
            );

            return;

        }


        if (confirmarSenha === "") {

            alert(
                "Confirme a nova senha."
            );

            return;

        }


        if (novaSenha !== confirmarSenha) {

            alert(
                "As senhas não são iguais."
            );

            return;

        }


        alert(
            "Senha alterada com sucesso!"
        );


        document.getElementById("novaSenha").value = "";

        document.getElementById("confirmarSenha").value = "";


        alterarSenha.classList.remove("aberto");

        btnAlterarSenha.textContent =
            "Alterar senha";

    }
);


/* =========================================================
   NOTIFICAÇÕES
   ========================================================= */

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
   SAIR
   ========================================================= */

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