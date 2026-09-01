import listUserRender from "../render/listUserRender.js";

export default async function paginationClickHandler(event) {
    event.preventDefault();

    const page = Number(event.currentTarget.dataset.page);

    await listUserRender(page);
}
