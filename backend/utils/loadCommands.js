import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export default async function loadCommands(commandsPath, program) {
    const files = await fs.readdir(commandsPath)

    for (const file of files) {
        if (!file.endsWith('.js')) {
            continue
        }

        const commandFilePath = path.join(commandsPath, file)
        const commandModule = await import(pathToFileURL(commandFilePath).href)

        const commandDefinition = commandModule.default

        if (!commandDefinition) {
            continue
        }

        registerCommand(commandDefinition, program)
    }
}

function registerCommand(commandDefinition, program) {
    let command = program
        .command(commandDefinition.name)
        .description(commandDefinition.description ?? '')

    if (commandDefinition.alias) {
        command.alias(commandDefinition.alias)
    }

    for (const option of commandDefinition.options ?? []) {
        command.option(...option)
    }

    command.action(async (...args) => {
        try {
            await commandDefinition.handle(...args)
        } catch (error) {
            console.error(error)
            process.exit(1)
        }
    })
}