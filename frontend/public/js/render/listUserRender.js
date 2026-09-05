import userRender from "./userRender.js";
import { userListApi } from "../api/userListApi.js";

let currentPage = 1;

export default async function listUserRender(page = currentPage) {

const sectionListElement = document.querySelector("#list-container");

sectionListElement.innerHTML = "";

const ulElement = document.createElement("ul");
ulElement.classList.add("list-group");

sectionListElement.append(ulElement);

const { page: responsePage, next, total, data: users } = await userListApi({
    page
});

currentPage = responsePage;

users.forEach((user) => {
    const liElement = userRender(user);

    ulElement.append(liElement);
});

const paginationElement = document.createElement("div");
paginationElement.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "mt-3"
);

const previousButton = document.createElement("button");
previousButton.classList.add("btn", "btn-secondary");
previousButton.innerText = "Anterior";
previousButton.disabled = currentPage === 1;

previousButton.addEventListener("click", async () => {
    if (currentPage > 1) {
        await listUserRender(currentPage - 1);
    }
});

const pageElement = document.createElement("span");
pageElement.innerText = `Página ${currentPage} de ${Math.ceil(total / 10)}`;

const nextButton = document.createElement("button");
nextButton.classList.add("btn", "btn-secondary");
nextButton.innerText = "Próxima";
nextButton.disabled = !next;

nextButton.addEventListener("click", async () => {
    if (next) {
        await listUserRender(currentPage + 1);
    }
});

paginationElement.append(
    previousButton,
    pageElement,
    nextButton
);

sectionListElement.append(paginationElement);

}
