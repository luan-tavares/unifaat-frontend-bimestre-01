import path from 'node:path'
import { pathToFileURL } from 'node:url'
import postgres from '../../database/connections/postgres.js'
import { ensureMigrationsTable } from '../../utils/migrationUtils.js'

export default {
    name: 'migrate:rollback',
    description: 'Desfaz a última migration executada',

    async handle() {
        await ensureMigrationsTable(postgres);

        const batchResult = await postgres.query(
            'SELECT batch FROM migrations ORDER BY id DESC LIMIT 1'
        )

        if (batchResult.rows.length === 0) {
            console.log('Nenhuma migration para desfazer.')
            await postgres.close()
            return
        }

        const lastBatch = batchResult.rows[0].batch

        const migrationsResult = await postgres.query(
            'SELECT name FROM migrations WHERE batch = $1 ORDER BY id DESC',
            [lastBatch]
        )

        if (migrationsResult.rows.length === 0) {
            console.log('Nenhuma migration para desfazer no último batch.')
            await postgres.close()
            return
        }

        for (const row of migrationsResult.rows) {
            const migrationName = row.name
            const migrationPath = path.resolve(
                'database',
                'migrations',
                migrationName
            )

            const migration = await import(pathToFileURL(migrationPath).href)

            if (typeof migration.down !== 'function') {
                throw new Error(`Migration ${migrationName} não possui função down()`)
            }

            console.log(`Desfazendo: ${migrationName}`)

            await postgres.query('BEGIN')

            try {
                await migration.down(postgres)

                await postgres.query(
                    'DELETE FROM migrations WHERE name = $1',
                    [migrationName]
                )

                await postgres.query('COMMIT')

                console.log(`Desfeita: ${migrationName}`)
            } catch (error) {
                await postgres.query('ROLLBACK')
                throw error
            }
        }

        await postgres.close()
    },
}