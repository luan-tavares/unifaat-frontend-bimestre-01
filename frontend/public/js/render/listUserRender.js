import userRender from "./userRender.js";
import { userListApi } from "../api/userListApi.js";

export default async function listUserRender() {

    const sectionListElement = document.querySelector("#list-container");

    sectionListElement.innerHTML = "";

    const ulElement = document.createElement("ul");
    ulElement.classList.add("list-group");

    sectionListElement.append(ulElement);

    const { data: users } = await userListApi();

    ulElement.innerHTML = "";

    users.forEach((user) => {
        const liElement = userRender(user);

        ulElement.append(liElement);
    });

}
