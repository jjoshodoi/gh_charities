import * as fs from 'fs';
import * as path from 'path';
import chokidar from 'chokidar';

const appModulePath = path.resolve(__dirname, '../src/app.module.ts');
const modulesDir = path.resolve(__dirname, '../src/modules');

// Convert kebab or snake case to PascalCase
function toPascalCase(str: string): string {
    return str
        .split(/[_-]/)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join('');
}

// Insert import at the top of the file if it doesn't already exist
function insertImportAtTop(content: string, importLine: string): string {
    const lines = content.split('\n');

    if (lines.some(line => line.trim() === importLine.trim())) return content;

    const lastImportIndex = lines.reduce((idx, line, i) => line.startsWith('import') ? i : idx, -1);
    lines.splice(lastImportIndex + 1, 0, importLine);

    return lines.join('\n');
}

// Add module class to the Modules array
function insertIntoModulesArray(content: string, moduleClass: string): string {
    const match = content.match(/const Modules = \[((.|\n)*?)\];/);
    if (!match) {
        console.error('❌ Could not find Modules array in app.module.ts');
        return content;
    }

    const existing = match[1]
        .split(',')
        .map((m) => m.trim().replace(/\n/g, ''))
        .filter(Boolean);

    if (!existing.includes(moduleClass)) {
        existing.push(moduleClass);
    }

    const formatted = `const Modules = [\n    ${existing.join(',\n    ')}\n];`;
    return content.replace(match[0], formatted);
}

// 👀 Watch new module files
chokidar
    .watch(modulesDir, { ignored: /(^|[\\/])\../, persistent: true })
    .on('add', (filePath) => {
        if (!filePath.endsWith('.module.ts')) return;

        const fileName = path.basename(filePath);
        const folderName = path.basename(path.dirname(filePath));
        const className = toPascalCase(folderName);
        const moduleClass = `${className}Module`;
        const importPath = `./modules/${folderName}/${fileName.replace('.ts', '')}`;
        const importLine = `import { ${moduleClass} } from '${importPath}';`;

        let content = fs.readFileSync(appModulePath, 'utf8');
        content = insertImportAtTop(content, importLine);
        content = insertIntoModulesArray(content, moduleClass);

        fs.writeFileSync(appModulePath, content);
        console.log(`✅ ${moduleClass} synced to app.module.ts`);
    });

console.log('👀 Watching /modules for new .module.ts files...');
