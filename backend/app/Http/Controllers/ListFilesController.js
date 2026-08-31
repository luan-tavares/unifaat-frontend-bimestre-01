import fs from 'node:fs/promises';
import path from 'node:path';
import CONSTANTS from '../../../bootstrap/config.js';

export default async function ListFilesController(req, res) {
    try {
        const dirPath = path.join(CONSTANTS.DIR, 'public');
        const files = await fs.readdir(dirPath);

        const fileList = files
            .map(file => `<li><a href="/${file}">${file}</a></li>`)
            .join('');

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
        });

        return res.end(`
            <html>
                <head><title>Lista de Arquivos</title></head>
                <body>
                    <h2>Lista de Arquivos</h2>
                    <ul>${fileList}</ul>
                </body>
            </html>
        `);
    } catch {
        res.writeHead(500, {
            'Content-Type': 'text/plain; charset=utf-8',
        });

        return res.end('Erro ao ler o diretório');
    }
}