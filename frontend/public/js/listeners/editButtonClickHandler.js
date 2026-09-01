import saveButtonClickHandler from "./saveButtonClickHandler.js";

export default function editButtonClickHandler(event) {
    event.preventDefault();

    const liElement = event.currentTarget.closest("li");

    // já está em edição (clicou no texto de novo, ou no botão de novo): ignora
    if (liElement.querySelector("input") !== null) {
        return;
    }

    const infoElement = liElement.querySelector("div");
    const nameElement = infoElement.querySelector("span");
    const emailElement = infoElement.querySelector("small");

    const nameInputElement = document.createElement("input");
    nameInputElement.setAttribute("type", "text");
    nameInputElement.setAttribute("name", "name");
    nameInputElement.classList.add("form-control", "form-control-sm", "mb-1");
    nameInputElement.value = nameElement.textContent;
    nameInputElement.addEventListener("keypress", confirmOnEnter);

    const emailInputElement = document.createElement("input");
    emailInputElement.setAttribute("type", "email");
    emailInputElement.setAttribute("name", "email");
    emailInputElement.classList.add("form-control", "form-control-sm");
    emailInputElement.value = emailElement.textContent;
    emailInputElement.addEventListener("keypress", confirmOnEnter);

    infoElement.innerHTML = "";
    infoElement.append(nameInputElement, emailInputElement);

    const buttonEditElement = liElement.querySelector(".btn-primary");
    const buttonDeleteElement = liElement.querySelector(".btn-danger");
    buttonDeleteElement.classList.add("d-none");

    const buttonSaveElement = document.createElement("button");
    buttonSaveElement.classList.add("btn", "btn-success", "btn-sm");
    buttonSaveElement.innerText = "Salvar";
    buttonSaveElement.addEventListener("click", saveButtonClickHandler);

    buttonEditElement.replaceWith(buttonSaveElement);
}

// desafio: Enter em qualquer input confirma, igual ao clique em "Salvar"
function confirmOnEnter(event) {
    if (event.key !== "Enter") {
        return;
    }
    event.preventDefault();

    const liElement = event.currentTarget.closest("li");
    const buttonSaveElement = liElement.querySelector(".btn-success");

    buttonSaveElement.dispatchEvent(new Event("click"));
}
