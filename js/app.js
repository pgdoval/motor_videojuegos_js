define([
  'jquery', 
  'underscore', 
  'backbone',
  'juego1' // Cogemos el juego que queremos
], function($, _, Backbone, Juego){
  var init= function(){

    new Juego().init();
  };

  return { 
      
    init: init
  };
});
