const clientesArea =
    document.querySelector(".clientes-area");

const pesquisaCliente =
    document.getElementById("pesquisaCliente");

const btnLimpar =
    document.getElementById("btnLimpar");

const mensagemPesquisa =
    document.getElementById("mensagemPesquisa");

const semResultado =
    document.getElementById("semResultado");

const totalClientes =
    document.getElementById("totalClientes");

const clientesAtivos =
    document.getElementById("clientesAtivos");

const clientesPendentes =
    document.getElementById("clientesPendentes");

const novosClientes =
    document.getElementById("novosClientes");


let todosClientes = [];



/* =========================
   INICIAIS DO CLIENTE
========================= */

function obterIniciais(nome) {

    if (!nome) {

        return "CL";

    }

    const partes =
        nome.trim().split(" ");


    if (partes.length === 1) {

        return partes[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        partes[0].charAt(0) +
        partes[partes.length - 1].charAt(0)
    ).toUpperCase();

}



/* =========================
   CARREGAR CLIENTES
========================= */

async function carregarClientes() {

    try {

        const resposta = await fetch(
            "http://127.0.0.1:8000/api/usuarios/"
        );


        const dados = await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                dados.erro ||
                "Erro ao carregar clientes."
            );

        }


        /*
            Pega somente os usuários
            que são clientes.
        */

        todosClientes =
            dados.filter(function(usuario) {

                return usuario.role === "cliente";

            });


        atualizarResumo(todosClientes);

        mostrarClientes(todosClientes);


    } catch (erro) {

        console.error(
            "Erro ao carregar clientes:",
            erro
        );


        mensagemPesquisa.textContent =
            "Não foi possível carregar os clientes.";

    }

}



/* =========================
   MOSTRAR CLIENTES
========================= */

function mostrarClientes(clientes) {


    /*
        IMPORTANTE:

        Não podemos usar:

        clientesArea.innerHTML = "";

        porque o template está dentro
        de clientesArea.

        Então removemos somente os
        cards existentes.
    */

    const cardsExistentes =
        clientesArea.querySelectorAll(
            ".cliente-card"
        );


    cardsExistentes.forEach(
        function(card) {

            card.remove();

        }
    );



    /* SE NÃO EXISTIR CLIENTE */

    if (clientes.length === 0) {

        semResultado.classList.add(
            "mostrar"
        );


        mensagemPesquisa.textContent =
            "Nenhum cliente cadastrado.";


        return;

    }


    semResultado.classList.remove(
        "mostrar"
    );


    mensagemPesquisa.textContent = "";



    /*
        Pega o template que continua
        dentro do HTML.
    */

    const modelo =
        document.getElementById(
            "modeloCliente"
        );


    if (!modelo) {

        console.error(
            "Template modeloCliente não encontrado."
        );

        return;

    }



    /* CRIA CADA CLIENTE */

    clientes.forEach(function(cliente) {


        /*
            Copia o template.
        */

        const copia =
            modelo.content.cloneNode(true);


        const card =
            copia.querySelector(
                ".cliente-card"
            );



        /* DADOS DO CARD */

        card.setAttribute(
            "data-id",
            cliente.id
        );


        card.setAttribute(
            "data-nome",
            cliente.nome
        );


        card.setAttribute(
            "data-email",
            cliente.email
        );



        /* AVATAR */

        const avatar =
            copia.querySelector(
                ".cliente-avatar"
            );


        avatar.textContent =
            obterIniciais(
                cliente.nome
            );



        /* NOME */

        const nome =
            copia.querySelector(
                ".cliente-identidade h2"
            );


        nome.textContent =
            cliente.nome;



        /* NÚMERO DO CLIENTE */

        const numeroCliente =
            copia.querySelector(
                ".cliente-identidade span"
            );


        numeroCliente.textContent =
            "Cliente #" +
            String(cliente.id)
                .padStart(3, "0");



        /* EMAIL */

        const email =
            copia.querySelector(
                ".cliente-email"
            );


        email.textContent =
            cliente.email;



        /* ID */

        const clienteId =
            copia.querySelector(
                ".cliente-id"
            );


        clienteId.textContent =
            "ID: " + cliente.id;



        /* STATUS */

        const status =
            copia.querySelector(
                ".status"
            );


        const textoStatus =
            copia.querySelector(
                ".cliente-status"
            );



        if (
            cliente.status ===
            "aprovado"
        ) {


            /*
                CLIENTE ATIVO
            */

            status.textContent =
                "Ativo";


            status.className =
                "status ativo";


            textoStatus.textContent =
                "Status: aprovado";


        } else {


            /*
                CLIENTE PENDENTE
            */

            status.textContent =
                "Pendente";


            status.className =
                "status pendente";


            textoStatus.textContent =
                "Status: pendente";

        }



        /* BOTÃO APROVAR */

        const botaoAprovar =
            copia.querySelector(
                ".btn-aprovar"
            );


        botaoAprovar.setAttribute(
            "data-id",
            cliente.id
        );



        /*
            Se o cliente já estiver
            aprovado, esconde o botão.

            Se estiver pendente,
            o botão continua aparecendo.
        */

        if (
            cliente.status ===
            "aprovado"
        ) {

            botaoAprovar.style.display =
                "none";

        } else {

            botaoAprovar.style.display =
                "block";

        }



        /*
            Adiciona o card na tela.
        */

        clientesArea.appendChild(
            copia
        );

    });



    configurarBotoes();

}



/* =========================
   RESUMO
========================= */

function atualizarResumo(clientes) {


    /* TOTAL */

    totalClientes.textContent =
        clientes.length;



    /* ATIVOS */

    const ativos =
        clientes.filter(function(cliente) {

            return cliente.status ===
                "aprovado";

        });


    clientesAtivos.textContent =
        ativos.length;



    /* PENDENTES */

    const pendentes =
        clientes.filter(function(cliente) {

            return cliente.status !==
                "aprovado";

        });


    clientesPendentes.textContent =
        pendentes.length;



    /*
        Por enquanto permanece 0,
        pois sua API ainda não
        envia data de cadastro.
    */

    novosClientes.textContent =
        "0";

}



/* =========================
   APROVAR CLIENTE
========================= */

async function aprovarCliente(id) {


    const confirmar =
        confirm(
            "Deseja aprovar este cliente?"
        );


    if (!confirmar) {

        return;

    }


    try {


        const resposta =
            await fetch(

                "http://127.0.0.1:8000/api/usuario/" +
                id +
                "/aprovar/",

                {
                    method: "POST"
                }

            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(
                dados.erro ||
                "Não foi possível aprovar o cliente."
            );

            return;

        }


        alert(
            "Cliente aprovado com sucesso!"
        );


        /*
            Atualiza novamente a lista.

            O cliente passa de:

            Pendente

            para:

            Ativo
        */

        carregarClientes();


    } catch (erro) {

        console.error(erro);


        alert(
            "Erro ao conectar com o sistema."
        );

    }

}



/* =========================
   CONFIGURAR BOTÕES
========================= */

function configurarBotoes() {


    /* BOTÃO APROVAR */

    const botoesAprovar =
        document.querySelectorAll(
            ".btn-aprovar"
        );


    botoesAprovar.forEach(
        function(botao) {


            botao.addEventListener(
                "click",
                function() {


                    const id =
                        botao.getAttribute(
                            "data-id"
                        );


                    aprovarCliente(id);

                }
            );

        }
    );



    /* BOTÃO EDITAR */

    const botoesEditar =
        document.querySelectorAll(
            ".btn-editar"
        );


    botoesEditar.forEach(
        function(botao) {


            botao.addEventListener(
                "click",
                function() {


                    const card =
                        botao.closest(
                            ".cliente-card"
                        );


                    const nome =
                        card.getAttribute(
                            "data-nome"
                        );


                    alert(
                        "Editar cliente: " +
                        nome
                    );

                }
            );

        }
    );



    /* BOTÃO VER OS */

    const botoesOS =
        document.querySelectorAll(
            ".btn-os"
        );


    botoesOS.forEach(
        function(botao) {


            botao.addEventListener(
                "click",
                function() {


                    const card =
                        botao.closest(
                            ".cliente-card"
                        );


                    const id =
                        card.getAttribute(
                            "data-id"
                        );


                    alert(
                        "Visualizar OS do cliente ID: " +
                        id
                    );

                }
            );

        }
    );



    /* BOTÃO EXCLUIR */

    const botoesExcluir =
        document.querySelectorAll(
            ".btn-excluir"
        );


    botoesExcluir.forEach(
        function(botao) {


            botao.addEventListener(
                "click",
                function() {


                    const card =
                        botao.closest(
                            ".cliente-card"
                        );


                    const nome =
                        card.getAttribute(
                            "data-nome"
                        );


                    const confirmar =
                        confirm(
                            "Deseja excluir o cliente " +
                            nome +
                            "?"
                        );


                    if (!confirmar) {

                        return;

                    }


                    alert(
                        "Exclusão ainda será integrada ao Django."
                    );

                }
            );

        }
    );

}



/* =========================
   PESQUISA
========================= */

pesquisaCliente.addEventListener(
    "input",
    function() {


        const texto =
            pesquisaCliente.value
                .toLowerCase()
                .trim();


        if (texto === "") {

            mostrarClientes(
                todosClientes
            );

            return;

        }


        const resultados =
            todosClientes.filter(
                function(cliente) {


                    const nome =
                        cliente.nome
                            .toLowerCase();


                    const email =
                        cliente.email
                            .toLowerCase();


                    return (
                        nome.includes(texto) ||
                        email.includes(texto)
                    );

                }
            );


        if (resultados.length === 0) {

            mensagemPesquisa.textContent =
                "Nenhum cliente encontrado.";

        } else {

            mensagemPesquisa.textContent =
                resultados.length +
                " cliente(s) encontrado(s).";

        }


        mostrarClientes(
            resultados
        );

    }
);



/* =========================
   LIMPAR PESQUISA
========================= */

btnLimpar.addEventListener(
    "click",
    function() {


        pesquisaCliente.value = "";


        mensagemPesquisa.textContent =
            "";


        mostrarClientes(
            todosClientes
        );

    }
);



/* =========================
   NOTIFICAÇÃO
========================= */

const btnNotificacao =
    document.getElementById(
        "btnNotificacao"
    );


if (btnNotificacao) {

    btnNotificacao.addEventListener(
        "click",
        function() {

            alert(
                "Não há novas notificações."
            );

        }
    );

}



/* =========================
   SAIR
========================= */

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
                    "Deseja sair do sistema?"
                );


            if (confirmar) {

                window.location.href =
                    "../login/login.html";

            }

        }
    );

}



/* =========================
   INICIAR
========================= */

carregarClientes();