import { configDotenv } from "dotenv";
import pg from "pg";

const { Pool } = pg;

export default (() => {

    configDotenv({
        quiet: true
    });


    let connection = null;


    const connect = () => {

        if (!connection) {
            connection = new Pool({
                host: process.env.POSTGRES_HOST,
                database: process.env.POSTGRES_DB,
                port: Number(process.env.POSTGRES_PORT),
                user: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD || undefined,
            });
        }

        return connection;
    }

    return {
        query: (sql, params = []) => {
            return connect().query(sql, params);
        },
        close: async () => {
            if (connection) {
                await connection.end();
                connection = null;
            }
        }
    }

})();