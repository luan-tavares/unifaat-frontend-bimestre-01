import jwt from "jsonwebtoken";

/**
 * Middleware para autenticação via JWT.
 * 
 * Verifica se o token JWT no header Authorization é válido.
 * Formato esperado: Authorization: Bearer <token>
 * 
 * Se válido:
 *   - Armazena os dados decodificados em request.user
 *   - Passa o controle para o próximo middleware/controlador
 * 
 * Se inválido:
 *   - Retorna erro 401 Unauthorized
 */
export default function AuthMiddleware(request, response, next) {
    try {
        // Pega o header Authorization
        const authHeader = request.headers.authorization;

        // Valida se Authorization foi fornecido
        if (!authHeader) {
            return response.status(401).json({
                error: "Authorization header is required"
            });
        }

        // Extrai o token do formato "Bearer <token>"
        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return response.status(401).json({
                error: "Invalid authorization header format. Use: Bearer <token>"
            });
        }

        const token = parts[1];

        // Verifica e decodifica o JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Armazena os dados do token no request para uso no controlador
        request.user = decoded;

        // Passa o controle para o próximo middleware/controlador
        next();
    } catch (error) {
        console.error(error);

        // Se erro for de token expirado
        if (error.name === "TokenExpiredError") {
            return response.status(401).json({
                error: "Token has expired"
            });
        }

        // Se erro for de token inválido
        if (error.name === "JsonWebTokenError") {
            return response.status(401).json({
                error: "Invalid token"
            });
        }

        return response.status(401).json({
            error: "Unauthorized"
        });
    }
}
