import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

/**
 * Faz upload de imagem de perfil para um usuário.
 * 
 * Rota: POST /users/image/:id
 * Parâmetros:
 *   - id: id do usuário na URL
 * Body esperado:
 *   - multipart/form-data com campo 'image' contendo o arquivo
 * 
 * Obs: VerifyImageMiddleware valida o arquivo antes deste controlador ser acionado.
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function UploadImageController(request, response) {
    try {
        const image = request.files.image;
        const user = request.user;

        // Define o diretório de armazenamento
        const storagePath = path.resolve(process.cwd(), 'storage', 'users');

        // Cria o diretório se não existir
        if (!fs.existsSync(storagePath)) {
            fs.mkdirSync(storagePath, { recursive: true });
        }

        // Gera um nome único para o arquivo usando timestamp + nome original
        const timestamp = Date.now();
        const fileName = `${timestamp}_${image.name}`;
        const filePath = path.join(storagePath, fileName);

        // Salva o arquivo no disco
        await image.mv(filePath);

        // Atualiza o campo picture do usuário com o nome do arquivo
        user.picture = fileName;
        await user.save();

        return response.status(200).json({
            message: "Image uploaded successfully",
            picture: fileName,
            user
        });
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}
