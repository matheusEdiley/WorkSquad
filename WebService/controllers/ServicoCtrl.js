var express = require('express')
var Servico = require('../models/servico')

exports.save = function(servicoScheme, isUpdate, cb) {
	Servico.save(servicoScheme, isUpdate, function(servico){
		return cb(servico);
	});
}

exports.find = function(cb) {
	Servico.find(function(err, servicos) {
		return cb(err, servicos);
	});
}

exports.findByFiltro = function(categoria, idPrestador, cb) {
	Servico.findByFiltro(categoria, idPrestador, function(servicos){
		return cb(servicos);
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
