//
// result.js for result in /Users/leandr_g/Documents/perso/tmp/RallyBot/requests/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Wed Aug  2 05:53:57 2017 Gaëtan Léandre
// Last update Wed Aug  2 20:29:25 2017 Gaëtan Léandre
//

var user = require('../schemas/user.js');
var game = require('../schemas/game.js');
var vote = require('../schemas/vote.js');
var cardGame = require('../schemas/cardGame.js');
var yelpManager = require('../managers/yelpManager.js');
var ObjectId = require('mongoose').Types.ObjectId;

function compareNombres(a, b) {
  return b.percent - a.percent;
}

exports.getResult = function(facebookId, gameId, callback)
{
    if (facebookId != undefined && gameId != undefined)
    {
        user.find({'facebookId': facebookId}, function(err, peoples)
	    {
            if (peoples.length > 0)
            {
                game.find({'_id': ObjectId(gameId)}, function(err, games)
                {
                    if (games.length > 0)
                    {
                        cardGame.find({'game': ObjectId(gameId)}).populate('card').exec(function(err, cardGames){
                            var cardsScore = [];
                            for (var i = 0; i < cardGames.length;i++)
                            {
                                console.log(i);
                                vote.find({'card': cardGames[i].card}, function(err, votes){
                                    if (votes)
                                    {
                                        var up = 0;
                                        var down = 0;
                                        for (var j = 0; j < votes.length ; j++)
                                        {
                                            if (votes[j].choice == 0)
                                                down++;
                                            else if (votes[j].choice == 1)
                                                up++;
                                        }
                                        cardsScore.push({
                                            'name': cardGames[i].card.name,
                                            'yelpId': cardGames[i].card.yelpId,
                                            'up': up,
                                            'down': down,
                                            'percent': (up / (up + down) * 100.0)
                                        });
                                    }
                                });
                            }
                            cardsScore.sort(compareNombres);
                            var elements = [];
                            for (var j = 0; j < 5 && j < cardsScore.length;j++)
                            {
                                yelpManager.getInfoYelp(cardsScore[j].yelpId).then(function(resto)
                                {
                                    elements.push({
                                                    "title": resto.name,
                                                    "image_url": resto.photos[0],
                                                    "subtitle": cardsScore.up + '/' + (cardsScore.up + cardsScore.down) + ' ' + cardsScore.percent + '%',
                                                    "buttons": [{
                                                        "type":"web_url",
                                                        "url":resto.url,
                                                        "title":"Visite website"
                                                    }]
                                                });
                                });
                            }
                            callback(200, {
                                "messages": [
                                    {
                                        "attachment":{
                                            "type":"template",
                                            "payload":{
                                                "template_type":"generic",
                                                "elements": elements
                                            }
                                        }
                                    }
                                ]
                            });
                        });
                    }
                    else
                        callback(404, {'response':"Can't found game",'res':false});
                });
            }
            else
                callback(403, {'response':"Connection denied",'res':false});
        });
    }
    else
        callback(206, {'response':"Missing parameters",'res':false});
}
