var express = require('express');
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var auth = require('./middlewares/auth')

//Controllers da aplicação
var UserController = require('./WebService/controllers/UserCtrl');
var ClienteController = require('./WebService/controllers/ClienteCtrl');

var app = express();

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());



//Inserir usuário
app.post('/user', function(req, res) {
	var login = req.body.login;
	var senha = req.body.senha;
	var email = req.body.email;
	var tipo = req.body.tipo;
	console.log("login: " + login);
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
			}
			else if (users) {
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

//buscar por ID/Listar todos os serviços
app.get('/app/servico/', function(req, res) {

	var id = req.param('id');
	console.log(id);
	if (id == undefined) {
		ServicoController.find(function(err, servicos) {
			if (err) {
				res.send("Ocorreu um erro no servidor. Contate o administrador.");
			} else if (servicos) {
				res.send(servicos);
			}
		});
	} else {
		ServicoController.findOne(id, function(servico) {
			if (servico) {
				res.send(servico);
			} else {
				res.send('');
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


app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
