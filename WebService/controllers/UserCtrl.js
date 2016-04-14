var express = require('express')
var User = require('../models/user')

exports.save = function(login, senha, cb) {
	User.save(login, senha, function(user){
		return cb(user);
	})
}

exports.find = function(cb) {
	User.find(function(err, users) {
		return cb(err, users);
	});
}

exports.findOne = function(id, cb) {
	User.findOne(id, function(user) {
		return cb(user);
	});
}

exports.remove = function(id) {
	User.remove(id);
}

exports.findByUserSenha = function(login, senha, cb) {
	User.findByUserSenha(login, senha, function(user) {
		return cb(user);
	});
}