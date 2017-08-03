//
// getGames.js for getGames in /Users/leandr_g/Documents/perso/tmp/RallyBot/requests/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 12:19:29 2017 Gaëtan Léandre
// Last update Tue Aug  1 13:47:34 2017 Gaëtan Léandre
//

var user = require('../schemas/user.js');
var gameParticipant = require('../schemas/gameParticipant.js');
var ObjectId = require('mongoose').Types.ObjectId;

exports.getGames = function(facebookId, callback)
{
    if (facebookId != undefined && facebookId.length)
    {
        user.find({'facebookId': facebookId}, function(err, peoples)
        {
            if (peoples.length > 0)
            {
                gameParticipant.find({'user': peoples[0]._id}).populate('game').exec(function(err, result) {
                    var games = [];
                    if (!err)
                    {
                        for (var i = 0; i < result.length;i++)
                        {
                            games.push({'id' : result.game._id, 'name' : result.game.name});
                        }
                        callback(200, { 'response': 'Ok', 'games': games, 'res': true});
                    }
                    else
                        callback(500, { 'response': 'Internal error', 'res': false});
                    return;
                });
            }
            else
                callback(200, { 'response': 'Ok', 'id': facebookId, 'res': true});
            return;
        });
    }
    else
        callback(206, {'response':"Missing parameters",'res':false});
}
