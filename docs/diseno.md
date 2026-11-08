# Diseño: Bloodblade horizontal

## Composición

Fondo negro, tipografía uniforme de sistema y espada horizontal con el mango a la izquierda.
El nombre se sitúa en dos líneas dentro del hueco central entre las hojas, a 8.8 unidades del ancho del contenedor (aproximadamente 106 px en escritorio), con relleno negro y contorno rojo neón. Inicialmente está oculto visualmente,
pero permanece como encabezado semántico. El contenido profesional sigue accesible.

## Recurso visual

Se utiliza la captura recortada de la Bloodblade de Halo Infinite documentada en
`assets/images/FUENTES.md`. Se preservan sus colores y texturas. Las hojas se separan en dos capas y el mango se adapta en altura para ampliar el espacio del nombre; esta composición ya no conserva las proporciones originales del arma. Sustituye al SVG
interpretativo anterior. El estado apagado recorta el mango con CSS: no es un modelo 3D
ni una captura independiente del arma desactivada. La imagen pesa aproximadamente 3.6 MB.

## Interacción

- Clic en el mango o en el botón inferior, Enter o Espacio: activación y desactivación.
- Las hojas se extienden desde el mango en 650 ms.
- El nombre aparece con un desenfoque que se resuelve durante un segundo.
- La luz ambiental roja se activa sobre la portada y el fondo de la página.
- Una segunda pulsación apaga las hojas, oculta el nombre central y retira la luz ambiental.
- Plasma: filamentos y partículas en Canvas 2D, con un único bucle basado en tiempo y un máximo de 140 partículas.
- El movimiento se puede pausar con el control «Pausar plasma». Se detiene al ocultar la pestaña, salir de pantalla o apagar la espada.
- Movimiento reducido: cambios inmediatos, sin transiciones ni plasma animado.
- Sin JavaScript: el perfil y la navegación funcionan, con una alternativa textual en la escena.

## Validación

Revisado en Chromium a 375, 768, 1024 y 1440 px: sin desbordamiento horizontal,
activación mediante ratón y teclado, nombre oculto antes de activar y visible después,
y preferencia de movimiento reducido. El tamaño del nombre se adapta al ancho del dispositivo. Se verifican también los controles de pausa del plasma.

## Herramientas

Se conserva la base HTML/CSS del proyecto. CSS por capas y Canvas 2D resuelven la composición y el plasma sin dependencias ni compilación. Tailwind no es necesario para estos efectos específicos.
