export default class User {
	constructor(JWT, AppConstants, $http, $state, $q) {
		'ngInject';

		this._JWT = JWT;
		this._AppConstants = AppConstants;
		this._$http = $http;
		this._$state = $state;
		this._$q = $q;

		this.current = null;
	
	}


	logout() {
		this.current = null;
		this._JWT.destroy();
		this._$state.go(this._$state.$current, null, { reload: true });
	}

	verifyAuth() {
		let deferred = this._$q.defer();

		if(!this._JWT.get()) {
			console.log('JWT Failed!');
			deferred.resolve(false);
			return deferred.promise;
		}

		if (this.current) {
			deferred.resolve(true);

		} else {
			let accessToken = localStorage['access_token'];
			this._$http({
				url: this._AppConstants.userinfoUrl,
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + accessToken
				},
			}).then(
				(res) => {
					this.current = res.data;
					deferred.resolve(true);
				},

				(err) => {
					this._JWT.destroy();
					deferred.resolve(false);
				}
			);
		}

		return deferred.promise;
	}

	ensureAuthIs(bool) {
		let deferred = this._$q.defer();

		this.verifyAuth().then(
			(authValid) => {
				if (authValid !== bool) {
					this._$state.go('app.home');
					deferred.resolve(false);
				} else {
					deferred.resolve(true);
				}
			}
		);

		return deferred.promise;
	}

} 
