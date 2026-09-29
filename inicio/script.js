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

    authNav.innerHTML = `
      <div class="perfil-container">
        <img src="${foto}" class="avatar-topo">
        <span class="nome-topo">Olá, ${nome.split(' ')[0]}</span>

        <!-- Botão hamburger -->
        <button class="menu-hamburguer" id="btnMenu" title="Menu">
          <span></span><span></span><span></span>
        </button>

        <!-- Dropdown -->
        <div class="dropdown-menu oculto" id="dropdownMenu">
          <a href="/cliente/index.html" class="dropdown-item">
            📦 Meu Pedido
          </a>
          <a href="/cliente/index.html#chat" class="dropdown-item">
            💬 Chat
          </a>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item dropdown-sair" id="btnSair">
            🚪 Sair
          </button>
        </div>
      </div>
    `;

    // Toggle do menu
    document.getElementById("btnMenu").addEventListener("click", (e) => {
      e.stopPropagation();
      document.getElementById("dropdownMenu").classList.toggle("oculto");
    });

    // Fecha ao clicar fora
    document.addEventListener("click", () => {
      document.getElementById("dropdownMenu").classList.add("oculto");
    });

    // Sair
    document.getElementById("btnSair").addEventListener("click", () => {
      signOut(auth).then(() => window.location.reload());
    });

  } else {
    authNav.innerHTML = `<a href="../login/login.html">Fazer Login</a>`;
  }
});
