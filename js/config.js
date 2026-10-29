/**
 * ============================================================================
 * ARCHIVO DE CONFIGURACIÓN PRINCIPAL (js/config.js)
 * ============================================================================
 * ¡Hola! Aquí puedes personalizar TODA la página web sin saber programar.
 *
 * REGLAS BÁSICAS:
 * 1. Cambia únicamente los textos que están entre comillas ("así").
 * 2. No borres las comillas (""), las comas (,) al final de cada línea ni los
 *    corchetes [] o llaves {}.
 * 3. Escribe siempre rutas relativas SIN barra al principio:
 *    Correcto:   "fotos/mifoto.jpg"
 *    Incorrecto: "/fotos/mifoto.jpg"
 * ============================================================================
 */

window.CONFIG = {
  // ==========================================================================
  // 1. IDENTIDAD Y MONOGRAMA (C & S)
  // ==========================================================================
  identidad: {
    monograma: "Carlos & Sofia"
  },

  // ==========================================================================
  // 2. PALETA DE COLORES (FONDO ROSA ROMÁNTICO + GIRASOL)
  // ==========================================================================
  colores: {
    amarilloGirasol: "#F5B700", // Amarillo principal del girasol
    amarilloLuz: "#FFC933",     // Amarillo luminoso para brillos y acentos
    marronSemilla: "#4A2C0F",   // Marrón cálido del centro del girasol
    verdeHoja: "#4F7A2B",       // Verde natural del tallo y hojas
    rosaClaro: "#FDF2F5",       // Inicio del degradado rosa suave
    rosaMedio: "#F7D6E0",       // Medio del degradado rosa
    rosaProfundo: "#EAB5C5",    // Final del degradado rosa romántico
    blanco: "#FFFFFF",          // Blanco para tarjetas
    textoPrincipal: "#2E151E",  // Burdeos/negro cálido para textos
    textoSecundario: "#6E4856"  // Tono secundario suave
  },

  // ==========================================================================
  // 3. INTRO OBLIGATORIA DEL GIRASOL
  // ==========================================================================
  // La animación del girasol aparece SIEMPRE al abrir la página como una intro.
  intro: {
    duracionSegundos: 3.2,
    mostrarBotonEntrar: false,
    textoBoton: "Entrar",

    // Contraseña opcional en la misma intro (cambia a true si quieres activarla)
    contrasenaActiva: true,
    contrasena: "25082026",
    placeholderContrasena: "DIndon",
    mensajeErrorContrasena: "Clave incorrecta, inténtalo de nuevo 🌻"
  },

  // ==========================================================================
  // 4. PORTADA ROMÁNTICA (HERO)
  // ==========================================================================
  portada: {
    //etiquetaSuperior: "Nuestra Historia",
    nombre1: "Carlos",
    conector: "&",
    nombre2: "mi negra bella",
    frase: "Contigo cualquier instante se convierte en mi recuerdo favorito.",
    fotoFondo: "fotos/portada.svg",
    textoBoton: "Descubrir nuestra historia"
  },

  // ==========================================================================
  // 5. NUESTROS MOMENTOS (GALERÍA DE FOTOS)
  // ==========================================================================
  // CÓMO AÑADIR UNA FOTO:
  // 1. Copia tu foto (.jpg o .webp) dentro de la carpeta /fotos.
  // 2. Añade o edita una línea aquí abajo con su ruta relativa ("fotos/nombre.jpg").
  // 3. Opcional: puedes añadir posicion: "abajo" (o "arriba" / "centro") para ajustar el encuadre.
  galeria: {
    titulo: "Nuestros momentos.",
    subtitulo: "Toca cualquier fotografía para verla a pantalla completa.",
    fotos: [
      {
        archivo: "fotos/fotoNuestra1.jpg",
        descripcion: "Fotos borrachos numero 10101010101010",
        fecha: "portada de album",
        destacada: "grande"
      },
      {
        archivo: "fotos/steachhh.JPG",
        descripcion: "steachhhhhhhhhhh",
        fecha: "Recuerdo 02",
        destacada: "normal"
      },
      {
        archivo: "fotos/precarrousel.JPG",
        descripcion: "fondo de pantalla",
        fecha: "Recuerdo 03",
        destacada: "normal"
      },
      {
        archivo: "fotos/mirada.JPG",
        descripcion: "Noches inolvidables",
        fecha: "mirada intensa",
        destacada: "ancha",
        posicion: "abajo"
      },
      {
        archivo: "fotos/soficansada.JPG",
        descripcion: "hasta la polla de mi :(((((",
        fecha: "Recuerdo 05",
        destacada: "normal"
      },
      {
        archivo: "fotos/muyBorrachos.JPG",
        descripcion: "la noche esa toppppppp",
        fecha: "Recuerdo 06",
        destacada: "normal"
      },
      {
        archivo: "fotos/1fotofav.jpg",
        descripcion: "Foto que tengo que imprimir!!!!!!!!!!!!!!",
        fecha: "Recuerdo 07",
        destacada: "normal"
      },
      {
        archivo: "fotos/2fotofav.JPG",
        descripcion: "muchas fotos favoritas contigo",
        fecha: "Recuerdo 08",
        destacada: "grande"
      }
    ]
  },

  // ==========================================================================
  // 6. PÁGINA DE LA CARTA (carta.html: FOTO DE LA CARTA + TEXTO + VÍDEO)
  // ==========================================================================
  carta: {
    titulo: "la real!!!",

    // A) LA CARTA EN FOTO (Pon la foto de tu carta en /fotos y escribe aquí su ruta)
    mostrarFotoCarta: true,
    fotoCarta: "fotos/carta-foto.svg",
    pieFotoCarta: "suavesuave",

    // B) LA CARTA EN TEXTO (Con efecto máquina de escribir)
    saludo: "Mi amor,",
    parrafos: [
      "a hacer que me falta xd "
    ],
    despedida: "Con todo mi amor,",
    firma: "Carlos Picón",

    // C) VÍDEO ESPECIAL EN LA PÁGINA DE LA CARTA
    // Pon tu vídeo (.mp4, menos de 25 MB) dentro de la carpeta /videos y escribe aquí su ruta:
    mostrarVideo: false,
    tituloVideo: "Nuestro vídeo especial.",
    subtituloVideo: "Dale al play para revivir este momento juntos.",
    archivoVideo: "videos/video.mp4",
    portadaVideo: "fotos/portada.svg"
  },

  // ==========================================================================
  // 7. MÚSICA DE FONDO (OPCIONAL)
  // ==========================================================================
  musica: {
    activa: true,
    archivo: "musica/cancion.mp3",
    tituloCancion: "Nuestra canción",
    volumen: 0.5
  },

  // ==========================================================================
  // 8. LLUVIA DE CORAZONES Y CARITAS DE POMPOMPURIN
  // ==========================================================================
  petalos: {
    activarAlInicio: true,
    cantidad: 18
  },

  // ==========================================================================
  // 9. PIE DE PÁGINA
  // ==========================================================================
  pie: {
    texto: "Hecho con todo mi amor para ti"
  }
};
