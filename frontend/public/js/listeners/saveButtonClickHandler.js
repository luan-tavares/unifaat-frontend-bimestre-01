import { userUpdateApi } from "../api/userUpdateApi.js";
import listUserRender from "../render/listUserRender.js";

export default async function saveButtonClickHandler(event) {
    event.preventDefault();

    const liElement = event.currentTarget.closest("li");

    const nameInputElement = liElement.querySelector('input[name="name"]');
    const emailInputElement = liElement.querySelector('input[name="email"]');

    const name = nameInputElement.value.trim();
    const email = emailInputElement.value.trim();

    // não salva com nome ou email vazio: mantém em edição
    if (name === "" || email === "") {
        return;
    }

    try {
        await userUpdateApi(liElement.userId, { name, email });
    } catch (error) {
        console.error("Falha ao salvar usuário:", error);
        alert("Não foi possível salvar as alterações. Tente novamente.");
        return;
    }

    await listUserRender();
}
