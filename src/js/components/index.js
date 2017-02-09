import angular from "angular";

let componentsModule = angular.module("app.components", []);

import ListErrors from "./list-errors.component";
componentsModule.component("listErrors", ListErrors);

import ShowAuthed from "./show-authed.directive";
componentsModule.directive("showAuthed", ShowAuthed);

import resizable from "./resizable.directive";
componentsModule.directive("resizable", resizable);

import ListElement from "./praca-list.component";
componentsModule.directive("listElement", ListElement);

import pracaCard from "./praca-card";
componentsModule.directive("pracaCard", pracaCard)

import pracaList from "./praca-list";
componentsModule.directive("pracaList", pracaList)

export default componentsModule;
