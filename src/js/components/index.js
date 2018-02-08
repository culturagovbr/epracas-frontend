import angular from "angular"
import ListErrors from "./list-errors.component"
import ShowAuthed from "./show-authed.directive"
import resizable from "./resizable.directive"
import PracaCard from "./praca/card.component"
import PracaList from "./praca/list.component"
import ZoomableImage from "./zoomable-image"
import EventPreviewer from "./event-previewer"
import leafletFlexFit from "./leaflet-fix.directive"
import scroll from "./scroll.directive"
import ShowAuthedManagers from "./show-authed-managers.directive"
import "angular-locale-pt-br"
import "angular-input-masks"

const componentsModule = angular.module("app.components", ["ui.utils.masks"])

componentsModule.component("listErrors", ListErrors)
componentsModule.directive("showAuthed", ShowAuthed)
componentsModule.directive("resizable", resizable)
componentsModule.component("pracaCard", PracaCard)
componentsModule.component("pracaList", PracaList)
componentsModule.component("zoomableImage", ZoomableImage)
componentsModule.component("eventPreviewer", EventPreviewer)
componentsModule.directive("ttLeafletFlexFit", leafletFlexFit)
componentsModule.directive("scroll", scroll)
componentsModule.directive("showAsManager", ShowAuthedManagers)

export default componentsModule;
