//
// cardGame.js for cardGame in /Users/leandr_g/Documents/perso/tmp/RallyBot/schemas/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Wed Aug  2 16:20:20 2017 Gaëtan Léandre
// Last update Wed Aug  2 16:41:12 2017 Gaëtan Léandre
//


var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var cardGameSchema = new Schema({
    card: {type : ObjectId, ref : 'card'},
    game: {type : ObjectId, ref : 'game'},
});

module.exports = mongoose.model('cardGame', cardGameSchema);
