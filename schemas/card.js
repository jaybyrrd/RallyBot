//
// card.js for card in /Users/leandr_g/Documents/perso/tmp/RallyBot/schemas/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 03:06:37 2017 Gaëtan Léandre
// Last update Tue Aug  1 03:12:34 2017 Gaëtan Léandre
//

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var cardSchema = new Schema({
    name: String,
    yelpId: String
});

module.exports = mongoose.model('card', cardSchema);
