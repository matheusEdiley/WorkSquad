var express = require('express')
var Servico = require('../models/servico')

exports.save = function(servicoScheme, cb) {
	Servico.save(servicoScheme, function(servico){
		return cb(servico);
	});
}

exports.find = function(cb) {
	Servico.find(function(err, servicos) {
		return cb(err, servicos);
	});
}

exports.findOne = function(id, cb) {
	Servico.findOne(id, function(servico) {
		return cb(servico);
	});
}

exports.remove = function(id) {
	Servico.remove(id);
}

exports.getServicoSchema = function() {
	return Servico.getServicoSchema();
}
