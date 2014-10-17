define([
  'jquery', 
  'underscore', 
  'backbone',
  'juego1' // Cogemos el juego que queremos
], function($, _, Backbone, Juego){
  var initialize = function(){
    new Juego().initialize();
  };

  return { 
    initialize: initialize
  };
});
