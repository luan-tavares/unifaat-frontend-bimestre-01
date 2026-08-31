import userRender from "./userRender.js";
import { userListApi } from "../api/userListApi.js";

let currentPage = 1;

export default async function listUserRender(page = currentPage) {

    currentPage = page;

    const sectionListElement = document.querySelector("#list-container");

    sectionListElement.innerHTML = "";

    const ulElement = document.createElement("ul");
    ulElement.classList.add("list-group");

    sectionListElement.append(ulElement);

    const { data: users, page: apiPage, next } = await userListApi({ page: currentPage });

    ulElement.innerHTML = "";

    users.forEach((user) => {
        const liElement = userRender(user);

        ulElement.append(liElement);
    });

    sectionListElement.append(paginationRender(apiPage, next));

}

function paginationRender(page, next) {

    const paginationElement = document.createElement("div");
    paginationElement.classList.add("d-flex", "justify-content-between", "align-items-center", "mt-3");

    const prevButtonElement = document.createElement("button");
    prevButtonElement.classList.add("btn", "btn-outline-primary", "btn-sm");
    prevButtonElement.innerText = "Anterior";
    prevButtonElement.disabled = page <= 1;
    prevButtonElement.addEventListener("click", () => listUserRender(page - 1));

    const pageInfoElement = document.createElement("span");
    pageInfoElement.innerText = `Página ${page}`;

    const nextButtonElement = document.createElement("button");
    nextButtonElement.classList.add("btn", "btn-outline-primary", "btn-sm");
    nextButtonElement.innerText = "Próxima";
    nextButtonElement.disabled = !next;
    nextButtonElement.addEventListener("click", () => listUserRender(next));

    paginationElement.append(prevButtonElement, pageInfoElement, nextButtonElement);

    return paginationElement;

}
