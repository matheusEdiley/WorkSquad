var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var User = new Schema({
    login    : String,
    senha : String,
    email: String,
    tipo: String
    
});

mongoose.model( 'User', User );
mongoose.connect( 'mongodb://localhost/worksquad' );