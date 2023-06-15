const botaoSalvar = document.getElementById("servico-button");
const tableServico = document.getElementById("table-servico");
const modal = document.getElementById("modal");

function cadastrar(nome) {
    fetch("http://localhost:8000/servico", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ nome: nome }),
    })
        .then((res) => console.log(res))
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    location.reload();
}

botaoSalvar.addEventListener("click", () => {
    const nome = document.getElementById("servico").value;
    console.log(
        "🚀 ~ file: main.js:19 ~ botaoSalvar.addEventListener ~ nome:",
        nome
    );
    cadastrar(nome);
});

function listarServico() {
    fetch("http://localhost:8000/servico")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((servico) => {
                tableServico.innerHTML += `
                <tr>
                <th scope="row">${servico.nome}</th>
                  <td><button class="btn btn-warning" id="editar" onclic="editarServico(${servico.id})"><i class="bi bi-pencil-square"></i></button></td>
                  <td><button class="btn bg-danger" id="deletar" data-bs-toggle="modal" data-bs-target=#modalEdit onclick="deletarServico(${servico.id})" ><i class="bi bi-trash3-fill"></i></button></td>
              </tr>

                `;
            });
        })
        .catch((error) => console.error("Error:", error));
}

function deletarServico(servicoId) {
    fetch(`http://localhost:8000/servico/${servicoId}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("Serviço deletado:", data);
        })
        .catch((error) => console.error("Error:", error));
    location.reload();
}

listarServico();
