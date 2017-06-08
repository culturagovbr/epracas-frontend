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

import ParceirosCtrl from "./parceiros.controller";
pracaModule.controller("ParceirosCtrl", ParceirosCtrl);

import UploadImgCtrl from "./galeria-upload.controller";
pracaModule.controller("UploadImgCtrl", UploadImgCtrl);

import GrupoGestorContainer from "./grupogestor-components/container.component"
pracaModule.component("pracaGrupogestor", GrupoGestorContainer)

import GrupoGestorDialogController from "./grupogestor-components/grupogestor.dialog.ctrl"
pracaModule.controller("GrupoGestorDialogController", GrupoGestorDialogController)

import MembroGestorDialogController from "./grupogestor-components/membrogestor.dialog.ctrl"
pracaModule.controller("MembroGestorDialogController", MembroGestorDialogController)

import PracaGaleriaContent from "./galeria-components/praca-galeria-content.component"
pracaModule.component("pracaGaleriaContent", PracaGaleriaContent);

import PracaGaleriaCtrl from "./praca-galeria.controller";
pracaModule.controller("PracaGaleriaCtrl", PracaGaleriaCtrl);

import UnidadeGestoraContainer from "./unidadegestora-components/container.component"
pracaModule.component("pracaUnidadegestora", UnidadeGestoraContainer)

import MembroUglDialogController from "./unidadegestora-components/membrougl.dialog.ctrl"
pracaModule.controller("MembroUglDialogController", MembroUglDialogController)

export default pracaModule;
