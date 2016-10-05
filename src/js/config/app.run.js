function AppRun(AppConstants, $rootScope, oauthService, $http, User) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.setPageTitle(toState.title);
  });

  // Helper method for setting the page's title
  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = '';
    if (title) {
      $rootScope.pageTitle += title;
      $rootScope.pageTitle += ' \u2014 ';
    }
    $rootScope.pageTitle += AppConstants.appName;
  };


	// oauthService.loginUrl = AppConstants.loginUrl;
	oauthService.loginUrl = 'https://alpha.id.cultura.gov.br/openid/connect/authorize';
	oauthService.redirectUri = location.origin + "/index.html";
	oauthService.clientId = AppConstants.clientId;
	oauthService.scope = "openid sub email picture";
	oauthService.issuer = 'http://alpha.id.cultura.gov.br';
	oauthService.oidc = true;

	oauthService.setup({
		loginState: 'app.login',
		onTokenReceived: function(context) {
			console.log(context.accessToken);
			User.setUserInfo(context.accessToken);
		}
	});

}

export default AppRun;
