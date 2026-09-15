import { auth, db } from "../firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const authNav = document.getElementById("auth-nav");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    let nome = user.displayName;
    let foto = user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    if (!nome) {
      try {
        const snap = await getDoc(doc(db, "usuarios", user.uid));
        if (snap.exists()) nome = snap.data().nome;
      } catch (e) {
        nome = "Usuário";
      }
    }

    // Nome vira link clicável para /cliente/
    authNav.innerHTML = `
      <div class="perfil-container">
        <a href="/cliente/index.html" class="perfil-link" title="Meu painel">
          <img src="${foto}" class="avatar-topo">
          <span class="nome-topo">Olá, ${nome.split(' ')[0]}</span>
        </a>
        <button id="btnSair" class="sair-topo">Sair</button>
      </div>
    `;

    document.getElementById("btnSair").addEventListener("click", () => {
      signOut(auth).then(() => window.location.reload());
    });

  } else {
    authNav.innerHTML = `<a href="../login/login.html">Fazer Login</a>`;
  }
});
