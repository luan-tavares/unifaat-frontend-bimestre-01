import UserModel from "../../../Models/UserModel.js";

export default async function GetUserController(request, response) {
    try {
        const { id } = request.params;

        const user = await UserModel.findByPk(id);

        if (!user) {
            return response.status(404).json({
                error: "User not found"
            });
        }

        return response.json(user);
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}