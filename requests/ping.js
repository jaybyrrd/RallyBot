//
// ping.js for ping in /Users/leandr_g/Documents/perso/tmp/RallyBot/requests/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 04:17:16 2017 Gaëtan Léandre
// Last update Tue Aug  1 04:17:38 2017 Gaëtan Léandre
//

exports.ping = function(callback)
{
    callback(200, {'response':"Pong",'res':true});
}
