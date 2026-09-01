import deleteButtonClickHandler from "../listeners/deleteButtonClickHandler.js";
import editButtonClickHandler from "../listeners/editButtonClickHandler.js";

export default function userRender(user) {

    const liElement = document.createElement("li");
    liElement.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    liElement.userId = user.id;

    const infoElement = document.createElement("div");
    infoElement.classList.add("d-flex", "flex-column");

    const nameElement = document.createElement("span");
    nameElement.innerText = user.name;

    const emailElement = document.createElement("small");
    emailElement.classList.add("text-muted");
    emailElement.innerText = user.email;

    infoElement.append(nameElement, emailElement);
    infoElement.addEventListener("click", editButtonClickHandler);
    liElement.append(infoElement);

    const actionsElement = document.createElement("div");
    actionsElement.classList.add("d-flex", "gap-2");

    const buttonEditElement = document.createElement("button");
    buttonEditElement.classList.add("btn", "btn-primary", "btn-sm");
    buttonEditElement.innerText = "Editar";
    buttonEditElement.addEventListener("click", editButtonClickHandler);
    actionsElement.append(buttonEditElement);

    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.classList.add("btn", "btn-danger", "btn-sm");
    buttonDeleteElement.innerText = "Excluir";
    buttonDeleteElement.addEventListener("click", deleteButtonClickHandler);
    actionsElement.append(buttonDeleteElement);

    liElement.append(actionsElement);

    return liElement;

}
