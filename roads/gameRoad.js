//
// gameRoad.js for gameroad in /Users/leandr_g/Documents/perso/tmp/RallyBot/roads/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 04:33:28 2017 Gaëtan Léandre
// Last update Tue Aug  1 04:34:35 2017 Gaëtan Léandre
//

var joinGame = require('../requests/joinGame.js');

module.exports = function(app) {

    app.post('/adduser', function(req, res) {
        var facebookId = req.body.facebookId;
        var gameId = req.body.gameId;

        joinGame.joinGame(facebookId, gameId, function(value, found, token) {
            res.status(value);
            res.json(found);
        });
    });
};
