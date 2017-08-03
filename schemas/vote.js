//
// vote.js for vote in /Users/leandr_g/Documents/perso/tmp/RallyBot/schemas/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 03:16:55 2017 Gaëtan Léandre
// Last update Thu Aug  3 03:36:03 2017 Gaëtan Léandre
//

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var voteSchema = new Schema({
    user: {type : ObjectId, ref : 'user'},
    card: {type : ObjectId, ref : 'card'},
    game: {type : ObjectId, ref : 'game'},
    choice: Number
});

module.exports = mongoose.model('vote', voteSchema);
