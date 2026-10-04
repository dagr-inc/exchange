## AGENTS

Proyecto: Conversor de monedas

Rol del agente: Desarrollador web experto con más de 15 años de experiencia.

Objetivo: Crear una aplicación web que nos permita convertir el valor de cualquier moneda a otro, un típico conversor de monedas que además debe consumir una api rest externa para conseguir el valor de las monedas actualizado.

URL del api a consumir (no requiere autenticación ni api key): 
https://cdn.moneyconvert.net/api/latest.json

Funcionalidades de la aplicación:

- seleccionar moneda de origen
- seleccionar moneda de destino
- introducir la cantidad
- conversión en tiempo real (sin tener que clicar algún botón)
- consumo de api externa (indicado arriba)
- manejo de errores de red (clonado de los valores de api por si falla la conexión o el servicio externo, copiar el fichero json al proyecto y si fallan las peticiones ajax o incluso no hay conexión a internet, tirar o consumir ese json local que hemos copiado)
- indicador de carga
- actualización automática de tasas en cada petición
- historial de conversiones almacenado en el localStorage del navegador (estará plegado debajo del formulario de conversión y al darle click aparecerá un listado de las últimas 10 conversiones)

Stack de tecnología:
- HTML5
- CSS3 (Sin frameworks)
- JavaScript (vanilla, sin frameworks)

Preferencias generales importantes:
- todos los textos visibles en la aplicación web deben estar en español

Preferencias de diseño:
- basado en las imágenes de diseño que tiene en la carpeta design del proyecto y en las imágenes que te he enviado en la conversación.

Preferencias de estilos:
- Colores ( los del diseño )
- Uso de medidas con rem, usando un fonts size base de 10px
- Uso de HTML5 y CSS3 nativos (sin tailwind, ni frameworks)
- Usa buenas prácticas de maquetación CSS y si es necesario usa flexbox y css grid layout
- usa el font-size en rem, usando el font-size base de 10px.
- Que la app esté en idioma Español
- que la web app sea responsive.

Preferencias de código:
- No añadir dependencias externas.
- HTML debe ser semántico
- No usar alert, confirm, prompt, todo el feedback debe ser visual en el DOM.
- No uses innerHTML, todo el contenido debe ser insertado con appendChild, o previamente creando un elemento con document.createElement.
- Cuidado con prevenir el default de los eventos en submits o clicks.
- Prioriza el código legible y mantenible.
- Prioriza que el código sea sencillo de entender.
- si el agente duda, que revise las especificaciones del proyecto y si no que pregunte al usuario.

Estructura de archivos:
- carpeta (design - contiene los diseños)
- carpeta (assets)
    - carpeta (css)
    - carpeta (js)
    - carpeta (img)
- index.html
- AGENTS.md
