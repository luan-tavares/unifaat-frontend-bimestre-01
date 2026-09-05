import saveButtonClickHandler from "./saveButtonClickHandler.js";

export default function editButtonClickHandler(event) {
event.preventDefault();

const liElement = event.currentTarget.parentElement.parentElement;

const nameElement = liElement.querySelector(".user-name");
const emailElement = liElement.querySelector(".user-email");

const nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.value = nameElement.innerText;
nameInput.classList.add("form-control", "mb-1");

const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.value = emailElement.innerText;
emailInput.classList.add("form-control");

nameElement.replaceWith(nameInput);
emailElement.replaceWith(emailInput);

const editButton = event.currentTarget;

editButton.innerText = "Salvar";
editButton.classList.remove("btn-primary");
editButton.classList.add("btn-success");

editButton.removeEventListener("click", editButtonClickHandler);
editButton.addEventListener("click", saveButtonClickHandler);

}
