//
// addUser.js for addUser in /Users/leandr_g/Documents/perso/tmp/RallyBot/requests/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 03:20:14 2017 Gaëtan Léandre
// Last update Tue Aug  1 04:17:13 2017 Gaëtan Léandre
//

var user = require('../schemas/user.js');

exports.addUser = function(facebookId, callback)
{
    if (facebookId != undefined)
    {
        var newUser = user({
            'facebookId': String,
            'creationDate' : new Date()
        });
        newUser.save(function(err, result) {
            if (result)
                callback(200, { 'response': 'Ok', 'id': result._id, 'res': true});
            else
                callback(500, { 'response': 'Internal error', 'res': false});
        });
    }
    else
        callback(206, {'response':"Missing parameters",'res':false});
}
