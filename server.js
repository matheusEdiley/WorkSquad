var express = require('express');
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var auth = require('./WebService/middlewares/auth')
var mongojs = require('mongojs');

//Controllers da aplicação
var UserController = require('./WebService/controllers/UserCtrl');
var ClienteController = require('./WebService/controllers/ClienteCtrl');
var ServicoController = require('./WebService/controllers/ServicoCtrl');
var PrestadorController = require('./WebService/controllers/PrestadorCtrl');

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

//Remove Usuário
app.get('/app/user/remove', function(req, res) {
	var id = req.param('id');
	if (id != undefined) {
		UserController.remove(id);
		res.send(id + " removido.");
	} else {
		res.send("_id inválido.");
	}
});

//Login...
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

//Inserir/Editar cliente
app.post('/app/cliente/', function(req, res) {

	var cliente = ClienteController.getClienteSchema();

	if (req.body._clienteId != undefined)
		cliente._id = req.body._clienteId;

	cliente.nome = req.body.nome;
	cliente.sobrenome = req.body.sobrenome;
	cliente.cpf = req.body.cpf;
	cliente.celular = req.body.celular;
	cliente.telefone = req.body.telefone;
	cliente.cep = req.body.cep;
	cliente.numero = req.body.numero;
	cliente.logradouro = req.body.logradouro;
	cliente.bairro = req.body.bairro;
	cliente.localidade = req.body.localidade;
	cliente.uf = req.body.uf;
	cliente.user = req.body.userid;

	console.log(cliente);
	ClienteController.save(cliente, function(clienteret) {
		res.json(clienteret);
		console.log(clienteret);
	})
});

//editar cliente
app.post('/app/EditarCliente/', function(req, res) {

	var cliente = ClienteController.getClienteSchema();

	if ((req.body._clienteUserId != undefined)) {
		ClienteController.findOne(req.body._clienteUserId, function(cliente) {
			if (cliente) {
				//console.log(cliente);

				//cliente._id = req.body._id;
				cliente.nome = req.body.nome;
				cliente.sobrenome = req.body.sobrenome;
				cliente.cpf = req.body.cpf;
				cliente.celular = req.body.celular;
				cliente.telefone = req.body.telefone;
				cliente.cep = req.body.cep;
				cliente.numero = req.body.numero;
				cliente.logradouro = req.body.logradouro;
				cliente.bairro = req.body.bairro;
				cliente.localidade = req.body.localidade;
				cliente.uf = req.body.uf;
				cliente.user = req.body.userid;

				ClienteController.save(cliente, function(clienteret) {
					res.json(clienteret);
					console.log(clienteret);
				});
			} else {
				res.json('erro');
			}
		});
	} else {
		res.json('erro');
	}
});

//buscar por ID/Listar todos os clientes
app.get('/app/cliente/:id', function(req, res) {
	var id = req.params.id;
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

//remover cliente
app.delete('/app/cliente/remove', function(req, res) {
	var id = req.param('id');
	if (id != undefined) {
		ClienteController.remove(id);
		res.send(id + " removido.");
	} else {
		res.send("_id inválido.");
	}
});

//Inserir/Editar Servico
app.post('/app/servico/', function(req, res) {

	var servico = ServicoController.getServicoSchema();

	if (req.body._servicoId != undefined)
		servico._id = req.body._servicoId;

	servico.descricao = req.body.descricao;
	servico.valor = req.body.valor;
	servico.voluntario = req.body.voluntario;
	servico.nome = req.body.nome;
	servico.categoria = req.body.categoria;
	servico.voluntario = req.body.voluntario;
	servico.diasDaSemana = req.body.diasDaSemana;
	servico.horarioInicio = req.body.horarioInicio;
	servico.horarioFim = req.body.horarioFim;

	console.log(servico);
	ServicoController.save(servico, function(servicoret) {
		res.json(servicoret);
		console.log(servicoret);
	})
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

//remover serviço
app.delete('/app/servico/remove', function(req, res) {
	var id = req.param('id');
	if (id != undefined) {
		ServicoController.remove(id);
		res.send(id + " removido.");
	} else {
		res.send("_id inválido.");
	}
});

//Inserir/Editar prestador
app.post('/app/prestador/', function(req, res) {

	var prestador = PrestadorController.getPrestadorSchema();

	if (req.body._prestadorId != undefined)
		prestador._id = req.body._prestadorId;

	prestador.nome = req.body.nome;
	prestador.sobrenome = req.body.sobrenome;
	prestador.cpf = req.body.cpf;
	prestador.celular = req.body.celular;
	prestador.telefone = req.body.telefone;
	prestador.cep = req.body.cep;
	prestador.numero = req.body.numero;
	prestador.logradouro = req.body.logradouro;
	prestador.bairro = req.body.bairro;
	prestador.localidade = req.body.localidade;
	prestador.uf = req.body.uf;
	prestador.user = req.body.userid;

	console.log(prestador);
	PrestadorController.save(prestador, function(prestadorret) {
		res.json(prestadorret);
		console.log(prestadorret);
	})
});

//inserir serviço para o prestador
app.post('/app/prestador/servico', function(req, res) {

	var prestador = PrestadorController.getPrestadorSchema();

	if ((req.body.user._id != undefined) && (req.body._servicoId != undefined)) {
		PrestadorController.findOne(req.body.user._id, function(prestador) {
			if (prestador) {
				console.log(prestador);
				prestador.servicos.push(req.body._servicoId);
				PrestadorController.save(prestador, function(prestadorret) {
					res.json(prestadorret);
					console.log(prestadorret);
				});
			} else {
				res.json('erro');
			}
		});
	} else {
		res.json('erro');
	}
});

//buscar por ID/Listar todos os prestadores
app.get('/app/prestador/:id', function(req, res) {

	var id = req.params.id;
	console.log(id);
	if (id == undefined) {
		PrestadorController.find(function(err, prestadores) {
			if (err) {
				res.send("Ocorreu um erro no servidor. Contate o administrador.");
			} else if (prestadores) {
				res.send(prestadores);
			}
		});
	} else {
		PrestadorController.findOne(id, function(prestador) {
			if (prestador) {
				res.send(prestador);
			}
		});
	}
});

//remover prestador
app.delete('/app/prestador/remove', function(req, res) {
	var id = req.param('id');
	if (id != undefined) {
		PrestadorController.remove(id);
		res.send(id + " removido.");
	} else {
		res.send("_id inválido.");
	}
});


app.listen(3000, function() {
	console.log('WorkSquad WebService iniciado na porta 3000!');
});