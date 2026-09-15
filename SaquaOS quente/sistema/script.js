import { auth, db } from "../firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let clienteUid = null;
let clienteNome = "";
let servicoSelecionado = null;

/* ===================================================
   AUTH
=================================================== */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Faça login para continuar.");
    window.location.href = "/login/login.html";
    return;
  }
  clienteUid = user.uid;

  const snap = await getDoc(doc(db, "usuarios", user.uid));
  if (snap.exists()) {
    clienteNome = snap.data().nome || user.displayName || user.email;
  } else {
    clienteNome = user.displayName || user.email;
  }

  carregarServicos();
});

/* ===================================================
   CARREGAR SERVIÇOS DO FIRESTORE
=================================================== */
async function carregarServicos() {
  const grid = document.getElementById("listaServicos");

  try {
    const snap = await getDoc(doc(db, "configuracoes", "precos"));
    const servicos = snap.exists() ? (snap.data().servicos || []) : [];

    if (!servicos.length) {
      grid.innerHTML = `
        <div class="vazio-msg">
          <p>Nenhum serviço disponível no momento.</p>
          <p>Entre em contato para mais informações.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = servicos.map((s, i) => `
      <div class="servico-card" data-index="${i}">
        <div class="card-icone">⚙</div>
        <h3 class="card-nome">${s.nome}</h3>
        <div class="card-info">
          <div class="card-valor">
            <span class="label">Valor</span>
            <span class="valor">R$ ${Number(s.valor || 0).toFixed(2)}</span>
          </div>
          <div class="card-prazo">
            <span class="label">Prazo</span>
            <span class="valor">${s.prazo || "—"} dias</span>
          </div>
        </div>
        <button class="botao-selecionar" onclick="selecionarServico(${i})">
          Selecionar
        </button>
      </div>
    `).join("");

  } catch (err) {
    console.error("Erro ao carregar serviços:", err);
    grid.innerHTML = `<div class="vazio-msg"><p>Erro ao carregar serviços.</p></div>`;
  }
}

/* ===================================================
   SELECIONAR SERVIÇO
=================================================== */
window.selecionarServico = async (index) => {
  const snap = await getDoc(doc(db, "configuracoes", "precos"));
  const servicos = snap.exists() ? (snap.data().servicos || []) : [];
  servicoSelecionado = servicos[index];

  if (!servicoSelecionado) return;

  document.getElementById("servicoEscolhido").innerHTML = `
    <div class="resumo-servico">
      <span class="resumo-nome">⚙ ${servicoSelecionado.nome}</span>
      <span class="resumo-valor">R$ ${Number(servicoSelecionado.valor || 0).toFixed(2)}</span>
      <span class="resumo-prazo">${servicoSelecionado.prazo || "—"} dias</span>
    </div>
  `;

  document.getElementById("etapa1").classList.add("oculto");
  document.getElementById("etapa2").classList.remove("oculto");
};

/* ===================================================
   VOLTAR PARA ETAPA 1
=================================================== */
document.getElementById("btnVoltar").addEventListener("click", () => {
  document.getElementById("etapa2").classList.add("oculto");
  document.getElementById("etapa1").classList.remove("oculto");
  servicoSelecionado = null;
});

/* ===================================================
   ENVIAR → SALVA NO SESSIONSTORAGE → REDIRECIONA PARA PAGAMENTO
=================================================== */
document.getElementById("formPedido").addEventListener("submit", (e) => {
  e.preventDefault();

  if (!servicoSelecionado || !clienteUid) return;

  const nome = document.getElementById("nomeSistema").value;
  const descricao = document.getElementById("descricao").value;

  const funcionalidades = [];
  document.querySelectorAll(".checkbox-group input:checked").forEach(cb => {
    funcionalidades.push(cb.value);
  });

  // Calcula prazo
  let prazoData = "";
  if (servicoSelecionado.prazo) {
    const hoje = new Date();
    hoje.setDate(hoje.getDate() + parseInt(servicoSelecionado.prazo));
    prazoData = hoje.toISOString().split("T")[0];
  }

  // Salva tudo no sessionStorage para a tela de pagamento
  sessionStorage.setItem("pedido", JSON.stringify({
    clienteId: clienteUid,
    clienteNome: clienteNome,
    nomeSistema: nome,
    descricao: descricao,
    servico: servicoSelecionado.nome,
    valor: servicoSelecionado.valor || "0",
    prazoDias: servicoSelecionado.prazo || "",
    prazoData: prazoData,
    funcionalidades: funcionalidades
  }));

  // Redireciona para pagamento
  window.location.href = "/pagamento/pagamento.html";
});
