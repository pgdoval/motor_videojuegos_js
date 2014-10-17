define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var ContextManager = Backbone.View.extend({
        canvas: null,
        contexto: null,
        init: function (canvas) {
            //console.log(canvas);
            this.canvas = canvas;
            this.contexto = canvas.getContext("2d");
        },
        //Pintar y borrar del canvas



        dibujar: function (elemento) {
            this.contexto.drawImage(elemento.imagen, elemento.xImagen, elemento.yImagen, elemento.anchoImagen, elemento.altoImagen, elemento.x, elemento.y, elemento.anchoOcupado, elemento.altoOcupado);
        },
        borraRecuadro: function (elemento) {
            this.contexto.clearRect(elemento.x, elemento.y - 2, elemento.anchoOcupado, elemento.altoOcupado + 4);
        },
        borraCanvas: function () {
            this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        mostrarMensaje: function (mensaje, x, y, tamanoLetra) {
            this.contexto.font = tamanoLetra + "px Arial";
            var gradient = this.contexto.createLinearGradient(0, 0, this.canvas.width, 0);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");

            this.contexto.fillStyle = gradient;
            this.contexto.fillText(mensaje, x, y);


        }
    });
    return ContextManager;
});


