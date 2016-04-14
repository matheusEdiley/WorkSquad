/*
 * Middleware responsável por validar o token nas requisições
 */
var express = require('express');
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

var app = express();

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

exports.validaToken = function(req, res, next) {
	
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	console.log(token);
	// decode token
	if (token) {
		jwt.verify(token, 'mykeytest', function(err, decoded) {
			if (err) {
				console.log(err);
				return res.json({
					success: false,
					message: 'Falha ao validar o Token.'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'Token inválido.'
		});
	}
}