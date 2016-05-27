var express = require('express');
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var auth = require('./WebService/middlewares/auth')
var mongojs = require('mongojs');

//Controllers da aplicação
var UserController = require('./WebService/controllers/UserCtrl');
var ClienteController = require('./WebService/controllers/ClienteCtrl');

var app = express();

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname));
//app.use('/app', function(req, res, next) {
//auth.validaToken(req, res, next);
//});

//Inserir usuário
app.post('/user', function(req, res) {
	var login = req.body.login;
	var senha = req.body.senha;
	var email = req.body.email;
	var tipo = req.body.tipo;
	UserController.save(login, senha, email, tipo, function(user) {
		res.json(user);
	})
});

//Get Usuário
app.get('/app/user', function(req, res) {
	var id = req.param('id');
	if (id == undefined) {
		UserController.find(function(err, users) {
			if (err) {
				res.send("Ocorreu um erro no servidor. Contate o administrador.");
			} else if (users) {

				res.send(users);
			}
		});
	} else {
		UserController.findOne(id, function(user) {
			if (user) {
				res.send(user);
			}
		});
	}
});

app.get('/app/user/remove', function(req, res) {
	var id = req.param('id');
	if (id != undefined) {
		UserController.remove(id);
		res.send(id + " removido.");
	} else {
		res.send("_id inválido.");
	}
});

app.post('/login', function(req, res) {
	if ((req.param('login')) && (req.param('senha'))) {
		UserController.findByUserSenha(req.param('login'), req.param('senha'), function(user) {
			console.log(req.param('senha'));
			if (user === null) {
				return null;
			};
			var token = jwt.sign({
				foo: 'bar'
			}, 'mykeytest');
			res.json({
				success: true,
				token: token,
				user: user
			});
		});
	}
});

app.post('/app/cliente/', function(req, res) {

	var cliente = ClienteController.getClienteSchema();

	cliente.nome = undefined;
	cliente.sobrenome = undefined;
	cliente.cpf = undefined;
	cliente.celular = undefined;
	cliente.telefone = undefined;
	cliente.cep = undefined;
	cliente.numero = undefined;
	cliente.logradouro = undefined;
	cliente.bairro = undefined;
	cliente.localidade = undefined;
	cliente.uf = undefined;
	cliente.user = req.body._id;

	console.log(cliente);
	ClienteController.save(cliente, function(clienteret) {
		res.json(clienteret);
		console.log(clienteret);
	})
});

app.get('/app/cliente/', function(req, res) {
	
	var id = '5748b1bc38cf03fc3f000001';
	console.log(id);
	if (id == undefined) {
		ClienteController.find(function(err, clientes) {
			if (err) {
				res.send("Ocorreu um erro no servidor. Contate o administrador.");
			} else if (clientes) {
				res.send(clientes);
			}
		});
	} else {
		ClienteController.findOne(id, function(cliente) {
			if (cliente) {
				res.send(cliente);
			}
		});
	}
});

app.delete('/app/cliente/remove', function(req, res) {
	var id = req.param('id');
	if (id != undefined) {
		ClienteController.remove(id);
		res.send(id + " removido.");
	} else {
		res.send("_id inválido.");
	}
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});