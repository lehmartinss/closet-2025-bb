 'use strict'

const API = "hhttps://back-spider.vercel.app/user/atualizarUser/:id"

// Carregar dados do perfil atual
async function loadProfile() {
  const response = await fetch(`${API}/usuario/atual`);
  const user = await response.json();

  document.getElementById("name").innerText = user.nome;
  document.getElementById("username").innerText = "@" + user.usuario;
  document.getElementById("peças").innerText = user.pecas;
  document.getElementById("seguidores").innerText = user.seguidores;
  document.getElementById("looks").innerText = user.looks;

  loadPhotos(user.id);
}

// Carregar fotos postadas
async function loadPhotos(userId) {
  const response = await fetch(`${API}/usuarios/${userId}/fotos`);
  const fotos = await response.json();

  const container = document.getElementById("content");
  container.innerHTML = "";

  fotos.forEach(foto => {
    const img = document.createElement("img");
    img.src = foto.url;
    img.alt = "Foto postada";
    img.style.width = "150px";
    img.style.margin = "10px";
    container.appendChild(img);
  });
}

// Pesquisar outro usuário pelo @
async function searchUser() {
  const searchBar = document.getElementById("search-bar").value;
  const response = await fetch(`${API_BASE}/usuarios?usuario=${searchBar}`);
  const user = await response.json();

  if (user) {
    alert(`Usuário encontrado: ${user.nome} (@${user.usuario})`);
  } else {
    alert("Usuário não encontrado.");
  }
}

// Ir para página de configurações
function goToSettings() {
  window.location.href = "/configuracoes.html";
}

// Inicializar
loadProfile();
