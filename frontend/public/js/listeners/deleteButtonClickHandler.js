import { userDeleteApi } from "../api/userDeleteApi.js";
import listUserRender from "../render/listUserRender.js";

export default async function deleteButtonClickHandler(event) {
    event.preventDefault();

    const liElement = event.currentTarget.closest("li");

    const id = liElement.userId;

    await userDeleteApi(id);

    await listUserRender();
}