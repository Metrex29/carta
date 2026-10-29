# 🌻 Web Romántica "C & S" (Estilo Apple + Girasol) — Guía para Principiantes

Esta plantilla es una página web **100 % estática, romántica y minimalista**, inspirada en el diseño de **apple.com** y en el **girasol** como símbolo principal. Funciona únicamente con HTML, CSS y JavaScript puro (sin frameworks, sin `npm`, sin compilación) para que puedas personalizarla fácilmente y subir la carpeta tal cual a **Cloudflare** en su plan gratuito.

---

## 📁 Estructura de carpetas (la raíz es la que se publica)

```text
/
├── index.html        <- Estructura principal (con girasol SVG animado, header C & S y secciones)
├── css/
│   └── style.css     <- Diseño estilo Apple, paleta girasol, modo oscuro y animaciones
├── js/
│   ├── config.js     <- ⭐ AQUÍ EDITAS TODO (monograma, fecha, textos, fotos, música, clave)
│   └── main.js       <- Lógica del girasol, contador + próximo mesiversario, galería y carta
├── fotos/            <- 📁 Pon aquí tus fotografías (.jpg, .webp, .png o .svg)
├── musica/           <- 📁 Pon aquí vuestra canción en formato .mp3 (opcional)
├── favicon.svg       <- Icono de girasol en SVG para la pestaña del navegador
├── robots.txt        <- Evita que Google y otros buscadores indexen la web
├── _headers          <- Cabeceras de seguridad, noindex y caché para Cloudflare
└── README.md         <- Esta guía paso a paso
```

---

## ✏️ 1. Cómo añadir fotos y cambiar textos en `js/config.js`

**No necesitas saber programar.** Todo lo que quieras personalizar está en un único archivo: **`js/config.js`**.

1. Abre **`js/config.js`** con cualquier editor de texto (Bloc de notas, TextEdit o Visual Studio Code).
2. Modifica únicamente los textos que aparecen **entre comillas** (`"así"`), sin borrar las comillas ni las comas (`,`) al final de las líneas.

### 🔤 Cambiar el monograma `"C & S"` y vuestros nombres
En el bloque **`1. IDENTIDAD Y MONOGRAMA`** de `js/config.js`:
```js
identidad: {
  monograma: "C & S",
  nombre1: "Carlos",
  nombre2: "Sofía"
},
```
- El valor de `monograma` (`"C & S"`) es independiente de los nombres y es lo que se mostrará siempre en la barra superior estilo Apple, en la portada, en la bienvenida y en el pie de página (con la `C` y la `S` en grande y el `&` en color amarillo girasol).

### 📅 Cambiar la fecha de inicio (Contador y Próximo Mesiversario)
En el bloque **`5. CONTADOR EN VIVO + PRÓXIMO MESIVERSARIO`**:
```js
fechaInicio: "2026-08-29T18:00:00",
```
- Pon vuestra fecha real en formato `AAAA-MM-DDTHH:MM:SS` (año-mes-día y hora).
- La página calculará sola los **meses, días, horas, minutos y segundos** que lleváis juntos, y además actualizará la tarjeta de **"Próximo mesiversario"** con la cuenta atrás automática hasta el siguiente día del mes en que empezasteis.

### 📸 Cómo añadir o cambiar fotos
1. Copia tus fotos dentro de la carpeta **`fotos/`** (por ejemplo: `cita1.jpg`, `playa.webp`).
2. En `js/config.js`, ve a **`4. PORTADA PRINCIPAL`** para cambiar la foto grande de portada (`fotoPrincipal: "fotos/tu-foto.jpg"`).
3. Ve a **`6. GALERÍA DE FOTOS`** para editar las 8 fotos o añadir nuevas copiando un bloque `{ ... }`:
   ```js
   {
     archivo: "fotos/cita1.jpg",
     descripcion: "Los nervios y las risas de nuestra primera cita",
     fecha: "Agosto 2026",
     destacada: "normal" // Puedes usar "grande", "ancha" o "normal"
   },
   ```
4. **Regla importante de rutas:** escribe siempre rutas relativas **sin barra al principio**: `"fotos/cita1.jpg"` (nunca `"/fotos/cita1.jpg"`).
5. Si alguna foto no existe o tiene el nombre mal escrito, la web mostrará automáticamente un **placeholder elegante con un girasol** en lugar de un icono de imagen rota.

### 🌻 Personalizar la pantalla de bienvenida del girasol y la música
- En **`3. PANTALLA DE BIENVENIDA`**, puedes cambiar el texto (`"Para ti."`), activar una espera automática (`autoEntrarSegundos: 5`) o activar una clave (`contrasenaActiva: true`).
- La pantalla de bienvenida se muestra solo la primera vez por sesión (`sessionStorage`), pero en el pie de página tienes el botón *"Ver animación del girasol otra vez"* para repetirla cuando quieras.
- Para poner música, guarda tu archivo `.mp3` en **`musica/cancion.mp3`** y revisa el bloque **`10. MÚSICA DE FONDO`** en `js/config.js`.

---

## 🖼️ 2. Consejo para reducir el peso de las fotos (con Squoosh)

Las fotos originales del móvil suelen pesar entre 4 MB y 12 MB. Reducirlas hará que la web cargue al instante en el móvil de tu pareja.

- **Tamaño ideal:** máximo **1600 px** de ancho.
- **Peso ideal:** **menos de 500 KB** por cada foto.
- **Formato recomendado:** **`.webp`** o **`.jpg`**.

### Cómo hacerlo gratis en 1 minuto con [Squoosh.app](https://squoosh.app/):
1. Abre **[https://squoosh.app/](https://squoosh.app/)** en tu navegador (herramienta gratuita de Google que comprime tus fotos directamente en tu ordenador sin subirlas a internet).
2. Arrastra tu foto a la página.
3. En el panel derecho activa **Resize** y pon **Width: `1600`**.
4. En **Compress** selecciona **WebP** o **MozJPEG** (calidad `80`).
5. Descarga la imagen y guárdala en la carpeta `fotos/`.

> **⚠️ Límite del plan gratuito de Cloudflare:** cada archivo individual (foto o canción MP3) puede pesar como máximo **25 MiB**, con un máximo de 20.000 archivos en total. Un MP3 normal pesa entre 3 y 8 MB y cada foto optimizada menos de 0,5 MB, así que estarás muy por debajo del límite.

---

## 💻 3. Cómo probar la web en tu ordenador (en local)

1. Abre la carpeta del proyecto en tu ordenador.
2. Haz **doble clic sobre `index.html`**. Se abrirá directamente en tu navegador (Safari, Chrome, Edge o Firefox).
3. Si quieres volver a ver la pantalla inicial del girasol después de haber pulsado *"Entrar"*, haz clic en el enlace **"Ver animación del girasol otra vez"** abajo del todo en el pie de página.
4. *(Opcional)* Si usas Visual Studio Code puedes abrirla con la extensión **Live Server**, o con Python ejecutando `python -m http.server 8000` en la carpeta.

---

## ☁️ 4. Cómo publicarla GRATIS en Cloudflare (Pages o Workers con Static Assets)

Crea una cuenta gratuita en **[https://dash.cloudflare.com/](https://dash.cloudflare.com/)**. Puedes desplegar la carpeta tal cual usando cualquiera de estos métodos gratuitos:

### Método 1: Subida directa (*Direct Upload*) — El más sencillo (sin GitHub)
1. En el menú izquierdo de Cloudflare, entra en **Compute (Workers & Pages)** → **Workers & Pages**.
2. Haz clic en el botón azul **Create** arriba a la derecha.
3. Selecciona la pestaña **Pages** y en *"Upload your static files"* haz clic en **Get started / Upload assets**.
4. Escribe el nombre de tu proyecto (por ejemplo `c-y-s-girasol`) y pulsa **Create project**.
5. Arrastra la carpeta completa del proyecto (asegurándote de que `index.html` esté en la raíz) y pulsa **Deploy site**.
6. ¡Listo! En unos segundos tendrás tu dirección `https://c-y-s-girasol.pages.dev` funcionando con HTTPS.

### Método 2: Conectando un repositorio de GitHub (Pages o Workers Static Assets)
1. Sube los archivos de esta carpeta a un repositorio **privado** en tu cuenta de GitHub.
2. En Cloudflare, ve a **Workers & Pages** → **Create**.
   - **Si eliges la pestaña Pages → Connect to Git:**
     - Selecciona tu repositorio de GitHub.
     - **Framework preset:** `None`
     - **Build command:** *(déjalo completamente VACÍO)*
     - **Build output directory:** `/` *(la raíz)*
     - Pulsa **Save and Deploy**.
   - **Si eliges Workers con Static Assets:**
     - Al importar tu repositorio o subir la carpeta con Wrangler (`npx wrangler deploy --assets=.`), indica como directorio de *assets* la raíz `./` sin comando de compilación.

---

## 🔄 5. Cómo actualizar la web cuando cambies fotos o textos

- **Si la subiste arrastrando la carpeta (Subida directa):**
  1. Haz tus cambios en `js/config.js` o añade fotos nuevas a `fotos/`.
  2. Entra en Cloudflare → **Workers & Pages** → entra en tu proyecto.
  3. Pulsa **Create new deployment** arriba a la derecha, vuelve a arrastrar la carpeta y pulsa **Save and Deploy**.
- **Si conectaste GitHub:**
  1. Guarda tus cambios y haz *commit / push* a GitHub. Cloudflare publicará la nueva versión automáticamente en unos segundos.

---

## 🌐 6. Cómo cambiar el nombre de la dirección y conectar un dominio propio (Opcional)

- **Cambiar el nombre `*.pages.dev`:** el nombre gratuito depende del nombre del proyecto en Cloudflare. Si quieres cambiarlo, crea un proyecto nuevo en **Workers & Pages** con el nombre que prefieras, sube la carpeta en 10 segundos y elimina el proyecto antiguo desde **Settings → General → Delete project**.
- **Conectar un dominio propio (ej. `cys.com`):** entra en tu proyecto en Cloudflare → pestaña **Custom domains** → **Set up a custom domain**, escribe tu dominio y sigue el asistente automático.

---

## 🔒 7. Contraseña y Privacidad Real con Cloudflare Access (Opcional)

### ⚠️ Aviso sobre la contraseña incluida en `js/config.js`
En `js/config.js` puedes poner `contrasenaActiva: true` para que la pantalla inicial del girasol pida una clave antes de entrar.
**Importante:** esa opción es una **protección ligera/simbólica y NO es segura**, ya que al ser una página 100 % estática cualquier persona que inspeccione el código fuente del navegador podría ver la clave en `js/config.js`.

### 🛡️ Cómo proteger la web de forma 100 % segura y GRATIS con Cloudflare Access (Zero Trust)
Si quieres que **solo tu pareja y tú** podáis cargar la web recibiendo un código temporal en vuestro correo electrónico (gratis hasta 50 usuarios):

1. Entra en tu proyecto dentro de **Workers & Pages** → pestaña **Settings** → **General**.
2. En **Access Policy**, pulsa **Enable** / **Manage** (o abre **Zero Trust** en el menú izquierdo de Cloudflare → **Access** → **Applications** → **Add an application** → **Self-hosted**).
3. Selecciona el dominio de tu web (`tu-proyecto.pages.dev`).
4. Crea una regla (**Policy**) con acción **Allow** y en **Include** elige **Emails**, añadiendo únicamente el correo electrónico de tu pareja y el tuyo.
5. Guarda los cambios. Ahora Cloudflare pedirá verificación por email antes de enseñar cualquier foto o texto de la web.

---

## ✅ 8. Lista de comprobación final antes de compartir el enlace

- [ ] **Monograma y textos listos:** Has comprobado el monograma `"C & S"`, la fecha de inicio (`fechaInicio`), los hitos de los 2 meses, las razones y la carta final en `js/config.js`.
- [ ] **Rutas relativas:** Todas las rutas en `js/config.js` están escritas sin `/` inicial (ej. `"fotos/foto1.jpg"` y `"musica/cancion.mp3"`).
- [ ] **Peso de archivos:** Tus fotos están optimizadas (máximo 1600 px, menos de 500 KB cada una) y ningún archivo supera los **25 MiB** del plan gratuito.
- [ ] **Bloqueo de buscadores (`noindex`):** Están incluidos `robots.txt`, `_headers` (`X-Robots-Tag: noindex, nofollow`) y `<meta name="robots" content="noindex, nofollow">` en `index.html`.
- [ ] **Prueba en el móvil:** Has abierto la web en el móvil para comprobar la animación inicial del girasol, el menú desplegable superior, el contador + próximo mesiversario, el deslizamiento (*swipe*) de fotos en la galería y la lectura de la carta final.
