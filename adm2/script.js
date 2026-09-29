import { auth, db } from "../firebase.js";
import {
  onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  collection, doc, getDoc, getDocs, onSnapshot,
  updateDoc, setDoc, addDoc, query, orderBy, serverTimestamp, where
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let adminUid = null;
let adminNome = "Admin";

onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = "/login/login.html"; return; }
  const snap = await getDoc(doc(db, "usuarios", user.uid));
  if (!snap.exists() || snap.data().role !== "admin") {
    alert("Acesso negado. Esta área é exclusiva para administradores.");
    await signOut(auth); window.location.href = "/login/login.html"; return;
  }
  adminUid = user.uid;
  adminNome = snap.data().nome || user.email;
  document.getElementById("adminNome").textContent = adminNome;
  inicializarOrdens();
  inicializarValores();
  inicializarChat();
  inicializarUsuarios();
});

document.getElementById("btnSair").addEventListener("click", async () => {
  await signOut(auth); window.location.href = "/login/login.html";
});

/* NAVEGAÇÃO */
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t => t.classList.add("oculto"));
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.remove("oculto");
  });
});

/* ===================================================
   ORDENS DE SERVIÇO + DASHBOARD
=================================================== */
let ordensCache = [];

function inicializarOrdens() {
  const q = query(collection(db, "ordens_servico"), orderBy("criadoEm", "desc"));
  onSnapshot(q, (snap) => {
    ordensCache = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    renderOrdens();
    renderDashboard();
  });
  document.getElementById("filtroStatus").addEventListener("change", renderOrdens);
}

function renderOrdens() {
  const filtro = document.getElementById("filtroStatus").value;
  const tbody = document.getElementById("listaOrdens");
  const dados = filtro ? ordensCache.filter(o => o.status === filtro) : ordensCache;
  if (!dados.length) { tbody.innerHTML = `<tr><td colspan="7" class="vazio">Nenhuma ordem encontrada.</td></tr>`; return; }
  tbody.innerHTML = dados.map((o, i) => `
    <tr>
      <td>#${i + 1}</td>
      <td>${o.clienteNome || "—"}</td>
      <td>${o.descricao || "—"}</td>
      <td><span class="pill pill-${o.status || 'pendente'}">${labelStatus(o.status)}</span></td>
      <td>${o.valor ? "R$ " + Number(o.valor).toFixed(2) : "—"}</td>
      <td>${o.prazo ? formatarData(o.prazo) : "—"}</td>
      <td><button class="btn-icon" title="Editar" onclick="abrirModalOS('${o.id}')">✏️</button></td>
    </tr>
  `).join("");
}

/* ===== DASHBOARD ===== */
function renderDashboard() {
  const concluidas = ordensCache.filter(o => o.status === "concluido");
  const pendentes = ordensCache.filter(o => o.status === "pendente");
  const emAndamento = ordensCache.filter(o => o.status === "em_andamento");
  const canceladas = ordensCache.filter(o => o.status === "cancelado");

  // Faturamento = soma de valores das concluídas
  const fat = concluidas.reduce((s, o) => s + Number(o.valor || 0), 0);
  const ticket = concluidas.length ? fat / concluidas.length : 0;

  document.getElementById("dashFaturamento").textContent = "R$ " + fat.toFixed(2).replace(".", ",");
  document.getElementById("dashConcluidas").textContent = concluidas.length;
  document.getElementById("dashPendentes").textContent = pendentes.length;
  document.getElementById("dashTicket").textContent = "R$ " + ticket.toFixed(2).replace(".", ",");

  // Barras de status
  const statusData = [
    { label: "Pendente", qtd: pendentes.length, cor: "#f6ad55" },
    { label: "Em andamento", qtd: emAndamento.length, cor: "#63b3ed" },
    { label: "Concluído", qtd: concluidas.length, cor: "#68d391" },
    { label: "Cancelado", qtd: canceladas.length, cor: "#fc8181" },
  ];
  const maxQtd = Math.max(...statusData.map(s => s.qtd), 1);
  document.getElementById("dashBarras").innerHTML = statusData.map(s => `
    <div class="dash-barra-item">
      <div class="dash-barra-info">
        <span class="dash-barra-label">${s.label}</span>
        <span class="dash-barra-num">${s.qtd}</span>
      </div>
      <div class="dash-barra-bg">
        <div class="dash-barra-fill" style="width:${(s.qtd/maxQtd)*100}%;background:${s.cor}"></div>
      </div>
    </div>
  `).join("");

  // Últimas ordens
  document.getElementById("dashUltimas").innerHTML = ordensCache.slice(0, 5).map(o => `
    <div class="dash-lista-item">
      <div class="dash-lista-info">
        <span class="dash-lista-nome">${o.clienteNome || "—"}</span>
        <span class="dash-lista-desc">${o.servico || o.descricao || "—"}</span>
      </div>
      <span class="pill pill-${o.status || 'pendente'}" style="font-size:11px">${labelStatus(o.status)}</span>
    </div>
  `).join("") || `<p style="color:#64748b;text-align:center;padding:20px">Nenhuma ordem ainda.</p>`;
}

function labelStatus(s) { return { pendente:"Pendente", em_andamento:"Em andamento", concluido:"Concluído", cancelado:"Cancelado" }[s] || s; }
function formatarData(str) { if (!str) return "—"; const [y,m,d] = str.split("-"); return `${d}/${m}/${y}`; }

window.abrirModalOS = async (id) => {
  const os = ordensCache.find(o => o.id === id); if (!os) return;
  document.getElementById("osId").value = id;
  document.getElementById("osStatus").value = os.status || "pendente";
  document.getElementById("osValor").value = os.valor || "";
  document.getElementById("osPrazo").value = os.prazo || "";
  document.getElementById("osObs").value = os.obs || "";
  document.getElementById("modalOS").classList.remove("oculto");
};
document.getElementById("btnCancelarOS").addEventListener("click", () => { document.getElementById("modalOS").classList.add("oculto"); });
document.getElementById("btnSalvarOS").addEventListener("click", async () => {
  const id = document.getElementById("osId").value;
  await updateDoc(doc(db, "ordens_servico", id), {
    status: document.getElementById("osStatus").value,
    valor: document.getElementById("osValor").value,
    prazo: document.getElementById("osPrazo").value,
    obs: document.getElementById("osObs").value
  });
  document.getElementById("modalOS").classList.add("oculto");
});

/* VALORES / PRAZOS */
let servicosCache = [];
async function inicializarValores() {
  const snap = await getDoc(doc(db, "configuracoes", "precos"));
  servicosCache = snap.exists() ? (snap.data().servicos || []) : [];
  renderValores();
  document.getElementById("btnAddServico").addEventListener("click", () => {
    document.getElementById("servicoIdx").value = "";
    document.getElementById("modalServicoTitulo").textContent = "Novo Serviço";
    document.getElementById("servicoNome").value = "";
    document.getElementById("servicoValor").value = "";
    document.getElementById("servicoPrazo").value = "";
    document.getElementById("modalServico").classList.remove("oculto");
  });
  document.getElementById("btnCancelarServico").addEventListener("click", () => { document.getElementById("modalServico").classList.add("oculto"); });
  document.getElementById("btnSalvarServico").addEventListener("click", async () => {
    const idx = document.getElementById("servicoIdx").value;
    const nome = document.getElementById("servicoNome").value;
    const valor = document.getElementById("servicoValor").value;
    const prazo = document.getElementById("servicoPrazo").value;
    if (!nome) { alert("Informe o nome do serviço."); return; }
    if (idx === "") servicosCache.push({ nome, valor, prazo });
    else servicosCache[parseInt(idx)] = { nome, valor, prazo };
    await setDoc(doc(db, "configuracoes", "precos"), { servicos: servicosCache });
    document.getElementById("modalServico").classList.add("oculto");
    renderValores();
  });
}
function renderValores() {
  const tbody = document.getElementById("listaValores");
  if (!servicosCache.length) { tbody.innerHTML = `<tr><td colspan="4" class="vazio">Nenhum serviço cadastrado.</td></tr>`; return; }
  tbody.innerHTML = servicosCache.map((s, i) => `
    <tr><td>${s.nome}</td><td>R$ ${Number(s.valor||0).toFixed(2)}</td><td>${s.prazo||"—"} dias</td>
    <td><button class="btn-icon" onclick="editarServico(${i})">✏️</button><button class="btn-icon" onclick="excluirServico(${i})">🗑️</button></td></tr>
  `).join("");
}
window.editarServico = (i) => { const s=servicosCache[i]; document.getElementById("servicoIdx").value=i; document.getElementById("modalServicoTitulo").textContent="Editar Serviço"; document.getElementById("servicoNome").value=s.nome; document.getElementById("servicoValor").value=s.valor; document.getElementById("servicoPrazo").value=s.prazo; document.getElementById("modalServico").classList.remove("oculto"); };
window.excluirServico = async (i) => { if(!confirm("Excluir?"))return; servicosCache.splice(i,1); await setDoc(doc(db,"configuracoes","precos"),{servicos:servicosCache}); renderValores(); };

/* CHAT */
let chatClienteAtivo = null, unsubMsgs = null;
function inicializarChat() {
  onSnapshot(collection(db, "chats"), (snap) => {
    const listaEl = document.getElementById("listaClientes");
    const chats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    if (!chats.length) { listaEl.innerHTML = `<p class="vazio-chat">Nenhuma conversa ainda.</p>`; atualizarBadge(0); return; }
    let totalNaoLido = 0; chats.forEach(c => { if (c.naoLidoAdmin > 0) totalNaoLido += c.naoLidoAdmin; }); atualizarBadge(totalNaoLido);
    listaEl.innerHTML = chats.sort((a,b) => (b.ultimoTimestamp?.seconds||0) - (a.ultimoTimestamp?.seconds||0)).map(c => `
      <div class="cliente-item ${chatClienteAtivo === c.id ? 'ativo' : ''}" onclick="abrirChat('${c.id}','${escapar(c.clienteNome||"Cliente")}')">
        <div class="cliente-nome">${c.clienteNome || "Cliente"}</div>
        <div class="cliente-preview ${c.naoLidoAdmin > 0 ? 'cliente-nao-lido' : ''}">${c.ultimaMensagem || "—"}</div>
      </div>`).join("");
  });
  document.getElementById("btnEnviar").addEventListener("click", enviarMensagem);
  document.getElementById("inputMsg").addEventListener("keydown", (e) => { if (e.key === "Enter") enviarMensagem(); });
}
function atualizarBadge(n) { const b=document.getElementById("badgeChat"); if(n>0){b.style.display="inline";b.textContent=n}else{b.style.display="none"} }
window.abrirChat = async (clienteId, clienteNome) => {
  chatClienteAtivo = clienteId;
  document.getElementById("chatVazio").classList.add("oculto");
  document.getElementById("chatMsgs").classList.remove("oculto");
  document.getElementById("chatNomeCliente").textContent = clienteNome;
  await updateDoc(doc(db, "chats", clienteId), { naoLidoAdmin: 0 }).catch(() => {});
  if (unsubMsgs) unsubMsgs();
  const q = query(collection(db, "chats", clienteId, "mensagens"), orderBy("timestamp", "asc"));
  unsubMsgs = onSnapshot(q, (snap) => {
    const area = document.getElementById("msgsArea");
    area.innerHTML = snap.docs.map(d => { const m=d.data(); const isAdmin=m.autorRole==="admin"; const hora=m.timestamp?.toDate?m.timestamp.toDate().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}):"";
      return `<div class="msg ${isAdmin?'msg-admin':'msg-cliente'}"><div class="msg-autor">${isAdmin?"Você":(m.autorNome||"Cliente")}</div>${m.texto}<div class="msg-hora">${hora}</div></div>`;
    }).join(""); area.scrollTop = area.scrollHeight;
  });
};
async function enviarMensagem() {
  if (!chatClienteAtivo) return; const input=document.getElementById("inputMsg"); const texto=input.value.trim(); if(!texto)return; input.value="";
  await addDoc(collection(db,"chats",chatClienteAtivo,"mensagens"),{texto,autorId:adminUid,autorNome:adminNome,autorRole:"admin",timestamp:serverTimestamp()});
  await setDoc(doc(db,"chats",chatClienteAtivo),{ultimaMensagem:texto,ultimoTimestamp:serverTimestamp(),naoLidoCliente:true},{merge:true});
}
function escapar(str){return(str||"").replace(/'/g,"\\'")}

/* USUARIOS */
function inicializarUsuarios() {
  onSnapshot(collection(db, "usuarios"), (snap) => {
    const tbody = document.getElementById("listaUsuarios");
    const users = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    if (!users.length) { tbody.innerHTML = `<tr><td colspan="4" class="vazio">Nenhum usuário.</td></tr>`; return; }
    tbody.innerHTML = users.map(u => `
      <tr><td>${u.nome||"—"}</td><td>${u.email||"—"}</td>
      <td><span class="pill ${u.role==='admin'?'pill-concluido':'pill-pendente'}">${u.role||"cliente"}</span></td>
      <td><button class="btn-icon" onclick="alternarRole('${u.id}','${u.role}')">${u.role==='admin'?'⬇ Cliente':'⬆ Admin'}</button></td></tr>
    `).join("");
  });
}
window.alternarRole = async (uid, roleAtual) => {
  if (uid === adminUid) { alert("Você não pode alterar seu próprio role."); return; }
  const novoRole = roleAtual === "admin" ? "cliente" : "admin";
  if (!confirm(`Alterar role para "${novoRole}"?`)) return;
  await updateDoc(doc(db, "usuarios", uid), { role: novoRole });
};
