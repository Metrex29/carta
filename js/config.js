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
      }
    ]
  },

  carta: {
    titulo: "Una carta para ti",
    subtitulo: "",

    // Foto de la carta escrita a mano (la de ejemplo trae instrucciones, no la muestres).
    mostrarFotoCarta: false, // pon true cuando cambies la ruta por la foto real
    fotoCarta: "fotos/carta-foto.svg",
    pieFotoCarta: "Toca la carta para verla en grande.",

    // Carta en texto. Un párrafo por línea, entre comillas y separados por comas.
    // Mientras esté vacía, este bloque no se muestra.
    saludo: "Mi amor,",
    parrafos: [
      "Te escribo esto mientras te espero en el banco de enfrente de tu clínica, congelado, y no solo de frío. Me angustia que salgas más tarde de lo planeado, porque son minutos menos a tu lado.",
      "Cada vez que se abre la puerta levanto la cabeza, y cada vez que no eres tú vuelvo a mirar el móvil. Así que te escribo, que por lo menos se me pasa el rato pensando en ti.",
      "Pienso en tu sonrisa. Haría cualquier cosa por provocártela.",
      "Pienso en cómo me miras. Cuando tus ojos se quedan en mí se me olvida lo que iba a decir, y me da igual, porque me quedaría así un buen rato.",
      "Y luego me das golpecitos de repente, me llamas negrito con ese acento que me encanta, y aquí estoy yo, echándote de menos.",
      "Tengo el móvil lleno de fotos tuyas, y aun así, cuando te tengo delante, me pareces más guapa que en todas.",
      "Me gustas por lo lista que eres, por lo que prometes, por lo que sientes, por tus miedos, que en parte también son los míos. Por todo. Me gustas tú. Es que me encantas, la verdad.",
      "Cuando pienso en lo que viene no sé dónde estaré ni cómo será todo, pero me gustaría que fueses tú. Que dentro de muchos años siga sentado en algún banco, muerto de frío, esperándote a ti.",
      "Te quiero, Sofia. Llevo un rato en este banco dando vueltas a cómo decírtelo y no encuentro otra forma.",
      "Ya te veo salir. Guardo el papel."
    ],
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
