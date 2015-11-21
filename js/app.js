define([
    'jquery',
    'underscore',
    'backbone',
    'juegos/juego2' // Cogemos el juego que queremos
], function ($, _, Backbone, Juego) {
    var init = function () {

        var j = new Juego();
        j.init();
    };

    return {
        init: init
    };
});
