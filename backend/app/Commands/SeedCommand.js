import path from 'node:path'
import { pathToFileURL } from 'node:url'
import postgres from '../../database/connections/postgres.js'
import CONSTANTS from '../../bootstrap/config.js'

export default {
    name: 'seed',
    description: 'Popula o banco com dados de exemplo',

    async handle() {
        const seedPath = path.resolve(CONSTANTS.DIR, 'backend', 'database', 'seeds', 'initialSeed.js')
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
