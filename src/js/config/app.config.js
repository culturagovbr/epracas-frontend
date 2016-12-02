import moment from "moment";
import "moment/locale/pt-br";
import authInterceptor from "./auth.interceptor";

function AppConfig(
  $httpProvider,
  $stateProvider,
  $locationProvider,
  $urlRouterProvider,
  $mdThemingProvider,
  $mdDateLocaleProvider,
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

  $mdDateLocaleProvider.months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro"];

  $mdDateLocaleProvider.shortMonths = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez"];

  $mdDateLocaleProvider.days = [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sabado"];

  $mdDateLocaleProvider.shortDays = [
    "D",
    "S",
    "T",
    "Q",
    "Q",
    "S",
    "S"];


  $mdDateLocaleProvider.formatDate = function(date) {
    const m = moment(date);
    return m.isValid() ? m.format("L") : "";
  };

  $mdDateLocaleProvider.parseDate = function(dateString) {
    const m = moment(dateString, "L", true);
    return m.isValid() ? m.toDate() : new Date(NaN);
  };

  $mdIconProvider
    .icon("idcultura", "/assets/idcultura.svg", 120);
}

export default AppConfig;
