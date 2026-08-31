import saveButtonClickHandler from "./saveButtonClickHandler.js";

export default function editButtonClickHandler(event) {
    event.preventDefault();

    const liElement = event.currentTarget.parentElement;
    const infoElement = liElement.querySelector("div");

    const nameElement = infoElement.querySelector("span");
    const emailElement = infoElement.querySelector("small");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.classList.add("form-control", "form-control-sm", "mb-1");
    nameInput.value = nameElement.innerText;

    const emailInput = document.createElement("input");
    emailInput.type = "text";
    emailInput.classList.add("form-control", "form-control-sm");
    emailInput.value = emailElement.innerText;

    infoElement.innerHTML = "";
    infoElement.append(nameInput, emailInput);

    const buttonEditElement = event.currentTarget;
    buttonEditElement.innerText = "Salvar";
    buttonEditElement.classList.remove("btn-secondary");
    buttonEditElement.classList.add("btn-success");
    buttonEditElement.removeEventListener("click", editButtonClickHandler);
    buttonEditElement.addEventListener("click", saveButtonClickHandler);
}
