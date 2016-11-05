import moment from "moment";
import "moment/locale/pt-br";
import authInterceptor from "./auth.interceptor";

function AppConfig(
  $httpProvider,
  $stateProvider,
  $locationProvider,
  $urlRouterProvider,
  $mdThemingProvider,
  $mdIconProvider) {
  "ngInject";


  $httpProvider.interceptors.push(authInterceptor);
  $httpProvider.defaults.headers.common = { "Content-Type": "application/json" };

  $stateProvider
  .state("app", {
    abstract: true,
    templateUrl: "layout/app-view.html",
    resolve: {
      auth(User) {
        return User.verifyAuth();
      },
    },
  });

  $urlRouterProvider.otherwise("/");
  $locationProvider.html5Mode(true);

  $mdThemingProvider
    .theme("docs-dark")
    .primaryPalette("yellow")
    .dark();

  $mdThemingProvider
    .theme("default")
    .primaryPalette("indigo")
    .accentPalette("pink")
    .warnPalette("red")
    .backgroundPalette("grey");


  $mdIconProvider
    .icon("idcultura", "images/idcultura.svg", 120);
}

export default AppConfig;
