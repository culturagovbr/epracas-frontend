import angular from "angular";

let componentsModule = angular.module("app.components", []);

import ListErrors from "./list-errors.component";
componentsModule.component("listErrors", ListErrors);

import ShowAuthed from "./show-authed.directive";
componentsModule.directive("showAuthed", ShowAuthed);

import resizable from "./resizable.directive";
componentsModule.directive("resizable", resizable);

import PracaCard from "./praca/card.component";
componentsModule.component("pracaCard", PracaCard);

import PracaList from "./praca/list.component";
componentsModule.component("pracaList", PracaList);

import ZoomableImage from "./zoomable-image"
componentsModule.component("zoomableImage", ZoomableImage);

import EventPreviewer from "./event-previewer"
componentsModule.component("eventPreviewer", EventPreviewer);

import leafletFlexFit from "./leaflet-fix.directive";
componentsModule.directive("ttLeafletFlexFit", leafletFlexFit);

import scroll from "./scroll.directive";
componentsModule.directive("scroll", scroll);

import ShowAuthedManagers from "./show-authed-managers.directive"
componentsModule.directive("showAsManager", ShowAuthedManagers)

export default componentsModule;
