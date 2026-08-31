import clientApi from "./_clientApi.js";

export async function userDeleteApi(id) {
    const { data } = await clientApi.delete(`/users/${id}`);

    return data;
}
