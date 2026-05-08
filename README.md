Instrucciones de uso

1. Crea una carpeta para tu proyecto.
  
2. Guarda el siguiente código en un archivo llamado `setup.js`.
  
3. Abre tu terminal en esa carpeta y ejecuta: `node setup.js`.
  

### ¿Qué hace exactamente este código?

1. **Recursividad:** Crea todas las carpetas necesarias (`main/`, `scss/`, `js/`, etc.) sin importar si ya existen o no.
  
2. **Arquitectura SASS:** Crea los 8 archivos parciales y genera un `main.scss` que ya tiene escritos todos los `@import`.
  
3. **Configuración de NPM:**
  
  - Crea el `package.json` automáticamente.
    
  - Instala localmente el paquete `sass`.
    
  - Configura el comando `npm run dev` para que vigile tus cambios automáticamente.
    
4. **HTML5 Boilerplate:** Te deja un archivo `index.html` listo con los enlaces a CSS y JS funcionando.
  
5. **Compilación inicial:** No espera a que tú lo hagas; compila el CSS por primera vez para verificar que todo está bien conectado.
  

### Para empezar a trabajar: 

Instala ejecutando el comando: `node setup.js`

Luego ejecutando: `npm run dev` vigilara los cambios de estilos automaticamente.
