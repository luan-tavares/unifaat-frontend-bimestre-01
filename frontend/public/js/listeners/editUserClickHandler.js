import { userUpdateApi } from "../api/userUpdateApi.js";

export default async function editUserClickHandler(event) {
    const button = event.currentTarget;
    const liElement = button.closest("li");

    const nameElement = liElement.querySelector(".user-name");
    const emailElement = liElement.querySelector(".user-email");

    if (button.innerText === "Editar") {
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.classList.add("form-control", "mb-2");
        nameInput.value = nameElement.innerText;

        const emailInput = document.createElement("input");
        emailInput.type = "text";
        emailInput.classList.add("form-control");
        emailInput.value = emailElement.innerText;

        nameElement.replaceWith(nameInput);
        emailElement.replaceWith(emailInput);

        button.innerText = "Salvar";
        button.classList.remove("btn-warning");
        button.classList.add("btn-success");

        return;
    }

    const nameInput = liElement.querySelector("input");
    const emailInput = liElement.querySelectorAll("input")[1];

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) {
        alert("Nome e email são obrigatórios.");
        return;
    }

    try {
        button.disabled = true;
        button.innerText = "Salvando...";

        await userUpdateApi(liElement.userId, {
            name,
            email
        });

        const newNameElement = document.createElement("span");
        newNameElement.classList.add("user-name");
        newNameElement.innerText = name;

        const newEmailElement = document.createElement("small");
        newEmailElement.classList.add("text-muted", "user-email");
        newEmailElement.innerText = email;

        nameInput.replaceWith(newNameElement);
        emailInput.replaceWith(newEmailElement);

        button.innerText = "Editar";
        button.disabled = false;
        button.classList.remove("btn-success");
        button.classList.add("btn-warning");

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);

        alert("Não foi possível atualizar o usuário.");

        button.disabled = false;
        button.innerText = "Salvar";
    }
}