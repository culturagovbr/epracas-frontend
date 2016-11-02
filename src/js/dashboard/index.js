import angular from "angular";

const dashboardModule = angular.module('app.dashboard', []);

import DashBoardConfig from './dashboard.config';
dashboardModule.config(DashBoardConfig);

import DashBoardCtrl from './dashboard.controller';
dashboardModule.controller('DashBoardCtrl', DashBoardCtrl);

import DashboardUsersCtrl from "./dashboard.users.controller";
dashboardModule.controller("DashboardUsersCtrl", DashboardUsersCtrl);

export default dashboardModule;
