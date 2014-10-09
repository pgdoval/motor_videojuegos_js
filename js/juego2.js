

var Juego2 = Base.extend({
    FRAMES_FOR_HIT_SPRITE_CHANGE:10,
    HIT_SPRITE_LENGTH:5,
    music: {
        url: "sounds/theme.mp3"
    },
    sound_effects: {
        "pause": "sounds/pause.wav",
        "jump": "sounds/jump.wav"
    },
    crearChara: function () {

        var charaImage = new Image();
        
        charaImage.src = "img/rafa1.png";

        chara = {
            sx: 0,
            sy: 0,
            x: 120,
            y: 230,
            sheight: 2592,
            swidth: 1456,
            height: 256,
            width: 146,
            rows: {
                "": 0,
                "standing": 0,
                "hitting": 1
            },
            totalWidth: {
                "": 1456 * 4,
                "running": 1456 * 4,
                "hitting": 1456 * 5
            },
            image: charaImage,
            status: "",
            frames: 0
        };

    },
    createEnemy: function () {
        var charaImage = new Image();

        charaImage.src = "img/pablo1.png";

        this.enemy = {
            sx: 0,
            sy: 0,
            x: 570,
            y: 240,
            sheight: 2592,
            swidth: 1456,
            height: 256,
            width: 146,
            rows: {
                "": 0,
                "standing": 0
            },
            totalWidth: {
                "": 1456 * 4,
                "running": 1456 * 4
            },
            image: charaImage,
            status: "",
            frames: 0
        }

    },
    events: {
        13: "pause",
        32: "hit"
    }
});

var appView = new Juego2();




