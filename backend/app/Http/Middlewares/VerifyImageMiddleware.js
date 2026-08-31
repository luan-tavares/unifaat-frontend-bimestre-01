import path from 'path';
import UserModel from "../../Models/UserModel.js";

/**
 * Middleware para validar arquivo de imagem antes do upload.
 * 
 * Verificações realizadas:
 * - Arquivo foi enviado
 * - Apenas um arquivo foi enviado
 * - Extensão é válida (jpg, jpeg, png, gif, webp)
 * - Usuário existe no banco de dados
 * 
 * Se todas as validações passarem, passa o controle para o próximo middleware/controlador.
 * Caso contrário, retorna erro apropriado.
 */
export default async function VerifyImageMiddleware(request, response, next) {
    try {
        // Valida se arquivo foi enviado
        if (!request.files || !request.files.image) {
            return response.status(400).json({
                error: "No image file provided"
            });
        }

        const image = request.files.image;

        // Valida se é um arquivo válido (não é array)
        if (Array.isArray(image)) {
            return response.status(400).json({
                error: "Only one image file is allowed"
            });
        }

        // Valida extensão do arquivo (apenas imagens)
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const fileExtension = path.extname(image.name).toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            return response.status(400).json({
                error: `Invalid file extension. Allowed: ${allowedExtensions.join(', ')}`
            });
        }

        // Verifica se o usuário existe
        const { id } = request.params;
        const user = await UserModel.findByPk(id);

        if (!user) {
            return response.status(404).json({
                error: "User not found"
            });
        }

        // Armazena o usuário no request para uso no controlador
        request.user = user;

        // Passa o controle para o próximo middleware/controlador
        next();
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}
