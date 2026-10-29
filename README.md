# ❤️ Página Web Romántica — Guía Paso a Paso para Principiantes

¡Bienvenido/a! Esta plantilla es una página web **100 % estática** (solo HTML, CSS y JavaScript puro, sin herramientas complicadas ni comandos de compilación), pensada para que puedas personalizarla fácilmente y subirla gratis a **Cloudflare Pages**.

---

## 📁 Estructura de carpetas del proyecto

La carpeta principal contiene exactamente lo que se publica en internet:

```text
/
├── index.html        <- Estructura principal de la página (no necesitas tocarlo)
├── css/
│   └── style.css     <- Diseño romántico, animaciones y modo oscuro
├── js/
│   ├── config.js     <- ⭐ AQUÍ EDITAS TODO (nombres, fechas, textos, fotos, colores)
│   └── main.js       <- Lógica del contador, galería, carta y efectos
├── fotos/            <- 📁 Pon aquí tus fotografías (.jpg, .webp, .png o .svg)
├── musica/           <- 📁 Pon aquí vuestra canción en formato .mp3 (opcional)
├── favicon.svg       <- Icono de corazón que se ve en la pestaña del navegador
├── robots.txt        <- Indica a Google y otros buscadores que NO indexen la web
├── _headers          <- Cabeceras de seguridad, privacidad (noindex) y caché para Cloudflare Pages
└── README.md         <- Esta guía paso a paso
```

---

## ✏️ 1. Cómo añadir tus fotos y cambiar los textos (`js/config.js`)

**No necesitas saber programar.** Todo el contenido de la web está concentrado en un único archivo: **`js/config.js`**.

1. Abre el archivo **`js/config.js`** con cualquier editor de texto (el **Bloc de notas** de Windows, **TextEdit** en Mac, o programas gratuitos como **Visual Studio Code**).
2. Verás que todo está dividido en secciones numeradas con comentarios en español (`portada`, `contador`, `galeria`, `historia`, `razones`, `carta`, `musica`, etc.).
3. **Regla de oro:** modifica únicamente lo que está **entre comillas** (`"así"`), respetando las comillas de apertura y cierre y las comas (`,`) al final de cada línea.

### 📸 Cómo poner vuestras fotos reales
1. Copia tus fotos dentro de la carpeta **`fotos/`** (por ejemplo: `playa.jpg`, `aniversario.webp`).
   - *Consejo:* Usa nombres de archivo sencillos, en minúsculas, sin espacios ni tildes (por ejemplo `viaje-roma.jpg` en lugar de `Foto de Roma (1).JPG`).
2. Abre `js/config.js` y busca la sección **`5. GALERÍA DE FOTOS`**.
3. Verás líneas como esta:
   ```js
   { archivo: "fotos/foto1.svg", descripcion: "Aquel primer paseo...", fecha: "Mayo 2022" },
   ```
4. Cambia `"fotos/foto1.svg"` por `"fotos/playa.jpg"`, y edita la descripción y la fecha:
   ```js
   { archivo: "fotos/playa.jpg", descripcion: "Nuestro primer día en la playa", fecha: "Agosto 2023" },
   ```
5. **Para añadir más fotos:** simplemente copia una línea entera `{ archivo: ..., descripcion: ..., fecha: ... },` y pégala debajo.
6. **Importante sobre las rutas:** Escribe siempre **`"fotos/nombre.jpg"`** (ruta relativa, **sin** barra `/` al principio). Así funcionará igual al abrirla en tu ordenador, en `*.pages.dev` y en un dominio propio.
7. Si una foto está mal escrita o aún no la has copiado, la web mostrará automáticamente una tarjeta romántica de reemplazo en vez de un icono de imagen rota.

### 🎵 Cómo poner vuestra canción de fondo (Opcional)
1. Copia tu archivo MP3 dentro de la carpeta **`musica/`** y llámalo, por ejemplo, `cancion.mp3`.
2. En `js/config.js`, revisa el bloque **`9. MÚSICA DE FONDO`**:
   ```js
   musica: {
     activa: true,
     archivo: "musica/cancion.mp3",
     tituloCancion: "Nuestra canción",
     volumen: 0.5
   },
   ```
   - Si no quieres que aparezca el botón de música, cambia `activa: true` por `activa: false`.
   - *(Mientras no pongas tu archivo `cancion.mp3`, al pulsar el botón sonará una suave melodía de caja de música de demostración).*

---

## 🖼️ Consejo importante: Optimiza el peso de tus fotos y respeta los límites

Las fotos hechas con el móvil suelen pesar entre 4 MB y 12 MB cada una. Si subes 20 fotos sin comprimir, la web tardará mucho en cargar en el móvil de tu pareja.

### Recomendación ideal para tus fotos:
- **Tamaño máximo:** **1600 px** de ancho (o alto).
- **Peso ideal:** **menos de 500 KB** por foto.
- **Formato recomendado:** **`.webp`** o **`.jpg`** (calidad 80-85 %).

### Herramienta gratuita recomendada: [Squoosh.app](https://squoosh.app/)
1. Entra en **[https://squoosh.app/](https://squoosh.app/)** desde el navegador (es gratuita, de Google, y procesa las fotos en tu propio ordenador sin subirlas a ningún servidor).
2. Arrastra tu foto.
3. Abajo a la derecha activa **Resize** y pon `Width: 1600` (deja activado el candado para mantener la proporción).
4. En **Compress** elige **WebP** o **MozJPEG** con calidad **80 %**.
5. Descarga la foto optimizada y guárdala en la carpeta `fotos/`.

### ⚠️ Límites del plan gratuito de Cloudflare Pages
El plan gratuito de Cloudflare Pages tiene dos límites técnicos que debes recordar:
- **Máximo 25 MiB por cada archivo individual:** ningún archivo suelto (ni la canción `.mp3` ni una foto) puede superar los 25 MiB. Un MP3 normal dura 3-4 minutos y pesa entre 4 y 8 MB, así que entra de sobra.
- **Máximo 20.000 archivos en total** en el proyecto (esta plantilla usa menos de 30 archivos).

---

## 💻 2. Cómo probar la web en tu ordenador (en local)

Antes de subirla a internet puedes ver cómo queda en tu propio ordenador de dos formas:

### Forma rápida (Doble clic)
1. Entra en la carpeta del proyecto.
2. Haz **doble clic sobre `index.html`**.
3. Se abrirá directamente en tu navegador (Chrome, Edge, Safari, Firefox). Cada vez que guardes un cambio en `js/config.js`, pulsa **F5** (o `Ctrl + R`) en el navegador para ver los cambios.

### Forma con servidor local (Opcional)
- **Si usas Visual Studio Code:** instala la extensión **Live Server** y haz clic en *"Go Live"* abajo a la derecha.
- **Si tienes Python instalado:** abre una terminal en la carpeta y ejecuta:
  ```bash
  python -m http.server 8000
  ```
  Luego abre `http://localhost:8000` en tu navegador.

---

## ☁️ 3. Cómo publicarla GRATIS en Cloudflare Pages (2 Opciones)

Primero, crea una cuenta gratuita en **[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)** (no necesitas tarjeta de crédito para Cloudflare Pages gratuito).

Puedes publicarla de **dos formas**. Si es tu primera vez y no usas GitHub, elige la **Opción A**.

---

### OPCIÓN A: Subida directa arrastrando la carpeta (*Upload assets*) — ¡La más fácil!

1. Entra en tu panel de Cloudflare: **[https://dash.cloudflare.com/](https://dash.cloudflare.com/)**.
2. En el menú lateral izquierdo, haz clic en **Compute (Workers & Pages)** → **Workers & Pages**.
3. Pulsa el botón azul **Create** (Crear) arriba a la derecha.
4. Selecciona la pestaña **Pages** en la parte superior.
5. En la sección *"Upload your static files"* (o *"Use direct upload"*), haz clic en **Get started** / **Upload assets**.
6. **Project name:** escribe el nombre que quieras para tu enlace (por ejemplo: `carlos-y-lucia`). Tu web tendrá la dirección `https://carlos-y-lucia.pages.dev`. Pulsa **Create project**.
7. Haz clic en **Select from computer** (o arrastra la carpeta completa donde están `index.html`, `css`, `js`, `fotos`, `_headers`, etc.).
   - *Asegúrate de que en la raíz de la subida se vea directamente `index.html`.*
8. Pulsa **Deploy site**. En menos de 10 segundos tu página estará publicada y lista con HTTPS gratis.

---

### OPCIÓN B: Conectando un repositorio de GitHub (Publicación automática)

Si prefieres guardar tu proyecto en un repositorio **privado** de GitHub para que cada cambio se publique solo:

1. Sube todos los archivos de esta carpeta a un repositorio de tu cuenta de GitHub (puedes poner el repositorio como **Private**).
2. En el panel de Cloudflare, ve a **Workers & Pages** → **Create** → pestaña **Pages**.
3. En *"Import an existing Git repository"*, haz clic en **Get started** / **Connect to Git**.
4. Autoriza tu cuenta de GitHub y selecciona tu repositorio.
5. En la pantalla **Set up builds and deployments**, configúralo exactamente así:
   - **Project name:** el nombre que quieras (ej. `nuestra-historia`).
   - **Production branch:** `main` (o `master`).
   - **Framework preset:** `None` (Ninguno).
   - **Build command:** *(déjalo completamente VACÍO)*
   - **Build output directory:** `/` *(escribe solo una barra `/` o déjalo vacío por defecto en la raíz)*
6. Haz clic en **Save and Deploy**. ¡Listo!

---

## 🔄 4. Cómo actualizar la web cuando cambies fotos o textos

- **Si usaste la Opción A (Subida directa):**
  1. Edita `js/config.js` o añade fotos nuevas a `fotos/` en tu ordenador.
  2. Entra en Cloudflare → **Workers & Pages** → haz clic en tu proyecto.
  3. Pulsa el botón **Create new deployment** arriba a la derecha.
  4. Vuelve a arrastrar la carpeta del proyecto y pulsa **Save and Deploy**. En segundos estará actualizada.

- **Si usaste la Opción B (GitHub):**
  1. Haz tus cambios y sube un *commit / push* a la rama principal de GitHub.
  2. Cloudflare detectará el cambio automáticamente y actualizará la web sola en unos 15 segundos.

---

## 🌐 5. Cómo cambiar la dirección `*.pages.dev` o conectar un dominio propio

### Cambiar el nombre `*.pages.dev`
El subdominio gratuito (`nombre-del-proyecto.pages.dev`) toma el nombre que le diste al proyecto al crearlo:
- Si quieres otro nombre gratuito en `.pages.dev`, simplemente ve a **Workers & Pages**, crea un proyecto nuevo con el nuevo nombre (tardas 30 segundos arrastrando la carpeta) y borra el proyecto anterior en **Settings → General → Delete project**.

### Conectar un dominio propio (Opcional, ej. `nuestrahistoria.com`)
1. Dentro de tu proyecto en Cloudflare Pages, entra en la pestaña **Custom domains**.
2. Pulsa **Set up a custom domain**.
3. Escribe tu dominio (ej. `nuestrahistoria.com` o `amor.midominio.com`) y pulsa **Continue**.
4. Cloudflare configurará el registro DNS y el certificado SSL (candado HTTPS) automáticamente.

---

## 🔒 6. Privacidad y Contraseña Real con Cloudflare Access (Opcional)

### ⚠️ Aviso importante sobre la contraseña de `js/config.js`
En `js/config.js` tienes la opción `acceso.activo: true` para mostrar una pantalla romántica que pide una clave antes de ver la página.
**Ten en cuenta que esa pantalla es un detalle estético/ligero y NO es una protección de seguridad real**, porque al ser una web estática cualquiera con conocimientos técnicos podría ver la clave inspeccionando el archivo `js/config.js`.

### 🛡️ Cómo proteger la web de verdad GRATIS con Cloudflare Access (Zero Trust)
Si quieres que **nadie en el mundo** pueda abrir la web ni ver las fotos salvo tu pareja y tú (recibiendo un código temporal en vuestro correo electrónico), activa **Cloudflare Access** (es gratis hasta 50 usuarios):

1. En tu proyecto de Cloudflare Pages, ve a la pestaña **Settings** → sección **General**.
2. Busca **Access Policy** y haz clic en **Enable** (o entra en el menú izquierdo de Cloudflare en **Zero Trust** → **Access** → **Applications** → **Add an application** → **Self-hosted**).
3. Configura la aplicación:
   - **Application name:** `Web Romántica`
   - **Application domain:** selecciona tu dominio `tu-proyecto.pages.dev`.
4. Crea una regla (**Policy**):
   - **Policy name:** `Solo nosotros dos`
   - **Action:** `Allow`
   - En **Include**, elige **Emails** y escribe el correo electrónico de tu pareja y el tuyo (ej. `pareja@gmail.com`, `tucorreo@gmail.com`).
5. Guarda los cambios (**Save**).
6. **¡Listo!** Ahora, antes de que Cloudflare descargue ni una sola foto o línea de código, mostrará una pantalla segura donde tu pareja pondrá su email, recibirá un código de 6 dígitos en su bandeja de entrada y podrá entrar de forma 100 % privada.

---

## ✅ 7. Lista de comprobación final antes de compartir el enlace

Antes de enviarle el enlace a tu pareja, repasa esta lista:

- [ ] **Textos personalizados:** Has revisado nombres, fecha exacta del contador, hitos, tarjetas de razones y carta final en `js/config.js`.
- [ ] **Rutas relativas:** Todas las rutas en `js/config.js` están escritas sin `/` inicial (ej. `"fotos/mifoto.jpg"` y `"musica/cancion.mp3"`).
- [ ] **Peso de las fotos:** Todas las fotos pesan menos de **500 KB** (máximo 1600 px de ancho) y ningún archivo supera el límite de **25 MiB** de Cloudflare Pages.
- [ ] **Privacidad en buscadores (`noindex`):** El archivo `_headers`, `robots.txt` y la etiqueta `<meta name="robots" content="noindex, nofollow">` en `index.html` están en su sitio para que la web no aparezca en Google.
- [ ] **Música comprobada:** Si activaste la música, el archivo MP3 funciona al pulsar el botón flotante `♪ Música`.
- [ ] **Prueba en el móvil:** Has abierto el enlace en tu propio teléfono móvil en modo vertical, has probado a ampliar una foto y deslizar con el dedo (swipe), a voltear las tarjetas de razones y a leer la carta final.
