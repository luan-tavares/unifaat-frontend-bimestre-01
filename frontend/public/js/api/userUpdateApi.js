import clientApi from "./_clientApi.js";

export async function userUpdateApi(id, { name, email }) {
    const { data } = await clientApi.put(`/users/${id}`, {
        name,
        email
    });

    return data;
}