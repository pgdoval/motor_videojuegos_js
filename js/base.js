var canvas, contexto, chara, estado;

var Base = Backbone.View.extend({
    el: $('#canvas'),
    initialize: function() {
        this.render();
    },
    render: function() {
        canvas = this.$el[0];
        start();

    }
});

function drawThing(thing) {
    contexto.drawImage(thing.image, thing.sx, thing.sy, thing.swidth, thing.sheight, thing.x, thing.y, thing.width, thing.height);
}


