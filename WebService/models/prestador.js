require('../db')
var mongoose = require('mongoose');

var Prestador = mongoose.model('Prestador');
var Cliente = mongoose.model('Cliente');

exports.save = function(prestador, isUpdate, cb) {
	if (isUpdate) {
		prestador.save(function(err, prestador) {
			if (err)
				return err;
			console.log(prestador);
			return cb(prestador);
		});
	} else {
		Prestador.findByIdAndUpdate(prestador._id, prestador.toObject(), function(err, prestadorRet){
			if (err)
				return err;
			console.log(prestador);
			return cb(prestador);
		});
	}
}

exports.find = function(cb) {
	Prestador.find().populate('user servicos').exec(function(err, Prestadors) {
		return cb(err, Prestadors);
	});
}

exports.findOne = function(id, cb) {
	Prestador.find({
		user: id
	}).populate('user servicos').exec(function(err, Prestador) {
		return cb(Prestador);
	});
}

exports.remove = function(id) {
	Prestador.findById(id, function(err, Prestador) {
		Prestador.remove(function(err, Prestador) {});
	});
}

exports.findServicosContratados = function(id, cb) {
	Cliente.find({
		"servicos.prestador" : id
	}).populate("servicos servicos.prestador").exec(function(err, servicos){
		console.log("busca id: " + id);
		console.log(servicos);
		return cb(servicos);
	});
}

exports.getPrestadorSchema = function() {
	return new Prestador();
}