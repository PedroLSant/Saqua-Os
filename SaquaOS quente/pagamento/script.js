import { auth, db } from "../firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  addDoc, collection, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/* ===================================================
   DADOS DO PEDIDO (vem do sessionStorage)
=================================================== */
const pedidoRaw = sessionStorage.getItem("pedido");
if (!pedidoRaw) {
  alert("Nenhum pedido encontrado. Volte e selecione um serviço.");
  window.location.href = "/sistema/sistema.html";
}
const pedido = JSON.parse(pedidoRaw);

/* ===================================================
   CHAVE PIX (altere para a sua)
=================================================== */
const CODIGO_PIX = "00020126330014BR.GOV.BCB.PIX0111148878447785204000053039865802BR5925Pedro Lucas Santana Motta6009SAO PAULO62140510H3naipPcT46304C187";

/* ===================================================
   RENDERIZA RESUMO
=================================================== */
function renderResumo() {
  const valor = Number(pedido.valor || 0);
  const card = document.getElementById("resumoCard");

  card.innerHTML = `
    <div class="resumo-item">
      <span class="resumo-label">Serviço</span>
      <span class="resumo-valor-txt">${pedido.servico}</span>
    </div>
    <div class="resumo-item">
      <span class="resumo-label">Sistema</span>
      <span class="resumo-valor-txt">${pedido.nomeSistema}</span>
    </div>
    ${pedido.descricao ? `
    <div class="resumo-item">
      <span class="resumo-label">Descrição</span>
      <span class="resumo-valor-txt resumo-desc">${pedido.descricao}</span>
    </div>` : ""}
    ${pedido.funcionalidades.length ? `
    <div class="resumo-item">
      <span class="resumo-label">Extras</span>
      <span class="resumo-valor-txt">${pedido.funcionalidades.join(", ")}</span>
    </div>` : ""}
    <div class="resumo-item">
      <span class="resumo-label">Prazo</span>
      <span class="resumo-valor-txt">${pedido.prazoDias ? pedido.prazoDias + " dias" : "A definir"}</span>
    </div>
    <div class="resumo-divider"></div>
    <div class="resumo-item resumo-total">
      <span class="resumo-label">Total</span>
      <span class="resumo-valor-destaque">R$ ${valor.toFixed(2)}</span>
    </div>
  `;

  // Parcelas
  gerarParcelas(valor);
}

/* ===================================================
   PARCELAS
=================================================== */
function gerarParcelas(valor) {
  const sel = document.getElementById("parcelas");
  if (!sel) return;
  sel.innerHTML = "";

  const maxParcelas = valor >= 300 ? 12 : valor >= 100 ? 6 : 3;

  for (let i = 1; i <= maxParcelas; i++) {
    const parcVal = (valor / i).toFixed(2);
    const juros = i > 3 ? " (com juros)" : " sem juros";
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${i}x de R$ ${parcVal}${i === 1 ? "" : juros}`;
    sel.appendChild(opt);
  }
}

/* ===================================================
   QR CODE PIX
=================================================== */
function renderQR() {
  const imgQR = document.getElementById("imgQR");
  const pixInput = document.getElementById("pixCodigo");

  const linkQR = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(CODIGO_PIX)}`;
  imgQR.src = linkQR;
  pixInput.value = CODIGO_PIX;
}

/* Copiar código Pix */
document.getElementById("btnCopiar").addEventListener("click", () => {
  const input = document.getElementById("pixCodigo");
  navigator.clipboard.writeText(input.value).then(() => {
    const btn = document.getElementById("btnCopiar");
    btn.textContent = "Copiado!";
    setTimeout(() => { btn.textContent = "Copiar"; }, 2000);
  });
});

/* ===================================================
   TABS PIX / CARTÃO
=================================================== */
document.getElementById("tabPix").addEventListener("click", () => {
  document.getElementById("tabPix").classList.add("ativo");
  document.getElementById("tabCartao").classList.remove("ativo");
  document.getElementById("areaPix").classList.remove("oculto");
  document.getElementById("areaCartao").classList.add("oculto");
});

document.getElementById("tabCartao").addEventListener("click", () => {
  document.getElementById("tabCartao").classList.add("ativo");
  document.getElementById("tabPix").classList.remove("ativo");
  document.getElementById("areaCartao").classList.remove("oculto");
  document.getElementById("areaPix").classList.add("oculto");
});

/* ===================================================
   MÁSCARA CARTÃO
=================================================== */
document.getElementById("numCartao").addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "").substring(0, 16);
  v = v.replace(/(\d{4})(?=\d)/g, "$1 ");
  e.target.value = v;
});

document.getElementById("validade").addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "").substring(0, 4);
  if (v.length >= 3) v = v.substring(0, 2) + "/" + v.substring(2);
  e.target.value = v;
});

/* ===================================================
   SALVAR OS NO FIRESTORE
=================================================== */
async function criarOrdem() {
  await addDoc(collection(db, "ordens_servico"), {
    clienteId: pedido.clienteId,
    clienteNome: pedido.clienteNome,
    nomeSistema: pedido.nomeSistema,
    descricao: pedido.descricao,
    servico: pedido.servico,
    valor: pedido.valor,
    prazo: pedido.prazoData,
    funcionalidades: pedido.funcionalidades,
    status: "pendente",
    pagamento: "confirmado",
    obs: "",
    criadoEm: serverTimestamp()
  });

  // Limpa sessionStorage
  sessionStorage.removeItem("pedido");
}

function mostrarConfirmacao() {
  document.getElementById("etapaPagamento").classList.add("oculto");
  document.getElementById("etapaConfirmacao").classList.remove("oculto");
}

/* ===================================================
   CONFIRMAR PIX
=================================================== */
document.getElementById("btnConfirmarPix").addEventListener("click", async () => {
  const btn = document.getElementById("btnConfirmarPix");
  btn.textContent = "Processando...";
  btn.disabled = true;

  try {
    await criarOrdem();
    mostrarConfirmacao();
  } catch (err) {
    console.error(err);
    alert("Erro ao registrar pedido. Tente novamente.");
    btn.textContent = "Confirmar Pagamento";
    btn.disabled = false;
  }
});

/* ===================================================
   PAGAR COM CARTÃO
=================================================== */
document.getElementById("formCartao").addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = e.target.querySelector(".botao-pagar");
  btn.textContent = "Processando...";
  btn.disabled = true;

  try {
    await criarOrdem();
    mostrarConfirmacao();
  } catch (err) {
    console.error(err);
    alert("Erro ao processar pagamento. Tente novamente.");
    btn.textContent = "Pagar Agora";
    btn.disabled = false;
  }
});

/* ===================================================
   AUTH CHECK + INIT
=================================================== */
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/login/login.html";
    return;
  }
  renderResumo();
  renderQR();
});
