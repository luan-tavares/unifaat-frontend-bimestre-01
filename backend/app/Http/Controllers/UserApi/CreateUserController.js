import UserModel from "../../../Models/UserModel.js";
import bcrypt from "bcrypt";

export default async function CreateUserController(request, response) {
    try {
        const { name, email, password } = request.body;

        const error = [];

        if (!name) {
            error.push("name obrigatório!");
        }

        if (!email) {
            error.push("email obrigatório!");
        }

        if (!password) {
            error.push("password obrigatório!");
        }

        if (error.length > 0) {
            return response.status(400).json({ error: error });
        }

        // Criptografa a senha com bcrypt (salt rounds: 10)
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        return response.status(201).json(user);
    } catch (error) {
        console.error(error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return response.status(409).json({
                error: error.errors[0].message
            });
        }

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}