//
// game.js for game in /Users/leandr_g/Documents/perso/tmp/RallyBot/schemas/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 03:04:17 2017 Gaëtan Léandre
// Last update Tue Aug  1 03:15:13 2017 Gaëtan Léandre
//

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var gameSchema = new Schema({
    name: String,
    creator: {type : ObjectId, ref : 'user'},
    cards: [{type : ObjectId, ref : 'card'}],
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('game', gameSchema);
