//
// getCard.js for getCard.js in /Users/leandr_g/Documents/perso/tmp/RallyBot/requests/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 04:58:19 2017 Gaëtan Léandre
// Last update Tue Aug  1 12:00:43 2017 Gaëtan Léandre
//

var game = require('../schemas/game.js');
var user = require('../schemas/user.js');
var card = require('../schemas/card.js');
var vote = require('../schemas/vote.js');
var gameParticipant = require('../schemas/gameParticipant.js');
var ObjectId = require('mongoose').Types.ObjectId;

exports.getCard = function(facebookId, gameId, callback)
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
                        gameParticipant.find({'user': peoples[0]._id, 'game': games[0]._id}, function(err, partic)
                        {
                            if (partic.length > 0)
                            {
                                vote.find({'user': peoples[0]._id}, function(err,votes) {
                                    var done = votes.map(function(el) { return el.card._id } );
                                    card.find({'_id' :{ $in : games[0].cards}, '_id' : {$nin : done}}, function(err, cards) {
                                        if (cards.length > 0)
                                        {
                                            callback(200, {'response':"Ok", 'name': cards[0].name, 'yelpId': cards[0].yelpId, 'res':true});
                                        }
                                        else
                                        {
                                            callback(404, {'response':"No more cards",'res':false});
                                            //NO OLD CARDS -> add some?
                                        }
                                    });
                                });
                            }
                            else
                                callback(403, {'response':"Permission denied",'res':false});
                            return;
                        });
                    }
                    else
                        callback(404, {'response':"Can't found game",'res':false});
                    return;
                });
            }
            else
                callback(403, {'response':"Connection denied",'res':false});
            return;
        });
    }
    else
        callback(206, {'response':"Missing parameters",'res':false});
}
