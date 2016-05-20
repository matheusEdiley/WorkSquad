var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var User = new Schema({
    login    : String,
    senha : String,
    email: String,
    tipo: String
    
});

var Cliente = new Schema({
	nome : String,
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
	user: { type: ObjectId, ref : 'User' }
});

mongoose.model( 'User', User );
mongoose.model( 'Cliente', Cliente );
mongoose.connect( 'mongodb://localhost/worksquad' );