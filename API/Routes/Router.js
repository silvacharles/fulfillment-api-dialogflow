'use strict';
var express = require('express');
module.exports = function(app) {
  var gameDataController = require('../Controllers/GameDataController');
var apiRoutes =  express.Router();
app.get('/',function(req,res){
    res.send('API Webhook do Dialogflow está rodando com sucesso!');
  });
// registrando a rota
  app.route('/')
    .post(gameDataController.processRequest);
};