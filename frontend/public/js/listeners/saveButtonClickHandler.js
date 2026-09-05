import { userUpdateApi } from "../api/userUpdateApi.js";
import listUserRender from "../render/listUserRender.js";

export default async function saveButtonClickHandler(event) {
event.preventDefault();

const editButton = event.currentTarget;
const liElement = editButton.parentElement.parentElement;

const inputs = liElement.querySelectorAll("input");

const nameInput = inputs[0];
const emailInput = inputs[1];

const name = nameInput.value.trim();
const email = emailInput.value.trim();

if (!name || !email) {
    alert("Nome e email são obrigatórios.");
    return;
}

try {
    await userUpdateApi(liElement.userId, {
        name,
        email
    });

    await listUserRender();

} catch (error) {
    console.error("Falha ao atualizar usuário:", error);
    alert("Não foi possível atualizar o usuário.");
}

}
