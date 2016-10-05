export default class Praca {
	constructor(AppConstants, $http, $q) {
		'ngInject';


		this._AppConstants = AppConstants;
		this._$http = $http;
		this._$q = $q;

	}



// Recupera o registro de uma Praça
		get(pk){
			let deferred = this._$q.defer();

			// Verifica a existencia do id_pub
			if (!pk.replace(" ", "")) {
				deferred.reject("O id_pub está vazio!");
				return deferred.promise;
			}

			this._$http({
				url: this._AppConstants.api + '/pracas/' + pk + '/',
				method: 'GET',
			}).then(
				(res) => {
					deferred.resolve(res.data);
				},
				(err) => deferred.reject(err)
			);

			return deferred.promise;
	}

	list(){
		let deferred = this._$q.defer();

		this._$http({
			url: this._AppConstants.api + '/pracas/',
			method: 'GET'
		}).then(
			(res) => deferred.resolve(res.data),
			(err) => deferred.reject(err)
		);
		return deferred.promise;
	}

	search(query){
	 	let deferred = this._$q.defer();

	 	this._$http({
	 		url: this._AppConstants.api + '/pracas/',
	 		method: 'GET',
	 		params: {search: query}
	 	}).then(
	// 		(res) => res.data,
	// 		(err) => err
	 		(res) => deferred.resolve(res.data),
	 		(err) => deferred.reject(err)
	 	);
	 	return deferred.promise;
	//	return res.data;
	}
};
