import UserModel from "../../../Models/UserModel.js";
import bcrypt from "bcrypt";

export default async function UpdateUserController(request, response) {
    try {
        const { id } = request.params;
        const { name, email, password } = request.body;

        if (!name || !email) {
            return response.status(400).json({
                error: "Name and email are required"
            });
        }

        const user = await UserModel.findByPk(id);

        if (!user) {
            return response.status(404).json({
                error: "User not found"
            });
        }

        user.name = name;
        user.email = email;

        // Se password foi fornecido, criptografa e atualiza
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        return response.json(user);
    } catch (error) {
        console.error(error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return response.status(409).json({
                error: "Email already exists"
            });
        }

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}