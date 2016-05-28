require('../db')
var mongoose = require('mongoose');

var Servico = mongoose.model('Servico');

exports.save = function(servico, cb) {
	servico.save(function(err, servico) {
		if (err)
			return err;
		console.log(servico);
		return cb(servico);
	});
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