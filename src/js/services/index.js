import angular from "angular"

import UserService from "./user.service"
import JwtService from "./jwt.service"
import PracaService from "./praca.service"
import AtividadeService from "./atividade.service"
import VinculacaoService from "./vinculacao.service"
import ToastService from "./toast.service"
// Create the module where our functionality can attach to
const servicesModule = angular.module("app.services", [])

.service("User", UserService)
.service("JWT", JwtService)
.service("Praca", PracaService)
.service("Atividade", AtividadeService)
.service("Vinculacao", VinculacaoService)
.service("Toast", ToastService)

export default servicesModule
