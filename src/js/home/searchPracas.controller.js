class SearchPracas {
  constructor(AppConstants, Praca) {
    'ngInject';


  }

	getMatches(query){
		Praca.search(query);
	}


}

export default SearchPracas;
