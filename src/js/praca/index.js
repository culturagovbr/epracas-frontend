import angular from "angular";

const pracaModule = angular.module("app.praca", []);

import PracaConfig from "./praca.config";
pracaModule.config(PracaConfig);

import PracaListCtrl from "./praca-list.controller";
pracaModule.controller("PracaListCtrl", PracaListCtrl);

import PracaDetailCtrl from "./praca-detail.controller";
pracaModule.controller("PracaDetailCtrl", PracaDetailCtrl);

import ChangeHeaderImgCtrl from "./header.controller";
pracaModule.controller("ChangeHeaderImgCtrl", ChangeHeaderImgCtrl);

import VinculacaoCtrl from "./vinculacao.controller";
pracaModule.controller("VinculacaoCtrl", VinculacaoCtrl);

import EventCtrl from "./event.controller";
pracaModule.controller("EventCtrl", EventCtrl);

import PracaInfoCtrl from "./pracainfo.controller";
pracaModule.controller("PracaInfoCtrl", PracaInfoCtrl);

import UploadImgCtrl from "./galeria-upload.controller";
pracaModule.controller("UploadImgCtrl", UploadImgCtrl);

import ParceirosCtrl from "./parceiros-components/parceiros.controller";
pracaModule.controller("ParceirosCtrl", ParceirosCtrl);

import ParceirosBoardElement from "./parceiros-components/board.component"
pracaModule.component("pracaParceirosBoard", ParceirosBoardElement)

import ParceirosListElement from "./parceiros-components/list.component"
pracaModule.component("pracaParceirosList", ParceirosListElement)

import ParceirosDetailElement from "./parceiros-components/detail.component"
pracaModule.component("pracaParceirosDetail", ParceirosDetailElement)

import ParceiroImgController from "./parceiros-components/parceiros-img-upload.dialog.ctrl.js"
pracaModule.controller("ParceiroImgController", ParceiroImgController)

import GrupoGestorContainer from "./grupogestor-components/container.component"
pracaModule.component("pracaGrupogestor", GrupoGestorContainer)

import GrupoGestorDialogController from "./grupogestor-components/grupogestor.dialog.ctrl"
pracaModule.controller("GrupoGestorDialogController", GrupoGestorDialogController)

import MembroGestorDialogController from "./grupogestor-components/membrogestor.dialog.ctrl"
pracaModule.controller("MembroGestorDialogController", MembroGestorDialogController)

import PracaGaleriaContent from "./galeria-components/praca-galeria-content.component"
pracaModule.component("pracaGaleriaContent", PracaGaleriaContent)

import PracaGaleriaCtrl from "./praca-galeria.controller"
pracaModule.controller("PracaGaleriaCtrl", PracaGaleriaCtrl)

import UnidadeGestoraContainer from "./unidadegestora-components/container.component"
pracaModule.component("pracaUnidadegestora", UnidadeGestoraContainer)

import MembroUglDialogController from "./unidadegestora-components/membrougl.dialog.ctrl"
pracaModule.controller("MembroUglDialogController", MembroUglDialogController)

import GaleriaEditDialogCtrl from "./galeria-edit.dialog.ctrl.js"
pracaModule.controller("GaleriaEditDialogCtrl", GaleriaEditDialogCtrl)

import PracaAtividadeCtrl from "./praca-atividade.ctrl.js"
pracaModule.controller("PracaAtividadeCtrl", PracaAtividadeCtrl)

import RecursosHumanosList from "./rh-components/list.component"
pracaModule.component("pracaRh", RecursosHumanosList)

import RecursosHumanosDetail from "./rh-components/detail.component"
pracaModule.component("rhDetail", RecursosHumanosDetail)

import RhAddDialogController from "./rh-components/rh-add.dialog.ctrl"
pracaModule.controller("RhAddDialogController", RhAddDialogController)

import RhListDialogController from "./rh-components/rh-list.dialog.ctrl"
pracaModule.controller("RhListDialogController", RhListDialogController)

import AtoresBoardElement from "./atores-components/board.component"
pracaModule.component("pracaAtores", AtoresBoardElement)

import AtoresListElement from "./atores-components/list.component"
pracaModule.component("pracaAtoresList", AtoresListElement)

import AtoresDetailElement from "./atores-components/detail.component"
pracaModule.component("pracaAtoresDetail", AtoresDetailElement)

import AtoresCtrl from "./atores-components/atores.controller"
pracaModule.controller("AtoresCtrl", AtoresCtrl)

import AtoresListDialogController from "./atores-components/atores-list.dialog.ctrl"
pracaModule.controller("AtoresListDialogController", AtoresListDialogController)

export default pracaModule;
