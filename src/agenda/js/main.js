const nomeCliente = document.getElementById("nomeCliente");
const dataAgendamento = document.getElementById("data-agenda");
const profissionais = document.getElementById("profissionais");
const agendaButton = document.getElementById("agenda-button");
const servicos = document.getElementById("servicos");

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
            nomeCliente: nomeCliente.value,
            dataAgendamento: dataAgendamento.value,
            servicos: servicos.value,
            profissionais: profissionais.value,
        }),
    })
        .then((res) => console.log(res))
        .catch((error) => console.error("Error:", error));
}

function listar() {
    fetch("http://localhost:8000/agenda", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "GET",
    })
        .then((res) => res.json())
        .then((response) => {
            let table = document.querySelector("table-agenda");

            response.map((item) => {
                let row = table.insertRow();
                let cellNomeCliente = row.insertCell(0);
                let cellDataAgendamento = row.insertCell(1);
                let cellServicos = row.insertCell(2);
                let cellProfissionais = row.insertCell(3);

                cellNomeCliente.innerHTML = item.nomeCliente;
                cellDataAgendamento.innerHTML = item.dataAgendamento;
                cellServicos.innerHTML = item.servicos;
                cellProfissionais.innerHTML = item.profissionais;
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

function alterar() {
    fetch(`http://localhost:8000/agenda/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
            nomeCliente: nomeCliente.value,
            dataAgendamento: dataAgendamento.value,
            servicos: servicos.value,
            profissionais: profissionais.value,
        }),
    })
        .then((res) => console.log(res))
        .catch((error) => console.error("Error:", error));
}

function deletar() {
    fetch(`http://localhost:8000/agenda/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "DELETE",
    })
        .then((res) => console.log(res))
        .catch((error) => console.error("Error:", error));
}

function limpar() {
    nomeCliente.value = "";
    dataAgendamento.value = "";
    servicos.value = "";
    profissionais.value = "";
}

agendaButton.addEventListener("click", () => {
    if (
        nomeCliente.value == "" ||
        dataAgendamento.value == "" ||
        servicos.value == "" ||
        profissionais.value == ""
    ) {
        alert("Todos os campos são obrigatórios.");
    } else {
        cadastrar();
        limpar();
    }
});

listarServico(servicos);
listarProfissional(profissionais);
