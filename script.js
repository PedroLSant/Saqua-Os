import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


const provider = new GoogleAuthProvider();


// ========================================
// REDIRECIONAR PELO TIPO DE USUÁRIO
// ========================================

async function redirecionarPorRole(uid) {

  try {

    const resposta = await fetch(
      "http://127.0.0.1:8000/api/usuario/" + uid + "/"
    );

    const dados = await resposta.json();

    if (!resposta.ok) {

      alert(
        "Usuário não encontrado no sistema."
      );

      return;
    }

    const role = dados.role;
    const status = dados.status;


    // ====================================
    // VERIFICAR STATUS
    // ====================================

    if (status !== "aprovado") {

      alert(
        "Seu cadastro ainda está aguardando aprovação."
      );

      return;
    }


    // ====================================
    // REDIRECIONAR PELO ROLE
    // ====================================

    if (role === "admin") {

      window.location.href =
        "/adm/index.html";

    } else if (role === "supervisor") {

      window.location.href =
        "/supervisor/index.html";

    } else if (role === "atendente") {

      window.location.href =
        "/atendente/index.html";

    } else if (role === "tecnico") {

      window.location.href =
        "/tecnico/index.html";

    } else if (role === "cliente") {

      window.location.href =
        "/cliente/index.html";

    } else {

      alert(
        "Tipo de usuário não reconhecido."
      );

    }

  } catch (error) {

    alert(
      "Não foi possível consultar o sistema: " +
      error.message
    );

  }

}


// ========================================
// LOGIN COM E-MAIL E SENHA
// ========================================

const loginBtn =
  document.getElementById("btnLogin");


if (loginBtn) {

  loginBtn.addEventListener(
    "click",
    async (e) => {

      e.preventDefault();

      const email =
        document.getElementById("loginEmail").value;

      const senha =
        document.getElementById("loginSenha").value;


      try {

        const cred =
          await signInWithEmailAndPassword(
            auth,
            email,
            senha
          );

        await redirecionarPorRole(
          cred.user.uid
        );

      } catch (error) {

        alert(
          "Erro no login: " +
          error.message
        );

      }

    }
  );

}


// ========================================
// MOSTRAR E OCULTAR SENHA
// ========================================

const mostrarSenha =
  document.getElementById("mostrarSenha");

const loginSenha =
  document.getElementById("loginSenha");


if (mostrarSenha && loginSenha) {

  mostrarSenha.addEventListener(
    "click",
    () => {

      if (loginSenha.type === "password") {

        loginSenha.type = "text";

        mostrarSenha.textContent = "🙈";

        mostrarSenha.title =
          "Ocultar senha";

      } else {

        loginSenha.type = "password";

        mostrarSenha.textContent = "👁️";

        mostrarSenha.title =
          "Mostrar senha";
      }

    }
  );

}


// ========================================
// ESQUECI MINHA SENHA
// ========================================

const esqueciSenha =
  document.getElementById("esqueciSenha");


if (esqueciSenha) {

  esqueciSenha.addEventListener(
    "click",
    async (e) => {

      e.preventDefault();

      const email =
        document.getElementById("loginEmail").value;


      if (!email) {

        alert(
          "Digite seu e-mail primeiro."
        );

        document
          .getElementById("loginEmail")
          .focus();

        return;
      }


      try {

        await sendPasswordResetEmail(
          auth,
          email
        );

        alert(
          "Enviamos um link para redefinir sua senha. " +
          "Verifique seu e-mail."
        );

      } catch (error) {

        if (
          error.code ===
          "auth/user-not-found"
        ) {

          alert(
            "Não encontramos uma conta com esse e-mail."
          );

        } else if (
          error.code ===
          "auth/invalid-email"
        ) {

          alert(
            "Digite um e-mail válido."
          );

        } else {

          alert(
            "Não foi possível enviar o e-mail de recuperação: " +
            error.message
          );

        }

      }

    }
  );

}


// ========================================
// LOGIN COM GOOGLE
// ========================================

const btnGoogle =
  document.getElementById("btnGoogle");


if (btnGoogle) {

  btnGoogle.addEventListener(
    "click",
    async () => {

      try {

        const result =
          await signInWithPopup(
            auth,
            provider
          );

        const user =
          result.user;


        const ref =
          doc(
            db,
            "usuarios",
            user.uid
          );


        const snap =
          await getDoc(ref);


        if (!snap.exists()) {

          await setDoc(
            ref,
            {
              nome: user.displayName,
              email: user.email,
              foto: user.photoURL,
              uid: user.uid,
              role: "cliente"
            }
          );

        }


        await redirecionarPorRole(
          user.uid
        );


      } catch (error) {

        alert(
          "Erro ao conectar com Google: " +
          error.message
        );

      }

    }
  );

}


// ========================================
// CADASTRO
// ========================================

const btnCadastrar =
  document.getElementById("btnCadastrar");


if (btnCadastrar) {

  btnCadastrar.addEventListener(
    "click",
    async (e) => {

      e.preventDefault();


      const nome =
        document.getElementById("nome").value;

      const email =
        document.getElementById("email").value;

      const telefone =
        document.getElementById("telefone").value;

      const nascimento =
        document.getElementById("nascimento").value;

      const genero =
        document.getElementById("genero").value;

      const senha =
        document.getElementById("senha").value;

      const confirmarSenha =
        document
          .getElementById("confirmarSenha")
          .value;


      // VERIFICAR SENHAS

      if (senha !== confirmarSenha) {

        alert(
          "As senhas não coincidem!"
        );

        return;
      }


      try {

        // --------------------------------
        // 1. CRIAR USUÁRIO NO FIREBASE
        // --------------------------------

        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            senha
          );


        const user =
          userCredential.user;


        // --------------------------------
        // 2. ENVIAR USUÁRIO PARA O DJANGO
        // --------------------------------

        const resposta =
          await fetch(
            "http://127.0.0.1:8000/api/cadastro/",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                nome: nome,

                email: email,

                firebase_uid:
                  user.uid

              })
            }
          );


        const dados =
          await resposta.json();


        // --------------------------------
        // 3. VERIFICAR RESPOSTA DO DJANGO
        // --------------------------------

        if (!resposta.ok) {

          alert(
            "Erro ao cadastrar no sistema: " +
            dados.erro
          );

          return;
        }


        // --------------------------------
        // 4. CADASTRO CONCLUÍDO
        // --------------------------------

        alert(
          "Conta criada com sucesso!\n\n" +
          "Seu cadastro foi enviado para o sistema."
        );


        window.location.href =
          "/login/login.html";


      } catch (error) {

        alert(
          "Erro no cadastro: " +
          error.message
        );

      }

    }
  );

}


// ========================================
// IR PARA CADASTRO
// ========================================

const irCadastro =
  document.getElementById("irCadastro");


if (irCadastro) {

  irCadastro.addEventListener(
    "click",
    () => {

      window.location.href =
        "/cadastro/cadastro.html";

    }
  );

}