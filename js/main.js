/**
 * ============================================================================
 * LÓGICA PRINCIPAL DE LA PÁGINA (js/main.js)
 * ============================================================================
 * Lee la configuración de js/config.js, muestra la intro obligatoria del
 * girasol y construye la galería de fotos "Nuestros momentos" con su visor
 * Lightbox a pantalla completa.
 * ============================================================================
 */

(function () {
  "use strict";

  const cfg = window.CONFIG || {};
  const prefiereMovimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ==========================================================================
  // 1. APLICAR COLORES PERSONALIZADOS DESDE CONFIG.JS
  // ==========================================================================
  function aplicarColores() {
    if (!cfg.colores) return;
    const root = document.documentElement;
    const c = cfg.colores;

    if (c.amarilloGirasol) root.style.setProperty("--color-amarillo", c.amarilloGirasol);
    if (c.amarilloLuz) root.style.setProperty("--color-amarillo-luz", c.amarilloLuz);
    if (c.marronSemilla) root.style.setProperty("--color-marron-semilla", c.marronSemilla);
    if (c.verdeHoja) root.style.setProperty("--color-verde-hoja", c.verdeHoja);
    if (c.rosaClaro) root.style.setProperty("--color-rosa-claro", c.rosaClaro);
    if (c.rosaMedio) root.style.setProperty("--color-rosa-medio", c.rosaMedio);
    if (c.rosaProfundo) root.style.setProperty("--color-rosa-profundo", c.rosaProfundo);
    if (c.blanco) root.style.setProperty("--color-blanco", c.blanco);
    if (c.textoPrincipal) root.style.setProperty("--color-texto", c.textoPrincipal);
    if (c.textoSecundario) {
      root.style.setProperty("--color-texto-secundario", c.textoSecundario);
    }
  }

  // ==========================================================================
  // 2. RENDERIZAR MONOGRAMA "C & S" EN TODA LA PÁGINA
  // ==========================================================================
  function escaparHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function construirHtmlMonograma(textoMonograma) {
    const limpio = String(textoMonograma || "C & S").trim();
    if (limpio.includes("&")) {
      const partes = limpio.split("&");
      const izq = (partes[0] || "C").trim();
      const der = (partes.slice(1).join("&") || "S").trim();
      return `<span class="monograma-letra">${escaparHtml(izq)}</span><span class="monograma-amp">&amp;</span><span class="monograma-letra">${escaparHtml(der)}</span>`;
    }
    return `<span class="monograma-letra">${escaparHtml(limpio)}</span>`;
  }

  function inicializarMonogramaYMetadatos() {
    const id = cfg.identidad || {};
    const g = cfg.galeria || {};
    const monograma = id.monograma || "C & S";
    const htmlMonograma = construirHtmlMonograma(monograma);

    ["bienvenida-monograma", "header-monograma", "hero-monograma", "pie-monograma"].forEach(
      (idEl) => {
        const el = document.getElementById(idEl);
        if (el) el.innerHTML = htmlMonograma;
      }
    );

    const tituloWeb = `${monograma} · ${g.titulo || "Nuestros momentos"} 🌻`;
    document.title = tituloWeb;

    const ogTitle = document.getElementById("og-title");
    const twTitle = document.getElementById("tw-title");
    const ogDesc = document.getElementById("og-description");
    const twDesc = document.getElementById("tw-description");
    const ogImg = document.getElementById("og-image");
    const twImg = document.getElementById("tw-image");

    if (ogTitle) ogTitle.setAttribute("content", tituloWeb);
    if (twTitle) twTitle.setAttribute("content", tituloWeb);
    if (g.subtitulo) {
      if (ogDesc) ogDesc.setAttribute("content", g.subtitulo);
      if (twDesc) twDesc.setAttribute("content", g.subtitulo);
    }
    if (Array.isArray(g.fotos) && g.fotos.length > 0 && g.fotos[0].archivo) {
      if (ogImg) ogImg.setAttribute("content", g.fotos[0].archivo);
      if (twImg) twImg.setAttribute("content", g.fotos[0].archivo);
    }

    const pieTexto = document.getElementById("pie-texto");
    if (pieTexto && cfg.pie && cfg.pie.texto) {
      pieTexto.textContent = cfg.pie.texto;
    }
  }

  // ==========================================================================
  // 3. INTRO OBLIGATORIA CON GIRASOL ANIMADO
  // ==========================================================================
  let timerAutoEntrada = null;

  function mostrarIntroGirasol(reiniciarAnimacion) {
    const intro = cfg.intro || {};
    const pantalla = document.getElementById("pantalla-bienvenida");
    if (!pantalla) return;

    const btnEntrar = document.getElementById("btn-entrar-bienvenida");
    const bloquePass = document.getElementById("bloque-contrasena");
    const inputPass = document.getElementById("input-contrasena");
    const errorPass = document.getElementById("error-contrasena");

    if (btnEntrar) {
      if (intro.textoBoton) btnEntrar.textContent = intro.textoBoton;
      btnEntrar.classList.toggle(
        "oculto",
        intro.mostrarBotonEntrar === false && !intro.contrasenaActiva
      );
    }

    if (intro.contrasenaActiva && bloquePass) {
      bloquePass.classList.remove("oculto");
      if (inputPass && intro.placeholderContrasena) {
        inputPass.placeholder = intro.placeholderContrasena;
      }
    } else if (bloquePass) {
      bloquePass.classList.add("oculto");
    }

    if (errorPass) errorPass.classList.add("oculto");

    if (reiniciarAnimacion && !prefiereMovimientoReducido) {
      const animados = pantalla.querySelectorAll(
        ".petalo-anim, .girasol-tallo-grupo, .monograma-insignia, .bienvenida-form"
      );
      animados.forEach((el) => {
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "";
      });
    }

    pantalla.classList.remove("oculto", "saliendo");
    document.body.classList.add("intro-activa");

    // Transición automática tras florecer el girasol (salvo que pida contraseña)
    if (timerAutoEntrada) clearTimeout(timerAutoEntrada);
    const segs =
      typeof intro.duracionSegundos === "number" ? intro.duracionSegundos : 3.2;

    if (segs > 0 && !intro.contrasenaActiva) {
      timerAutoEntrada = setTimeout(() => {
        cerrarIntroGirasol();
      }, segs * 1000);
    }
  }

  function cerrarIntroGirasol() {
    const pantalla = document.getElementById("pantalla-bienvenida");
    if (!pantalla) return;
    if (timerAutoEntrada) clearTimeout(timerAutoEntrada);

    document.body.classList.remove("intro-activa");

    if (prefiereMovimientoReducido) {
      pantalla.classList.add("oculto");
    } else {
      pantalla.classList.add("saliendo");
      setTimeout(() => {
        pantalla.classList.add("oculto");
      }, 850);
    }
  }

  function inicializarIntro() {
    const intro = cfg.intro || {};
    const form = document.getElementById("form-bienvenida");
    const btnRepetirHeader = document.getElementById("btn-repetir-intro-header");
    const inputPass = document.getElementById("input-contrasena");
    const errorPass = document.getElementById("error-contrasena");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (intro.contrasenaActiva) {
          const ingresada = (inputPass ? inputPass.value : "").trim();
          const correcta = String(intro.contrasena || "").trim();
          if (ingresada.toLowerCase() !== correcta.toLowerCase()) {
            if (errorPass) {
              errorPass.textContent =
                intro.mensajeErrorContrasena ||
                "Clave incorrecta, inténtalo de nuevo 🌻";
              errorPass.classList.remove("oculto");
            }
            if (inputPass) {
              inputPass.value = "";
              inputPass.focus();
            }
            return;
          }
        }
        cerrarIntroGirasol();
      });
    }

    if (btnRepetirHeader) {
      btnRepetirHeader.addEventListener("click", () => {
        mostrarIntroGirasol(true);
      });
    }

    // Mostrar SIEMPRE la intro al abrir la web
    mostrarIntroGirasol(false);
  }

  // ==========================================================================
  // 4. HEADER ESTILO APPLE (OCULTAR AL BAJAR, APARECER AL SUBIR)
  // ==========================================================================
  function inicializarHeader() {
    const header = document.getElementById("barra-navegacion");
    if (!header) return;

    let ultimoScrollY = window.scrollY;
    window.addEventListener(
      "scroll",
      () => {
        const actualY = window.scrollY;
        if (actualY > ultimoScrollY && actualY > 90) {
          header.classList.add("header-oculto");
        } else {
          header.classList.remove("header-oculto");
        }
        ultimoScrollY = Math.max(0, actualY);
      },
      { passive: true }
    );
  }

  // ==========================================================================
  // 4B. PORTADA ROMÁNTICA (HERO)
  // ==========================================================================
  function inicializarPortada() {
    const p = cfg.portada || {};
    const elEtiqueta = document.getElementById("hero-etiqueta");
    const elNombre1 = document.getElementById("hero-nombre1");
    const elConector = document.getElementById("hero-conector");
    const elNombre2 = document.getElementById("hero-nombre2");
    const elFrase = document.getElementById("hero-frase");
    const elBoton = document.getElementById("hero-boton");
    const elFondo = document.getElementById("hero-fondo");
    const seccionHero = document.getElementById("portada");

    if (elEtiqueta && p.etiquetaSuperior) elEtiqueta.textContent = p.etiquetaSuperior;
    if (elNombre1 && p.nombre1) elNombre1.textContent = p.nombre1;
    if (elConector && p.conector) elConector.textContent = p.conector;
    if (elNombre2 && p.nombre2) elNombre2.textContent = p.nombre2;
    if (elFrase && p.frase) elFrase.textContent = p.frase;
    if (elBoton && p.textoBoton) elBoton.textContent = p.textoBoton;

    if (elFondo && p.fotoFondo) {
      const imgPrueba = new Image();
      imgPrueba.onload = function () {
        elFondo.style.backgroundImage = `url("${p.fotoFondo}")`;
        if (seccionHero) seccionHero.classList.add("cargado");
      };
      imgPrueba.onerror = function () {
        elFondo.style.backgroundImage =
          "linear-gradient(135deg, #2c1220 0%, #5e233b 48%, #a84a62 100%)";
        if (seccionHero) seccionHero.classList.add("cargado");
      };
      imgPrueba.src = p.fotoFondo;
    }
  }

  // ==========================================================================
  // PLACEHOLDER ELEGANTE CON GIRASOL SI UNA FOTO FALLA AL CARGAR
  // ==========================================================================
  function generarPlaceholderGirasol(titulo, ruta) {
    const t = escaparHtml(titulo || "Nuestro momento");
    const r = escaparHtml(ruta || "fotos/");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFDF8"/>
          <stop offset="100%" stop-color="#F5E1A4"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)"/>
      <g transform="translate(400, 235)">
        <g fill="#F5B700">
          <ellipse rx="10" ry="48" transform="rotate(0)"/>
          <ellipse rx="10" ry="48" transform="rotate(30)"/>
          <ellipse rx="10" ry="48" transform="rotate(60)"/>
          <ellipse rx="10" ry="48" transform="rotate(90)"/>
          <ellipse rx="10" ry="48" transform="rotate(120)"/>
          <ellipse rx="10" ry="48" transform="rotate(150)"/>
        </g>
        <g fill="#FFC933">
          <ellipse rx="9" ry="44" transform="rotate(15)"/>
          <ellipse rx="9" ry="44" transform="rotate(45)"/>
          <ellipse rx="9" ry="44" transform="rotate(75)"/>
          <ellipse rx="9" ry="44" transform="rotate(105)"/>
          <ellipse rx="9" ry="44" transform="rotate(135)"/>
          <ellipse rx="9" ry="44" transform="rotate(165)"/>
        </g>
        <circle r="20" fill="#4A2C0F"/>
      </g>
      <text x="400" y="355" text-anchor="middle" font-family="-apple-system, Inter, sans-serif" font-weight="700" font-size="26" fill="#1D1D1F">${t}</text>
      <text x="400" y="392" text-anchor="middle" font-family="-apple-system, Inter, sans-serif" font-size="16" fill="#6E6E73">Pon tu foto en: ${r}</text>
    </svg>`;
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  // ==========================================================================
  // 5. NUESTROS MOMENTOS (GALERÍA BENTO + LIGHTBOX A PANTALLA COMPLETA)
  // ==========================================================================
  let listaFotosLightbox = [];
  let indiceLightboxActual = 0;
  let ultimoElementoFoco = null;

  function inicializarGaleriaYLightbox() {
    const g = cfg.galeria || {};
    const elTitulo = document.getElementById("galeria-titulo");
    const elSubtitulo = document.getElementById("galeria-subtitulo");
    const contenedor = document.getElementById("galeria-bento");

    if (elTitulo && g.titulo) elTitulo.textContent = g.titulo;
    if (elSubtitulo) {
      if (g.subtitulo) {
        elSubtitulo.textContent = g.subtitulo;
      } else {
        elSubtitulo.classList.add("oculto");
      }
    }
    if (!contenedor) {
      configurarEventosLightbox();
      return;
    }

    const fotos = Array.isArray(g.fotos) ? g.fotos : [];
    listaFotosLightbox = fotos.map((f) => ({
      archivo: f.archivo || "",
      descripcion: f.descripcion || "",
      fecha: f.fecha || ""
    }));

    contenedor.innerHTML = "";

    fotos.forEach((foto, idx) => {
      const articulo = document.createElement("article");
      let claseTamano = "";
      if (foto.destacada === "grande") claseTamano = "bento-grande";
      else if (foto.destacada === "ancha") claseTamano = "bento-ancha";

      articulo.className = `bento-item ${claseTamano} revelar`.trim();
      articulo.setAttribute("role", "listitem");
      articulo.setAttribute("tabindex", "0");
      articulo.setAttribute(
        "aria-label",
        `${foto.descripcion || "Fotografía"} (${foto.fecha || ""}) - pulsa para ampliar`
      );

      const marco = document.createElement("div");
      marco.className = "bento-marco-img";

      const img = document.createElement("img");
      img.className = "bento-img";
      img.src = foto.archivo;
      img.alt = foto.descripcion || `Fotografía ${idx + 1}`;
      img.loading = "lazy";
      img.decoding = "async";

      // Permitir ajustar el encuadre vertical/horizontal de cada foto ("abajo", "arriba", "centro" o porcentaje)
      if (foto.posicion) {
        const pos = foto.posicion.toLowerCase().trim();
        if (pos === "abajo") img.style.objectPosition = "center bottom";
        else if (pos === "arriba") img.style.objectPosition = "center top";
        else if (pos === "centro") img.style.objectPosition = "center center";
        else img.style.objectPosition = foto.posicion;
      }

      img.addEventListener("error", function () {
        const respaldo = generarPlaceholderGirasol(foto.descripcion, foto.archivo);
        img.src = respaldo;
        listaFotosLightbox[idx].archivo = respaldo;
      });

      marco.appendChild(img);
      articulo.appendChild(marco);

      if (foto.descripcion || foto.fecha) {
        const info = document.createElement("div");
        info.className = "bento-info";

        const desc = document.createElement("p");
        desc.className = "bento-descripcion";
        desc.textContent = foto.descripcion || "";
        info.appendChild(desc);

        if (foto.fecha) {
          const fecha = document.createElement("span");
          fecha.className = "bento-fecha";
          fecha.textContent = foto.fecha;
          info.appendChild(fecha);
        }

        articulo.appendChild(info);
      }

      articulo.addEventListener("click", () => abrirLightbox(idx));
      articulo.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          abrirLightbox(idx);
        }
      });

      contenedor.appendChild(articulo);
    });

    configurarEventosLightbox();
  }

  function abrirLightbox(indice) {
    if (!listaFotosLightbox.length) return;
    const modal = document.getElementById("lightbox");
    const btnCerrar = document.getElementById("lightbox-cerrar");
    if (!modal) return;

    ultimoElementoFoco = document.activeElement;
    indiceLightboxActual =
      (indice + listaFotosLightbox.length) % listaFotosLightbox.length;

    actualizarVistaLightbox();
    modal.classList.remove("oculto");
    document.body.style.overflow = "hidden";
    if (btnCerrar) btnCerrar.focus();
  }

  function cerrarLightbox() {
    const modal = document.getElementById("lightbox");
    if (!modal || modal.classList.contains("oculto")) return;
    modal.classList.add("oculto");
    document.body.style.overflow = "";
    if (ultimoElementoFoco && typeof ultimoElementoFoco.focus === "function") {
      ultimoElementoFoco.focus();
    }
  }

  function cambiarFotoLightbox(delta) {
    if (!listaFotosLightbox.length) return;
    indiceLightboxActual =
      (indiceLightboxActual + delta + listaFotosLightbox.length) %
      listaFotosLightbox.length;
    actualizarVistaLightbox();
  }

  function actualizarVistaLightbox() {
    const item = listaFotosLightbox[indiceLightboxActual];
    if (!item) return;

    const img = document.getElementById("lightbox-img");
    const desc = document.getElementById("lightbox-descripcion");
    const fecha = document.getElementById("lightbox-fecha");
    const contador = document.getElementById("lightbox-contador");

    if (img) {
      img.src = item.archivo;
      img.alt = item.descripcion || "Fotografía ampliada";
      img.onerror = function () {
        img.src = generarPlaceholderGirasol(item.descripcion, item.archivo);
      };
    }
    if (desc) desc.textContent = item.descripcion || "";
    if (fecha) fecha.textContent = item.fecha || "";
    if (contador) {
      contador.textContent = `${indiceLightboxActual + 1} / ${listaFotosLightbox.length}`;
    }
  }

  function configurarEventosLightbox() {
    const modal = document.getElementById("lightbox");
    const btnCerrar = document.getElementById("lightbox-cerrar");
    const btnAnt = document.getElementById("lightbox-anterior");
    const btnSig = document.getElementById("lightbox-siguiente");
    if (!modal) return;

    if (btnCerrar) btnCerrar.addEventListener("click", cerrarLightbox);
    if (btnAnt) btnAnt.addEventListener("click", () => cambiarFotoLightbox(-1));
    if (btnSig) btnSig.addEventListener("click", () => cambiarFotoLightbox(1));

    modal.addEventListener("click", (e) => {
      if (e.target === modal) cerrarLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (modal.classList.contains("oculto")) return;
      if (e.key === "Escape") cerrarLightbox();
      if (e.key === "ArrowLeft") cambiarFotoLightbox(-1);
      if (e.key === "ArrowRight") cambiarFotoLightbox(1);
    });

    let touchX = 0;
    let touchY = 0;
    modal.addEventListener(
      "touchstart",
      (e) => {
        if (!e.changedTouches || !e.changedTouches.length) return;
        touchX = e.changedTouches[0].screenX;
        touchY = e.changedTouches[0].screenY;
      },
      { passive: true }
    );

    modal.addEventListener(
      "touchend",
      (e) => {
        if (!e.changedTouches || !e.changedTouches.length) return;
        const dx = e.changedTouches[0].screenX - touchX;
        const dy = e.changedTouches[0].screenY - touchY;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
          cambiarFotoLightbox(dx < 0 ? 1 : -1);
        }
      },
      { passive: true }
    );
  }

  // ==========================================================================
  // 6. CORAZONES Y CARITAS DE POMPOMPURIN CAYENDO
  // ==========================================================================
  function inicializarPetalos() {
    const p = cfg.petalos || {};
    const contenedor = document.getElementById("contenedor-petalos");
    const btn = document.getElementById("btn-petalos");
    if (!contenedor || !btn) return;

    if (prefiereMovimientoReducido) {
      btn.classList.add("oculto");
      return;
    }

    let activo = p.activarAlInicio !== false;
    const cantidad = Math.min(Math.max(p.cantidad || 18, 4), 40);

    // SVG de carita de Pompompurin (color crema/amarillo pastel, orejitas caídas, boina marrón y boquita "ω")
    const svgPompompurin = `<svg viewBox="0 0 64 56" width="34" height="30" xmlns="http://www.w3.org/2000/svg">
      <!-- Oreja izquierda caída -->
      <path d="M15 22 C5 22 2 36 8 43 C13 47 18 39 17 30 Z" fill="#FFF099" stroke="#5A3518" stroke-width="2.4" stroke-linejoin="round"/>
      <!-- Oreja derecha caída -->
      <path d="M49 22 C59 22 62 36 56 43 C51 47 46 39 47 30 Z" fill="#FFF099" stroke="#5A3518" stroke-width="2.4" stroke-linejoin="round"/>
      <!-- Carita redonda rechoncha -->
      <ellipse cx="32" cy="31" rx="19" ry="16.5" fill="#FFF099" stroke="#5A3518" stroke-width="2.4"/>
      <!-- Boina marrón característica -->
      <ellipse cx="32" cy="14.5" rx="12.5" ry="5" fill="#5A3518"/>
      <path d="M32 7.5 L32 11" stroke="#5A3518" stroke-width="2.6" stroke-linecap="round"/>
      <!-- Mejillas sonrojadas -->
      <ellipse cx="20.5" cy="34" rx="3.2" ry="1.8" fill="#F79CA8" opacity="0.75"/>
      <ellipse cx="43.5" cy="34" rx="3.2" ry="1.8" fill="#F79CA8" opacity="0.75"/>
      <!-- Ojitos -->
      <circle cx="24" cy="30" r="2" fill="#4A2C0F"/>
      <circle cx="40" cy="30" r="2" fill="#4A2C0F"/>
      <!-- Naricita y boquita en forma de ω -->
      <ellipse cx="32" cy="31.5" rx="1.6" ry="1.2" fill="#4A2C0F"/>
      <path d="M27.5 34.5 Q29.8 37.5 32 34.2 Q34.2 37.5 36.5 34.5" fill="none" stroke="#4A2C0F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

    // SVG de corazón rosa cálido
    const svgCorazonRosa = `<svg viewBox="0 0 32 32" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 28.5 C15.4 28.5 14.8 28.3 14.3 27.8 C8.6 22.8 3 17.5 3 10.8 C3 6.2 6.6 2.5 11.2 2.5 C13.7 2.5 15.9 3.7 16 5.4 C16.1 3.7 18.3 2.5 20.8 2.5 C25.4 2.5 29 6.2 29 10.8 C29 17.5 23.4 22.8 17.7 27.8 C17.2 28.3 16.6 28.5 16 28.5 Z" fill="#FF758F" stroke="#5A3518" stroke-width="1.6"/>
    </svg>`;

    // SVG de corazón amarillo pastel / dorado a juego con Pompompurin
    const svgCorazonAmarillo = `<svg viewBox="0 0 32 32" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 28.5 C15.4 28.5 14.8 28.3 14.3 27.8 C8.6 22.8 3 17.5 3 10.8 C3 6.2 6.6 2.5 11.2 2.5 C13.7 2.5 15.9 3.7 16 5.4 C16.1 3.7 18.3 2.5 20.8 2.5 C25.4 2.5 29 6.2 29 10.8 C29 17.5 23.4 22.8 17.7 27.8 C17.2 28.3 16.6 28.5 16 28.5 Z" fill="#FFC933" stroke="#5A3518" stroke-width="1.6"/>
    </svg>`;

    const figuras = [svgPompompurin, svgCorazonRosa, svgPompompurin, svgCorazonAmarillo];

    function generarPetalos() {
      contenedor.innerHTML = "";
      if (!activo) return;

      for (let i = 0; i < cantidad; i++) {
        const div = document.createElement("div");
        div.className = "petalo-cayendo";
        div.innerHTML = figuras[i % figuras.length];

        const left = Math.random() * 96;
        const duracion = 10 + Math.random() * 11;
        const retraso = Math.random() * 14;
        const escala = 0.78 + Math.random() * 0.45;
        const deriva = (Math.random() - 0.5) * 120;
        const opacidad = 0.65 + Math.random() * 0.3;

        div.style.left = `${left}%`;
        div.style.animationDuration = `${duracion}s`;
        div.style.animationDelay = `-${retraso}s`;
        div.style.transform = `scale(${escala})`;
        div.style.setProperty("--deriva-x", `${deriva}px`);
        div.style.setProperty("--opacidad-petalo", String(opacidad));

        contenedor.appendChild(div);
      }
    }

    function actualizarBoton() {
      btn.setAttribute("aria-pressed", activo ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        activo
          ? "Desactivar lluvia de corazones y Pompompurin"
          : "Activar lluvia de corazones y Pompompurin"
      );
    }

    btn.addEventListener("click", () => {
      activo = !activo;
      actualizarBoton();
      generarPetalos();
    });

    actualizarBoton();
    generarPetalos();
  }

  // ==========================================================================
  // 7. REPRODUCTOR DE MÚSICA OPCIONAL
  // ==========================================================================
  function inicializarMusica() {
    const m = cfg.musica || {};
    const btn = document.getElementById("btn-musica");
    const icono = document.getElementById("icono-musica");
    const texto = document.getElementById("texto-btn-musica");
    const audio = document.getElementById("audio-fondo");

    if (!btn || !audio) return;
    if (!m.activa) {
      btn.classList.add("oculto");
      return;
    }

    if (m.archivo) audio.src = m.archivo;
    audio.volume = typeof m.volumen === "number" ? m.volumen : 0.5;

    let reproduciendo = false;
    let usandoSintetizador = false;
    let audioCtx = null;
    let timerNotas = null;

    function iniciarMelodiaRespaldo() {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtx) audioCtx = new AudioCtx();
      if (audioCtx.state === "suspended") audioCtx.resume();

      const notas = [523.25, 659.25, 783.99, 659.25, 880.0, 783.99, 659.25, 587.33];
      let paso = 0;

      function tocar() {
        if (!reproduciendo) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(notas[paso % notas.length], audioCtx.currentTime);
        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.07, audioCtx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.45);
        paso++;
      }

      tocar();
      timerNotas = setInterval(tocar, 900);
    }

    function detenerMelodiaRespaldo() {
      if (timerNotas) {
        clearInterval(timerNotas);
        timerNotas = null;
      }
    }

    function actualizarEstado(activo) {
      reproduciendo = activo;
      btn.setAttribute("aria-pressed", activo ? "true" : "false");
      if (icono) icono.textContent = activo ? "❚❚" : "♪";
      if (texto) texto.textContent = activo ? "Pausar" : "Música";
    }

    btn.addEventListener("click", () => {
      if (reproduciendo) {
        audio.pause();
        detenerMelodiaRespaldo();
        actualizarEstado(false);
      } else {
        if (usandoSintetizador) {
          actualizarEstado(true);
          iniciarMelodiaRespaldo();
          return;
        }
        const p = audio.play();
        if (p !== undefined) {
          p.then(() => actualizarEstado(true)).catch(() => {
            usandoSintetizador = true;
            actualizarEstado(true);
            iniciarMelodiaRespaldo();
          });
        }
      }
    });
  }

  // ==========================================================================
  // 8. PÁGINA DE LA CARTA (FOTO DE LA CARTA + CARTA EN TEXTO + VÍDEO)
  // ==========================================================================
  function inicializarCarta() {
    const c = cfg.carta || {};
    const elTitulo = document.getElementById("carta-titulo");
    const elSubtitulo = document.getElementById("carta-subtitulo");
    const elSaludo = document.getElementById("carta-saludo");
    const elCuerpo = document.getElementById("carta-cuerpo");
    const elCierre = document.getElementById("carta-cierre");
    const elDespedida = document.getElementById("carta-despedida");
    const elFirma = document.getElementById("carta-firma");
    const btnMostrar = document.getElementById("btn-mostrar-carta");

    if (elTitulo && c.titulo) elTitulo.textContent = c.titulo;
    if (elSubtitulo && c.subtitulo) elSubtitulo.textContent = c.subtitulo;
    if (elSaludo && c.saludo) elSaludo.textContent = c.saludo;
    if (elDespedida && c.despedida) elDespedida.textContent = c.despedida;
    if (elFirma && c.firma) elFirma.textContent = c.firma;

    // A) Configurar la Carta subida como Foto
    const bloqueFoto = document.getElementById("bloque-foto-carta");
    const tituloFoto = document.getElementById("titulo-foto-carta");
    const imgFoto = document.getElementById("img-foto-carta");
    const pieFoto = document.getElementById("pie-foto-carta");
    const btnAbrirFoto = document.getElementById("abrir-foto-carta");

    if (bloqueFoto) {
      if (c.mostrarFotoCarta === false) {
        bloqueFoto.classList.add("oculto");
      } else {
        if (tituloFoto && c.tituloFotoCarta) {
          tituloFoto.textContent = c.tituloFotoCarta;
        }
        if (pieFoto && c.pieFotoCarta) {
          pieFoto.textContent = c.pieFotoCarta;
        }
        if (imgFoto) {
          const rutaFotoCarta = c.fotoCarta || "fotos/carta-foto.svg";
          imgFoto.src = rutaFotoCarta;
          imgFoto.addEventListener("error", function () {
            imgFoto.src = generarPlaceholderGirasol(
              "Foto de nuestra carta",
              rutaFotoCarta
            );
          });
        }
        if (btnAbrirFoto && imgFoto) {
          const abrirEnGrande = () => {
            listaFotosLightbox = [
              {
                archivo: imgFoto.src,
                descripcion: c.tituloFotoCarta || "Nuestra carta",
                fecha: ""
              }
            ];
            abrirLightbox(0);
          };
          btnAbrirFoto.addEventListener("click", abrirEnGrande);
          btnAbrirFoto.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              abrirEnGrande();
            }
          });
        }
      }
    }

    // B) Configurar el Vídeo en la página de la carta
    const bloqueVideo = document.getElementById("bloque-video-carta");
    const tituloVideo = document.getElementById("video-titulo");
    const subtituloVideo = document.getElementById("video-subtitulo");
    const videoEl = document.getElementById("video-carta");
    const videoSource = document.getElementById("video-source");
    const videoAyuda = document.getElementById("video-ayuda-subida");
    const inputSubirVideo = document.getElementById("input-subir-video");

    if (bloqueVideo) {
      if (c.mostrarVideo === false) {
        bloqueVideo.classList.add("oculto");
      } else {
        if (tituloVideo && c.tituloVideo) tituloVideo.textContent = c.tituloVideo;
        if (subtituloVideo && c.subtituloVideo) {
          subtituloVideo.textContent = c.subtituloVideo;
        }
        if (videoEl && c.portadaVideo) {
          videoEl.setAttribute("poster", c.portadaVideo);
        }
        if (videoSource && videoEl) {
          const rutaVideo = c.archivoVideo || "videos/video.mp4";
          videoSource.src = rutaVideo;

          // Si el archivo videos/video.mp4 aún no está puesto en la carpeta, mostrar el selector/ayuda
          videoSource.addEventListener("error", () => {
            if (videoAyuda) videoAyuda.classList.remove("oculto");
          });
          videoEl.addEventListener("error", () => {
            if (videoAyuda) videoAyuda.classList.remove("oculto");
          });

          videoEl.load();
        }

        // Permitir seleccionar/cargar un vídeo directamente desde el dispositivo
        if (inputSubirVideo && videoEl) {
          inputSubirVideo.addEventListener("change", (e) => {
            const archivo = e.target.files && e.target.files[0];
            if (!archivo) return;
            const urlLocal = URL.createObjectURL(archivo);
            videoEl.src = urlLocal;
            videoEl.load();
            videoEl.play().catch(() => {});
          });
        }
      }
    }

    // C) Configurar la Carta en Texto con efecto máquina de escribir
    if (!elCuerpo) return;

    const parrafos = Array.isArray(c.parrafos) ? c.parrafos : [];
    let timerEscritura = null;
    let escribiendo = false;
    let yaIniciada = false;

    function mostrarCompleta() {
      if (timerEscritura) {
        clearTimeout(timerEscritura);
        timerEscritura = null;
      }
      escribiendo = false;
      elCuerpo.innerHTML = "";
      parrafos.forEach((txt) => {
        const p = document.createElement("p");
        p.textContent = txt;
        elCuerpo.appendChild(p);
      });
      if (elCierre) elCierre.classList.add("visible");
      if (btnMostrar) btnMostrar.textContent = "Repetir efecto de escritura ✍️";
    }

    function iniciarEscritura() {
      if (prefiereMovimientoReducido) {
        mostrarCompleta();
        return;
      }
      if (timerEscritura) clearTimeout(timerEscritura);
      escribiendo = true;
      elCuerpo.innerHTML = "";
      if (elCierre) elCierre.classList.remove("visible");
      if (btnMostrar) btnMostrar.textContent = "Mostrar carta completa al instante";

      let iParrafo = 0;
      let iChar = 0;
      let pActual = null;

      function escribirPaso() {
        if (iParrafo >= parrafos.length) {
          escribiendo = false;
          if (pActual) pActual.classList.remove("cursor-maquina");
          if (elCierre) elCierre.classList.add("visible");
          if (btnMostrar) btnMostrar.textContent = "Repetir efecto de escritura ✍️";
          return;
        }

        const texto = parrafos[iParrafo];
        if (iChar === 0) {
          if (pActual) pActual.classList.remove("cursor-maquina");
          pActual = document.createElement("p");
          pActual.className = "cursor-maquina";
          elCuerpo.appendChild(pActual);
        }

        pActual.textContent = texto.slice(0, iChar + 1);
        iChar++;

        if (iChar < texto.length) {
          const ch = texto.charAt(iChar - 1);
          const pausa = ch === "." || ch === "," || ch === ":" ? 80 : 20;
          timerEscritura = setTimeout(escribirPaso, pausa);
        } else {
          iParrafo++;
          iChar = 0;
          timerEscritura = setTimeout(escribirPaso, 280);
        }
      }

      escribirPaso();
    }

    if (btnMostrar) {
      btnMostrar.addEventListener("click", () => {
        if (escribiendo) mostrarCompleta();
        else iniciarEscritura();
      });
    }

    const seccionCarta = document.getElementById("carta");
    if ("IntersectionObserver" in window && seccionCarta) {
      const obs = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (entrada.isIntersecting && !yaIniciada) {
              yaIniciada = true;
              iniciarEscritura();
              obs.unobserve(seccionCarta);
            }
          });
        },
        { threshold: 0.2 }
      );
      obs.observe(seccionCarta);
    } else {
      mostrarCompleta();
    }
  }

  // ==========================================================================
  // 9. ANIMACIONES DE ENTRADA AL HACER SCROLL
  // ==========================================================================
  function inicializarObservadorScroll() {
    const elementos = document.querySelectorAll(".revelar");
    if ("IntersectionObserver" in window && !prefiereMovimientoReducido) {
      const obs = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
              entrada.target.classList.add("visible");
              obs.unobserve(entrada.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      elementos.forEach((el) => obs.observe(el));
    } else {
      elementos.forEach((el) => el.classList.add("visible"));
    }
  }

  // ==========================================================================
  // INICIALIZACIÓN AL CARGAR EL DOCUMENTO
  // ==========================================================================
  document.addEventListener("DOMContentLoaded", () => {
    aplicarColores();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", aplicarColores);

    inicializarMonogramaYMetadatos();
    inicializarIntro();
    inicializarHeader();
    inicializarPortada();
    inicializarGaleriaYLightbox();
    inicializarCarta();
    inicializarPetalos();
    inicializarMusica();
    inicializarObservadorScroll();
  });
})();
