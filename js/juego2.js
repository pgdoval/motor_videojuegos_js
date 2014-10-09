

var Juego2 = Base.extend({
    FRAMES_FOR_HIT_SPRITE_CHANGE: 10,
    HIT_SPRITE_LENGTH: 5,
    music: {
        url: "sounds/theme.wav"
    },
    sound_effects: {
        "pause": "sounds/pause.wav",
        "jump": "sounds/jump.wav"
    },
    sleep: function (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {

                break;
            }
        }
    },
    clearAndPrint: function (i, messages) {
        var self = this;
        var intro_wait = 1000;

        if (i < 3)
            window.setTimeout(function () {
                self.clearScreen();
                console.debug(new Date().getTime());
                self.showMessage(messages[i], 350, 200, 100);
                self.clearAndPrint(i + 1, messages);
            }

            , intro_wait);
    },
    intro: function () {
//        var messages = ["3", "2", "1", "FIGHT!"];
//        var self = this;
//
//        this.clearAndPrint(0, messages);
//        this.clearScreen();
        
        
//        var intro_wait = 400;
//
//        this.showMessage("3", 350, 200, 100);
//        this.sleep(intro_wait);
//        console.debug(new Date().getTime());
//        this.clearScreen();
//        
//        this.showMessage("2", 350, 200, 100);
//        this.sleep(intro_wait);
//        console.debug(new Date().getTime());
//        this.clearScreen();
//        
//        this.showMessage("1", 350, 200, 100);
//        this.sleep(intro_wait);
//        console.debug(new Date().getTime());
//        this.clearScreen();
//        
//        this.showMessage("FIGHT!", 350, 200, 80);
//        this.sleep(intro_wait);
//        console.debug(new Date().getTime());
//        this.clearScreen();


    },
    crearChara: function () {

        var charaImage = new Image();
        charaImage.src = "img/player1.png";
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
        charaImage.src = "img/player2.png";
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




