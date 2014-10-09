var canvas, contexto, chara, estado;


var Base = Backbone.View.extend({
    conMusica: true,
    CICLOS_PARA_CAMBIO_DE_SPRITE: 15,
    CICLOS_TOTALES_SALTO: 60,
    el: $('#canvas'),
    enemigo: null,
    initialize: function () {
        this.render();
    },
    render: function () {
        canvas = this.$el[0];
        this.start();

    },
    start: function () {
        var self = this;
        canvas = $('canvas')[0];

        contexto = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = canvas.width.toString() + "px";
        canvas.style.height = canvas.height.toString() + "px";


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


        chara.imagen.onload = function () {

            self.dibujar(chara);
        }

        if (this.enemigo != null)
            this.enemigo.imagen.onload = function () {
                self.dibujar(self.enemigo);
            }

        estado = "play";

        this.escucharEventos();

        var timer = new this.Timer(this.actualizar, 60 / 60, this);
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
    //Pintar y borrar del canvas



    dibujar: function (elemento) {
        contexto.drawImage(elemento.imagen, elemento.xImagen, elemento.yImagen, elemento.anchoImagen, elemento.altoImagen, elemento.x, elemento.y, elemento.anchoOcupado, elemento.altoOcupado);
    },
    borraRecuadro: function (elemento) {
        contexto.clearRect(elemento.x, elemento.y - 2, elemento.anchoOcupado, elemento.altoOcupado + 4);
    },
    borraCanvas: function () {
        contexto.clearRect(0, 0, canvas.width, canvas.height);
    },
    //Funciones cómodas que pintan en base a las anteriores



    repintar: function () {
        this.pintaChara();
        this.pintaEnemigo();
    },
    pintaChara: function () {
        this.dibujar(chara);
    },
    pintaEnemigo: function () {
        if (this.enemigo != null)
            this.dibujar(this.enemigo);
    },
    //La función que se llama cada pocos milisegundos



    actualizar: function () {
        this.actualizarElemento(chara);
        if (this.enemigo != null)
            this.actualizarElemento(this.enemigo);
    },
    actualizarElemento: function (elemento) {
        if (estado == "play")
        {

            this.recalcular(elemento);
            if (chara.status != "")
            {
                this.borraRecuadro(elemento);
                this.dibujar(elemento);
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
                    self.procesarSalto(chara);
                    break;
                case "golpear":
                    self.procesarGolpeo(chara);
                    break;
                default:
                    return;
            }

        }
        );
    },
    procesarPause: function () {
        if (estado == "play")
        {
            estado = "pause";
            this.reproducirEfectoDeSonido("pause");
            this.mostrarMensaje("PAUSE", 300, 250, 50);
            this.musica.elemento.pause();

        }
        else
        {
            estado = "play";
            this.regenerarEfectoDeSonido("pause");

            this.borraCanvas();
            this.repintar();

            this.musica.elemento.loop = true;
            this.musica.elemento.play();
        }

    },
    mostrarMensaje: function (mensaje, x, y, tamanoLetra) {
        contexto.font = tamanoLetra + "px Arial";
        var gradient = contexto.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");

        contexto.fillStyle = gradient;
        contexto.fillText(mensaje, x, y);


    },
    procesarSalto: function (elemento) {
        if (elemento.status == "" && estado == "play")
        {
            elemento.status = "saltando";
            elemento.ciclos = 1;
        }

    },
    procesarGolpeo: function (elemento) {

        if (elemento.status == "" && estado == "play")
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
                //console.debug(chara);
                this.golpear(elemento);
                break;

            default:
                return;


        }
        chara.yImagen = chara.filasImagen[chara.status] * chara.altoImagen;
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
                rate = rate || (1000 / 60),
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


