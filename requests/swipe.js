//
// swipe.js for swipe in /Users/leandr_g/Documents/perso/tmp/RallyBot/requests/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 08:14:52 2017 Gaëtan Léandre
// Last update Thu Aug  3 03:43:23 2017 Gaëtan Léandre
//

var user = require('../schemas/user.js');
var card = require('../schemas/card.js');
var game = require('../schemas/game.js');
var vote = require('../schemas/vote.js');
var ObjectId = require('mongoose').Types.ObjectId;

exports.swipe = function(facebookId, yelpId, gameId, swipe, callback)
{
    if (facebookId != undefined && facebookId.length)
    {
        user.find({'facebookId': facebookId}, function(err, peoples)
        {
            if (peoples.length > 0)
            {
                game.find({'_id': ObjectId(gameId)}, function(err, games)
                {
                    if (games.length > 0)
                    {
                        card.find({'yelpId': yelpId}, function(err, cards)
                        {
                            if (cards.length > 0)
                            {
                                vote.findOneAndUpdate({'user': peoples[0]._id, 'card': cards[0]._id, 'game': games[0]._id}, {$set:{'choice':swipe, 'user': peoples[0]._id, 'card': cards[0]._id}}, {upsert: true, new: true}, function(err, votes){
                                    if(!err)
                                        callback(200, { 'response': 'Ok', 'id': facebookId, 'res': true});
                                    else
                                        callback(500, { 'response': 'Internal error', 'res': false});
                                });
                            }
                            else
                                callback(404, {'response':"Card not found",'res':false});
                            return;
                        });
                    }
                    else
                        callback(404, {'response':"Game not found",'res':false});
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
