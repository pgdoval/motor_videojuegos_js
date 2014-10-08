

var Juego1 = Base.extend({
});

var appView = new Juego1();

function start() {
    contexto = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    crearChara();
    
    chara.image.onload = function () {
        drawThing(chara);
    }

    estado = "play";
}

function crearChara() {

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


