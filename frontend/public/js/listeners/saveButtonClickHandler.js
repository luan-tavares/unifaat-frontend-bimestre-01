import { userUpdateApi } from "../api/userUpdateApi.js";
import listUserRender from "../render/listUserRender.js";

export default async function saveButtonClickHandler(event) {
    event.preventDefault();

    const liElement = event.currentTarget.parentElement;
    const infoElement = liElement.querySelector("div");

    const [nameInput, emailInput] = infoElement.querySelectorAll("input");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) {
        alert("Nome e email são obrigatórios");
        return;
    }

    const id = liElement.userId;

    await userUpdateApi(id, { name, email });

    await listUserRender();
}
