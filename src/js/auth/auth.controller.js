class AuthCtrl {
  constructor(User, $state, $scope, $stateParams, oauthService) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

		this._$scope = $scope;
		this._$stateParams = $stateParams;

		this._$scope.model = {
			requestedUrl: $stateParams.requestedUrl,
			callback: function(requestedUrl) {
				oauthService.initImplicitFlow(app.home);
			}
		};
  }
}

export default AuthCtrl;
