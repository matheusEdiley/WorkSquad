var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var User = new Schema({
	login: String,
	senha: String,
	email: String,
	tipo: String
});

var Administrador = new Schema({
	nome: String,
	sobrenome: String,
	cpf: String,
	celular: String,
	telefone: String,
	cep: String,
	numero: String,
	logradouro: String,
	bairro: String,
	localidade: String,
	uf: String,
	user: {
		type: ObjectId,
		ref: 'User'
	}
});

var Cliente = new Schema({
	nome: String,
	sobrenome: String,
	cpf: String,
	celular: String,
	telefone: String,
	cep: String,
	numero: String,
	logradouro: String,
	bairro: String,
	localidade: String,
	uf: String,
	user: {
		type: ObjectId,
		ref: 'User'
	},
	servicos: [{
		type: ObjectId,
		ref: 'Servico'
	}]
});

var Prestador = new Schema({
	nome: String,
	sobrenome: String,
	cpf: String,
	celular: String,
	telefone: String,
	cep: String,
	numero: String,
	logradouro: String,
	bairro: String,
	localidade: String,
	uf: String,
	graduacao: String,
	certificacoes: String,
	cursos: String,
	user: {
		type: ObjectId,
		ref: 'User'
	},
	servicos: [{
		type: ObjectId,
		ref: 'Servico'
	}]
});

var Servico = new Schema({
	nome: String,
	descricao: String,
	prestador: {
		type: ObjectId,
		ref: 'Prestador'
	},
	categoria: String,
	valor: String,
	voluntario: Boolean,
	diasDaSemana: [],
	horarioInicio: String,
	horarioFim: String
});

mongoose.model('User', User);
mongoose.model('Cliente', Cliente);
mongoose.model('Administrador', Administrador);
mongoose.model('Prestador', Prestador);
mongoose.model('Servico', Servico);
mongoose.connect('mongodb://localhost/worksquad2');