var mainApp = angular.module("MainApp");

mainApp.factory('alimentar', ['$http', function($http) {


	function ListaGraduacoes() {

		return [

			"Biomedicina",
			"Ciências Biológicas",
			"Educação Física",
			"Enfermagem",
			"Farmácia",
			"Fisioterapia",
			"Fonoaudiologia",
			"Medicina Veterinária",
			"Nutrição",
			"Odontologia",
			"Terapia Ocupacional",
			"Zootecnia",
			"Arquitetura e Urbanismo",
			"Ciência da Computação",
			"Desenho Industrial",
			"Engenharia Aeronáutica",
			"Engenharia Ambiental",
			"Engenharia Civil",
			"Engenharia de Computação",
			"Engenharia de Controle e Automação (Mecatrônica)",
			"Engenharia de Petróleo",
			"Engenharia de Produção Mecânica",
			"Engenharia Elétrica (Eletrônica/Eletrotécnica)",
			"Engenharia Mecânica",
			"Física",
			"Matemática",
			"Química",
			"Sistemas de Informação",
			"Administração",
			"Ciências Atuariais",
			"Ciências Contábeis",
			"Ciências Econômicas",
			"Comunicação Social (Jornalismo)",
			"Comunicação Social (Publicidade e Propaganda)",
			"Direito",
			"Geografia (Licenciatura)",
			"História (Licenciatura)",
			"Hotelaria",
			"Letras",
			"Moda",
			"Pedagogia",
			"Propaganda e Marketing",
			"Psicologia",
			"Relações Internacionais",
			"Secretariado Executivo Bilíngue",
			"Serviço Social",
			"Turismo"
		]

	}

    function ListaCategorias() {
    	
    	return[



    	];

    }
	return {
		//teste: teste,
		ListaGraduacoes: ListaGraduacoes,
		ListaCategorias: ListaCategorias
	};
}]);