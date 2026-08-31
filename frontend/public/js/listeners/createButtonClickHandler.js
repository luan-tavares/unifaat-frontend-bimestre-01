import { userCreateApi } from "../api/userCreateApi.js";
import listUserRender from "../render/listUserRender.js";

export default async function createButtonClickHandler(event) {
    event.preventDefault();

    const inputElement = event.currentTarget.parentElement.querySelector("input");

    const email = inputElement.value;

    const requestBody = {
        name: email,
        email: email,
        password: "123456"
    };

    await userCreateApi(requestBody);

    inputElement.value = "";

    await listUserRender();
}
