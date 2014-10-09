var canvas, contexto, chara, estado, timer;

var JUMP_TOTAL_FRAMES = 60;
var FRAMES_FOR_SPRITE_CHANGE = 4;

var Base = Backbone.View.extend({
    el: $('#canvas'),
    initialize: function () {
        this.render();
    },
    render: function () {
        canvas = this.$el[0];
        this.start();

    },
    drawThing: function (thing) {
        contexto.drawImage(thing.image, thing.sx, thing.sy, thing.swidth, thing.sheight, thing.x, thing.y, thing.width, thing.height);
    },
    clearThing: function (thing) {
        contexto.clearRect(thing.x, thing.y - 5, thing.width + 1, thing.height + 10);
    },
    start: function () {
        var self = this;
        canvas = $('canvas')[0];
        console.debug(canvas);

        events = [];

        contexto = canvas.getContext("2d");


        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = canvas.width.toString() + "px";
        canvas.style.height = canvas.height.toString() + "px";


        this.crearChara();
        this.createSoundEffects();
        this.music.object = this.createAudio(this.music.url, "", true);

        chara.image.onload = function () {

            self.drawThing(chara);
        }

        estado = "play";
        this.music.object.play();

//    background.image.onload = function () {
//        drawThing(background);
//    }



//    drawHorizontalLine(40);

//    drawThing(chara);

        this.lookForEvents();

        var timer = new this.Timer(this.update, 60 / 60, this);
        timer.start();

    },
    playable_sound_effects: {},
    createSoundEffects: function () {

        for (var effect in this.sound_effects)
            this.playable_sound_effects[effect] = this.createAudio(this.sound_effects[effect], effect, false);
    },
    createAudio: function (url, name, loopable) {
        var audio = document.createElement('audio');
        //console.log('cargando "' + src + '"');
        audio.src = url;
        audio.preload = 'auto';
        audio.loop = loopable;
        return audio;
    },
    showMessage: function (message, x, y, size) {
        contexto.font = size + "px Arial";
        var gradient = contexto.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
// Fill with gradient
        contexto.fillStyle = gradient;
        contexto.fillText(message, x, y);


    },
    playSoundEffect: function (sound) {
        var effect = this.playable_sound_effects[sound];
//    effect.loop=false;
        console.debug(effect);
        effect.play();
    },
    regenSoundEffect: function (sound) {
        this.playable_sound_effects[sound] = this.createAudio(this.sound_effects[sound], sound, false);
    },
    processPause: function () {
        if (estado == "play")
        {
            estado = "pause";
            this.playSoundEffect("pause");
            this.showMessage("PAUSE", 300, 250, 50);
            this.music.object.pause();

        }
        else
        {
            estado = "play";
            this.regenSoundEffect("pause");
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            this.repaint();
            this.music.object.loop = true;
            this.music.object.play();
        }

    },
    processJump: function () {
        if (chara.status == "" && estado == "play")
        {
            chara.status = "jumping";
            chara.frames = 1;
        }

    },
    lookForEvents: function () {
        var self = this;
        $(document).on('keyup', function (e) {
            e.preventDefault();

            //obtenemos la función a ejecutar
            var fn = self.events[e.which];
            //esto con require lo podríamos encapsular mejor
            switch (fn)
            {
                case "pause":
                    self.processPause();
                    break;
                case "jump":
                    self.processJump();
                    break;
                default:
                    return;
            }

//            if (e.which == 13)//enter--pause
//            {
//                self.processPause();
//            }
//
//            if (e.which == 32) {
//                self.processJump();
//            }
        }
        );
    },
    update: function () {
        if (estado == "play")
        {

            this.recalcChara();
            if (chara.status != "")
            {
                this.clearChara();
                this.paintChara();
            }
        }
    },
    repaint: function () {
        this.paintChara();
    },
    paintChara: function () {
        this.drawThing(chara);
    },
    clearChara: function () {
        this.clearThing(chara);
    },
    recalcChara: function () {
        switch (chara.status)
        {
            case "":
            case "standing":

                this.stand(chara);
                break;

            case "jumping":
                this.jump(chara);
                break;

            default:
                return;


        }
        chara.sy = chara.rows[chara.status] * chara.sheight;
    },
    stand: function (thing) {
        if (thing.frames == FRAMES_FOR_SPRITE_CHANGE)
        {
            thing.sx = (thing.sx + thing.swidth) % thing.totalWidth[thing.status];
            thing.status = "standing";
            thing.frames = 0;
        }
        else
        {
            thing.status = "";
            thing.frames += 1;
        }
    },
    jump: function (thing) {

        if (thing.frames == 1)
            this.playSoundEffect("jump");
        thing.sx = 0;
        if (thing.frames <= JUMP_TOTAL_FRAMES / 2)
        {
            thing.y -= 2;
        }
        else
        {
            if (thing.frames <= JUMP_TOTAL_FRAMES)
            {
                thing.y += 2;
            }
        }
        if (thing.frames == JUMP_TOTAL_FRAMES)
        {
            thing.status = "";
            thing.frames = 1;
            this.regenSoundEffect("jump");
        }
        else
        {
            thing.frames++;
        }




    },
    Timer: function (update, rate, thisArg) {

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
                update.call(thisArg, (now - lastNow) / rate);
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


