import fs from 'fs';
import path from 'path';

/**
 * Controlador que carrega e mescla os arquivos Swagger JSON em ./docs.
 * Cada arquivo JSON é agrupado como um resource separado no Swagger UI.
 */
export default function DocSwaggerController() {
    const docsDir = path.resolve(process.cwd(), 'docs');

    const files = fs
        .readdirSync(docsDir)
        .filter((fileName) => fileName.endsWith('.json'));

    const combined = {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentação unificada'
        },
        tags: [],
        paths: {},
        components: {
            schemas: {}
        }
    };

    for (const fileName of files) {
        const filePath = path.join(docsDir, fileName);
        const content = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(content);

        const resourceName = path.basename(fileName, '.json');

        combined.tags.push({
            name: resourceName,
            description: `Rotas do recurso ${resourceName}`
        });

        if (json.paths) {
            for (const [route, methods] of Object.entries(json.paths)) {
                if (!combined.paths[route]) {
                    combined.paths[route] = {};
                }

                for (const [method, config] of Object.entries(methods)) {
                    combined.paths[route][method] = {
                        ...config,
                        tags: [resourceName]
                    };
                }
            }
        }
    }

    return combined;
}