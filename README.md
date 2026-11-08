# Portafolio de Matías Ramírez Torres

Portafolio profesional orientado a soporte de software y mesa de ayuda. Presenta perfil, experiencia, capacidades, formación y contacto.

## Estructura

```text
Mi-portafolio/
├── index.html                 # Contenido público y estructura semántica
├── README.md                  # Instrucciones del proyecto
├── .gitignore                 # Archivos locales que Git debe ignorar
├── assets/
│   ├── css/
│   │   ├── tokens.css         # Variables del futuro sistema visual
│   │   └── main.css           # Estilos, componentes y responsive
│   │   └── main.js            # Navegación y formulario
│   │   └── signal-intro.js    # Animación de señal a tendencia
│   ├── js/
│   │   └── main.js            # Menú compacto y formulario de correo
│   ├── images/                # Fotografías y capturas optimizadas
│   ├── icons/                 # Iconos SVG y favicon
│   ├── fonts/                 # Fuentes autoalojadas y sus licencias
│   └── documents/             # Documentos destinados a descarga pública
└── docs/
    ├── contenido.md           # Inventario de contenido y pendientes
    └── diseno.md              # Plan visual y criterios de revisión
```

Las carpetas reservadas contienen `.gitkeep`, un marcador para que Git las conserve
mientras están vacías. Se puede eliminar al añadir el primer archivo real.

## Desarrollo local

No se necesitan dependencias, instalación ni compilación.
Se puede abrir `index.html` directamente en un navegador.
Para comprobar la página mediante HTTP, desde la raíz del repositorio:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Detener el servidor con `Ctrl+C` al terminar.

## Reglas para añadir archivos

- Usar nombres en minúsculas, sin espacios ni tildes, separados por guiones: `proyecto-soporte.webp`.
- Mantener las rutas relativas, como `assets/images/proyecto-soporte.webp`, para admitir un sitio en un subdirectorio.
- Conservar el contenido público en `index.html`; las notas de trabajo van en `docs/`.
- Definir valores visuales compartidos en `tokens.css` y consumirlos desde `main.css`.
- Guardar fotografías y capturas preferentemente en WebP o AVIF; iconos en SVG.
- Añadir fuentes WOFF2 junto con su licencia cuando se haya elegido la tipografía.
- Guardar en `assets/documents/` solo documentos que se quieran hacer públicos.
- No añadir enlaces a imágenes, certificados o documentos hasta que existan sus archivos.
- El correo incluido en el HTML será visible al publicar el sitio. El formulario prepara un borrador en la aplicación de correo del visitante; no envía datos a un servidor.

## Estado y próximos pasos

- El HTML contiene perfil, experiencia, conocimientos, formación, certificaciones y contacto.
- La identidad visual combina negro y rojo con una señal visual que conecta soporte de usuarios y análisis de datos.
- La portada presenta perfil, enfoque profesional y navegación centrada.
- La navegación centrada se compacta en una cápsula horizontal y conserva sus enlaces visibles al desplazarse.
- El formulario prepara el mensaje en la aplicación de correo del visitante; no necesita un servicio externo.
- El diseño inicial y sus criterios están documentados en `docs/diseno.md`.
- Esta estructura no configura despliegues ni publica el sitio. La publicación del entorno de desarrollo es independiente de la publicación de la web.
