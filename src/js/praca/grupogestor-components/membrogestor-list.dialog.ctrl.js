export default class MembroGestorListDialogController {
    constructor($state, $mdDialog, $log, Toast, GrupoGestor, ErrorCatcher, praca) {
        "ngInject"

        angular.extend(this, {
            $state,
            $mdDialog,
            $log,
            Toast,
            GrupoGestor,
            ErrorCatcher,
            praca
        });

        GrupoGestor.list_gruposGestores(this.praca, this.praca.grupo_gestor).then((res) => {
            this.gruposgestores = res.data
        });


        $(document).ready(() => {
            $(".collapsible").collapsible({accordion: true});
        });

    }

    expandAll() {
        $(".collapsible-header").addClass("active");
        $(".collapsible").collapsible({accordion: false});
    }

    collapseAll() {
        $(".collapsible-header").removeClass(function () {
            return "active";
        });
        $(".collapsible").collapsible({accordion: true});
        $(".collapsible").collapsible({accordion: false});
    }

    membroGestorEditDialog(event, praca, objValue) {
        this.$mdDialog.show({
            controller: "MembroGestorDialogController",
            controllerAs: "$ctrl",
            templateUrl: "praca/grupogestor-components/membrogestor.dialog.tmpl.html",
            locals: {praca, objValue},
            bindToController: true,
            multiple: true,
            clickOutsideToClose: true,
            targetEvent: event,
            fullscreen: true,
        })
    }
}