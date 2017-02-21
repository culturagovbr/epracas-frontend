import angular from "angular";

import "angular-ui-router";
import "angular-material";
import "angular-animate";
import "angular-aria";
// import "angular-oidc";
import "angular-oidc-2";
import moment from "moment";
import "moment/locale/pt-br";
import "angular-simple-logger";
import "ui-leaflet";
import "ng-file-upload";
// import "ng-img-crop-full-extended";
import "ui-cropper";
import "ng-mask";
import "angular-sanitize";
import "material-steppers";
// Import our app config files
import constants from "./config/app.constants";
import appConfig from "./config/app.config";
import appRun from "./config/app.run";
// Import our templates file (generated by Gulp)
import "./config/app.templates";
// Import our app functionaity
import "./layout";
import "./components";
import "./home";
import "./services";
import "./auth";
import "./praca";
import "./distancia";
import "./agenda";
import "./dashboard";


// Create and bootstrap application
const requires = [
  "ui.router",
  "ngMaterial",
  "ngAnimate",
  "ngAria",
  "oauth2",
  // "moment",
  "nemLogging",
  "ui-leaflet",
  "ngFileUpload",
  "uiCropper",
  "ngMask",
  // "ngImgCrop",
  "mdSteppers",
  "ngSanitize",
  "templates",
  "app.layout",
  "app.components",
  "app.home",
  "app.services",
  "app.auth",
  "app.praca",
  "app.distancia",
  "app.agenda",
  "app.dashboard",
];

// Mount on window for testing
window.app = angular.module("app", requires);

moment.locale("pt-br");

angular.module("app").constant("AppConstants", constants);

angular.module("app").config(appConfig);

angular.module("app").run(appRun);

angular.bootstrap(document, ["app"], {
  strictDi: true,
});
