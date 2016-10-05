import angular from 'angular';

let servicesModule = angular.module('app.distancia', []);


import GeoLocationService from './distancia.service';
servicesModule.service('GeoLocation', GeoLocationService);

export default servicesModule;
