//
// addGame.js for addGame in /Users/leandr_g/Documents/perso/tmp/RallyBot/requests/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 04:36:58 2017 Gaëtan Léandre
// Last update Tue Aug  1 07:09:39 2017 Gaëtan Léandre
//

var game = require('../schemas/game.js');
var user = require('../schemas/user.js');
var gameParticipant = require('../schemas/gameParticipant.js');
var yelpManager = require('../managers/yelpManager.js');

exports.addGame = function(facebookId, name, lat, long, diam, callback)
{
    if (facebookId != undefined && name != undefined)
    {
        user.find({'facebookId': facebookId}, function(err, peoples)
        {
            if (peoples.length > 0)
            {
                game.find({'name': name}, function(err, games)
                {
                    if (games.length == 0)
                    {
                        var newGame = game({
                            'name': name,
                            'creator' : peoples[0]._id,
                            'startDate' : new Date()
                        });
                        newGame.save(function(err, result) {
                            if (result)
                            {
                                var newGamePart = gameParticipant({
                                    'user': peoples[0]._id,
                                    'game' : result._id
                                });
                                newGamePart.save();
                                yelpManager.addCards(lat, long, diam, result).then(function(text){
                                    callback(200, { 'response': 'Ok', 'id': name, 'res': true});
                                }).fail(function(){
                                    callback(500, { 'response': 'Internal error', 'res': false});
                                });
                            }
                            else
                                callback(500, { 'response': 'Internal error', 'res': false});
                        });
                        return;
                    }
                    else
                        callback(409, {'response':"Name already exist",'res':false});
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
