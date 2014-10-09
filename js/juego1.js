

var Juego1 = Base.extend({
    FRAMES_FOR_SPRITE_CHANGE: 4,
    music: {
        url: "sounds/theme.mp3"
    },
    sound_effects: {
        "pause": "sounds/pause.wav",
        "jump": "sounds/jump.wav"
    },
    crearChara: function () {

        var charaImage = new Image();
        console.debug("j1");
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
                "standing": 0,
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

    },
    enemies: [],
    events: {
        13: "pause",
        32: "jump"
    }
});

var appView = new Juego1();




