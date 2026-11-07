# Plan de diseño pendiente

## Estado actual

Maqueta semántica con texto. Las hojas de estilo y el script están conectados,
pero solo contienen comentarios y no cambian la presentación ni el comportamiento.

## Decisiones para la siguiente fase

- Definir la dirección visual según el perfil de soporte de software y el público empleador.
- Elegir una paleta de 4–6 colores con funciones claras y contraste suficiente.
- Elegir una o dos familias tipográficas y su escala.
- Definir anchos, espaciado, alineación y adaptación de cada sección.
- Registrar los valores compartidos en `assets/css/tokens.css`.
- Aplicar estilos y estados de interacción en `assets/css/main.css`.
- Añadir movimiento solo cuando ayude a comprender una acción o aporte al concepto visual.

## Criterios de revisión

- Texto legible y navegación disponible sin JavaScript.
- Encabezados ordenados, controles semánticos y foco de teclado visible.
- Sin desbordamiento horizontal a 375, 768, 1024 y 1440 px.
- Contraste mínimo de 4.5:1 para texto normal y 3:1 para texto grande.
- Imágenes con dimensiones explícitas y alternativas de texto apropiadas.
- Respetar `prefers-reduced-motion` y evitar esperas artificiales.
- Verificar enlaces, recursos, consola e interacciones en navegador.

Las guías de diseño y animación compartidas en la conversación sirven como referencia;
sus archivos originales todavía no están incorporados a este repositorio.
