import angular from "angular"

import UserService from "./user.service"
import JwtService from "./jwt.service"
import PracaService from "./praca.service"
import ErrorCatcherService from "./errorcatcher.service"
import AtividadeService from "./atividade.service"
import VinculacaoService from "./vinculacao.service"
import ToastService from "./toast.service"
import GrupoGestorService from "./grupogestor.service"
import UnidadeGestoraService from "./unidadegestora.service"

// Create the module where our functionality can attach to
const servicesModule = angular.module("app.services", [])

.service("User", UserService)
.service("JWT", JwtService)
.service("Praca", PracaService)
.service("ErrorCatcher", ErrorCatcherService)
.service("Atividade", AtividadeService)
.service("Vinculacao", VinculacaoService)
.service("Toast", ToastService)
.service("GrupoGestor", GrupoGestorService)
.service("UnidadeGestora", UnidadeGestoraService)

export default servicesModule
