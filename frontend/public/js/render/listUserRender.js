import userRender from "./userRender.js";
import paginationRender from "./paginationRender.js";
import { userListApi } from "../api/userListApi.js";

let currentPage = 1;

export default async function listUserRender(page = currentPage) {

    currentPage = page;

    const sectionListElement = document.querySelector("#list-container");

    sectionListElement.innerHTML = "";

    const ulElement = document.createElement("ul");
    ulElement.classList.add("list-group");

    sectionListElement.append(ulElement);

    const { data: users, page: responsePage, next } = await userListApi({ page: currentPage });

    ulElement.innerHTML = "";

    users.forEach((user) => {
        const liElement = userRender(user);

        ulElement.append(liElement);
    });

    sectionListElement.append(paginationRender({ page: responsePage, next }));

}
