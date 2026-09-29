const formNovaOS =
    document.getElementById("formNovaOS");


/* =========================================
   CLIENTE
   ========================================= */

const cliente =
    document.getElementById("cliente");

const email =
    document.getElementById("email");

const telefone =
    document.getElementById("telefone");

const cpf =
    document.getElementById("cpf");


if (cliente) {

    cliente.addEventListener(
        "change",
        function() {

            const clientes = {

                carlos: {
                    email: "carlos@email.com",
                    telefone: "(22) 99999-0001",
                    cpf: "000.000.000-01"
                },

                mariana: {
                    email: "mariana@email.com",
                    telefone: "(22) 99999-0002",
                    cpf: "000.000.000-02"
                },

                joao: {
                    email: "joao@email.com",
                    telefone: "(22) 99999-0003",
                    cpf: "000.000.000-03"
                },

                fernanda: {
                    email: "fernanda@email.com",
                    telefone: "(22) 99999-0004",
                    cpf: "000.000.000-04"
                }

            };


            const dados =
                clientes[cliente.value];


            if (dados) {

                email.value =
                    dados.email;

                telefone.value =
                    dados.telefone;

                cpf.value =
                    dados.cpf;

            } else {

                email.value = "";
                telefone.value = "";
                cpf.value = "";

            }

        }
    );

}


/* =========================================
   ENVIO DO FORMULÁRIO
   ========================================= */

if (formNovaOS) {

    formNovaOS.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const clienteSelecionado =
                cliente.value;

            const equipamento =
                document.getElementById(
                    "equipamento"
                ).value;

            const problema =
                document.getElementById(
                    "problema"
                ).value;


            if (
                clienteSelecionado === "" ||
                equipamento === "" ||
                problema.trim() === ""
            ) {

                alert(
                    "Preencha todos os campos obrigatórios."
                );

                return;

            }


            const confirmar =
                confirm(
                    "Deseja realmente criar esta Ordem de Serviço?"
                );


            if (!confirmar) {

                return;

            }


            alert(
                "Ordem de Serviço criada com sucesso!\n\n" +
                "Status inicial: Aguardando diagnóstico."
            );


            formNovaOS.reset();

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