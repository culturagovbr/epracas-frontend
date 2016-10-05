import angular from 'angular';

let pracaModule = angular.module('app.praca', []);

import PracaConfig from './praca.config';
pracaModule.config(PracaConfig);

import PracasCtrl from './pracas.controller';
pracaModule.controller('PracasCtrl', PracasCtrl);

import PracaCtrl from './praca.controller';
pracaModule.controller('PracaCtrl', PracaCtrl);


export default pracaModule;
