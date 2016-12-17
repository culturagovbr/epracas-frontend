function AuthConfig($stateProvider) {
  "ngInject";

  $stateProvider

  .state("app.login", {
    url: "/login?requestedUrl",
    controller: "AuthCtrl as $ctrl",
    templateUrl: "auth/auth.html",
    title: "Sign in",
    resolve: {
      auth(User) {
        return User.ensureAuthIs(false);
      },
    },
  });
}

export default AuthConfig;
