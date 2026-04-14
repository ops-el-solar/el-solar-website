# El Solar — Sitio Web (site/)

## Stack técnico
- HTML5, CSS3, JS vanilla — sitio estático
- Deploy: Netlify (netlify.toml en raíz)
- Repositorio git propio dentro de site/ (.git separado)

## Estructura de archivos
```
site/
├── index.html          ← home
├── services.html       ← servicios
├── work.html           ← casos de éxito
├── about.html          ← quiénes somos
├── contact.html        ← contacto
├── css/styles.css
├── js/main.js
└── netlify.toml
```

## Convenciones
- Editar HTML directamente — no hay framework ni build step
- CSS en un solo archivo (styles.css), sin preprocesadores
- JS mínimo, sin bundler

## Placeholders pendientes
- Número WhatsApp: wa.me/[NUMERO_REAL] (reemplazar wa.me/13050000000)
- URL Calendly: [PENDIENTE]
- Email de contacto: [PENDIENTE]
- Foto Juan Manuel: [PENDIENTE]

## Instrucciones para Claude en sesiones de este sitio
- Solo leer archivos del sitio indicados explícitamente
- No escanear dist/ ni node_modules/ si existen
- Cambios deben ser mínimos y en bloques HTML bien delimitados
- Siempre preservar la estructura semántica existente
