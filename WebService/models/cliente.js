require('../db')
var mongoose = require('mongoose');

var Cliente = mongoose.model('Cliente');

exports.save = function(cliente, cb) {
	if (cliente._id == undefined) {
		cliente.save(function(err, cliente) {
			if (err)
				return err;
			console.log(cliente);
			return cb(cliente);
		});
	}else {
		Cliente.findByIdAndUpdate(cliente._id, cliente, function(err, clientes) {
			if (err) {
				console.log(err);
				return err;
			}
			return cb(cliente);	
		});
	}
}

exports.find = function(cb) {
	Cliente.find().populate('user').exec(function(err, clientes) {
		return cb(err, clientes);
	});
}

exports.findOne = function(id, cb) {
	Cliente.find({
		user: id
	}).populate('user').exec(function(err, cliente) {
		return cb(cliente);
	});
}

exports.remove = function(id) {
	Cliente.findById(id, function(err, cliente) {
		cliente.remove(function(err, cliente) {});
	});
}

exports.getClienteSchema = function() {
	return new Cliente();
}