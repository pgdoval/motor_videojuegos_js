$(document).ready(function () {


    start();

});

var JUMP_TOTAL_FRAMES = 60;
var FRAMES_FOR_SPRITE_CHANGE = 4;

var context, drawingCanvas, chara, rafTimer, background, gameStatus;

var enemy_type_goomba = {
    "image": "img/goomba.png",
    "mtth": 10 //segundos
}

var sound_effects = {
    "pause": "sounds/pause.wav",
    "jump": "sounds/jump.wav"
}

var playable_sound_effects = {};

function createSoundEffects() {

    for (var effect in sound_effects)
        playable_sound_effects[effect] = createAudio(sound_effects[effect], effect);
}

function createChara() {

    var charaImage = new Image();

    charaImage.src = "img/sonic.png";

    chara = {
        sx: 0,
        sy: 0,
        x: 120,
        y: 388,
        sheight: 30,
        swidth: 24,
        height: 60,
        width: 48,
        rows: {
            "": 0,
            "running": 0,
            "jumping": 1
        },
        totalWidth: {
            "": 24 * 7,
            "running": 24 * 7,
            "jumping": 24
        },
        image: charaImage,
        status: "",
        frames: 0
    };

}



function start() {

    drawingCanvas = $('canvas.game')[0];

    events = [];

    context = drawingCanvas.getContext("2d");


    drawingCanvas.width = window.innerWidth;
    drawingCanvas.height = window.innerHeight;
    drawingCanvas.style.width = drawingCanvas.width.toString() + "px";
    drawingCanvas.style.height = drawingCanvas.height.toString() + "px";


    createChara();
    createSoundEffects();

    chara.image.onload = function () {
        drawThing(chara);
    }

    gameStatus = "play";

//    background.image.onload = function () {
//        drawThing(background);
//    }


    console.debug(chara);

//    drawHorizontalLine(40);

//    drawThing(chara);

    lookForEvents();

    this.rafTimer = new Timer(this.update, 60 / 60, this);
    this.rafTimer.start();







}

function clearThing(thing) {
    context.clearRect(thing.x, thing.y - 5, thing.width + 1, thing.height + 10);

}
;


function drawThing(thing) {
//    var pattern = context.createPattern(thing.image, "no-repeat");
//    context.clearRect(0, 0, canvas.width, canvas.height);
//    context.fillStyle = pattern;
//    context.fillRect(0, 0, canvas.width, canvas.height);
//    context.fill();

    context.drawImage(thing.image, thing.sx, thing.sy, thing.swidth, thing.sheight, thing.x, thing.y, thing.width, thing.height);

    //, thing.x, thing.y, thing.width, thing.height);
    //thing.sizeX, thing.sizeY);

}

function createAudio(url, name) {
    var audio = document.createElement('audio');
    //console.log('cargando "' + src + '"');
    audio.src = url;
    audio.preload = 'auto';
    return audio;
}

function showMessage(message, x, y, size) {
    context.font = size+"px Arial";
    var gradient = context.createLinearGradient(0, 0, drawingCanvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
// Fill with gradient
    context.fillStyle = gradient;
    context.fillText(message, x, y);


}

function playSoundEffect(sound) {
    var effect = playable_sound_effects[sound];
//    effect.loop=false;
    console.debug(effect);
    effect.play();
}

function regenSoundEffect(sound) {
    playable_sound_effects[sound] = createAudio(sound_effects[sound], sound);
}

function lookForEvents() {
    var self = this;
    $(document).on('keyup', function (e) {
        e.preventDefault();

        if (e.which == 13)//enter--pause
        {
            if (gameStatus == "play")
            {
                gameStatus = "pause";
                playSoundEffect("pause");
                showMessage("PAUSE",300,250,50);


            }
            else
            {
                gameStatus = "play";
                regenSoundEffect("pause");
                context.clearRect(0,0,drawingCanvas.width,drawingCanvas.height);
                repaint();
            }
        }

        if (self.chara.status == "" && gameStatus == "play")
        {

            if (e.which == 32) {

                self.chara.status = "jumping";
                self.chara.frames = 1;

            }
        }
    }
    );
}


function update() {
    if (gameStatus == "play")
    {

        recalcChara();
        if (chara.status != "")
        {
            clearChara();
            paintChara();
        }
    }
}

function repaint(){
    paintChara();
}

function paintChara() {
    drawThing(chara);
}

function clearChara() {
    clearThing(chara);
}

function recalcChara() {
    switch (chara.status)
    {
        case "":
        case "running":

            run(chara);
            break;

        case "jumping":
            jump(chara);
            break;

        default:
            return;


    }
    chara.sy = chara.rows[chara.status] * chara.sheight;
}


function run(thing) {
    if (thing.frames == FRAMES_FOR_SPRITE_CHANGE)
    {
        thing.sx = (thing.sx + thing.swidth) % thing.totalWidth[thing.status];
        thing.status = "running";
        thing.frames = 0;
    }
    else
    {
        thing.status = "";
        thing.frames += 1;
    }
}

function jump(thing) {

    if (thing.frames == 1)
        playSoundEffect("jump");
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
        regenSoundEffect("jump");
    }
    else
    {
        thing.frames++;
    }




}



var Timer = function (update, rate, thisArg) {

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

};



