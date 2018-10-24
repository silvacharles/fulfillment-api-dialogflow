'use strict';
var mongoose = require('mongoose');
var TeamInfo = mongoose.model('TeamInfo');
var GameSchedule = mongoose.model('GameSchedule');
var CarroInfo = mongoose.model('CarroInfo');

// actions setadas no Dialogflow
exports.processRequest = function(req, res) {
if (req.body.result.action == "agenda") {
    getTeamSchedule(req,res)
  }
  else if (req.body.result.action == "falar-sobre")
  {
      getTeamInfo(req,res)
  }
  else if (req.body.result.action == "carros")
  {
      getCarro(req,res)
  }
};

// função pega carro no mongo
function getCarro(req,res)
{
let carroToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.carro ? req.body.result.parameters.carro : 'Unknown'; 
CarroInfo.findOne({nome:carroToSearch}, function(err,carrosExists)
  {
    if (err)
    {
      return res.json({
        speech: "Algo deu errado!",
        displayText: "Algo deu errado"
      });
    }
      if (carrosExists)
      {
        return res.json({
          speech: carrosExists.desc,
          displayText: carrosExists.nome,
          url: carrosExists.urlFoto,
          source: 'carros info'
        });
      }
      else {
        return res.json({
              speech: 'Atualmente não estou tendo informações sobre esse carro',
              displayText: 'Atualmente não estou tendo informações sobre esse carro',
              source: 'carros info'
          });
      }
    });
}
// pega inforamações do time
function getTeamInfo(req,res)
{
let teamToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.team ? req.body.result.parameters.team : 'Unknown';
TeamInfo.findOne({name:teamToSearch},function(err,teamExists)
      {
        if (err)
        {
          return res.json({
              speech: 'Algo deu errado!',
              displayText: 'Algo deu errado!',
              source: 'team info'
          });
        }
if (teamExists)
        {
          return res.json({
                speech: teamExists.description,
                displayText: teamExists.description,
                source: 'team info'
            });
        }
        else {
          return res.json({
                speech: 'Atualmente não estou tendo informações sobre esse time',
                displayText: 'Atualmente não estou tendo informações sobre esse time',
                source: 'team info'
            });
        }
      });
}
// pega agenda ultimos jogos
function getTeamSchedule(req,res)
{
let parameters = req.body.result.parameters;
    if (parameters.team1 == "")
    {
      let game_occurence = parameters.game_occurence;
      let team = parameters.team;
      if (game_occurence == "previous")
      {
        // ultimo jogo
        GameSchedule.find({opponent:team},function(err,games)
        {
          if (err)
          {
            return res.json({
                speech: 'Algo deu errado!',
                displayText: 'Algo deu errado!',
                source: 'game schedule'
            });
          }
          if (games)
          {
            var requiredGame;
            for (var i=0; i < games.length; i++)
            {
                var game = games[i];
var convertedCurrentDate = new Date();
                var convertedGameDate = new Date(game.date);
if (convertedGameDate > convertedCurrentDate)
                {                  
                  if(games.length > 1)
                  {
                    requiredGame = games[i-1];
var winningStatement = "";
                    if (requiredGame.isWinner)
                    {
                        winningStatement = "Kings venceu esta partida por "+requiredGame.score;
                    }
                    else {
                      winningStatement = "Kings perdeu este jogo com "+requiredGame.score;
                    }
                    return res.json({
                        speech: 'Último jogo entre reis e '+parameters.team+' foi jogado em '+requiredGame.date+' .'+winningStatement,
                        displayText: 'Último jogo entre reis e '+parameters.team+' foi jogado em '+requiredGame.date+' .'+winningStatement,
                        source: 'game schedule'
                    });
                    break;
                  }
                  else {
                    return res.json({
                        speech: 'Não é possível encontrar nenhum jogo anterior entre Kings e '+parameters.team,
                        displayText: 'Não é possível encontrar nenhum jogo anterior entre Kings e '+parameters.team,
                        source: 'game schedule'
                    });
                  }
                }
            }
}
});
      }
      else {
        return res.json({
            speech: 'Os próximos horários dos jogos estarão disponíveis em breve',
            displayText: 'Os próximos horários dos jogos estarão disponíveis em breve',
            source: 'game schedule'
        });
      }
    }
    else {
      return res.json({
          speech: 'Não posso lidar com as consultas com duas equipes agora. Vou me atualizar',
          displayText: 'Não posso lidar com as consultas com duas equipes agora. Vou me atualizar',
          source: 'game schedule'
      });
    }
  }