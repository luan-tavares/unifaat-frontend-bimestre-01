export async function ensureMigrationsTable(postgres) {
    await postgres.query(`
    CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        batch INT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export async function getExecutedMigrations(postgres) {
    return await postgres.query(`
    SELECT name, batch
    FROM migrations
    ORDER BY id ASC
  `);
}