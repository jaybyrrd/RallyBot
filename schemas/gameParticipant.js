//
// gameParticipant.js for gameParticipant in /Users/leandr_g/Documents/perso/tmp/RallyBot/schemas/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 04:22:47 2017 Gaëtan Léandre
// Last update Tue Aug  1 04:35:48 2017 Gaëtan Léandre
//

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var gameParticipantSchema = new Schema({
    user: {type : ObjectId, ref : 'user'},
    game: [{type : ObjectId, ref : 'game'}],
});

module.exports = mongoose.model('gameParticipant', gameParticipantSchema);
