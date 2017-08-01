//
// userRoad.js for roadUser in /Users/leandr_g/Documents/perso/tmp/RallyBot/roads/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 04:05:55 2017 Gaëtan Léandre
// Last update Tue Aug  1 04:08:21 2017 Gaëtan Léandre
//

var addUser = require('../requests/addUser.js');

module.exports = function(app) {

    app.post('/adduser', function(req, res) {
        var facebookId = req.body.facebookId;

        addUser.addUser(facebookId, function(value, found, token) {
            res.status(value);
            res.json(found);
        });
    });
};
