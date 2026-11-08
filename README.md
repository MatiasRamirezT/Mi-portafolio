# Portafolio de Matías Ramírez Torres

Portafolio orientado a soporte de software y mesa de ayuda.
Contiene el perfil profesional y una primera portada negra y roja con una espada de energía interactiva inspirada en Halo.

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
│   ├── js/
│   │   ├── main.js            # Activación de la espada
│   │   └── plasma.js          # Filamentos, partículas y pausa del movimiento
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
- El correo y teléfono incluidos en el HTML serán visibles al publicar el sitio.

## Estado y próximos pasos

- El HTML contiene perfil, experiencia, conocimientos, formación, certificaciones y contacto.
- La portada usa rojo sangre (`#C92336`), fondo negro y tipografía de sistema uniforme.
- El nombre aparece entre las hojas al activar la espada y pasa de difuminado a nítido.
- Una captura de la Bloodblade de Halo Infinite se presenta horizontal; clic, Enter o Espacio alternan sus hojas y la iluminación ambiental. Fuente y créditos en `assets/images/FUENTES.md`.
- Nombre grande en dos líneas, negro con borde rojo neón, entre las hojas que se abren hacia la derecha.
- Plasma animado con Canvas 2D y control para pausarlo. Se detiene fuera de pantalla o en pestañas ocultas.
- La preferencia de movimiento reducido elimina las animaciones; el contenido sigue disponible sin JavaScript.
- La imagen de la espada está incluida; no se han añadido fuentes externas, documentos descargables ni proyectos ficticios.
- El diseño inicial y sus criterios están documentados en `docs/diseno.md`.
- Esta estructura no configura despliegues ni publica el sitio. La publicación del entorno de desarrollo es independiente de la publicación de la web.
