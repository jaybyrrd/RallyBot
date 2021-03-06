//
// gameRoad.js for gameroad in /Users/leandr_g/Documents/perso/tmp/RallyBot/roads/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 04:33:28 2017 Gaëtan Léandre
// Last update Thu Aug  3 03:57:09 2017 Gaëtan Léandre
//
;
var joinGame = require('../requests/joinGame.js');
var addGame = require('../requests/addGame.js');
var getCard = require('../requests/getCard.js');
var getGames = require('../requests/getGames.js');
var swipe = require('../requests/swipe.js')
var getResult = require('../requests/result.js');

module.exports = function(app) {

    app.post('/getGames', function(req, res) {
        var facebookId = req.body.facebookId;

        getGames.getGames(facebookId, function(value, found, token) {
            res.status(value);
            res.json(found);
        });
    });

    app.post('/getCard', function(req, res) {
        var facebookId = req.body['messenger user id'];
        var gameId = req.body.gameId;

        getCard.getCard(facebookId, gameId, function(value, found, token) {
            res.status(value);
            res.json(found);
        });
    });

    app.post('/addgame', function(req, res) {
        var facebookId = req.body['messenger user id'];
        var gameId = req.body.gameName;
	var lat = req.body.latitude;
	var lon = req.body.longitude;
	var diam = req.body.diam;

        addGame.addGame(facebookId, gameId, lat, lon, diam, function(value, found, token) {
            res.status(value);
            res.json(found);
        });
    });

    app.post('/joingame', function(req, res) {
        var facebookId = req.body['messenger user id'];
        var gameId = req.body.gameId;

        joinGame.joinGame(facebookId, gameId, function(value, found, token) {
            res.status(value);
            res.json(found);
        });
    });

    app.post('/swipe', function(req, res) {
        var facebookId = req.body['messenger user id'];
        var yelpId = req.body.yelpId;
        var gameId = req.body.gameId;
        var vote = req.body.vote;

        swipe.swipe(facebookId, yelpId, gameId, vote, function(value, found, token) {
            res.status(value);
            res.json(found);
        });
    });

    app.post('/getResult', function(req, res) {
        var facebookId = req.body['messenger user id'];
        var gameId = req.body.gameId;

        getResult.getResult(facebookId, gameId, function(value, found, token) {
            res.status(value);
            res.json(found);
        });
    });
};
