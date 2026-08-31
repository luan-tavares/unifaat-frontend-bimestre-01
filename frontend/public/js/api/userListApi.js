import clientApi from "./_clientApi.js";

export async function userListApi({ page = 1, limit = 10 } = {}) {
    const { data } = await clientApi.get("/users", {
        params: { page, limit, order: "id,DESC" }
    });

    return data;
}
