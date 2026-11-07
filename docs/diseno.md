# Diseño: Bloodblade horizontal

## Composición

Fondo negro, tipografía uniforme de sistema y espada horizontal con el mango a la derecha.
El nombre se sitúa en el hueco central entre las dos hojas. Inicialmente está oculto visualmente,
pero permanece como encabezado semántico. El contenido profesional sigue accesible.

## Recurso visual

Se utiliza la captura recortada de la Bloodblade de Halo Infinite documentada en
`assets/images/FUENTES.md`. Se preservan sus colores y proporciones. Sustituye al SVG
interpretativo anterior. El estado apagado recorta el mango con CSS: no es un modelo 3D
ni una captura independiente del arma desactivada. La imagen pesa aproximadamente 3.6 MB.

## Interacción

- Clic en el mango o en el botón inferior, Enter o Espacio: activación y desactivación.
- Las hojas se extienden desde el mango en 650 ms.
- El nombre aparece con un desenfoque que se resuelve durante un segundo.
- La luz ambiental roja se activa sobre la portada y el fondo de la página.
- Una segunda pulsación apaga las hojas, oculta el nombre central y retira la luz ambiental.
- Movimiento reducido: cambios inmediatos, sin transiciones.
- Sin JavaScript: el perfil y la navegación funcionan, con una alternativa textual en la escena.

## Validación

Revisado en Chromium a 375, 768, 1024 y 1440 px: sin desbordamiento horizontal,
activación mediante ratón y teclado, nombre oculto antes de activar y visible después,
y preferencia de movimiento reducido. El tamaño del nombre se adapta al hueco real del arma;
en móvil queda más pequeño para preservar las proporciones horizontales solicitadas.
