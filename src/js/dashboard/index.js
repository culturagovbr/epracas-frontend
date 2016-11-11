import angular from "angular";

const dashboardModule = angular.module('app.dashboard', []);

import DashBoardConfig from './dashboard.config';
dashboardModule.config(DashBoardConfig);

import DashBoardCtrl from './dashboard.controller';
dashboardModule.controller('DashBoardCtrl', DashBoardCtrl);

import DashboardUsersCtrl from "./dashboard.users.controller";
dashboardModule.controller("DashboardUsersCtrl", DashboardUsersCtrl);

import DashboardVinculoCtrl from "./dashboard.vinculo.controller";
dashboardModule.controller("DashboardVinculoCtrl", DashboardVinculoCtrl);

import DashboardVinculoDialogCtrl from "./dashboard.vinculo-dialog.controller";
dashboardModule.controller("DashboardVinculoDialogCtrl", DashboardVinculoDialogCtrl);

export default dashboardModule;
