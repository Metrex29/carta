/**
 * ============================================================================
 * ARCHIVO DE CONFIGURACIÓN (js/config.js)
 * ============================================================================
 * ¡Hola! Aquí puedes personalizar TODA la página web sin saber programar.
 *
 * REGLAS BÁSICAS PARA EDITAR ESTE ARCHIVO:
 * 1. Cambia únicamente los textos que están entre comillas ("así").
 * 2. No borres las comillas (""), las comas (,) al final de las líneas ni los
 *    corchetes [] o llaves {}.
 * 3. Todas las rutas de fotos y música deben ser relativas, sin barra al
 *    principio: escribe "fotos/mifoto.jpg" (NUNCA "/fotos/mifoto.jpg").
 * ============================================================================
 */

window.CONFIG = {
  // ==========================================================================
  // 1. COLORES Y ESTILO DE LA PÁGINA
  // ==========================================================================
  // Puedes cambiar estos códigos de color (formato hexadecimal) si quieres
  // darle otro tono a la web. El modo oscuro se adapta automáticamente.
  colores: {
    primario: "#9e3b5a",       // Rosa burdeos romántico (botones, acentos, iconos)
    secundario: "#c89666",     // Dorado cálido / champán (detalles, bordes suaves)
    fondoClaro: "#fdf8f5",     // Crema muy suave para el fondo principal
    fondoAlterno: "#f7ece8",   // Rosa empolvado suave para alternar secciones
    fondoTarjeta: "#ffffff",   // Blanco cálido para tarjetas
    textoPrincipal: "#361d24", // Burdeos muy oscuro (más cálido que el negro puro)
    textoSecundario: "#6e4f58" // Tono medio para subtítulos y fechas
  },

  // ==========================================================================
  // 2. PANTALLA DE CONTRASEÑA OPCIONAL (PROTECCIÓN LIGERA)
  // ==========================================================================
  // Cambia "activo" a true si quieres pedir una clave antes de ver la página.
  // NOTA: Esta clave está en el código y es solo un detalle romántico. Para
  // privacidad real, usa Cloudflare Access como se explica en el README.md.
  acceso: {
    activo: false,
    contrasena: "1402",
    titulo: "Un rincón solo para nosotros",
    subtitulo: "Introduce nuestra clave especial para entrar",
    pista: "Pista: Una fecha de 4 números que nunca olvidamos (DDMM)",
    textoBoton: "Entrar a nuestra historia",
    mensajeError: "Esa no es la clave correcta, inténtalo de nuevo ❤️"
  },

  // ==========================================================================
  // 3. PORTADA PRINCIPAL (HERO)
  // ==========================================================================
  portada: {
    nombre1: "Carlos",
    nombre2: "mi negra bella",
    conector: "&",
    etiquetaSuperior: "Nuestra Historia",
    frase: "Contigo cualquier instante se convierte en mi recuerdo favorito.",
    // Pon tu foto de portada en la carpeta /fotos y escribe aquí su nombre:
    fotoFondo: "fotos/portada.svg",
    textoBoton: "Descubrir nuestra historia"
  },

  // ==========================================================================
  // 4. CONTADOR EN VIVO DEL TIEMPO JUNTOS
  // ==========================================================================
  // Escribe la fecha y hora en formato: "AAAA-MM-DDTHH:MM:SS"
  // Ejemplo: "2021-07-24T19:30:00" (24 de julio de 2021 a las 19:30)
  contador: {
    titulo: "Tiempo caminando juntos",
    subtitulo: "Cada segundo a tu lado cuenta desde aquel primer día",
    fechaInicio: "2022-05-14T18:30:00",
    fraseFinal: "…y este contador nunca dejará de sumar momentos contigo."
  },

  // ==========================================================================
  // 5. GALERÍA DE FOTOS
  // ==========================================================================
  // CÓMO AÑADIR UNA FOTO NUEVA:
  // 1. Copia tu foto (en .jpg o .webp) dentro de la carpeta "fotos".
  // 2. Copia uno de los bloques { ... }, pégalo debajo y cambia el nombre del
  //    archivo, la descripción y la fecha.
  galeria: {
    titulo: "Nuestros Momentos",
    subtitulo: "Toca cualquier fotografía para verla en grande",
    fotos: [
      { archivo: "fotos/foto1.svg", descripcion: "Aquel primer paseo donde el tiempo se detuvo", fecha: "Mayo 2022" },
      { archivo: "fotos/foto2.svg", descripcion: "Viendo caer el sol juntos sin mirar el reloj", fecha: "Agosto 2022" },
      { archivo: "fotos/foto3.svg", descripcion: "Tu risa: mi sonido favorito en el mundo", fecha: "Noviembre 2022" },
      { archivo: "fotos/foto4.svg", descripcion: "Una noche mágica pidiendo deseos bajo las estrellas", fecha: "Febrero 2023" },
      { archivo: "fotos/foto5.svg", descripcion: "Perdernos de viaje y encontrarnos en cada rincón", fecha: "Julio 2023" },
      { archivo: "fotos/foto6.svg", descripcion: "Los pequeños momentos cotidianos que lo son todo", fecha: "Octubre 2023" },
      { archivo: "fotos/foto7.svg", descripcion: "Tardes de café, charlas infinitas y planes de futuro", fecha: "Enero 2024" },
      { archivo: "fotos/foto8.svg", descripcion: "Por todas las aventuras que aún nos esperan", fecha: "Hoy y siempre" }
    ]
  },

  // ==========================================================================
  // 6. LÍNEA DE TIEMPO DE NUESTRA HISTORIA
  // ==========================================================================
  // La propiedad "foto" es opcional: si no quieres foto en un hito, déjala
  // vacía así: foto: ""
  historia: {
    titulo: "Nuestra Historia",
    subtitulo: "Los capítulos más bonitos del camino que hemos recorrido",
    hitos: [
      {
        fecha: "14 de mayo de 2022",
        titulo: "El día en que todo empezó",
        texto: "Entre nervios y sonrisas descubrimos que hablar contigo era como volver a casa. Aquel día supimos que algo especial acababa de empezar.",
        foto: "fotos/foto1.svg"
      },
      {
        fecha: "Verano de 2022",
        titulo: "Nuestro primer viaje juntos",
        texto: "Maletas improvisadas, canciones a todo volumen en el camino y la certeza de que mi lugar favorito siempre es donde estés tú.",
        foto: "fotos/foto2.svg"
      },
      {
        fecha: "14 de mayo de 2023",
        titulo: "Nuestra primera vuelta al sol",
        texto: "Un año entero de complicidad, de apoyarnos en todo y de celebrar cada pequeña alegría como si fuera única.",
        foto: "fotos/foto4.svg"
      },
      {
        fecha: "Otoño de 2024",
        titulo: "Construyendo nuestros sueños",
        texto: "Pasito a pasito, sumando recuerdos, superando retos de la mano y soñando despiertos con todo lo que viene.",
        foto: "fotos/foto6.svg"
      },
      {
        fecha: "Hoy",
        titulo: "Lo mejor aún está por escribirse",
        texto: "Gracias por cada abrazo, por tu paciencia, tu ternura y tu forma de iluminar mis días. Seguimos sumando páginas juntos.",
        foto: ""
      }
    ]
  },

  // ==========================================================================
  // 7. RAZONES POR LAS QUE TE QUIERO (TARJETAS INTERACTIVAS)
  // ==========================================================================
  // Al hacer clic o tocar una tarjeta, se voltea para revelar el mensaje.
  razones: {
    titulo: "Razones por las que te quiero",
    subtitulo: "Toca cada tarjeta para descubrir lo que guardo en el corazón",
    lista: [
      {
        tituloFrente: "Tu sonrisa",
        textoReverso: "Porque tienes el superpoder de iluminar hasta el día más gris con solo mirarme y sonreír."
      },
      {
        tituloFrente: "Nuestra paz",
        textoReverso: "Porque abrazarte es el único lugar del mundo donde todo el ruido se apaga y me siento en casa."
      },
      {
        tituloFrente: "Tu forma de cuidar",
        textoReverso: "Por cada detalle pequeño, por cómo escuchas y por hacerme sentir querido en cada gesto."
      },
      {
        tituloFrente: "Nuestras risas",
        textoReverso: "Porque nadie entiende mis bromas como tú y juntos somos capaces de reírnos hasta que nos duele la tripa."
      },
      {
        tituloFrente: "Cómo me inspiras",
        textoReverso: "Porque admirarte me impulsa cada día a ser mejor persona y a luchar por nuestros sueños."
      },
      {
        tituloFrente: "Nuestro equipo",
        textoReverso: "Porque en los días fáciles disfrutamos al máximo y en los difíciles nos damos la mano aún más fuerte."
      }
    ]
  },

  // ==========================================================================
  // 8. CARTA FINAL (CON EFECTO MÁQUINA DE ESCRIBIR)
  // ==========================================================================
  // Cada elemento dentro de "parrafos" es un párrafo separado de la carta.
  carta: {
    titulo: "Una carta para ti",
    subtitulo: "Palabras escritas despacio, como me gusta vivir la vida contigo",
    saludo: "Mi amor,",
    parrafos: [
      "A veces las palabras se quedan cortas para explicar todo lo que significas para mí, así que quise crear este pequeño rincón en el mundo solo para nosotros, donde guardar nuestros recuerdos más bonitos.",
      "Gracias por aparecer en mi vida y llenarla de calma, de ilusión y de esa complicidad tan nuestra que hace que todo sea más fácil. A tu lado he aprendido que el amor verdadero está en los detalles de cada día: en un mensaje inesperado, en una mirada cómplice y en las ganas de cuidarnos siempre.",
      "No importa cuántos años, meses o segundos marque el reloj de ahí arriba; si volviera a empezar desde cero, te volvería a elegir a ti en cada una de mis vidas."
    ],
    despedida: "Con todo mi corazón,",
    firma: "Carlos ❤️"
  },

  // ==========================================================================
  // 9. MÚSICA DE FONDO (OPCIONAL)
  // ==========================================================================
  // Pon tu archivo MP3 en la carpeta /musica y escribe aquí su ruta.
  // Si no quieres botón de música, cambia "activa" a false.
  // NOTA: Si aún no has puesto el archivo MP3, el botón reproducirá una suave
  // melodía de caja de música de demostración hasta que subas tu canción.
  musica: {
    activa: true,
    archivo: "musica/cancion.mp3",
    tituloCancion: "Nuestra canción",
    volumen: 0.5
  },

  // ==========================================================================
  // 10. EFECTO DE CORAZONES O PÉTALOS CAYENDO
  // ==========================================================================
  // "tipo" puede ser "corazones" o "petalos".
  efectos: {
    activarAlInicio: true,
    tipo: "corazones",
    cantidad: 18
  },

  // ==========================================================================
  // 11. PIE DE PÁGINA
  // ==========================================================================
  pie: {
    texto: "Hecho con todo mi amor para ti",
    notaSecundaria: "Nuestro rincón privado para siempre"
  }
};
