import angular from 'angular';

let pracaModule = angular.module('app.praca', []);

import PracaConfig from './praca.config';
pracaModule.config(PracaConfig);

import PracasCtrl from './pracas.controller';
pracaModule.controller('PracasCtrl', PracasCtrl);

import PracaCtrl from './praca.controller';
pracaModule.controller('PracaCtrl', PracaCtrl);

import ChangeHeaderImgCtrl from './header.controller';
pracaModule.controller('ChangeHeaderImgCtrl', ChangeHeaderImgCtrl);

import VinculacaoCtrl from './vinculacao.controller';
pracaModule.controller('VinculacaoCtrl', VinculacaoCtrl);

import EventCtrl from "./event.controller";
pracaModule.controller('EventCtrl', EventCtrl);

import PracaInfoCtrl from "./pracainfo.controller";
pracaModule.controller("PracaInfoCtrl", PracaInfoCtrl);


export default pracaModule;
