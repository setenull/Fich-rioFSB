const MENU_URL = "https://menudeatendimentofsb.netlify.app";
const FICHARIO_URL = "https://fichariofsb.netlify.app";

let senhaAtual = { "Médico": 100, "Odontológico": 200 };

// Atualizar fichário de visualização no Menu
async function atualizarFicharioVisualizacao() {
    try {
        const response = await fetch(`${FICHARIO_URL}/fichas.json`);
        const fichas = await response.json();

        const lista = document.getElementById("listaFichas");
        lista.innerHTML = "";

        fichas.forEach(ficha => {
            const divFicha = document.createElement("div");
            divFicha.classList.add("ficha");
            divFicha.innerHTML = `
                <div class="coluna">${ficha.nome}</div>
                <div class="coluna">${ficha.tipo}</div>
                <div class="coluna">${ficha.senha}</div>
            `;
            lista.appendChild(divFicha);
        });
    } catch (error) {
        console.error("Erro ao atualizar fichário:", error);
    }
}

// Adicionar ficha ao fichário principal
function gerarFicha() {
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    if (nome === "") return alert("Digite um nome!");

    const senha = senhaAtual[tipo]++;
    const novaFicha = { nome, tipo, senha };

    fetch(`${FICHARIO_URL}/salvar-ficha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaFicha)
    }).then(() => atualizarFicharioVisualizacao());

    document.getElementById("nome").value = "";
}

// Limpar fichas
function limparFichas() {
    fetch(`${FICHARIO_URL}/limpar-fichas`, { method: "POST" })
        .then(() => atualizarFicharioVisualizacao());
}

// Atualiza o fichário de visualização ao carregar
document.addEventListener("DOMContentLoaded", atualizarFicharioVisualizacao);