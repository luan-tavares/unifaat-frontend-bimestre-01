import paginationClickHandler from "../listeners/paginationClickHandler.js";

export default function paginationRender({ page, next }) {

    const navElement = document.createElement("div");
    navElement.classList.add("d-flex", "justify-content-between", "align-items-center", "mt-3");

    const buttonPrevElement = document.createElement("button");
    buttonPrevElement.classList.add("btn", "btn-outline-primary", "btn-sm");
    buttonPrevElement.innerText = "Anterior";

    if (page <= 1) {
        buttonPrevElement.disabled = true;
    } else {
        buttonPrevElement.dataset.page = page - 1;
        buttonPrevElement.addEventListener("click", paginationClickHandler);
    }

    const pageTextElement = document.createElement("span");
    pageTextElement.innerText = `Página ${page}`;

    const buttonNextElement = document.createElement("button");
    buttonNextElement.classList.add("btn", "btn-outline-primary", "btn-sm");
    buttonNextElement.innerText = "Próxima";

    if (!next) {
        buttonNextElement.disabled = true;
    } else {
        buttonNextElement.dataset.page = next;
        buttonNextElement.addEventListener("click", paginationClickHandler);
    }

    navElement.append(buttonPrevElement, pageTextElement, buttonNextElement);

    return navElement;

}
