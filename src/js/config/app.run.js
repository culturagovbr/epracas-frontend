function AppRun(AppConstants, $rootScope, oauthService, $http, User) {
  "ngInject";

  // change page title based on state
  const PageTitle = $rootScope.$on("$stateChangeSuccess", (event, toState) => {
    $rootScope.setPageTitle(toState.title);
  });

  // Helper method for setting the page's title
  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = "";
    if (title) {
      $rootScope.pageTitle += title;
      $rootScope.pageTitle += " \u2014 ";
    }
    $rootScope.pageTitle += AppConstants.appName;
  };


  // oauthService.loginUrl = AppConstants.loginUrl;
  oauthService.loginUrl = AppConstants.loginUrl;
  oauthService.redirectUri = `${location.origin}/index.html`;
  oauthService.clientId = AppConstants.clientId;
  oauthService.scope = "openid sub email picture";
  oauthService.issuer = AppConstants.issuerUri;
  oauthService.oidc = true;

  oauthService.setup({
    loginState: "app.login",
    onTokenReceived(context) {
      User.setUserInfo(context.accessToken);
    },
  });
}

export default AppRun;
