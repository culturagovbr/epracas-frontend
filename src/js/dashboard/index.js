import angular from "angular";

const dashboardModule = angular.module('app.dashboard', ['app.services']);

import DashBoardConfig from './dashboard.config';
dashboardModule.config(DashBoardConfig);

import DashBoardCtrl from './dashboard.controller';
dashboardModule.controller('DashBoardCtrl', DashBoardCtrl);

import DashboardUsersCtrl from "./users/dashboard.users.controller";
dashboardModule.controller("DashboardUsersCtrl", DashboardUsersCtrl);

import UserCardControllerElement from "./users/user-card.component";
dashboardModule.component("userCard", UserCardControllerElement);

import UserDetailController from "./users/user-detail.controller.js";
dashboardModule.controller("UserDetailController", UserDetailController);

import DashboardVinculoCtrl from "./vinculacao/dashboard.vinculo.controller";
dashboardModule.controller("DashboardVinculoCtrl", DashboardVinculoCtrl);

import DashboardVinculoDialogCtrl from "./vinculacao/dashboard.vinculo-dialog.controller";
dashboardModule.controller("DashboardVinculoDialogCtrl", DashboardVinculoDialogCtrl);

import DashboardPracasCtrl from "./pracas/dashboard.pracas.controller";
dashboardModule.controller("DashboardPracasCtrl", DashboardPracasCtrl);

import DashboardEventsCtrl from "./dashboard.events.controller";
dashboardModule.controller("DashboardEventsCtrl", DashboardEventsCtrl);

export default dashboardModule;
