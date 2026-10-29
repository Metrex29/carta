/**
 * ============================================================================
 * LÓGICA PRINCIPAL DE LA PÁGINA (js/main.js)
 * ============================================================================
 * Este archivo lee los datos de js/config.js y construye automáticamente
 * todas las secciones de la página. No necesitas editar este archivo.
 * ============================================================================
 */

(function () {
  "use strict";

  const cfg = window.CONFIG || {};
  const prefiereMovimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ==========================================================================
  // 1. APLICAR PALETA DE COLORES DESDE CONFIG.JS
  // ==========================================================================
  function aplicarColores() {
    if (!cfg.colores) return;
    const root = document.documentElement;
    const c = cfg.colores;
    const modoOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (!modoOscuro) {
      if (c.primario) root.style.setProperty("--color-primario", c.primario);
      if (c.secundario) root.style.setProperty("--color-secundario", c.secundario);
      if (c.fondoClaro) root.style.setProperty("--color-fondo-claro", c.fondoClaro);
      if (c.fondoAlterno) root.style.setProperty("--color-fondo-alterno", c.fondoAlterno);
      if (c.fondoTarjeta) root.style.setProperty("--color-fondo-tarjeta", c.fondoTarjeta);
      if (c.textoPrincipal) root.style.setProperty("--color-texto-principal", c.textoPrincipal);
      if (c.textoSecundario) root.style.setProperty("--color-texto-secundario", c.textoSecundario);
    } else {
      // En modo oscuro mantenemos los fondos oscuros para buen contraste
      root.style.removeProperty("--color-primario");
      root.style.removeProperty("--color-secundario");
      root.style.removeProperty("--color-fondo-claro");
      root.style.removeProperty("--color-fondo-alterno");
      root.style.removeProperty("--color-fondo-tarjeta");
      root.style.removeProperty("--color-texto-principal");
      root.style.removeProperty("--color-texto-secundario");
    }
  }

  // ==========================================================================
  // 2. PANTALLA DE CONTRASEÑA OPCIONAL
  // ==========================================================================
  function inicializarPantallaAcceso() {
    const acceso = cfg.acceso;
    const modal = document.getElementById("pantalla-acceso");
    if (!modal || !acceso || !acceso.activo) return;

    const elTitulo = document.getElementById("acceso-titulo");
    const elSubtitulo = document.getElementById("acceso-subtitulo");
    const elPista = document.getElementById("acceso-pista");
    const elBoton = document.getElementById("btn-acceso");
    const elError = document.getElementById("acceso-error");
    const form = document.getElementById("form-acceso");
    const input = document.getElementById("input-acceso");

    if (acceso.titulo) elTitulo.textContent = acceso.titulo;
    if (acceso.subtitulo) elSubtitulo.textContent = acceso.subtitulo;
    if (acceso.pista) elPista.textContent = acceso.pista;
    if (acceso.textoBoton) elBoton.textContent = acceso.textoBoton;

    modal.classList.remove("oculto");
    document.body.style.overflow = "hidden";
    setTimeout(() => input && input.focus(), 100);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const valor = (input.value || "").trim();
      const esperada = String(acceso.contrasena || "").trim();

      if (valor.toLowerCase() === esperada.toLowerCase()) {
        modal.classList.add("oculto");
        document.body.style.overflow = "";
        elError.classList.add("oculto");
      } else {
        elError.textContent =
          acceso.mensajeError || "Clave incorrecta, inténtalo de nuevo ❤️";
        elError.classList.remove("oculto");
        input.value = "";
        input.focus();
      }
    });
  }

  // ==========================================================================
  // 3. PORTADA (HERO) Y METADATOS
  // ==========================================================================
  function inicializarPortada() {
    const p = cfg.portada || {};
    const nombre1 = p.nombre1 || "Tú";
    const nombre2 = p.nombre2 || "Yo";
    const conector = p.conector || "&";

    // Actualizar título de la pestaña y barra superior
    const tituloCompleto = `${nombre1} ${conector} ${nombre2} ❤️`;
    document.title = tituloCompleto;

    const navMarca = document.getElementById("nav-marca");
    if (navMarca) {
      const inicial1 = nombre1.charAt(0).toUpperCase();
      const inicial2 = nombre2.charAt(0).toUpperCase();
      navMarca.textContent = `${inicial1} ${conector} ${inicial2}`;
    }

    const elEtiqueta = document.getElementById("hero-etiqueta");
    const elNombre1 = document.getElementById("hero-nombre1");
    const elConector = document.getElementById("hero-conector");
    const elNombre2 = document.getElementById("hero-nombre2");
    const elFrase = document.getElementById("hero-frase");
    const elBoton = document.getElementById("hero-boton");
    const elFondo = document.getElementById("hero-fondo");
    const seccionHero = document.getElementById("portada");

    if (elEtiqueta && p.etiquetaSuperior) elEtiqueta.textContent = p.etiquetaSuperior;
    if (elNombre1) elNombre1.textContent = nombre1;
    if (elConector) elConector.textContent = conector;
    if (elNombre2) elNombre2.textContent = nombre2;
    if (elFrase && p.frase) elFrase.textContent = p.frase;
    if (elBoton && p.textoBoton) elBoton.textContent = p.textoBoton;

    // Cargar foto de portada con respaldo elegante si no existe
    if (elFondo && p.fotoFondo) {
      const imgPrueba = new Image();
      imgPrueba.onload = function () {
        elFondo.style.backgroundImage = `url("${p.fotoFondo}")`;
        if (seccionHero) seccionHero.classList.add("cargado");
      };
      imgPrueba.onerror = function () {
        // Si la foto personalizada no se encuentra, mantiene un degradado romántico
        elFondo.style.backgroundImage =
          "linear-gradient(135deg, #2c1220 0%, #5e233b 48%, #a84a62 100%)";
        if (seccionHero) seccionHero.classList.add("cargado");
      };
      imgPrueba.src = p.fotoFondo;
    }

    // Pie de página
    const pieNombres = document.getElementById("pie-nombres");
    const pieTexto = document.getElementById("pie-texto");
    const pieNota = document.getElementById("pie-nota");
    if (pieNombres) pieNombres.textContent = `${nombre1} ${conector} ${nombre2}`;
    if (pieTexto && cfg.pie && cfg.pie.texto) pieTexto.textContent = cfg.pie.texto;
    if (pieNota && cfg.pie && cfg.pie.notaSecundaria) {
      pieNota.textContent = cfg.pie.notaSecundaria;
    }
  }

  // ==========================================================================
  // 4. CONTADOR EN VIVO DEL TIEMPO JUNTOS
  // ==========================================================================
  function inicializarContador() {
    const c = cfg.contador || {};
    const elTitulo = document.getElementById("contador-titulo");
    const elSubtitulo = document.getElementById("contador-subtitulo");
    const elFraseFinal = document.getElementById("contador-frase-final");

    if (elTitulo && c.titulo) elTitulo.textContent = c.titulo;
    if (elSubtitulo && c.subtitulo) elSubtitulo.textContent = c.subtitulo;
    if (elFraseFinal && c.fraseFinal) elFraseFinal.textContent = c.fraseFinal;

    const fechaBase = new Date(c.fechaInicio || "2022-05-14T18:30:00");
    const elAnios = document.getElementById("cnt-anios");
    const elMeses = document.getElementById("cnt-meses");
    const elDias = document.getElementById("cnt-dias");
    const elHoras = document.getElementById("cnt-horas");
    const elMinutos = document.getElementById("cnt-minutos");
    const elSegundos = document.getElementById("cnt-segundos");

    function pad2(n) {
      return String(Math.max(0, n)).padStart(2, "0");
    }

    function actualizarReloj() {
      if (isNaN(fechaBase.getTime())) return;

      const ahora = new Date();
      let inicio = fechaBase;
      let fin = ahora;

      // Si la fecha configurada está en el futuro, mostramos cuenta regresiva
      if (inicio > fin) {
        const temp = inicio;
        inicio = fin;
        fin = temp;
      }

      let anios = fin.getFullYear() - inicio.getFullYear();
      let meses = fin.getMonth() - inicio.getMonth();
      let dias = fin.getDate() - inicio.getDate();
      let horas = fin.getHours() - inicio.getHours();
      let minutos = fin.getMinutes() - inicio.getMinutes();
      let segundos = fin.getSeconds() - inicio.getSeconds();

      if (segundos < 0) {
        segundos += 60;
        minutos--;
      }
      if (minutos < 0) {
        minutos += 60;
        horas--;
      }
      if (horas < 0) {
        horas += 24;
        dias--;
      }
      if (dias < 0) {
        // Días del mes anterior a la fecha actual
        const ultimoDiaMesAnterior = new Date(
          fin.getFullYear(),
          fin.getMonth(),
          0
        ).getDate();
        dias += ultimoDiaMesAnterior;
        meses--;
      }
      if (meses < 0) {
        meses += 12;
        anios--;
      }

      if (elAnios) elAnios.textContent = String(Math.max(0, anios));
      if (elMeses) elMeses.textContent = String(Math.max(0, meses));
      if (elDias) elDias.textContent = String(Math.max(0, dias));
      if (elHoras) elHoras.textContent = pad2(horas);
      if (elMinutos) elMinutos.textContent = pad2(minutos);
      if (elSegundos) elSegundos.textContent = pad2(segundos);
    }

    actualizarReloj();
    setInterval(actualizarReloj, 1000);
  }

  // ==========================================================================
  // GENERADOR DE PLACEHOLDER ELEGANTE SI UNA FOTO NO EXISTE O FALLA
  // ==========================================================================
  function generarSvgDataUriPlaceholder(titulo, ruta) {
    const textoSeguro = (titulo || "Recuerdo especial")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const rutaSegura = (ruta || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 650">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f7e4e6"/>
          <stop offset="100%" stop-color="#d495a3"/>
        </linearGradient>
      </defs>
      <rect width="800" height="650" fill="url(#g)"/>
      <text x="400" y="275" text-anchor="middle" font-size="68" fill="#9e3b5a">♥</text>
      <text x="400" y="345" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="28" fill="#4a1c2a">${textoSeguro}</text>
      <text x="400" y="390" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#6e3b4b">Coloca tu foto en: ${rutaSegura}</text>
    </svg>`;

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  // ==========================================================================
  // 5. GALERÍA DE FOTOS + LIGHTBOX ACCESIBLE CON SWIPE
  // ==========================================================================
  let listaFotosLightbox = [];
  let indiceLightboxActual = 0;
  let ultimoElementoFoco = null;

  function inicializarGaleriaYLightbox() {
    const g = cfg.galeria || {};
    const elTitulo = document.getElementById("galeria-titulo");
    const elSubtitulo = document.getElementById("galeria-subtitulo");
    const contenedor = document.getElementById("galeria-masonry");

    if (elTitulo && g.titulo) elTitulo.textContent = g.titulo;
    if (elSubtitulo && g.subtitulo) elSubtitulo.textContent = g.subtitulo;
    if (!contenedor) return;

    const fotos = Array.isArray(g.fotos) ? g.fotos : [];
    listaFotosLightbox = fotos.map((f) => ({
      archivo: f.archivo || "",
      descripcion: f.descripcion || "",
      fecha: f.fecha || ""
    }));

    contenedor.innerHTML = "";

    fotos.forEach((foto, index) => {
      const item = document.createElement("article");
      item.className = "galeria-item revelar";
      item.setAttribute("role", "listitem");
      item.setAttribute("tabindex", "0");
      item.setAttribute(
        "aria-label",
        `${foto.descripcion || "Fotografía"} (${foto.fecha || ""}) - pulsa para ampliar`
      );

      const marco = document.createElement("div");
      marco.className = "galeria-marco-img";

      const img = document.createElement("img");
      img.className = "galeria-img";
      img.src = foto.archivo;
      img.alt = foto.descripcion || `Fotografía ${index + 1}`;
      img.loading = "lazy";
      img.decoding = "async";

      // Si la foto aún no existe o falla, mostrar un placeholder elegante
      img.addEventListener("error", function () {
        const placeholder = generarSvgDataUriPlaceholder(
          foto.descripcion || "Nuestra foto",
          foto.archivo
        );
        img.src = placeholder;
        listaFotosLightbox[index].archivo = placeholder;
      });

      marco.appendChild(img);

      const info = document.createElement("div");
      info.className = "galeria-info";

      if (foto.descripcion) {
        const desc = document.createElement("p");
        desc.className = "galeria-descripcion";
        desc.textContent = foto.descripcion;
        info.appendChild(desc);
      }

      if (foto.fecha) {
        const fecha = document.createElement("span");
        fecha.className = "galeria-fecha";
        fecha.textContent = foto.fecha;
        info.appendChild(fecha);
      }

      item.appendChild(marco);
      item.appendChild(info);

      item.addEventListener("click", () => abrirLightbox(index));
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          abrirLightbox(index);
        }
      });

      contenedor.appendChild(item);
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
        img.src = generarSvgDataUriPlaceholder(item.descripcion, item.archivo);
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

    // Cerrar al hacer clic en el fondo oscuro
    modal.addEventListener("click", (e) => {
      if (e.target === modal) cerrarLightbox();
    });

    // Navegación con teclado (Escape, Flecha izquierda, Flecha derecha)
    document.addEventListener("keydown", (e) => {
      if (modal.classList.contains("oculto")) return;
      if (e.key === "Escape") cerrarLightbox();
      if (e.key === "ArrowLeft") cambiarFotoLightbox(-1);
      if (e.key === "ArrowRight") cambiarFotoLightbox(1);
    });

    // Soporte de gestos Swipe en móvil
    let touchInicioX = 0;
    let touchInicioY = 0;

    modal.addEventListener(
      "touchstart",
      (e) => {
        if (!e.changedTouches || !e.changedTouches.length) return;
        touchInicioX = e.changedTouches[0].screenX;
        touchInicioY = e.changedTouches[0].screenY;
      },
      { passive: true }
    );

    modal.addEventListener(
      "touchend",
      (e) => {
        if (!e.changedTouches || !e.changedTouches.length) return;
        const diffX = e.changedTouches[0].screenX - touchInicioX;
        const diffY = e.changedTouches[0].screenY - touchInicioY;

        if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            cambiarFotoLightbox(1);
          } else {
            cambiarFotoLightbox(-1);
          }
        }
      },
      { passive: true }
    );
  }

  // ==========================================================================
  // 6. LÍNEA DE TIEMPO DE NUESTRA HISTORIA
  // ==========================================================================
  function inicializarHistoria() {
    const h = cfg.historia || {};
    const elTitulo = document.getElementById("historia-titulo");
    const elSubtitulo = document.getElementById("historia-subtitulo");
    const contenedor = document.getElementById("linea-tiempo");

    if (elTitulo && h.titulo) elTitulo.textContent = h.titulo;
    if (elSubtitulo && h.subtitulo) elSubtitulo.textContent = h.subtitulo;
    if (!contenedor) return;

    const hitos = Array.isArray(h.hitos) ? h.hitos : [];
    contenedor.innerHTML = "";

    hitos.forEach((hito) => {
      const item = document.createElement("div");
      item.className = "hito-item revelar";

      const punto = document.createElement("div");
      punto.className = "hito-punto";
      punto.setAttribute("aria-hidden", "true");
      punto.textContent = "♥";

      const tarjeta = document.createElement("article");
      tarjeta.className = "hito-tarjeta";

      if (hito.fecha) {
        const fecha = document.createElement("span");
        fecha.className = "hito-fecha";
        fecha.textContent = hito.fecha;
        tarjeta.appendChild(fecha);
      }

      if (hito.titulo) {
        const titulo = document.createElement("h3");
        titulo.className = "hito-titulo";
        titulo.textContent = hito.titulo;
        tarjeta.appendChild(titulo);
      }

      if (hito.texto) {
        const texto = document.createElement("p");
        texto.className = "hito-texto";
        texto.textContent = hito.texto;
        tarjeta.appendChild(texto);
      }

      if (hito.foto && hito.foto.trim() !== "") {
        const marcoFoto = document.createElement("div");
        marcoFoto.className = "hito-foto-contenedor";

        const img = document.createElement("img");
        img.className = "hito-foto";
        img.src = hito.foto;
        img.alt = hito.titulo || "Recuerdo de nuestra historia";
        img.loading = "lazy";

        img.addEventListener("error", function () {
          img.src = generarSvgDataUriPlaceholder(hito.titulo, hito.foto);
        });

        // Al hacer clic en la foto del hito, se abre también en el Lightbox
        img.addEventListener("click", function () {
          const idxExistente = listaFotosLightbox.findIndex(
            (f) => f.archivo === hito.foto
          );
          if (idxExistente !== -1) {
            abrirLightbox(idxExistente);
          } else {
            listaFotosLightbox.push({
              archivo: img.src,
              descripcion: hito.titulo || "",
              fecha: hito.fecha || ""
            });
            abrirLightbox(listaFotosLightbox.length - 1);
          }
        });

        marcoFoto.appendChild(img);
        tarjeta.appendChild(marcoFoto);
      }

      item.appendChild(punto);
      item.appendChild(tarjeta);
      contenedor.appendChild(item);
    });
  }

  // ==========================================================================
  // 7. RAZONES POR LAS QUE TE QUIERO (TARJETAS QUE SE VOLTEAN)
  // ==========================================================================
  function inicializarRazones() {
    const r = cfg.razones || {};
    const elTitulo = document.getElementById("razones-titulo");
    const elSubtitulo = document.getElementById("razones-subtitulo");
    const contenedor = document.getElementById("razones-grid");
    const btnVoltearTodas = document.getElementById("btn-voltear-todas");

    if (elTitulo && r.titulo) elTitulo.textContent = r.titulo;
    if (elSubtitulo && r.subtitulo) elSubtitulo.textContent = r.subtitulo;
    if (!contenedor) return;

    const lista = Array.isArray(r.lista) ? r.lista : [];
    contenedor.innerHTML = "";

    lista.forEach((item, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "razon-contenedor revelar";

      const tarjeta = document.createElement("div");
      tarjeta.className = "razon-tarjeta";
      tarjeta.setAttribute("role", "button");
      tarjeta.setAttribute("tabindex", "0");
      tarjeta.setAttribute("aria-pressed", "false");
      tarjeta.setAttribute(
        "aria-label",
        `Razón ${index + 1}: ${item.tituloFrente || ""}. Pulsa para leer.`
      );

      const numFormateado = String(index + 1).padStart(2, "0");

      const frente = document.createElement("div");
      frente.className = "razon-cara razon-frente";
      frente.innerHTML = `
        <span class="razon-numero">Razón #${numFormateado}</span>
        <div class="razon-corazon" aria-hidden="true">♥</div>
        <h3 class="razon-titulo-frente"></h3>
        <span class="razon-indicador">Toca para descubrir ↺</span>
      `;
      frente.querySelector(".razon-titulo-frente").textContent =
        item.tituloFrente || `Motivo ${index + 1}`;

      const reverso = document.createElement("div");
      reverso.className = "razon-cara razon-reverso";
      const textoRev = document.createElement("p");
      textoRev.className = "razon-texto-reverso";
      textoRev.textContent = item.textoReverso || "";
      reverso.appendChild(textoRev);

      tarjeta.appendChild(frente);
      tarjeta.appendChild(reverso);

      function alternarTarjeta() {
        const volteada = tarjeta.classList.toggle("volteada");
        tarjeta.setAttribute("aria-pressed", volteada ? "true" : "false");
        actualizarTextoBotonVoltearTodas();
      }

      tarjeta.addEventListener("click", alternarTarjeta);
      tarjeta.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          alternarTarjeta();
        }
      });

      wrapper.appendChild(tarjeta);
      contenedor.appendChild(wrapper);
    });

    function actualizarTextoBotonVoltearTodas() {
      if (!btnVoltearTodas) return;
      const tarjetas = contenedor.querySelectorAll(".razon-tarjeta");
      const todasVolteadas = Array.from(tarjetas).every((t) =>
        t.classList.contains("volteada")
      );
      btnVoltearTodas.textContent = todasVolteadas
        ? "Voltear tarjetas al frente"
        : "Revelar todas las tarjetas";
    }

    if (btnVoltearTodas) {
      btnVoltearTodas.addEventListener("click", () => {
        const tarjetas = contenedor.querySelectorAll(".razon-tarjeta");
        const todasVolteadas = Array.from(tarjetas).every((t) =>
          t.classList.contains("volteada")
        );
        tarjetas.forEach((t) => {
          t.classList.toggle("volteada", !todasVolteadas);
          t.setAttribute("aria-pressed", !todasVolteadas ? "true" : "false");
        });
        actualizarTextoBotonVoltearTodas();
      });
    }
  }

  // ==========================================================================
  // 8. CARTA FINAL CON EFECTO MÁQUINA DE ESCRIBIR AL HACER SCROLL
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
    if (!elCuerpo) return;

    const parrafos = Array.isArray(c.parrafos) ? c.parrafos : [];
    let temporizadorEscritura = null;
    let escribiendo = false;
    let yaIniciada = false;

    function mostrarCartaCompleta() {
      if (temporizadorEscritura) {
        clearTimeout(temporizadorEscritura);
        temporizadorEscritura = null;
      }
      escribiendo = false;
      elCuerpo.innerHTML = "";
      parrafos.forEach((texto) => {
        const p = document.createElement("p");
        p.textContent = texto;
        elCuerpo.appendChild(p);
      });
      if (elCierre) elCierre.classList.add("visible");
      if (btnMostrar) btnMostrar.textContent = "Repetir efecto de escritura ✍️";
    }

    function iniciarEfectoMaquina() {
      if (prefiereMovimientoReducido) {
        mostrarCartaCompleta();
        return;
      }

      if (temporizadorEscritura) clearTimeout(temporizadorEscritura);
      escribiendo = true;
      elCuerpo.innerHTML = "";
      if (elCierre) elCierre.classList.remove("visible");
      if (btnMostrar) {
        btnMostrar.textContent = "Mostrar carta completa al instante";
      }

      let idxParrafo = 0;
      let idxCaracter = 0;
      let parrafoActualEl = null;

      function escribirSiguientePaso() {
        if (idxParrafo >= parrafos.length) {
          escribiendo = false;
          if (parrafoActualEl) parrafoActualEl.classList.remove("cursor-maquina");
          if (elCierre) elCierre.classList.add("visible");
          if (btnMostrar) {
            btnMostrar.textContent = "Repetir efecto de escritura ✍️";
          }
          return;
        }

        const textoActual = parrafos[idxParrafo];

        if (idxCaracter === 0) {
          if (parrafoActualEl) parrafoActualEl.classList.remove("cursor-maquina");
          parrafoActualEl = document.createElement("p");
          parrafoActualEl.className = "cursor-maquina";
          elCuerpo.appendChild(parrafoActualEl);
        }

        parrafoActualEl.textContent = textoActual.slice(0, idxCaracter + 1);
        idxCaracter++;

        if (idxCaracter < textoActual.length) {
          // Velocidad natural y fluida
          const char = textoActual.charAt(idxCaracter - 1);
          const pausa = char === "." || char === "," || char === ";" ? 95 : 22;
          temporizadorEscritura = setTimeout(escribirSiguientePaso, pausa);
        } else {
          idxParrafo++;
          idxCaracter = 0;
          temporizadorEscritura = setTimeout(escribirSiguientePaso, 320);
        }
      }

      escribirSiguientePaso();
    }

    if (btnMostrar) {
      btnMostrar.addEventListener("click", () => {
        if (escribiendo) {
          mostrarCartaCompleta();
        } else {
          iniciarEfectoMaquina();
        }
      });
    }

    // Disparar la escritura automáticamente al hacer scroll hasta la carta
    const seccionCarta = document.getElementById("carta");
    if ("IntersectionObserver" in window && seccionCarta) {
      const obsCarta = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (entrada.isIntersecting && !yaIniciada) {
              yaIniciada = true;
              iniciarEfectoMaquina();
              obsCarta.unobserve(seccionCarta);
            }
          });
        },
        { threshold: 0.25 }
      );
      obsCarta.observe(seccionCarta);
    } else {
      mostrarCartaCompleta();
    }
  }

  // ==========================================================================
  // 9. REPRODUCTOR DE MÚSICA OPCIONAL (CON CAJA DE MÚSICA DE RESPALDO)
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

    if (m.archivo) {
      audio.src = m.archivo;
    }
    audio.volume = typeof m.volumen === "number" ? m.volumen : 0.5;

    let reproduciendo = false;
    let usandoSintetizador = false;
    let audioCtx = null;
    let timerMelodia = null;

    // Suave melodía de caja de música en caso de que el usuario aún no haya
    // copiado su archivo MP3 en /musica/cancion.mp3
    function iniciarCajaDeMusicaSuave() {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtx) audioCtx = new AudioContextClass();
      if (audioCtx.state === "suspended") audioCtx.resume();

      const notas = [523.25, 659.25, 783.99, 659.25, 880.0, 783.99, 659.25, 587.33];
      let paso = 0;

      function tocarNota() {
        if (!reproduciendo) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(notas[paso % notas.length], audioCtx.currentTime);

        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.4);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.45);
        paso++;
      }

      tocarNota();
      timerMelodia = setInterval(tocarNota, 900);
    }

    function detenerCajaDeMusicaSuave() {
      if (timerMelodia) {
        clearInterval(timerMelodia);
        timerMelodia = null;
      }
    }

    function actualizarEstadoBoton(activo) {
      reproduciendo = activo;
      btn.setAttribute("aria-pressed", activo ? "true" : "false");
      if (icono) icono.textContent = activo ? "❚❚" : "♪";
      if (texto) texto.textContent = activo ? "Pausar" : "Música";
      btn.setAttribute(
        "aria-label",
        activo ? "Pausar música de fondo" : "Reproducir música de fondo"
      );
    }

    btn.addEventListener("click", () => {
      if (reproduciendo) {
        audio.pause();
        detenerCajaDeMusicaSuave();
        actualizarEstadoBoton(false);
      } else {
        if (usandoSintetizador) {
          actualizarEstadoBoton(true);
          iniciarCajaDeMusicaSuave();
          return;
        }

        const promesa = audio.play();
        if (promesa !== undefined) {
          promesa
            .then(() => {
              actualizarEstadoBoton(true);
            })
            .catch(() => {
              // Si el archivo musica/cancion.mp3 aún no se ha subido, suena la caja de música
              usandoSintetizador = true;
              actualizarEstadoBoton(true);
              iniciarCajaDeMusicaSuave();
            });
        }
      }
    });
  }

  // ==========================================================================
  // 10. EFECTO SUTIL DE CORAZONES O PÉTALOS CAYENDO
  // ==========================================================================
  function inicializarEfectos() {
    const ef = cfg.efectos || {};
    const contenedor = document.getElementById("contenedor-efectos");
    const btn = document.getElementById("btn-efectos");
    const textoBtn = document.getElementById("texto-btn-efectos");

    if (!contenedor || !btn) return;

    if (prefiereMovimientoReducido) {
      btn.classList.add("oculto");
      return;
    }

    let activo = ef.activarAlInicio !== false;
    const cantidad = Math.min(Math.max(ef.cantidad || 16, 5), 40);
    const esPetalos = (ef.tipo || "").toLowerCase() === "petalos";
    const simbolos = esPetalos ? ["🌸", "💮", "✿"] : ["♥", "♡", "❤"];

    function crearParticulas() {
      contenedor.innerHTML = "";
      if (!activo) return;

      for (let i = 0; i < cantidad; i++) {
        const span = document.createElement("span");
        span.className = "particula-romantica";
        span.textContent = simbolos[i % simbolos.length];

        const left = Math.random() * 100;
        const duracion = 9 + Math.random() * 10;
        const retraso = Math.random() * 12;
        const tamano = 0.75 + Math.random() * 0.85;
        const deriva = (Math.random() - 0.5) * 110;
        const opacidad = 0.22 + Math.random() * 0.35;

        span.style.left = `${left}%`;
        span.style.fontSize = `${tamano}rem`;
        span.style.color = "var(--color-primario)";
        span.style.animationDuration = `${duracion}s`;
        span.style.animationDelay = `-${retraso}s`;
        span.style.setProperty("--deriva-x", `${deriva}px`);
        span.style.setProperty("--opacidad-max", String(opacidad));

        contenedor.appendChild(span);
      }
    }

    function actualizarBotonEfectos() {
      btn.setAttribute("aria-pressed", activo ? "true" : "false");
      if (textoBtn) {
        textoBtn.textContent = esPetalos ? "Pétalos" : "Corazones";
      }
      btn.setAttribute(
        "aria-label",
        activo
          ? "Desactivar efecto de corazones o pétalos"
          : "Activar efecto de corazones o pétalos"
      );
    }

    btn.addEventListener("click", () => {
      activo = !activo;
      actualizarBotonEfectos();
      crearParticulas();
    });

    actualizarBotonEfectos();
    crearParticulas();
  }

  // ==========================================================================
  // 11. ANIMACIONES SUAVES AL HACER SCROLL Y BARRA SUPERIOR
  // ==========================================================================
  function inicializarScrollYObservador() {
    const barra = document.getElementById("barra-navegacion");
    window.addEventListener(
      "scroll",
      () => {
        if (!barra) return;
        if (window.scrollY > 50) {
          barra.classList.add("desplazada");
        } else {
          barra.classList.remove("desplazada");
        }
      },
      { passive: true }
    );

    const elementosRevelar = document.querySelectorAll(".revelar");
    if ("IntersectionObserver" in window && !prefiereMovimientoReducido) {
      const observador = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
              entrada.target.classList.add("visible");
              observador.unobserve(entrada.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      elementosRevelar.forEach((el) => observador.observe(el));
    } else {
      elementosRevelar.forEach((el) => el.classList.add("visible"));
    }
  }

  // ==========================================================================
  // INICIALIZACIÓN GENERAL AL CARGAR EL DOM
  // ==========================================================================
  document.addEventListener("DOMContentLoaded", () => {
    aplicarColores();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", aplicarColores);

    inicializarPantallaAcceso();
    inicializarPortada();
    inicializarContador();
    inicializarGaleriaYLightbox();
    inicializarHistoria();
    inicializarRazones();
    inicializarCarta();
    inicializarMusica();
    inicializarEfectos();
    inicializarScrollYObservador();
  });
})();
