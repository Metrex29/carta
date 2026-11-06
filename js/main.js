/**
 * Lógica de la web (js/main.js).
 * Lee js/config.js y rellena index.html y carta.html.
 * No hace falta tocar este archivo para cambiar textos o fotos.
 */
(function () {
  "use strict";

  const cfg = window.CONFIG || {};
  const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (id) => document.getElementById(id);

  function ponerTexto(id, texto) {
    const el = $(id);
    if (!el) return;
    if (texto) el.textContent = texto;
    else el.hidden = true;
  }

  /* ---------- Monograma y pie ---------- */
  function iniciarMonograma() {
    const [a, b] = String(cfg.monograma || "C & S").split("&").map((s) => s.trim());
    document.querySelectorAll("[data-monograma]").forEach((el) => {
      el.textContent = "";
      el.append(a || "");
      if (b) {
        const amp = document.createElement("span");
        amp.className = "amp";
        amp.textContent = " & ";
        el.append(amp, b);
      }
    });
    if (cfg.pie) ponerTexto("pie-texto", cfg.pie);
  }

  /* ---------- Intro con el girasol ---------- */
  function iniciarIntro() {
    const pantalla = $("intro");
    if (!pantalla) return;

    const intro = cfg.intro || {};
    const form = $("intro-form");
    const campo = $("intro-clave");
    const error = $("intro-error");
    const conClave = Boolean(intro.contrasenaActiva);
    let temporizador = null;

    if (campo && intro.pista) campo.placeholder = intro.pista;
    if (intro.pregunta) $("intro-pregunta").textContent = intro.pregunta;

    // Ignora mayúsculas, tildes, espacios y un artículo delante ("la cerveza" = "cerveza").
    const normalizar = (s) =>
      String(s || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/^\s*(la|el|las|los)\s+/, "")
        .replace(/\s+/g, "");

    function cerrar() {
      clearTimeout(temporizador);
      sessionStorage.setItem("intro-vista", "1");
      document.body.classList.remove("con-intro");
      document.documentElement.classList.remove("intro-pendiente");
      pantalla.classList.add("saliendo");
      setTimeout(() => (pantalla.hidden = true), sinMovimiento ? 0 : 600);
    }

    function abrir(pedirClave) {
      pantalla.hidden = false;
      pantalla.classList.remove("saliendo");
      document.body.classList.add("con-intro");
      form.hidden = !pedirClave;
      error.hidden = true;

      if (pedirClave) {
        campo.value = "";
        campo.focus();
      } else {
        const segundos = Number(intro.duracionSegundos) || 3;
        temporizador = setTimeout(cerrar, segundos * 1000);
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (normalizar(campo.value) === normalizar(intro.contrasena)) {
        cerrar();
        return;
      }
      error.textContent = intro.mensajeError || "Clave incorrecta.";
      error.hidden = false;
      campo.value = "";
      campo.focus();
    });

    const repetir = $("btn-intro");
    if (repetir) repetir.addEventListener("click", () => abrir(false));

    // Solo se pide la clave una vez por sesión (al volver de la carta no se repite).
    if (sessionStorage.getItem("intro-vista")) {
      pantalla.hidden = true;
    } else {
      abrir(conClave);
    }
  }

  /* ---------- Portada ---------- */
  function iniciarPortada() {
    const p = cfg.portada || {};
    if (!$("portada")) return;

    if (p.nombre1) $("portada-nombre1").textContent = p.nombre1;
    if (p.nombre2) $("portada-nombre2").textContent = p.nombre2;
    ponerTexto("portada-frase", p.frase);
    if (p.textoBoton) $("portada-boton").textContent = p.textoBoton;

    const img = $("portada-img");
    if (img && p.fotoFondo) img.src = p.fotoFondo;
  }

  /* ---------- Donde empezó todo ---------- */
  function iniciarHistoria() {
    const bloque = $("historia");
    if (!bloque) return;
    const h = cfg.historia || {};
    if (!h.texto) {
      bloque.hidden = true;
      return;
    }
    if (h.titulo) $("historia-titulo").textContent = h.titulo;
    $("historia-texto").textContent = h.texto;
  }

  /* ---------- Visor de fotos (usa <dialog>) ---------- */
  const visor = {
    fotos: [],
    indice: 0,

    iniciar() {
      this.el = $("visor");
      if (!this.el) return;
      this.img = $("visor-img");
      this.texto = $("visor-texto");
      this.fecha = $("visor-fecha");
      this.contador = $("visor-contador");

      $("visor-cerrar").addEventListener("click", () => this.el.close());
      $("visor-anterior").addEventListener("click", () => this.mover(-1));
      $("visor-siguiente").addEventListener("click", () => this.mover(1));

      // Cerrar al pulsar fuera de la foto
      this.el.addEventListener("click", (e) => {
        if (e.target === this.el) this.el.close();
      });

      this.el.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") this.mover(-1);
        if (e.key === "ArrowRight") this.mover(1);
      });

      // Deslizar en el móvil
      let x0 = 0;
      this.el.addEventListener("touchstart", (e) => (x0 = e.changedTouches[0].clientX), { passive: true });
      this.el.addEventListener("touchend", (e) => {
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 50) this.mover(dx < 0 ? 1 : -1);
      }, { passive: true });
    },

    abrir(fotos, indice) {
      if (!this.el || !fotos.length) return;
      this.fotos = fotos;
      this.indice = indice;
      this.el.classList.toggle("una-sola", fotos.length < 2);
      this.pintar();
      this.el.showModal();
    },

    mover(delta) {
      if (this.fotos.length < 2) return;
      this.indice = (this.indice + delta + this.fotos.length) % this.fotos.length;
      this.pintar();
    },

    pintar() {
      const f = this.fotos[this.indice];
      this.img.src = f.archivo;
      this.img.alt = f.descripcion || "Foto ampliada";
      this.texto.textContent = f.descripcion || "";
      this.fecha.textContent = f.fecha || "";
      const separador = f.fecha ? " · " : "";
      this.contador.textContent =
        this.fotos.length > 1 ? `${separador}${this.indice + 1} de ${this.fotos.length}` : "";
    }
  };

  /* ---------- Galería ---------- */
  function iniciarGaleria() {
    const lista = $("galeria-lista");
    if (!lista) return;

    const g = cfg.galeria || {};
    if (g.titulo) $("galeria-titulo").textContent = g.titulo;
    ponerTexto("galeria-subtitulo", g.subtitulo);

    const fotos = Array.isArray(g.fotos) ? g.fotos.filter((f) => f.archivo) : [];
    const posiciones = { arriba: "center top", abajo: "center bottom", centro: "center" };

    fotos.forEach((foto, i) => {
      const li = document.createElement("li");
      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "foto";

      const img = document.createElement("img");
      img.src = foto.archivo;
      img.alt = foto.descripcion || `Foto ${i + 1}`;
      img.loading = "lazy";
      img.decoding = "async";
      if (foto.posicion) img.style.objectPosition = posiciones[foto.posicion] || foto.posicion;
      // Si una foto no carga, se quita en lugar de mostrar un hueco.
      img.addEventListener("error", () => li.remove());
      boton.append(img);

      if (foto.descripcion || foto.fecha) {
        const pie = document.createElement("span");
        pie.className = "foto-pie";
        pie.setAttribute("aria-hidden", "true"); // el texto ya lo lee el alt de la imagen
        pie.innerHTML = "<span class='foto-texto'></span><span class='foto-fecha'></span>";
        pie.firstChild.textContent = foto.descripcion || "";
        pie.lastChild.textContent = foto.fecha || "";
        boton.append(pie);
      }

      boton.addEventListener("click", () => visor.abrir(fotos, i));
      li.append(boton);
      lista.append(li);
    });
  }

  /* ---------- Carta ---------- */
  function iniciarCarta() {
    if (!$("carta-titulo")) return;
    const c = cfg.carta || {};

    if (c.titulo) {
      $("carta-titulo").textContent = c.titulo;
      document.title = `${c.titulo} · ${cfg.monograma || "C & S"}`;
    }
    ponerTexto("carta-subtitulo", c.subtitulo);

    // Foto de la carta
    const bloqueFoto = $("carta-foto");
    if (c.mostrarFotoCarta === false || !c.fotoCarta) {
      bloqueFoto.hidden = true;
    } else {
      const img = $("carta-foto-img");
      img.src = c.fotoCarta;
      ponerTexto("carta-foto-pie", c.pieFotoCarta);
      $("carta-foto-boton").addEventListener("click", () =>
        visor.abrir([{ archivo: img.src, descripcion: c.titulo || "Carta" }], 0)
      );
    }

    // Carta en texto
    const parrafos = Array.isArray(c.parrafos) ? c.parrafos.filter(Boolean) : [];
    const bloqueTexto = $("carta-texto");
    if (!parrafos.length) {
      bloqueTexto.hidden = true;
    } else {
      ponerTexto("carta-saludo", c.saludo);
      ponerTexto("carta-despedida", c.despedida);
      ponerTexto("carta-firma", c.firma);
      ponerTexto("carta-posdata", c.posdata);
      escribirCarta(parrafos);
    }

    // Vídeo
    const bloqueVideo = $("carta-video");
    if (!c.mostrarVideo || !c.archivoVideo) {
      bloqueVideo.hidden = true;
    } else {
      ponerTexto("video-titulo", c.tituloVideo);
      ponerTexto("video-subtitulo", c.subtituloVideo);
      const video = $("video");
      if (c.portadaVideo) video.poster = c.portadaVideo;
      video.src = c.archivoVideo;
      video.addEventListener("error", () => (bloqueVideo.hidden = true));
    }

    // Si no queda nada que enseñar, se avisa en vez de dejar la página vacía.
    if (bloqueFoto.hidden && bloqueTexto.hidden && bloqueVideo.hidden) {
      $("carta-vacia").hidden = false;
    }
  }

  // Escribe la carta letra a letra la primera vez que se ve.
  // El texto completo está siempre en el HTML para lectores de pantalla.
  function escribirCarta(parrafos) {
    const accesible = $("carta-cuerpo-accesible");
    const visible = $("carta-cuerpo");
    const cierre = $("carta-cierre");
    const boton = $("btn-carta-completa");

    parrafos.forEach((t) => {
      const p = document.createElement("p");
      p.textContent = t;
      accesible.append(p);
    });

    let temporizador = null;

    function completa() {
      clearTimeout(temporizador);
      visible.innerHTML = accesible.innerHTML;
      cierre.hidden = false;
      boton.hidden = true;
    }

    function escribir() {
      let ip = 0;
      let ic = 0;
      let p = null;
      visible.innerHTML = "";
      boton.hidden = false;

      (function paso() {
        if (ip >= parrafos.length) return completa();
        if (ic === 0) {
          p = document.createElement("p");
          visible.append(p);
        }
        const texto = parrafos[ip];
        p.textContent = texto.slice(0, ++ic);
        if (ic >= texto.length) {
          ip++;
          ic = 0;
          temporizador = setTimeout(paso, 300);
        } else {
          temporizador = setTimeout(paso, /[.,:;?!]/.test(texto[ic - 1]) ? 120 : 28);
        }
      })();
    }

    boton.addEventListener("click", completa);

    if (sinMovimiento || !("IntersectionObserver" in window)) return completa();

    const obs = new IntersectionObserver((entradas) => {
      if (entradas[0].isIntersecting) {
        obs.disconnect();
        escribir();
      }
    }, { threshold: 0.3 });
    obs.observe(visible);
  }

  /* ---------- Lluvia de corazones y Pompompurin ---------- */
  const CORAZON = (color) =>
    `<svg viewBox="0 0 32 32" width="20" height="20"><path d="M16 28.5c-.6 0-1.2-.2-1.7-.7C8.6 22.8 3 17.5 3 10.8 3 6.2 6.6 2.5 11.2 2.5c2.5 0 4.7 1.2 4.8 2.9.1-1.7 2.3-2.9 4.8-2.9C25.4 2.5 29 6.2 29 10.8c0 6.7-5.6 12-11.3 17-.5.5-1.1.7-1.7.7z" fill="${color}" stroke="#5A3518" stroke-width="1.6"/></svg>`;

  const POMPOMPURIN = `<svg viewBox="0 0 64 56" width="32" height="28">
    <path d="M15 22C5 22 2 36 8 43c5 4 10-4 9-13z" fill="#FFF099" stroke="#5A3518" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M49 22c10 0 13 14 7 21-5 4-10-4-9-13z" fill="#FFF099" stroke="#5A3518" stroke-width="2.4" stroke-linejoin="round"/>
    <ellipse cx="32" cy="31" rx="19" ry="16.5" fill="#FFF099" stroke="#5A3518" stroke-width="2.4"/>
    <ellipse cx="32" cy="14.5" rx="12.5" ry="5" fill="#5A3518"/>
    <path d="M32 7.5V11" stroke="#5A3518" stroke-width="2.6" stroke-linecap="round"/>
    <ellipse cx="20.5" cy="34" rx="3.2" ry="1.8" fill="#F79CA8" opacity=".75"/>
    <ellipse cx="43.5" cy="34" rx="3.2" ry="1.8" fill="#F79CA8" opacity=".75"/>
    <circle cx="24" cy="30" r="2" fill="#4A2C0F"/><circle cx="40" cy="30" r="2" fill="#4A2C0F"/>
    <ellipse cx="32" cy="31.5" rx="1.6" ry="1.2" fill="#4A2C0F"/>
    <path d="M27.5 34.5q2.3 3 4.5-.3 2.2 3.3 4.5.3" fill="none" stroke="#4A2C0F" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

  function iniciarLluvia() {
    const capa = $("lluvia");
    const boton = $("btn-lluvia");
    if (!capa || !boton) return;
    if (sinMovimiento) {
      boton.hidden = true;
      return;
    }

    const opciones = cfg.lluvia || {};
    const cantidad = Math.min(Math.max(Number(opciones.cantidad) || 12, 4), 30);
    const figuras = [POMPOMPURIN, CORAZON("#E8798F"), POMPOMPURIN, CORAZON("#F2C14E")];
    let activa = Boolean(opciones.activarAlInicio);

    function pintar() {
      capa.innerHTML = "";
      boton.setAttribute("aria-pressed", String(activa));
      if (!activa) return;
      for (let i = 0; i < cantidad; i++) {
        const d = document.createElement("div");
        d.className = "gota";
        d.innerHTML = figuras[i % figuras.length];
        d.style.left = `${Math.random() * 96}%`;
        d.style.animationDuration = `${12 + Math.random() * 10}s`;
        d.style.animationDelay = `-${Math.random() * 14}s`;
        d.style.setProperty("--deriva", `${(Math.random() - 0.5) * 100}px`);
        capa.append(d);
      }
    }

    boton.addEventListener("click", () => {
      activa = !activa;
      pintar();
    });
    pintar();
  }

  /* ---------- Música ---------- */
  function iniciarMusica() {
    const boton = $("btn-musica");
    const audio = $("audio");
    const m = cfg.musica || {};
    if (!boton || !audio) return;
    if (!m.archivo) {
      boton.hidden = true;
      return;
    }

    // El botón solo aparece si la canción existe y se puede cargar.
    boton.hidden = true;
    audio.addEventListener("loadedmetadata", () => (boton.hidden = false), { once: true });
    audio.addEventListener("error", () => (boton.hidden = true));
    audio.volume = typeof m.volumen === "number" ? m.volumen : 0.5;
    audio.src = m.archivo;

    const etiqueta = $("btn-musica-texto");
    function estado(sonando) {
      boton.setAttribute("aria-pressed", String(sonando));
      etiqueta.textContent = sonando ? "Pausar música" : "Música";
    }

    boton.addEventListener("click", () => {
      if (audio.paused) audio.play().then(() => estado(true)).catch(() => estado(false));
      else {
        audio.pause();
        estado(false);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    iniciarMonograma();
    visor.iniciar();
    iniciarIntro();
    iniciarPortada();
    iniciarHistoria();
    iniciarGaleria();
    iniciarCarta();
    iniciarLluvia();
    iniciarMusica();
  });
})();
