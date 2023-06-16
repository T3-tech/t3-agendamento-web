const cliente = document.getElementById("nome-cliente");
const data = document.getElementById("data-agenda");
const id_profissional = document.getElementById("profissionais");
const agendaButton = document.getElementById("agenda-button");
const id_servico = document.getElementById("servicos");
const tableAgenda = document.getElementById("table-agenda");
const nomeClienteModal = document.getElementById("nome-cliente-modal");
const dataAgendamentoModal = document.getElementById("data-agenda-modal");
const profissionalModal = document.getElementById("profissional-modal");
const servicoModal = document.getElementById("servico-modal");
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("modalEdit");

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    location.reload();
});

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

function listarProfissional(elemt) {
    fetch("http://localhost:8000/profissional")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((profissional) => {
                elemt.innerHTML += `
                    <option value = ${profissional.id}> ${profissional.nome}</option>
                `;
            });
        })
        .catch((error) => console.error("Error:", error));
}

function cadastrar() {
    fetch("http://localhost:8000/agenda", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            data: data.value,
            cliente: cliente.value,
            id_profissional: id_profissional.value,
            id_servico: id_servico.value,
        }),
    })
        .then((res) => console.log(res))
        .catch((error) => console.error("Error:", error));
        location.reload();
}

function listar() {
    fetch("http://localhost:8000/agenda")
        .then((res) => res.json())
        .then((response) => {
            response.forEach((agenda) => {
                tableAgenda.innerHTML += `
                <tr>
                    <th scope="row">${agenda.data}</th>
                    <td>${agenda.nome_servico}</td>
                    <td>${agenda.nome_profissional}</td>
                    <td>${agenda.cliente}</td>
                    <td><button class="btn btn-warning" id="editar" data-bs-toggle="modal" data-bs-target=#modalEdit onClick="alterar(${agenda.id})"><i class="bi bi-pencil-square"></i></button></td>
                    <td><button class="btn bg-danger" id="deletar" onClick="deletar(${agenda.id})" ><i class="bi bi-trash3-fill"></i></button></td>
                </tr>
                `;
            });
        })
        .catch((error) => console.error("Error:", error));
}

function buscaPorId() {
    fetch(`http://localhost:8000/agenda/${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.error("Error:", error));
}

function alterar(id) {
    const saveEdit = document.getElementById("saveEdit");

    saveEdit.addEventListener("click", () => {
        if (
            dataAgendamentoModal.value == "" ||
            nomeClienteModal.value == "" ||
            servicoModal.value == "" ||
            profissionalModal.value == ""
        ) { return alert("Todos os campos são obrigatórios.")}

        fetch(`http://localhost:8000/agenda/${id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({
                data: dataAgendamentoModal.value,
                cliente: nomeClienteModal.value,
                id_profissional: profissionalModal.value,
                id_servico: servicoModal.value,
            }),
        })
            .then((res) => console.log(res))
            .catch((error) => console.error("Error:", error));
            location.reload(); 
    });
}

function deletar(id) {
    fetch(`http://localhost:8000/agenda/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "DELETE",
    })
        .then((res) => console.log(res))
        .catch((error) => console.error("Error:", error));

    location.reload();
}

function limpar() {
    nomeCliente.value = "";
    dataAgendamento.value = "";
    servicos.value = "";
    profissionais.value = "";
}

agendaButton.addEventListener("click", () => {
    if (
        data.value == "" ||
        cliente.value == "" ||
        id_servico.value == "" ||
        id_profissional.value == ""
    ) {
        alert("Todos os campos são obrigatórios.");
    } else {
        cadastrar();
        limpar();
    }
});

listarServico(servicoModal);
listarProfissional(profissionalModal);

listarServico(servicos);
listar();
listarProfissional(profissionais);
