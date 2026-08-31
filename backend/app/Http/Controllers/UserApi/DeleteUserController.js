import UserModel from "../../../Models/UserModel.js";

export default async function DeleteUserController(request, response) {
    try {
        const { id } = request.params;

        const user = await UserModel.findByPk(id);

        if (!user) {
            return response.status(404).json({
                error: "User not found"
            });
        }

        await user.destroy();

        return response.status(204).send();
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}