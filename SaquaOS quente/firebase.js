// Importações com links completos (CDNs)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"; // <-- ADICIONE ESTA LINHA

const firebaseConfig = {
  apiKey: "AIzaSyBiVxXSNPn-aq7pfaxKHNCPAXPFRrURgmk",
  authDomain: "bdsaquaos.firebaseapp.com",
  projectId: "bdsaquaos",
  storageBucket: "bdsaquaos.firebasestorage.app",
  messagingSenderId: "374223023608",
  appId: "1:374223023608:web:6f6c9563f5603d655efa0d"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Auth para o Login/Cadastro
export const auth = getAuth(app);

// Exporta o Firestore (db) para salvar os dados (Nome, Tel, etc.)
export const db = getFirestore(app); // <-- ADICIONE ESTA LINHA