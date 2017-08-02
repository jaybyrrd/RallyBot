//
// swipe.js for swipe in /Users/leandr_g/Documents/perso/tmp/RallyBot/requests/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 08:14:52 2017 Gaëtan Léandre
// Last update Tue Aug  1 08:24:27 2017 Gaëtan Léandre
//

var user = require('../schemas/user.js');
var card = require('../schemas/card.js');
var vote = require('../schemas/vote.js');

exports.swipe = function(facebookId, yelpId, swipe, callback)
{
    if (facebookId != undefined)
    {
        user.find({'facebookId': facebookId}, function(err, peoples)
        {
            if (peoples.length > 0)
            {
                card.find({'yelpId': yelpId}, function(err, cards)
                {
                    if (cards.length > 0)
                    {
                        vote.findOneAndUpdate({'user': peoples[0]._id, 'card': cards[0]._id}, {$set:{'choice':swipe}}, {new: true}, function(err, cards){
                            if(err)
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
                callback(403, {'response':"Connection denied",'res':false});
            return;
        });
    }
    else
        callback(206, {'response':"Missing parameters",'res':false});
}