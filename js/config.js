/**
 * Configuración de la web (js/config.js)
 *
 * Aquí se cambian los textos, las fotos, la carta y la música sin tocar el resto.
 * - Cambia solo lo que va entre comillas.
 * - No borres comas, corchetes [] ni llaves {}.
 * - Rutas siempre relativas y sin barra al principio: "fotos/web/mifoto.jpg".
 * - Las fotos que se ven en la web están en fotos/web/ (versiones ligeras, sin
 *   datos de ubicación). Si añades una nueva, pásala antes por squoosh.app.
 */

window.CONFIG = {
  // Nombres que salen en la cabecera, la intro y el pie.
  monograma: "Carlos & Sofia",

  intro: {
    // Segundos que dura la intro si NO hay contraseña.
    duracionSegundos: 3,
    // Ojo: esta clave solo es un detalle bonito, no protege nada de verdad
    // (cualquiera puede leerla en este archivo). Ver README, apartado 7.
    contrasenaActiva: true,
    // Se acepta con o sin "la" delante y sin importar mayúsculas.
    pregunta: "¿Qué te dije que tirabas bien?",
    contrasena: "cerveza",
    pista: "Una pista: la pedimos mucho",
    mensajeError: "Casi. Piensa en el primer día."
  },

  portada: {
    nombre1: "Carlos",
    nombre2: "mi negra bella",
    frase: "Contigo, cualquier momento acaba siendo mi recuerdo favorito.",
    fotoFondo: "fotos/web/fotonuestra1.jpg",
    textoBoton: "Ver nuestras fotos"
  },

  galeria: {
    titulo: "Nuestros momentos",
    subtitulo: "Toca una foto para verla en grande.",
    // posicion (opcional): "arriba", "abajo" o "centro" para ajustar el encuadre.
    fotos: [
      {
        archivo: "fotos/web/fotonuestra1.jpg",
        descripcion: "Fotos borrachos n.º 10101010101010. Portada del álbum.",
        fecha: "21 de octubre"
      },
      {
        archivo: "fotos/web/steachhh.jpg",
        descripcion: "Steachhhhhh",
        fecha: "21 de octubre"
      },
      {
        archivo: "fotos/web/precarrousel.jpg",
        descripcion: "Mi fondo de pantalla",
        fecha: "15 de septiembre"
      },
      {
        archivo: "fotos/web/mirada.jpg",
        descripcion: "Mirada intensa",
        fecha: "8 de septiembre",
        posicion: "abajo"
      },
      {
        archivo: "fotos/web/soficansada.jpg",
        descripcion: "Hasta la polla de mí :(",
        fecha: "8 de septiembre"
      },
      {
        archivo: "fotos/web/muyborrachos.jpg",
        descripcion: "La noche esa. Toppp.",
        fecha: "6 de septiembre"
      },
      {
        archivo: "fotos/web/1fotofav.jpg",
        descripcion: "La foto que tengo que imprimir sí o sí",
        fecha: ""
      },
      {
        archivo: "fotos/web/2fotofav.jpg",
        descripcion: "Una de mis muchas fotos favoritas contigo",
        fecha: "10 de septiembre"
      },
      {
        archivo: "fotos/web/aliens.jpg",
        descripcion: "borrachos creo aqui tmb ",
        fecha: ""
      },
      {
        archivo: "fotos/web/disfraces.jpg",
        descripcion: "banda latina de musica",
        fecha: ""
      },
      {
        archivo: "fotos/web/mono.jpg",
        descripcion: "ladrones",
        fecha: ""
      },
      {
        archivo: "fotos/web/ramo.jpg",
        descripcion: "",
        fecha: ""
      },
      {
        archivo: "fotos/web/autobus.jpg",
        descripcion: "me miran con amor",
        fecha: ""
      },
      {
        archivo: "fotos/web/dormidos.jpg",
        descripcion: "sopa sopa ",
        fecha: ""
      },
      {
        archivo: "fotos/web/metro.jpg",
        descripcion: "MUY borrachos al menos yo xd",
        fecha: ""
      },
      {
        archivo: "fotos/web/ramen.jpg",
        descripcion: "charcadaaa mi amor",
        fecha: ""
      }
    ]
  },

  carta: {
    titulo: "Y toma esto",
    subtitulo: "",
    // Lo que se ve mientras la carta no esté en la web (se da en persona).
    mensajeSinCarta: "Ahora mira lo que tengo en las manos.",

    // Foto de la carta escrita a mano (la de ejemplo trae instrucciones, no la muestres).
    mostrarFotoCarta: false, // pon true cuando cambies la ruta por la foto real
    fotoCarta: "fotos/carta-foto.svg",
    pieFotoCarta: "Toca la carta para verla en grande.",

    // Carta en texto. Un párrafo por línea, entre comillas y separados por comas.
    // Mientras esté vacía, este bloque no se muestra.
    saludo: "Mi amor,",
    parrafos: [],
    despedida: "Con todo mi amor,",
    firma: "Carlos",
    // Sale debajo de la firma cuando la carta está escrita. Es el momento de darle la caja.
    posdata: "P. D.: Ahora mira lo que tengo en las manos.",

    // Vídeo (.mp4, menos de 25 MB) dentro de videos/.
    mostrarVideo: false,
    tituloVideo: "Nuestro vídeo",
    subtituloVideo: "",
    archivoVideo: "videos/video.mp4",
    portadaVideo: "fotos/web/2fotofav.jpg"
  },

  // Si el archivo no existe, el botón de música no aparece.
  musica: {
    archivo: "musica/cancion.mp3",
    volumen: 0.5
  },

  // Corazones y Pompompurin cayendo. Se pueden activar con el botón de abajo.
  lluvia: {
    activarAlInicio: false,
    cantidad: 12
  },

  pie: "Hecho con todo mi amor para ti"
};
