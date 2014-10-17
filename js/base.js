
define([
    'jquery',
    'underscore',
    'backbone',
    'context_manager'
], function ($, _, Backbone, ContextManager) {

    var Base = Backbone.View.extend({
        canvas: null,
        chara: null,
        estado: null,
        conMusica: true,
        CICLOS_PARA_CAMBIO_DE_SPRITE: 15,
        CICLOS_TOTALES_SALTO: 60,
        el: $('#canvas'),
        contextManager: null,
        enemigo: null,
        initialize: function () {
            this.render();
        },
        render: function () {
            this.canvas = this.$el[0];
            this.start();

        },
        start: function () {
            var self = this;




            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.canvas.style.width = this.canvas.width.toString() + "px";
            this.canvas.style.height = this.canvas.height.toString() + "px";

            this.contextManager = new ContextManager();
            this.contextManager.init(self.canvas);

            if (this.conMusica)
            {
                this.musica.elemento = this.crearElementoDeAudio(this.musica.url, "", true);
                this.musica.elemento.play();
            }
            //vamos a querer efectos de sonido siempre
            this.crearEfectosDeSonido();



            this.intro();

            this.crearChara();
            this.crearEnemigo();


            this.chara.imagen.onload = function () {
                self.contextManager.dibujar(self.chara);
            }

            if (this.enemigo != null)
                this.enemigo.imagen.onload = function () {
                    self.contextManager.dibujar(self.enemigo);
                }

            this.estado = "play";

            this.escucharEventos();

            var timer = new this.Timer(this.actualizar, 30 / 60, this);
            timer.start();

        },
        //Funciones de audio



        crearElementoDeAudio: function (url, name, loopable) {
            var audio = document.createElement('audio');
            //console.log('cargando "' + src + '"');
            audio.src = url;
            audio.preload = 'auto';
            audio.loop = loopable;
            return audio;
        },
        elementos_de_efectos_de_sonido: {},
        crearEfectosDeSonido: function () {
            for (var efecto in this.efectos_de_sonido)
                this.elementos_de_efectos_de_sonido[efecto] = this.crearElementoDeAudio(this.efectos_de_sonido[efecto], efecto, false);
        },
        reproducirEfectoDeSonido: function (sound) {
            var efecto = this.elementos_de_efectos_de_sonido[sound];
            efecto.play();
        },
        regenerarEfectoDeSonido: function (sound) {
            this.elementos_de_efectos_de_sonido[sound] = this.crearElementoDeAudio(this.efectos_de_sonido[sound], sound, false);
        },
        //Vacías por defecto


        intro: function () {

        },
        crearEnemigo: function () {

        },
        //Funciones cómodas que pintan en base a las anteriores

        repintar: function () {
            this.pintaChara();
            this.pintaEnemigo();
        },
        pintaChara: function () {
            this.contextManager.dibujar(this.chara);
        },
        pintaEnemigo: function () {
            if (this.enemigo != null)
                this.contextManager.dibujar(this.enemigo);
        },
        //La función que se llama cada pocos milisegundos



        actualizar: function () {
            this.actualizarElemento(this.chara);
            if (this.enemigo != null)
                this.actualizarElemento(this.enemigo);
        },
        actualizarElemento: function (elemento) {
            if (this.estado == "play")
            {

                this.recalcular(elemento);
                if (this.chara.status != "")
                {
                    this.contextManager.borraRecuadro(elemento);
                    this.contextManager.dibujar(elemento);
                }
            }
        },
        //Asignar los controles



        escucharEventos: function () {
            var self = this;
            $(document).on('keyup', function (e) {
                e.preventDefault();

                //obtenemos la función a ejecutar
                var evento = self.eventos[e.which];

                //esto con objetos para los lo podríamos encapsular mejor
                switch (evento)
                {
                    case "pause":
                        self.procesarPause();
                        break;
                    case "saltar":
                        self.procesarSalto(self.chara);
                        break;
                    case "golpear":
                        self.procesarGolpeo(self.chara);
                        break;
                    default:
                        return;
                }

            }
            );
        },
        procesarPause: function () {
            if (this.estado == "play")
            {
                this.estado = "pause";
                this.reproducirEfectoDeSonido("pause");
                this.contextManager.mostrarMensaje("PAUSE", 300, 250, 50);
                this.musica.elemento.pause();

            }
            else
            {
                this.estado = "play";
                this.regenerarEfectoDeSonido("pause");

                this.contextManager.borraCanvas();
                this.repintar();

                this.musica.elemento.loop = true;
                this.musica.elemento.play();
            }

        },
        procesarSalto: function (elemento) {
            if (elemento.status == "" && this.estado == "play")
            {
                elemento.status = "saltando";
                elemento.ciclos = 1;
            }

        },
        procesarGolpeo: function (elemento) {

            if (elemento.status == "" && this.estado == "play")
            {
                elemento.status = "golpeando";
                elemento.ciclos = 1;
            }
        },
        recalcular: function (elemento) {

            switch (elemento.status)
            {
                case "":
                case "dePie":

                    this.estarDePie(elemento);
                    break;

                case "saltando":
                    this.saltar(elemento);
                    break;

                case "golpeando":
                    //console.debug(this.chara);
                    this.golpear(elemento);
                    break;

                default:
                    return;


            }
            this.chara.yImagen = this.chara.filasImagen[this.chara.status] * this.chara.altoImagen;
        },
        estarDePie: function (elemento) {
            if (elemento.ciclos == this.CICLOS_PARA_CAMBIO_DE_SPRITE)
            {
                elemento.xImagen = (elemento.xImagen + elemento.anchoImagen) % elemento.anchoTotalImagen[elemento.status];
                elemento.status = "dePie";
                elemento.ciclos = 0;
            }
            else
            {
                elemento.status = "";
                elemento.ciclos += 1;
            }
        },
        saltar: function (elemento) {

            if (elemento.ciclos == 1)
                this.reproducirEfectoDeSonido("saltar");
            elemento.xImagen = 0;
            if (elemento.ciclos <= this.CICLOS_TOTALES_SALTO / 2)
            {
                elemento.y -= 2;
            }
            else
            {
                if (elemento.ciclos <= this.CICLOS_TOTALES_SALTO)
                {
                    elemento.y += 2;
                }
            }
            if (elemento.ciclos == this.CICLOS_TOTALES_SALTO)
            {
                elemento.status = "";
                elemento.ciclos = 1;
                this.regenerarEfectoDeSonido("saltar");
            }
            else
            {
                elemento.ciclos++;
            }
        },
        golpear: function (elemento) {

            if (elemento.ciclos == 1)
                elemento.xImagen = 0;
//        //console.debug(elemento);
            if (elemento.ciclos % this.CICLOS_PARA_CAMBIO_DE_SPRITE_EN_GOLPEO == 0)
            {
                elemento.xImagen = (elemento.xImagen + elemento.anchoImagen) % elemento.anchoTotalImagen[elemento.status];
                elemento.status = "golpeando";
                elemento.ciclos += 1;
            }
            else
            {
                elemento.status = "golpeando";
                elemento.ciclos += 1;
            }
            if (elemento.ciclos == this.CICLOS_PARA_CAMBIO_DE_SPRITE_EN_GOLPEO * this.NUMERO_IMAGENES_GOLPEO)
            {
                elemento.status = "";
                elemento.ciclos = 0;
                elemento.xImagen = 0;
            }



















        },
        Timer: function (actualizar, rate, thisArg) {

            var lastNow = null,
                    rate = rate || (500 / 60),
                    thisArg = thisArg || null,
                    self = this,
                    requestId = null;

            var raf = function (now) {

                if (lastNow === null) {
                    lastNow = now;
                }

                if (now - lastNow >= rate) {
                    actualizar.call(thisArg, (now - lastNow) / rate);
                }

                lastNow = now;

                requestId = window.requestAnimationFrame(raf);

            }

            this.start = function () {


                requestId = window.requestAnimationFrame(raf);

            };

            this.stop = function () {

                if (requestId !== null) {
                    window.cancelAnimationFrame(requestId);
                    requestId = null;
                }

            };

            this.destroy = function () {

                this.stop();

                try {
                    return true;
                } finally {
                    raf = null;
                    thisArg = null;
                    lastNow = null;
                    requestId = null;
                    self = null;
                }

            }

        }



    });

    return Base;


});


