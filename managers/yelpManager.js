//
// yelpManager.js for q in /Users/leandr_g/Documents/perso/tmp/RallyBot/managers/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 06:03:36 2017 Gaëtan Léandre
// Last update Wed Aug  2 03:29:20 2017 Gaëtan Léandre
//

var https = require("https");
var game = require('../schemas/game.js');
var card = require('../schemas/card.js');
var Q = require('q');
var queryString = require('querystring');

var getJSON = function(options, onResult)
{
    var prot = https;
    var req = prot.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        console.log(err.message);
        //res.send('error: ' + err.message);
    });

    req.end();
};

function isin(n,a){
  for (var i=0;i<a.length;i++){
    if (a[i]== n){
    return true;

    }
  }
  return false;
}

exports.getInfoYelp = function(yelpId)
{
    var deferred = Q.defer();

    var options = {
        host: 'api.yelp.com',
        port: 443,
        path: '/v3/businesses/' + yelpId,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer NwpIesOSItgB0k_RPrZ34wmnzzj4UXx3f87AqFmJmMjZXgd5nNpDOgOPyzjg4BhfZzcRwdNhvB0h3GpdScrpW197_sPsKwxwib2JV_5zuZH9-s9Ns94zikUZkFqAWXYx'
        }
    };
    getJSON(options, function(statusCode, result) {
        if (statusCode == 200)
            deferred.resolve(result);
        else
            deferred.reject();
    });
    return deferred.promise;
}

exports.addCards = function(lat, long, diam, gameRecv)
{
    var deferred = Q.defer();
    var getParams = {};
    var table;

    table = gameRecv.cards;
    getParams.sort_by = 'review_count';
    if (diam)
        getParams.radius = diam;
    getParams.limit = 25;
    if (lat)
      getParams.latitude = lat;
    if (long)
      getParams.longitude = long;
    var options = {
        host: 'api.yelp.com',
        port: 443,
        path: '/v3/businesses/search?' + queryString.stringify(getParams),
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer NwpIesOSItgB0k_RPrZ34wmnzzj4UXx3f87AqFmJmMjZXgd5nNpDOgOPyzjg4BhfZzcRwdNhvB0h3GpdScrpW197_sPsKwxwib2JV_5zuZH9-s9Ns94zikUZkFqAWXYx'
        }
    };
    getJSON(options, function(statusCode, result) {
        if (statusCode == 200 && gameRecv)
        {
            var i = 0;
            while (i < result.total && result.businesses[i])
            {
                card.findOneAndUpdate({yelpId: result.businesses[i]._id}, {$set:{name: result.businesses[i].name}}, {upsert: true, new: true}, function(err, cards){
                    if(err){
                        deferred.reject();
                        return deferred.promise;
                    }
                    if (!isin(cards._id, table))
                        table.push(cards._id);
                });
                i++;
            }
            if (result.total != 0)
            {
                game.findOneAndUpdate({_id : gameRecv._id}, {$set: {cards: table}}, function(err, res){
                    if (!err)
                        deferred.resolve("ok");
                    else
                        deferred.reject();
                });

            }
            else{
                deferred.resolve("ok");
            }
        }
        else
            deferred.reject();
    });
    return deferred.promise;
}
