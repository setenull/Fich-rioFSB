document.addEventListener("DOMContentLoaded", carregarFichas);

// Atualiza o fichário quando há mudanças
window.addEventListener("storage", (event) => {
    if (event.key === "fichas" || event.key === "atualizarFichario") {
        carregarFichas();
    }
});

function carregarFichas() {
    const lista = document.getElementById("listaFichas");
    lista.innerHTML = "";

    let fichas = JSON.parse(localStorage.getItem("fichas")) || [];

    fichas.forEach(ficha => {
        const fichaDiv = document.createElement("div");
        fichaDiv.classList.add("ficha");
        fichaDiv.innerHTML = `
            <div class="coluna">${ficha.nome}</div>
            <div class="coluna">${ficha.tipo}</div>
            <div class="coluna">${ficha.senha}</div>
        `;
        lista.appendChild(fichaDiv);
    });
}