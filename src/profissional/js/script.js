const servico = document.getElementById("select-servico");

function listarServico(elemt) {
    fetch("http://localhost:8000/servico")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((servico) => {
                elemt.innerHTML += `
                    <option value = ${servico.id}> ${servico.nome}</option>
                `;
            });
        })
        .catch((error) => console.error("Error:", error));
}

listarServico(servico);
