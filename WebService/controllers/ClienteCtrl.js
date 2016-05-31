var express = require('express')
var Cliente = require('../models/cliente')

exports.save = function(clienteScheme, isUpdate, cb) {
	Cliente.save(clienteScheme, isUpdate, function(cliente){
		return cb(cliente);
	})
}

exports.find = function(cb) {
	Cliente.find(function(err, clientes) {
		return cb(err, clientes);
	});
}

exports.findOne = function(id, cb) {
	Cliente.findOne(id, function(cliente) {
		return cb(cliente);
	});
}

exports.remove = function(id) {
	Cliente.remove(id);
}

exports.getClienteSchema = function() {
	return Cliente.getClienteSchema();
}
