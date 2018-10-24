'use strict';
var express  = require('express'),
bodyParser   = require('body-parser'),
http         = require('http'),
config       = require('./Config'),
server       = express(),
mongoose     = require('mongoose'),
CarroInfo    = require('./API/Models/CarroInfo'),
TeamInfo     = require('./API/Models/TeamInfo'), // criando os modelos aqui
GameSchedule = require('./API/Models/GameSchedule');


//  instancia da url de conexão mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl, { useNewUrlParser: true }).then(
    (res) => {
     console.log("Conectado ao banco de dados com sucesso.")
    }
  ).catch(() => {
    console.log("A conexão com o banco de dados falhou.");
  });
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
var routes = require('./API/Routes/Router'); //importando a rota
routes(server); // registrando a rota
server.listen((process.env.PORT || 8000), function () {
    console.log("Servidor está UP e respondendo na porta " + process.env.PORT);
});