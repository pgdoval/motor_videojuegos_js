$(document).ready(function () {


    start();

});

var JUMP_TOTAL_FRAMES=30;

var context, drawingCanvas, chara, rafTimer, background;

function createChara() {

    var charaImage = new Image();

    charaImage.src = "img/chara.png";

    chara = {
        sizeX: 10,
        sizeY: 10,
        x: 20,
        y: 61,
        image: charaImage,
        status: ""
    };

}

function createBackground() {
    var charaImage = new Image();

    charaImage.src = "img/mario_bg.jpg";

    background = {
        sizeX: 127,
        sizeY: 63,
        x: 0,
        y: 0,
        image: charaImage
    };
}



function start() {

    drawingCanvas = $('canvas.game')[0];

    events = [];

    context = drawingCanvas.getContext("2d");

    createChara();
  //  createBackground();

    chara.image.onload = function () {
        drawThing(chara);
    }

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
    context.clearRect(thing.x, thing.y, thing.sizeX, thing.sizeY);

}
;


function drawThing(thing) {
//    var pattern = context.createPattern(thing.image, "no-repeat");
//    context.clearRect(0, 0, canvas.width, canvas.height);
//    context.fillStyle = pattern;
//    context.fillRect(0, 0, canvas.width, canvas.height);
//    context.fill();

    context.drawImage(thing.image, thing.x, thing.y, thing.sizeX, thing.sizeY);

}
;

function lookForEvents() {
    var self = this;
    $(document).on('keyup', function (e) {
        e.preventDefault();
        if (self.chara.status != "")
        {
            return;
        }
        if (e.which == 32) {

//                   var index = Math.round(Math.random() * (self.swimmingSounds.length - 1));
//                    self.swimmingSounds[index].play();


            self.chara.status = "jumping";
            self.chara.frames = 1;

            /*if (self.guy.phrase.alpha == 0) {
             self.guy.phrase.alpha = 1;
             self.guy.phrase.scale = 0;
             }*/
        }
    }
    );
}


function update() {
    clearChara();
    recalcChara();



//    drawThing(background);
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
            return;

        case "jumping":
            jump(chara);
            break;

        default:
            return;


    }
}

function jump(thing) {

    if (thing.frames <= JUMP_TOTAL_FRAMES/2)
    {
        thing.y -= 1;
    }
    else
    {
        if (thing.frames <= JUMP_TOTAL_FRAMES)
        {
            thing.y += 1;
        }
    }
    if(thing.frames == JUMP_TOTAL_FRAMES)
    {
        thing.status = "";
        thing.frames = 1;
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

