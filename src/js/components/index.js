import angular from "angular";

let componentsModule = angular.module("app.components", []);

import ListErrors from "./list-errors.component";
componentsModule.component("listErrors", ListErrors);

import ShowAuthed from "./show-authed.directive";
componentsModule.directive("showAuthed", ShowAuthed);

import resizable from "./resizable.directive";
componentsModule.directive("resizable", resizable);

export default componentsModule;
