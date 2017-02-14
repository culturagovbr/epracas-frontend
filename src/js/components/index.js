import angular from "angular";

let componentsModule = angular.module("app.components", []);

import ListErrors from "./list-errors.component";
componentsModule.component("listErrors", ListErrors);

import ShowAuthed from "./show-authed.directive";
componentsModule.directive("showAuthed", ShowAuthed);

import resizable from "./resizable.directive";
componentsModule.directive("resizable", resizable);

// import ListElement from "./praca/list.component";
// componentsModule.directive("listElement", ListElement);

import PracaCard from "./praca/card.component";
componentsModule.component("pracaCard", PracaCard)

import PracaList from "./praca/list.component";
componentsModule.component("pracaList", PracaList)

export default componentsModule;
