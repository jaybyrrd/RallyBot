//
// user.js for user in /Users/leandr_g/Documents/perso/rallypoint/schema/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Mon Jul 31 17:22:25 2017 Gaëtan Léandre
// Last update Tue Aug  1 02:54:40 2017 Gaëtan Léandre
//

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new Schema({
    facebookId: String,
    creationDate: Date
});

module.exports = mongoose.model('user', userSchema);
