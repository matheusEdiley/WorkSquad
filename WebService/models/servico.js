require('../db')
var mongoose = require('mongoose');

var Servico = mongoose.model('Servico');

exports.save = function(servico, cb) {
	if (servico._id == undefined) {
		servico.save(function(err, servico) {
			if (err) {
				console.log(err);
				return err;
			}
			return cb(servico);
		});
	} else {
		Servico.findByIdAndUpdate(servico._id, servico.toObject(), function(err, servicoReturn) {
			if (err) {
				console.log(err);
				return err;
			}
			return cb(servico);
		});
	}
}

exports.find = function(cb) {
	Servico.find(function(err, Servicos) {
		return cb(err, Servicos);
	});
}

exports.findOne = function(id, cb) {
	Servico.find({
		_id: id
	}, function(err, Servico) {
		return cb(Servico);
	});
}

exports.remove = function(id) {
	Servico.findById(id, function(err, Servico) {
		Servico.remove(function(err, Servico) {});
	});
}

exports.getServicoSchema = function() {
	return new Servico();
}