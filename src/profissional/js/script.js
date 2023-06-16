const servico = document.getElementById("select-servico");
const botaoSalvar = document.getElementById("profissional-button");
const tableProfissional = document.getElementById("table-profissional");
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("modalEdit");
const servicoEdit = document.getElementById("select-servico-edit");


//fecha o modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    location.reload();
});

function cadastrar(nome, id_servico) {
    fetch("http://localhost:8000/profissional", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ nome: nome, id_servico: id_servico }),
    })
        .then((res) => console.log(res))
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    location.reload();
}

//pega o valor do iput e chama a funcao cadastrar
botaoSalvar.addEventListener("click", () => {
    const nome = document.getElementById("profissional").value;
    const id_servico = Number(servico.options[servico.selectedIndex].value);
    console.log(nome);
    console.log(id_servico);
    if (nome === "" || id_servico === "") {
        alert("Nome e Serviço não pode ser vazio");
    } else {
        cadastrar(nome, id_servico);
    }
});

function listarProfissional() {
    fetch("http://localhost:8000/profissional")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((profissional) => {
                tableProfissional.innerHTML += `
                <tr>
                    <th scope="row">${profissional.nome}</th>
                    <th scope="row">${profissional.servico}</th>
                    <td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target=#modalEdit onClick="editarProfissional(${profissional.id})"><i class="bi bi-pencil-square"></i></button></td>
                    <td><button class="btn bg-danger" onClick="deletarProfissional(${profissional.id})" ><i class="bi bi-trash3-fill"></i></button></td>
                </tr>

                `;
            });
        })
        .catch((error) => console.error("Error:", error));
}

function deletarProfissional(profissionalID) {
    confirm("Deseja deletar o profissional?");
    fetch(`http://localhost:8000/profissional/${profissionalID}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => {})
        .catch((error) => {
            console.error("Error:", error);
        });

    location.reload();
}

function editarProfissional(profissionalID) {
    const botaoSalvar = document.getElementById("saveEdit");
    botaoSalvar.addEventListener("click", () => {
        const nome = document.getElementById("profissionalEdit").value;
        if (nome === "") {
            alert("Nome do profissional não pode ser vazio");
            return;
        }
        const id_servico = Number(servicoEdit.options[servicoEdit.selectedIndex].value);
        fetch(`http://localhost:8000/profissional/${profissionalID}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                nome: nome,
                id_servico: id_servico
             }),
        });
        location.reload();
    });
}

//lista servico disponives
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
listarServico(servicoEdit);
listarProfissional();
