import angular from "angular"

// Create the module where our functionality can attach to
let homeModule = angular.module('app.home', []);

// Include our UI-Router config settings
import HomeConfig from './home.config';
homeModule.config(HomeConfig);


// Controllers
import HomeCtrl from './home.controller';
homeModule.controller('HomeCtrl', HomeCtrl);

import GeolocCtrl from './geoloc.controller';
homeModule.controller('GeolocCtrl', GeolocCtrl);

import PesquisaCtrl from './pesquisa.controller';
homeModule.controller('PesquisaCtrl', PesquisaCtrl);


export default homeModule;
