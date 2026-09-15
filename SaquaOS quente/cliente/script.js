import { auth, db } from "../firebase.js";
import {
  onAuthStateChanged, signOut, updatePassword
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc,
  onSnapshot, query, orderBy, where, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let clienteUid = null;
let clienteNome = "Cliente";
let osAtualId = null;

/* ===================================================
   AUTH
=================================================== */
onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = "/login/login.html"; return; }
  clienteUid = user.uid;

  const snap = await getDoc(doc(db, "usuarios", user.uid));
  if (snap.exists()) {
    const d = snap.data();
    clienteNome = d.nome || user.displayName || user.email;
    document.getElementById("perfilNome").value = d.nome || "";
    document.getElementById("perfilEmail").value = d.email || user.email;
    document.getElementById("perfilTelefone").value = d.telefone || "";
    document.getElementById("perfilNascimento").value = d.nascimento || "";
  } else {
    clienteNome = user.displayName || user.email;
    document.getElementById("perfilEmail").value = user.email;
  }
  document.getElementById("clienteNome").textContent = clienteNome;

  inicializarPedido();
  inicializarHistorico();
  inicializarChat();
});

document.getElementById("btnSair").addEventListener("click", async () => {
  await signOut(auth); window.location.href = "/login/login.html";
});

/* ===================================================
   NAVEGAÇÃO POR ABAS
=================================================== */
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("ativo"));
    document.querySelectorAll(".tab-content").forEach(t => t.classList.add("oculto"));
    btn.classList.add("ativo");
    document.getElementById("tab-" + btn.dataset.tab).classList.remove("oculto");
  });
});

/* ===================================================
   PEDIDO ATUAL
=================================================== */
function inicializarPedido() {
  const q = query(
    collection(db, "ordens_servico"),
    where("clienteId", "==", clienteUid),
    orderBy("criadoEm", "desc")
  );

  onSnapshot(q, async (snap) => {
    if (snap.empty) {
      document.getElementById("semPedido").classList.remove("oculto");
      document.getElementById("pedidoInfo").classList.add("oculto");
      return;
    }

    const os = { id: snap.docs[0].id, ...snap.docs[0].data() };
    osAtualId = os.id;

    document.getElementById("semPedido").classList.add("oculto");
    document.getElementById("pedidoInfo").classList.remove("oculto");

    renderPrazo(os.prazo);
    renderSteps(os.status || "pendente");

    document.getElementById("osServico").textContent = os.servico || "—";
    document.getElementById("osDescricao").textContent = os.descricao || "—";
    document.getElementById("osValor").textContent = os.valor ? "R$ " + Number(os.valor).toFixed(2) : "A definir";

    const labels = { pendente: "Pendente", em_andamento: "Em andamento", concluido: "Concluído", cancelado: "Cancelado" };
    document.getElementById("osStatus").innerHTML = `<span class="pill pill-${os.status || 'pendente'}">${labels[os.status] || os.status}</span>`;

    if (os.obs) { document.getElementById("osObsWrap").style.display = "flex"; document.getElementById("osObs").textContent = os.obs; }
    else { document.getElementById("osObsWrap").style.display = "none"; }

    // Verifica se precisa mostrar modal de avaliação
    if (os.status === "concluido") {
      const avalSnap = await getDocs(query(collection(db, "avaliacoes"), where("osId", "==", os.id)));
      if (avalSnap.empty) {
        document.getElementById("modalAvaliacao").classList.remove("oculto");
      }
    }
  });
}

function renderPrazo(prazoStr) {
  const elData = document.getElementById("prazoData");
  const elDias = document.getElementById("prazoDias");
  if (!prazoStr) { elData.textContent = "A definir"; elDias.textContent = ""; return; }
  const [y, m, d] = prazoStr.split("-");
  elData.textContent = `${d}/${m}/${y}`;
  const hoje = new Date(); hoje.setHours(0,0,0,0);
  const prazo = new Date(prazoStr); prazo.setHours(0,0,0,0);
  const diff = Math.ceil((prazo - hoje) / 86400000);
  if (diff > 0) { elDias.textContent = `Faltam ${diff} dia${diff>1?"s":""}`; elDias.style.color = "#68d391"; }
  else if (diff === 0) { elDias.textContent = "Entrega hoje!"; elDias.style.color = "#f6ad55"; }
  else { elDias.textContent = `Atrasado ${Math.abs(diff)} dia${Math.abs(diff)>1?"s":""}`; elDias.style.color = "#fc8181"; }
}

function renderSteps(status) {
  const ordem = ["pendente", "em_andamento", "concluido"];
  const idx = ordem.indexOf(status);
  const linhas = document.querySelectorAll(".step-linha");
  ordem.forEach((s, i) => {
    const el = document.getElementById("step-" + s);
    el.classList.remove("ativo", "concluido");
    if (i < idx) el.classList.add("concluido");
    else if (i === idx) el.classList.add("ativo");
  });
  linhas.forEach((l, i) => { l.classList.toggle("preenchida", i < idx); });
}

/* ===================================================
   HISTÓRICO DE PEDIDOS
=================================================== */
function inicializarHistorico() {
  const q = query(
    collection(db, "ordens_servico"),
    where("clienteId", "==", clienteUid),
    orderBy("criadoEm", "desc")
  );

  onSnapshot(q, (snap) => {
    const el = document.getElementById("listaHistorico");
    if (snap.empty) {
      el.innerHTML = `<p class="vazio-msg">Nenhum pedido encontrado.</p>`;
      return;
    }

    const labels = { pendente: "Pendente", em_andamento: "Em andamento", concluido: "Concluído", cancelado: "Cancelado" };

    el.innerHTML = snap.docs.map(d => {
      const o = d.data();
      const data = o.criadoEm?.toDate ? o.criadoEm.toDate().toLocaleDateString("pt-BR") : "—";
      return `
        <div class="historico-item">
          <div class="historico-topo">
            <span class="historico-servico">${o.servico || o.nomeSistema || "Sistema"}</span>
            <span class="pill pill-${o.status || 'pendente'}">${labels[o.status] || o.status}</span>
          </div>
          <div class="historico-detalhes">
            <span>${o.descricao || "—"}</span>
            <span class="historico-meta">
              ${o.valor ? "R$ " + Number(o.valor).toFixed(2) : "—"} · ${data}
            </span>
          </div>
        </div>
      `;
    }).join("");
  });
}

/* ===================================================
   CHAT
=================================================== */
function inicializarChat() {
  updateDoc(doc(db, "chats", clienteUid), { naoLidoCliente: false }).catch(() => {});

  const q = query(collection(db, "chats", clienteUid, "mensagens"), orderBy("timestamp", "asc"));
  onSnapshot(q, (snap) => {
    const area = document.getElementById("msgsArea");
    if (snap.empty) { area.innerHTML = `<p class="msg-aviso">Nenhuma mensagem ainda. Diga olá! 👋</p>`; return; }
    area.innerHTML = snap.docs.map(d => {
      const m = d.data();
      const isEu = m.autorId === clienteUid;
      const hora = m.timestamp?.toDate ? m.timestamp.toDate().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "";
      return `<div class="msg ${isEu ? 'msg-eu' : 'msg-deles'}"><div class="msg-autor">${isEu ? "Você" : (m.autorNome || "Equipe")}</div>${m.texto}<div class="msg-hora">${hora}</div></div>`;
    }).join("");
    area.scrollTop = area.scrollHeight;
  });

  document.getElementById("btnEnviar").addEventListener("click", enviarMsg);
  document.getElementById("inputMsg").addEventListener("keydown", (e) => { if (e.key === "Enter") enviarMsg(); });
}

async function enviarMsg() {
  const input = document.getElementById("inputMsg");
  const texto = input.value.trim();
  if (!texto) return;
  input.value = "";

  const chatRef = doc(db, "chats", clienteUid);
  await setDoc(chatRef, {
    clienteId: clienteUid,
    clienteNome: clienteNome,
    ultimaMensagem: texto,
    ultimoTimestamp: serverTimestamp(),
    naoLidoAdmin: (await getDoc(chatRef).then(s => s.exists() ? (s.data().naoLidoAdmin || 0) : 0)) + 1
  }, { merge: true });

  await addDoc(collection(db, "chats", clienteUid, "mensagens"), {
    texto, autorId: clienteUid, autorNome: clienteNome, autorRole: "cliente", timestamp: serverTimestamp()
  });
}

/* ===================================================
   PERFIL
=================================================== */
document.getElementById("formPerfil").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("perfilNome").value;
  const telefone = document.getElementById("perfilTelefone").value;
  const nascimento = document.getElementById("perfilNascimento").value;

  try {
    await updateDoc(doc(db, "usuarios", clienteUid), { nome, telefone, nascimento });
    clienteNome = nome;
    document.getElementById("clienteNome").textContent = nome;
    mostrarFeedback("Perfil atualizado!", "sucesso");
  } catch (err) {
    mostrarFeedback("Erro ao salvar: " + err.message, "erro");
  }
});

document.getElementById("formSenha").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nova = document.getElementById("novaSenha").value;
  const confirmar = document.getElementById("confirmarSenha").value;

  if (nova.length < 6) { mostrarFeedback("A senha deve ter pelo menos 6 caracteres.", "erro"); return; }
  if (nova !== confirmar) { mostrarFeedback("As senhas não coincidem.", "erro"); return; }

  try {
    await updatePassword(auth.currentUser, nova);
    document.getElementById("novaSenha").value = "";
    document.getElementById("confirmarSenha").value = "";
    mostrarFeedback("Senha alterada com sucesso!", "sucesso");
  } catch (err) {
    if (err.code === "auth/requires-recent-login") {
      mostrarFeedback("Por segurança, faça login novamente antes de trocar a senha.", "erro");
    } else {
      mostrarFeedback("Erro: " + err.message, "erro");
    }
  }
});

function mostrarFeedback(msg, tipo) {
  const el = document.getElementById("perfilFeedback");
  el.textContent = msg;
  el.className = "perfil-feedback " + (tipo === "sucesso" ? "fb-sucesso" : "fb-erro");
  setTimeout(() => { el.className = "perfil-feedback oculto"; }, 4000);
}

/* ===================================================
   AVALIAÇÃO
=================================================== */
let notaSelecionada = 0;
const estrelas = document.querySelectorAll(".estrela");
const notaTextos = ["", "Péssimo", "Ruim", "Regular", "Bom", "Excelente!"];

estrelas.forEach(e => {
  e.addEventListener("click", () => {
    notaSelecionada = parseInt(e.dataset.nota);
    estrelas.forEach(s => {
      s.classList.toggle("ativa", parseInt(s.dataset.nota) <= notaSelecionada);
    });
    document.getElementById("notaTexto").textContent = notaTextos[notaSelecionada];
  });

  e.addEventListener("mouseenter", () => {
    estrelas.forEach(s => {
      s.classList.toggle("hover", parseInt(s.dataset.nota) <= parseInt(e.dataset.nota));
    });
  });

  e.addEventListener("mouseleave", () => {
    estrelas.forEach(s => s.classList.remove("hover"));
  });
});

document.getElementById("btnEnviarAvaliacao").addEventListener("click", async () => {
  if (!notaSelecionada) { alert("Selecione uma nota!"); return; }

  const comentario = document.getElementById("avaliacaoComentario").value.trim();
  const btn = document.getElementById("btnEnviarAvaliacao");
  btn.textContent = "Enviando...";
  btn.disabled = true;

  try {
    await addDoc(collection(db, "avaliacoes"), {
      osId: osAtualId,
      clienteId: clienteUid,
      clienteNome: clienteNome,
      nota: notaSelecionada,
      comentario: comentario,
      timestamp: serverTimestamp()
    });
    document.getElementById("modalAvaliacao").classList.add("oculto");
  } catch (err) {
    alert("Erro ao enviar avaliação: " + err.message);
    btn.textContent = "Enviar Avaliação";
    btn.disabled = false;
  }
});

document.getElementById("btnPularAvaliacao").addEventListener("click", () => {
  document.getElementById("modalAvaliacao").classList.add("oculto");
});
