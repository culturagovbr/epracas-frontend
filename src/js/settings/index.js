import angular from 'angular';

let settingsModule = angular.module('app.settings', []);


import SettingsConfig from './settings.config';
settingsModule.config(SettingsConfig);


import SettingsCtrl from './settings.controller';
settingsModule.controller('SettingsCtrl', SettingsCtrl);


export default settingsModule; 
