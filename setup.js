const fs = require('fs/promises');
const path = require('path');
const { execSync } = require('child_process');

async function setupProject() {
    const root = 'main';
    
    const folders = [
        `${root}/scss`,
        `${root}/css`,
        `${root}/js`,
        `${root}/img`
    ];

    // Clasificación de archivos para aplicar lógica diferenciada
    const components = ['typography', 'buttons', 'form', 'grid', 'table', 'helpers'];
    const partials = ['reset', 'config', ...components];

    const joshResetContent = `/* https://www.joshwcomeau.com/css/custom-css-reset/ */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
body { line-height: 1.5; -webkit-font-smoothing: antialiased; }
img, picture, video, canvas, svg { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }
p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }
#root, #__next { isolation: isolate; }`;

    const configContent = `// Sass Built-in Modules
@use 'sass:math';
@use 'sass:string';
@use 'sass:list';
@use 'sass:map';
@use 'sass:meta';

// Variables de configuración
$primary-color: #3b82f6;
$font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
$font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;		
`;

    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sass Advanced Architecture</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <main id="root">
        <h1>Arquitectura Escalable con Sass</h1>
    </main>
    <script src="js/script.js"></script>
</body>
</html>`;

    const mainScssContent = partials
        .map(file => `@use '${file}';`)
        .join('\n');

    try {
        console.log('🚀 Generando estructura avanzada...');

        for (const folder of folders) {
            await fs.mkdir(folder, { recursive: true });
        }

        // Crear archivos parciales con su lógica específica
        for (const name of partials) {
            const fileName = `_${name}.scss`;
            let content = `// Estilos para ${name}`;

            if (name === 'reset') {
                content = joshResetContent;
            } else if (name === 'config') {
                content = configContent;
            } else if (components.includes(name)) {
                // Inyectar referencia global a config en componentes
                content = `@use 'config' as *;\n\n// Estilos para ${name}`;
            }

            await fs.writeFile(path.join(root, 'scss', fileName), content);
        }
        
        await fs.writeFile(path.join(root, 'scss', 'main.scss'), mainScssContent);
        await fs.writeFile(path.join(root, 'js', 'script.js'), '// JS inicial');
        await fs.writeFile(path.join(root, 'index.html'), htmlContent);

        console.log('📦 Instalando dependencias...');
        process.chdir(root);
        execSync('npm init -y');
        execSync('npm install sass --save-dev');

        const pkgPath = 'package.json';
        const pkgData = JSON.parse(await fs.readFile(pkgPath, 'utf8'));
        pkgData.scripts = {
            "dev": "sass --watch scss/main.scss:css/main.css",
            "build": "sass scss/main.scss:css/main.css --style compressed"
        };
        await fs.writeFile(pkgPath, JSON.stringify(pkgData, null, 2));

        console.log('🎨 Compilación inicial exitosa.');
        execSync('npx sass scss/main.scss:css/main.css');

        console.log('\n--- ✨ ¡Estructura completa! ---');
        console.log('1. Configuración con módulos built-in listos.');
        console.log('2. Componentes vinculados a config mediante namespace global (*).');
        console.log('3. Reset de Josh W. Comeau integrado.');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

setupProject();