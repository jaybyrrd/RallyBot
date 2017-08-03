//
// result.js for result in /Users/leandr_g/Documents/perso/tmp/RallyBot/requests/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Wed Aug  2 05:53:57 2017 Gaëtan Léandre
// Last update Wed Aug  2 21:33:00 2017 Gaëtan Léandre
//

var user = require('../schemas/user.js');
var game = require('../schemas/game.js');
var vote = require('../schemas/vote.js');
var cardGame = require('../schemas/cardGame.js');
var yelpManager = require('../managers/yelpManager.js');
var ObjectId = require('mongoose').Types.ObjectId;

function compareNombres(a, b) {
    if (b.percent == a.percent)
        return ((b.up + b.down) - (a.up + a.down));
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
                            var counter = 0;
                            var elements = [];
                            function findCards(cardNum){
                                vote.find({'card': cardGames[cardNum].card}, function(err, votes){
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
                                            'name': cardGames[cardNum].card.name,
                                            'yelpId': cardGames[cardNum].card.yelpId,
                                            'up': up,
                                            'down': down,
                                            'percent': (up / (up + down) * 100.0)
                                        });
                                    }

                                    counter = counter + 1;
                                    if(counter >= cardGames.length){
                                        finish();
                                    }
                                });
                            }

                            for (var i = 0; i < cardGames.length;i++)
                            {
                                findCards(i);
                                // vote.find({'card': cardGames[i].card}, function(err, votes){
                                //     if (votes)
                                //     {
                                //         var up = 0;
                                //         var down = 0;
                                //         for (var j = 0; j < votes.length ; j++)
                                //         {
                                //             if (votes[j].choice == 0)
                                //                 down++;
                                //             else if (votes[j].choice == 1)
                                //                 up++;
                                //         }
                                //         cardsScore.push({
                                //             'name': cardGames[i].card.name,
                                //             'yelpId': cardGames[i].card.yelpId,
                                //             'up': up,
                                //             'down': down,
                                //             'percent': (up / (up + down) * 100.0)
                                //         });
                                //     }
                                // });
                            }
                            function finish(){
                                counter = 0;
                                cardsScore.sort(compareNombres);
                                var elements = [];

                                function addElement(cardNumber)
                                {
                                    yelpManager.getInfoYelp(cardsScore[cardNumber].yelpId).then(function(resto)
                                    {
                                        console.log(cardsScore[cardNumber]);
                                        elements.push({
                                                        "title": resto.name,
                                                        "image_url": resto.photos[0],
                                                        "subtitle": 'votes : ' + cardsScore[cardNumber].up + '/' + (cardsScore[cardNumber].up + cardsScore[cardNumber].down) + ' ' + cardsScore[cardNumber].percent + '% of your friends whant to go to this place.',
                                                        "buttons": [{
                                                            "type":"web_url",
                                                            "url":resto.url,
                                                            "title":"Visite website"
                                                        }]
                                                    });
                                        console.log(elements);
                                        counter++;
                                        if (counter >= 5 || counter >= cardsScore.length)
                                            sendAnser(elements);
                                    }).fail(function(){
                                        counter++;
                                        if (counter >= 5 || counter >= cardsScore.length)
                                            sendAnser(elements);
                                    });
                                }
                                for (var j = 0; j < 5 && j < cardsScore.length;j++)
                                {
                                    addElement(j);
                                }
                            }
                            function sendAnser(elements2) {
                                console.log(elements2);
                                callback(200, {
                                    "messages": [
                                        {
                                            "attachment":{
                                                "type":"template",
                                                "payload":{
                                                    "template_type":"generic",
                                                    "elements": elements2
                                                }
                                            }
                                        }
                                    ]
                                });
                            }
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
