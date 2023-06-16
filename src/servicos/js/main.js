const botaoSalvar = document.getElementById("servico-button");
const tableServico = document.getElementById("table-servico");
const modal = document.getElementById("modalEdit");
const closeModal = document.getElementById("closeModal");
const closeModalX = document.getElementById("closeModalX");

//fecha o modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    location.reload();
});

//chama a api para cadastrar servico
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

//pega o valor do iput e chama a funcao cadastrar
botaoSalvar.addEventListener("click", () => {
    const nome = document.getElementById("servico").value;
    console.log(
        "🚀 ~ file: main.js:19 ~ botaoSalvar.addEventListener ~ nome:",
        nome
    );

    if (nome === "") {
        alert("Nome do serviço não pode ser vazio");
    } else {
        cadastrar(nome);
    }
});

//lista os servicos
function listarServico() {
    fetch("http://localhost:8000/servico")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((servico) => {
                tableServico.innerHTML += `
                <tr>
                <th scope="row">${servico.nome}</th>
                  <td><button class="btn btn-warning" id="editar" data-bs-toggle="modal" data-bs-target=#modalEdit onclick="editarServico(${servico.id})"><i class="bi bi-pencil-square"></i></button></td>
                  <td><button class="btn bg-danger" id="deletar"  onclick="deletarServico(${servico.id})" ><i class="bi bi-trash3-fill"></i></button></td>
              </tr>

                `;
            });
        })
        .catch((error) => console.error("Error:", error));
}

//deleta serviço por id
function deletarServico(servicoId) {
    confirm("Deseja deletar o serviço?");
    fetch(`http://localhost:8000/servico/${servicoId}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.statusCode == 200) {
                alert("Serviço deletado com sucesso");
            }
            if (data.statusCode == 400) {
                alert(
                    "Serviço não pode ser deletado pois pertence a um ou mais profissional"
                );
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    location.reload();
}

//edita servico por id
function editarServico(servicoId) {
    const botaoSalvar = document.getElementById("saveEdit");
    botaoSalvar.addEventListener("click", () => {
        const nome = document.getElementById("servicoEdit").value;
        if (nome === "") {
            alert("Nome do serviço não pode ser vazio");
            return;
        }

        fetch(`http://localhost:8000/servico/${servicoId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome: nome }),
        });
        location.reload();
    });
}

listarServico();
