export default class Agenda {
	constructor(AppConstants, $http, $q) {
		'ngInject';

		this._$http = $http;
		this._$q = $q;

		this._AgendaEndPoint = AppConstants.api + '/agenda/';
		console.log(this._AgendaEndPoint);

	}

// Metodos que interagem com o endpoint Agenda

	create(fields) {
		// Cria um novo evento
		let deferred = this._$q.defer();

		this._$http({
			url: this._AgendaEndPoint,
			method: 'POST',
			data: {evento: fields}
		}).then(
			(res) => deferred.resolve(res.data),
			(err) => deferred.reject(err)
		);
		return deferred.promise;
	}

	update(id_pub, fields) {
		// Atualiza um evento existente
		let deferred = this._$q.defer();

		this._$http({
			url: this._AgendaEndPoint + id_pub + '/',
			method: 'PUT',
			data: {evento: fields}
		}).then(
			(res) => deferred.resolve(res.data),
			(err) => deferred.reject(err)
		);
		return deferred.promise;
	}

	get(pk) {
		// Recupera o registro de um Evento especifico
		let deferred = this._$q.defer();

		// Verifica se a requisição contem o id_pub do evento
		if (!pk.replace(" ", "")) {
			deferred.reject("O id_pub está vazio!");
			return deferred.promise;	
		}

		this._$http({
			url: this._AgendaEndPoint + pk + '/',
			method: 'GET',
		}).then(
			(res) => deferred.resolve(res.data),
			(err) => deferred.reject(err)
		);
		return deferred.promise;
	}

	list() {
		//Lista todas a agenda de todas as Praças
		let deferred = this._$q.defer();

		this._$http({
			url: this._AgendaEndPoint,
			method: 'GET',
		}).then(
			(res) => deferred.resolve(res.data),
			(err) => deferred.reject(err)
		);
		return deferred.promise;
	}

	search(query) {
		// Permite a procura de um ou mais eventos dado um determinado parametro
		let deferred = this._$q.defer();

		this._$http({
			url: this._AgendaEndPoint,
			method: 'GET',
			params: {search: query}
		}).then(
			(res) => deferred.resolve(res.data),
			(err) => deferred.reject(err)
		);
		return deferred.promise;
	}
			
}
