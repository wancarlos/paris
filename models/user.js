var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var relationship = require("mongoose-relationship");
var Schema = mongoose.Schema;
// User Schema
var UserSchema = mongoose.Schema({
	firstName: {
		type: String,
		unique: true,
		required: true
	},
	lastName: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	createdTime: { type : Date, default: Date.now }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.getUserByPhone = function(phone, callback){
	var query = {phone: phone};
	User.findOne(query, callback);
}

module.exports.getUserByVerifyEmailString = function(verifyEmailString, callback){
	var query = {verifyEmailString: verifyEmailString};
	User.findOne(query, callback);
}

module.exports.getUserByPassword = function(password, callback){
	var query = {password: password};
	User.findOne(query, callback);
}

module.exports.getUserByResetToken = function(resetPwdString, callback){
	var query = {resetPwdString: resetPwdString};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
