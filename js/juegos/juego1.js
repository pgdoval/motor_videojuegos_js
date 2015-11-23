define([
    'jquery',
    'underscore',
    'backbone',
    'juegos/base',
    'charas/chara'
], function ($, _, Backbone, Base, Chara) {

    var Juego1 = Base.extend({
        conMusica: false,
        CICLOS_PARA_CAMBIO_DE_SPRITE: 4,
        musica: {
            url: "sounds/theme.mp3"
        },
        efectos_de_sonido: {
            "pause": "sounds/pause.wav",
            "saltar": "sounds/jump.wav"
        },
        crearChara: function () {

            var imagenChara = new Image();
            imagenChara.src = "img/sonic.png";

            this.chara = {
                xImagen: 0,
                yImagen: 0,
                x: 120,
                y: 388,
                altoImagen: 30,
                anchoImagen: 24,
                altoOcupado: 60,
                anchoOcupado: 48,
                filasImagen: {
                    "": 0,
                    "dePie": 0,
                    "saltando": 1
                },
                anchoTotalImagen: {
                    "": 24 * 7,
                    "dePie": 24 * 7,
                    "saltando": 24
                },
                imagen: imagenChara,
                status: "",
                ciclos: 0
            };

        },
        enemies: [],
        eventos: {
            13: "pause",
            32: "saltar"
        }
    });

    return Juego1;

});


