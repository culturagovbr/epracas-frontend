import angular from "angular"
import PracaConfig from "./praca.config"
import PracaListCtrl from "./praca-list.controller"
import PracaDetailCtrl from "./praca-detail.controller"
import ChangeHeaderImgCtrl from "./header.controller"
import VinculacaoCtrl from "./vinculacao.controller"
import EventCtrl from "./event.controller"
import PracaInfoCtrl from "./pracainfo.controller"
import UploadImgCtrl from "./galeria-upload.controller"
import ParceirosCtrl from "./parceiros-components/parceiros.controller"
import Parceiros from "./parceiros-components/parceiros.component"
import ParceiroImgController from "./parceiros-components/parceiros-img-upload.dialog.ctrl"
import GrupoGestor from "./grupogestor-components/grupogestor.component"
import GrupoGestorDialogController from "./grupogestor-components/grupogestor.dialog.ctrl"
import MembroGestorDialogController from "./grupogestor-components/membrogestor.dialog.ctrl"
import MembroGestorListDialogController from "./grupogestor-components/membrogestor-list.dialog.ctrl"
import PracaGaleriaCtrl from "./praca-galeria.controller"
import PracaGaleriaContent from "./galeria-components/praca-galeria-content.component"
import UnidadeGestoraContainer from "./unidadegestora-components/container.component"
import MembroUglDialogController from "./unidadegestora-components/membrougl.dialog.ctrl"
import MembroUglListDialogController from "./unidadegestora-components/membrougl-list.dialog.ctrl"
import GaleriaEditDialogCtrl from "./galeria-edit.dialog.ctrl"
import PracaAtividadeCtrl from "./praca-atividade.ctrl"
import RecursosHumanos from "./rh-components/recursos-humanos.component"
import RhDialogController from "./rh-components/rh.dialog.ctrl"
import Atores from "./atores-components/atores.component"
import AtoresCtrl from "./atores-components/atores.controller"
import PracaCardComponent from "./praca-card.component"

const pracaModule = angular.module("app.praca", [])

pracaModule.config(PracaConfig)
pracaModule.controller("PracaListCtrl", PracaListCtrl)
pracaModule.controller("PracaDetailCtrl", PracaDetailCtrl)
pracaModule.controller("ChangeHeaderImgCtrl", ChangeHeaderImgCtrl)
pracaModule.controller("VinculacaoCtrl", VinculacaoCtrl)
pracaModule.controller("EventCtrl", EventCtrl)
pracaModule.controller("PracaInfoCtrl", PracaInfoCtrl)
pracaModule.controller("UploadImgCtrl", UploadImgCtrl)
pracaModule.controller("ParceirosCtrl", ParceirosCtrl)
pracaModule.component("pracaParceiros", Parceiros)
pracaModule.controller("ParceiroImgController", ParceiroImgController)
pracaModule.component("pracaGrupogestor", GrupoGestor)
pracaModule.controller("GrupoGestorDialogController", GrupoGestorDialogController)
pracaModule.controller("MembroGestorDialogController", MembroGestorDialogController)
pracaModule.controller("MembroGestorListDialogController", MembroGestorListDialogController)
pracaModule.component("pracaGaleriaContent", PracaGaleriaContent)
pracaModule.controller("PracaGaleriaCtrl", PracaGaleriaCtrl)
pracaModule.component("pracaUnidadegestora", UnidadeGestoraContainer)
pracaModule.controller("MembroUglDialogController", MembroUglDialogController)
pracaModule.controller("MembroUglListDialogController", MembroUglListDialogController)
pracaModule.controller("GaleriaEditDialogCtrl", GaleriaEditDialogCtrl)
pracaModule.controller("PracaAtividadeCtrl", PracaAtividadeCtrl)
pracaModule.component("pracaRh", RecursosHumanos)
pracaModule.controller("RhDialogController", RhDialogController)
pracaModule.component("pracaAtores", Atores)
pracaModule.controller("AtoresCtrl", AtoresCtrl)
pracaModule.component("epPracaCard", PracaCardComponent)

export default pracaModule
