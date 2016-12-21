import angular from "angular";

// Create the module where our functionality can attach to
let servicesModule = angular.module("app.services", []);


import UserService from "./user.service";
servicesModule.service("User", UserService);

import JwtService from "./jwt.service";
servicesModule.service("JWT", JwtService);

import PracaService from "./praca.service";
servicesModule.service("Praca", PracaService);

import AtividadeService from "./atividade.service";
servicesModule.service("Atividade", AtividadeService);

import ToastService from "./toast.service";
servicesModule.service("Toast", ToastService);

export default servicesModule;
