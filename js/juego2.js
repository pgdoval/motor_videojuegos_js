

var Juego2 = Base.extend({
    CICLOS_PARA_CAMBIO_DE_SPRITE_EN_GOLPEO: 5,
    NUMERO_IMAGENES_GOLPEO: 5,
    musica: {
        url: "sounds/theme.wav"
    },
    efectos_de_sonido: {
        "pause": "sounds/pause.wav"
    },
    crearChara: function () {

        var imagenChara = new Image();
        imagenChara.src = "img/player1.png";
        chara = {
            xImagen: 0,
            yImagen: 0,
            x: 120,
            y: 117,
            altoImagen: 2592,
            anchoImagen: 1456,
            altoOcupado: 384,
            anchoOcupado: 219,
            filasImagen: {
                "": 0,
                "dePie": 0,
                "golpeando": 1
            },
            anchoTotalImagen: {
                "": 1456 * 4,
                "dePie": 1456 * 4,
                "golpeando": 1456 * 5
            },
            imagen: imagenChara,
            status: "",
            ciclos: 0
        };
    },
    crearEnemigo: function () {
        var imagenChara = new Image();
        imagenChara.src = "img/player2.png";
        this.enemigo = {
            xImagen: 0,
            yImagen: 0,
            x: 500,
            y: 135,
            altoImagen: 2592,
            anchoImagen: 1456,
            altoOcupado: 384,
            anchoOcupado: 219,
            filasImagen: {
                "": 0,
                "dePie": 0
            },
            anchoTotalImagen: {
                "": 1456 * 4,
                "dePie": 1456 * 4
            },
            imagen: imagenChara,
            status: "",
            ciclos: 0
        }

    },
    eventos: {
        13: "pause",
        32: "golpear"
    }
});
var appView = new Juego2();




