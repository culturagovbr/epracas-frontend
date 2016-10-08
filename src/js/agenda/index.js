import angular from 'angular';

let agendaModule = angular.module('app.agenda', []);

import AgendaConfig from './agenda.config';
agendaModule.config(AgendaConfig);

import AgendaService from './agenda.service';
agendaModule.service('Agenda', AgendaService);

import AgendaCtrl from './agenda.controller';
agendaModule.controller('AgendaCtrl', AgendaCtrl);

import EventoCtrl from './evento.controller';
agendaModule.controller('EventoCtrl', EventoCtrl);

export default agendaModule;
