import enterEditMode from "./editNameList.js";

function renderDisplayMode(liElement, name) {

    liElement.setAttribute("data-name", name);

    while (liElement.firstChild) {
        liElement.firstChild.remove();
    }

    liElement.append(document.createTextNode(name));

    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.classList.add("btn", "btn-danger", "btn-sm");
    buttonDeleteElement.innerText = "Excluir";
    buttonDeleteElement.addEventListener("click", (event) => {
        event.preventDefault();

        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);

        event.currentTarget.parentElement.remove();
    });
    liElement.append(buttonDeleteElement);

}

export default function createNameList(name) {

    const liElement = document.createElement("li");
    liElement.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    renderDisplayMode(liElement, name);

    liElement.addEventListener("click", (event) => {

        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);

        if (event.target !== event.currentTarget) {
            return;
        }

        enterEditMode(liElement, liElement.getAttribute("data-name"), (newName) => {
            renderDisplayMode(liElement, newName);
        });
    });

    return liElement;

}
