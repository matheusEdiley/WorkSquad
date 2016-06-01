var express = require('express')
var Prestador = require('../models/prestador')

exports.save = function(PrestadorScheme, isUpdate, cb) {
	Prestador.save(PrestadorScheme, isUpdate, function(Prestador){
		return cb(Prestador);
	})
}

exports.find = function(cb) {
	Prestador.find(function(err, Prestadors) {
		return cb(err, Prestadors);
	});
}

exports.findOne = function(id, cb) {
	Prestador.findOne(id, function(Prestador) {
		return cb(Prestador);
	});
}

exports.remove = function(id) {
	Prestador.remove(id);
}

exports.findServicosContratados = function(id, cb) {
	Prestador.findServicosContratados(id, function(prestadores){
		return cb(prestadores);
	});
}

exports.getPrestadorSchema = function() {
	return Prestador.getPrestadorSchema();
}
