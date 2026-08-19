import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Importações do Firestore (para salvar nome, telefone, etc)
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const db = getFirestore();
const provider = new GoogleAuthProvider();

/* =========================
   LÓGICA DE LOGIN (E-mail/Senha)
========================= */
const loginBtn = document.getElementById("btnLogin");
if (loginBtn) {
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      alert("Login realizado com sucesso!");
      window.location.href = "/inicio/inicio.html";
    } catch (error) {
      alert("Erro no login: " + error.message);
    }
  });
}

/* =========================
   LÓGICA DE LOGIN COM GOOGLE
========================= */
// Verifique se o botão no HTML tem o id="btnGoogle"
const btnGoogle = document.getElementById("btnGoogle");
if (btnGoogle) {
  btnGoogle.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Salva os dados do Google no Firestore (caso seja o primeiro login)
      await setDoc(doc(db, "usuarios", user.uid), {
        nome: user.displayName,
        email: user.email,
        foto: user.photoURL,
        uid: user.uid
      }, { merge: true }); // O merge evita apagar dados que já existiam

      alert("Login com Google realizado!");
      window.location.href = "/inicio/inicio.html";
    } catch (error) {
      alert("Erro ao conectar com Google: " + error.message);
    }
  });
}

/* =========================
   LÓGICA DE CADASTRO (Firestore + Auth)
========================= */
const btnCadastrar = document.getElementById("btnCadastrar");
if (btnCadastrar) {
  btnCadastrar.addEventListener("click", async (e) => {
    e.preventDefault();
    
    // Pegando todos os dados do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const nascimento = document.getElementById("nascimento").value;
    const genero = document.getElementById("genero").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      // 1. Cria o usuário no Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // 2. Salva o restante das informações no Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nome: nome,
        email: email,
        telefone: telefone,
        nascimento: nascimento,
        genero: genero,
        uid: user.uid
      });

      alert("Conta criada com sucesso!");
      window.location.href = "/login/login.html";
    } catch (error) {
      alert("Erro no cadastro: " + error.message);
    }
  });
}

/* =========================
   REDIRECIONAR PARA CADASTRO
========================= */
const irCadastro = document.getElementById("irCadastro");
if (irCadastro) {
  irCadastro.addEventListener("click", () => {
    window.location.href = "/cadastro/cadastro.html";
  });
}