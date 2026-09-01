import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import postgres from '../../database/connections/postgres.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
    name: 'seed',
    description: 'Popula o banco com dados de exemplo',

    async handle() {
        // resolvido a partir do próprio arquivo (não de process.cwd()), pra
        // funcionar tanto rodando `node command seed` na raiz do repo
        // quanto `docker compose run nodecommand-container seed`, onde o
        // cwd já é a pasta backend/
        const seedPath = path.resolve(__dirname, '../../database/seeds/initialSeed.js')
        const seedModule = await import(pathToFileURL(seedPath).href)

        if (typeof seedModule.default !== 'function') {
            throw new Error('Seed não exporta uma função padrão')
        }

        console.log('Executando seed inicial...')
        await postgres.query('BEGIN')

        try {
            await seedModule.default(postgres)
            await postgres.query('COMMIT')
            console.log('Seed concluída com sucesso.')
        } catch (error) {
            await postgres.query('ROLLBACK')
            throw error
        } finally {
            await postgres.close()
        }
    }
}
