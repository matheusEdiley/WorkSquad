require('../db')
var mongoose = require('mongoose');

var Cliente = mongoose.model('Cliente');

exports.save = function(cliente, isUpdate, cb) {
	if (!isUpdate) {
		console.log("inserir");
		cliente.save(function(err, cliente) {
			if (err) {
				console.log(err);
				return err;
			}
			console.log(cliente);
			return cb(cliente);
		});
	}else {
		console.log("update");
		Cliente.findByIdAndUpdate(cliente._id, cliente.toObject(), function(err, clientes) {
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