import clientApi from "./_clientApi.js";

export async function userUpdateApi(id, requestBody) {
    const { data } = await clientApi.put(`/users/${id}`, requestBody);

    return data;
}
