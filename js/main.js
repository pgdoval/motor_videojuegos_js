//En este fichero empieza todo.

//Aquí cargamos las librerías y, para el futuro, los templates
require.config({
  paths: {
    jquery: 'libs/jquery/jquery.min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    templates: '../templates'
  },
  shim: {
        underscore: {
          exports: '_'
        },
        backbone: {
          deps:["underscore", "jquery"],
          exports: 'Backbone'
        }
      }

});

//Aquí cargamos el app.js y llamamos a su método initialize
require([
  'app',

], function(App){

  App.initialize();
});