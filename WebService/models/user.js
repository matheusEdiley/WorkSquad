require('../db')
var mongoose = require('mongoose');

var User = mongoose.model('User');

exports.save = function(login, senha, cb) {
	var userNew = new User({
		"login": login,
		"senha": senha
	});
	userNew.save(function(err, user, count) {
		if (err)
			return err;
		return cb(user);
	});

}

exports.find = function(cb) {
	User.find(function(err, users) {
		return cb(err, users);
	});
}

exports.findOne = function(id, cb) {
	User.find({
		_id: id
	}, function(err, user) {
		return cb(user);
	});
}

exports.remove = function(id) {
	User.findById(id, function(err, user) {
		user.remove(function(err, user) {});
	});
}

exports.findByUserSenha = function(login, senha, cb) {
	User.findOne({
		login: login,
		senha: senha
	}, function(err, user) {
		console.log(user);
		return cb(user);
	});
}