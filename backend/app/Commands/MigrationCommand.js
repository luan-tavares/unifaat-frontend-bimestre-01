import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import postgres from '../../database/connections/postgres.js'
import { ensureMigrationsTable, getExecutedMigrations } from '../../utils/migrationUtils.js'
import CONSTANTS from '../../bootstrap/config.js'

export default {
    name: 'migrate',
    description: 'Executa as migrations pendentes',

    async handle() {
        await ensureMigrationsTable(postgres);



        const migrationsPath = path.resolve(CONSTANTS.DIR, 'backend', 'database', 'migrations')

        await fs.mkdir(migrationsPath, { recursive: true })

        const files = await fs.readdir(migrationsPath)

        const migrationFiles = files
            .filter(file => file.endsWith('.js'))
            .sort()

        const m = await getExecutedMigrations(postgres);

        const executedMigrations = m.rows.map(row => row.name)

        const pendingMigrations = migrationFiles.filter(file => {
            return !executedMigrations.includes(file)
        })

        if (pendingMigrations.length === 0) {
            console.log('Nenhuma migration pendente.')
            await postgres.close();
            return
        }

        const result = await postgres.query('SELECT MAX(batch) AS max_batch FROM migrations')
        const nextBatch = result.rows[0].max_batch === null ? 1 : result.rows[0].max_batch + 1

        for (const file of pendingMigrations) {
            const filePath = path.resolve(migrationsPath, file)
            const migration = await import(pathToFileURL(filePath).href)

            if (typeof migration.up !== 'function') {
                throw new Error(`Migration ${file} não possui função up()`)
            }

            console.log(`Executando: ${file}`)

            await postgres.query('BEGIN')

            try {
                await migration.up(postgres)

                await postgres.query(
                    'INSERT INTO migrations (name, batch) VALUES ($1, $2)',
                    [file, nextBatch]
                )

                await postgres.query('COMMIT')

                console.log(`Executada: ${file}`)
            } catch (error) {
                await postgres.query('ROLLBACK')
                throw error
            }
        }

        console.log('Migrations finalizadas.')

        await postgres.close();
    },
}

