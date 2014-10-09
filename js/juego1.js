

var Juego1 = Base.extend({

crearChara: function() {

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

});

var appView = new Juego1();




