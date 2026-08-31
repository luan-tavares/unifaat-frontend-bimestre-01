import clientApi from "./_clientApi.js";

export async function userCreateApi(requestBody) {
    const { data } = await clientApi.post("/users", requestBody);

    return data;
}
