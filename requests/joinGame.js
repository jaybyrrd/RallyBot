//
// joinGame.js for joinGame in /Users/leandr_g/Documents/perso/tmp/RallyBot/requests/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 04:22:14 2017 Gaëtan Léandre
// Last update Tue Aug  1 04:33:04 2017 Gaëtan Léandre
//

var user = require('../schemas/user.js');
var game = require('../schemas/game.js');
var gameParticipant = require('../schemas/gameParticipant.js');

exports.addUser = function(facebookId, gameId, callback)
{
    if (facebookId != undefined && gameId != undefined)
    {
        game.find({'name': gameId}, function(err, games)
        {
            if (games.length > 0)
            {
                user.find({'name': gameId}, function(err, users)
                {
                    if (users.length > 0)
                    {
                        var newGamePart = gameParticipant({
                            'user': users[0]._id,
                            'game' : games[0]._id
                        });
                        newGamePart.save(function(err, result) {
                            if (result)
                                callback(200, { 'response': 'Ok', 'res': true});
                            else
                                callback(500, { 'response': 'Internal error', 'res': false});
                        });
                    }
                    else
                        callback(401, {'response': "Invalid parameters", 'res': false});
                    return;
                });
            }
            else
                callback(401, {'response': "Invalid parameters", 'res': false});
            return;
        });
    }
    else
        callback(206, {'response':"Missing parameters",'res':false});
}
