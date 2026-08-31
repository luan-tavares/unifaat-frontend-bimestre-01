
import { configDotenv } from 'dotenv';
import { Sequelize } from 'sequelize'

export default (() => {

    configDotenv({
        quiet: true
    });

    return new Sequelize(
        process.env.POSTGRES_DB,
        process.env.POSTGRES_USER,
        process.env.POSTGRES_PASSWORD || undefined,
        {
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            dialect: 'postgres',
            logging: false
        }
    );

})();