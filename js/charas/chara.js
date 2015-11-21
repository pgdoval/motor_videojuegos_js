define([
    'jquery',
    'underscore',
    'backbone',
    'juegos/base'
], function ($, _, Backbone, Base) {

    var Chara = Backbone.Model.extend({
        xImagen: null,
        yImagen: null,
        x: null,
        y: null,
        altoImagen: null,
        anchoImagen: null,
        altoOcupado: null,
        anchoOcupado: null,
        filasImagen: null,
        anchoTotalImagen: null,
        altoTotalImagen: null,
        imagen: null,
        status: null,
        ciclos: null,
        
  /*      crear: function(rutaImagen, filas, posicion_inicial) {
            var self = this;
            this.imagen = new Image();
            this.imagen.src = rutaImagen;
            
            this.imagen.onload = function () {
                self.xImagen=0;
                self.yImagen=0;
                Base.contextManager.dibujar(self);
            }
            
            
        }
*/


    });


    return Chara;

});