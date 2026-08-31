import dotenv from "dotenv";
import initRelations from "../database/relations.js";

export default function app() {

    /** Inicializar variáveis de ambiente */
    dotenv.config({
        quiet: true
    });

    /** Relacionamentos */

    initRelations();
}