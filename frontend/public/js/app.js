
import listUserRender from "./render/listUserRender.js";
import createButtonClickHandler from "./listeners/createButtonClickHandler.js";

window.addEventListener("DOMContentLoaded", async () => {

    try {
        await listUserRender();
    } catch (error) {
        console.error("Falha ao carregar usuários:", error);
    }

    document.querySelector("#add-section > button").addEventListener("click", createButtonClickHandler);

});
