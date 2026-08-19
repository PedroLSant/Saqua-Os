import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  doc, setDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const provider = new GoogleAuthProvider();

/* Redireciona pelo role */
async function redirecionarPorRole(uid) {
  const snap = await getDoc(doc(db, "usuarios", uid));
  const role = snap.exists() ? snap.data().role : "cliente";
  if (role === "admin") {
    window.location.href = "/adm/index.html";
  } else {
    window.location.href = "/inicio/inicio.html";
  }
}

/* ========================
   LOGIN EMAIL/SENHA
======================== */
const loginBtn = document.getElementById("btnLogin");
if (loginBtn) {
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;
    try {
      const cred = await signInWithEmailAndPassword(auth, email, senha);
      await redirecionarPorRole(cred.user.uid);
    } catch (error) {
      alert("Erro no login: " + error.message);
    }
  });
}

/* ========================
   LOGIN GOOGLE
======================== */
const btnGoogle = document.getElementById("btnGoogle");
if (btnGoogle) {
  btnGoogle.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Garante que o usuário existe no Firestore
      const ref = doc(db, "usuarios", user.uid);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, {
          nome: user.displayName,
          email: user.email,
          foto: user.photoURL,
          uid: user.uid,
          role: "cliente"
        });
      }

      await redirecionarPorRole(user.uid);
    } catch (error) {
      alert("Erro ao conectar com Google: " + error.message);
    }
  });
}

/* ========================
   CADASTRO
======================== */
const btnCadastrar = document.getElementById("btnCadastrar");
if (btnCadastrar) {
  btnCadastrar.addEventListener("click", async (e) => {
    e.preventDefault();
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        nome,
        email,
        telefone,
        nascimento,
        genero,
        uid: user.uid,
        role: "cliente"   // ← sempre cliente no cadastro
      });

      alert("Conta criada com sucesso!");
      window.location.href = "/login/login.html";
    } catch (error) {
      alert("Erro no cadastro: " + error.message);
    }
  });
}

/* Redireciona para cadastro */
const irCadastro = document.getElementById("irCadastro");
if (irCadastro) {
  irCadastro.addEventListener("click", () => {
    window.location.href = "/cadastro/cadastro.html";
  });
}
