var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var relationship = require("mongoose-relationship");
var Schema = mongoose.Schema;
// User Schema
var UserSchema = mongoose.Schema({
	from: {
		type: String
	},
	email: {
		type: String
	},
	createdTime: { type : Date, default: Date.now }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;

module.exports.createUser = function(newUser, callback){
	var user = new User();
	user.from = newUser.from;
	user.email = newUser.email;
	user.save(callback);
}

module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}
