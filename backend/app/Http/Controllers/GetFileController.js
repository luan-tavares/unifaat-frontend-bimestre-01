import fs from 'node:fs/promises';
import path from 'node:path';
import CONSTANTS from '../../../bootstrap/config.js';

export default async function GetFileController(request, response) {

    try {
        const filePath = path.join(CONSTANTS.DIR, 'storage', 'arquivo.txt');
        const content = await fs.readFile(filePath, 'utf-8');
        return response.send(content);
    } catch {
        return response.send('Erro ao ler arquivo');
    }
}