import moment from "moment";
import "moment/locale/pt-br";
import authInterceptor from "./auth.interceptor";

import calendarConfig from "angular-bootstrap-calendar";

function AppConfig(
  $httpProvider,
  $stateProvider,
  $locationProvider,
  $urlRouterProvider,
  $mdThemingProvider,
  $mdDateLocaleProvider,
  $mdIconProvider,
  $sceDelegateProvider,
  calendarConfig) {
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
    .primaryPalette("blue", {
        'default': '700',
    })
    .accentPalette("orange", {
      'default': '800'
    })
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

  $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://localhost:8000/**',
  ]);


  // View all available config
  // console.log(calendarConfig);

  // Change the month view template globally to a custom template
  // calendarConfig.templates.calendarMonthView = 'path/to/custom/template.html';

  // Use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
  calendarConfig.dateFormatter = 'moment';

  // This will configure times on the day view to display in 24 hour format rather than the default of 12 hour
  calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';

  // This will configure the day view title to be shorter
  calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM';

  // This will set the week number hover label on the month view
  calendarConfig.i18nStrings.weekNumber = '{week}ª semana';

  // This will display all events on a month view even if they're not in the current month. Default false.
  calendarConfig.displayAllMonthEvents = true;

  // Make the week view more like the day view, ***with the caveat that event end times are ignored***.
  calendarConfig.showTimesOnWeekView = true;
}

export default AppConfig;
