import { Command } from 'commander'

import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import loadCommands from './utils/loadCommands.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
    .name('command')
    .description('CLI da aplicação')
    .version('1.0.0')

const commandsPath = path.join(__dirname, 'app', 'Commands');

await loadCommands(commandsPath, program);

program.parse(process.argv);