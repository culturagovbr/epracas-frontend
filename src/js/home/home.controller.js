class HomeCtrl {
  constructor($q, $state, AppConstants, Praca) {
    'ngInject';

    this.appName = AppConstants.appName;
		this._Praca = Praca;
		this._$state = $state;
		this._$q = $q;

  }

	getMatches(query){
		let deferred = this._$q.defer();

		this._Praca.search(query).then(
			(res) => deferred.resolve(res),
			(err) => deferred.reject(err)
		);

		return deferred.promise;
	}

	selectedItemChange(item) {
		this._$state.go('app.praca', {pk: item.id_pub});
	}

}

export default HomeCtrl;
