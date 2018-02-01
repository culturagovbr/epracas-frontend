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

    membroGestorEditDialog(event, praca, membrogestor) {
        this.$mdDialog.show({
            controller: "MembroGestorDialogController",
            controllerAs: "$ctrl",
            templateUrl: "praca/grupogestor-components/membrogestor.dialog.tmpl.html",
            locals: {praca, membrogestor},
            bindToController: true,
            multiple: true,
            clickOutsideToClose: true,
            targetEvent: event,
            fullscreen: true,
        })
    }

    membroGestorEndDialog(event, praca, membrogestor) {

        console.info('membrogestor');
        console.info(membrogestor);
        const caller = this.ErrorCatcher.callerName();

        this.$mdDialog.show({
            controller: ["$state", "$mdDialog", "GrupoGestor", "Toast", function DialogController($state, $mdDialog, GrupoGestor, Toast) {
                this.finalizaGestao = () => {
                    GrupoGestor.delete_membrogestor(praca, praca.grupo_gestor, membrogestor)
                        .then(() => {
                            Toast.showSuccessToast("Gestão encerrada com sucesso")
                            $mdDialog.cancel();
                            $state.reload()
                        })
                };

                this.cancel = () => {
                    $mdDialog.cancel()
                }
            }],
            controllerAs: "$ctrl",
            template: `
                <md-dialog layout="column" flex="50" aria-label="Encerra vínculo de um Gestor">
                    <form name="MembroGestorEndForm" ng-submit="$ctrl.finalizaGestao($event, $ctrl.praca, $ctrl.membrogestor)">
                        <md-dialog-content>
                            <md-content md-theme="docs-dark" layout-padding>
                                <div layout="row" layout-align="space-between center">
                                    <h2>Remover um Gestor do Grupo</h2>
                                </div>
                            </md-content>
                            
                            <md-content layout="column" layout-padding>
                                <md-input-container class="md-block" flex>
                                    <label>Data de desligamento</label>
                                    <md-datepicker name="dataSaidaGrupo" ng-required="true" ng-model="$ctrl.membrogestor.data_desligamento"  md-placeholder="Selecione uma data"></md-datepicker>
                                </md-input-container>
                            </md-content>
                        </md-dialog-content>
                        <md-dialog-actions>
                          <button type="button" ng-click="$ctrl.cancel()" class="btn waves-effect waves-orange transparent orange-text">Cancelar</button>
                          <button class="btn waves-effect waves-light orange darken-2" type="submit" ng-disabled="MembroGestorEndForm.$invalid">Salvar</button>
                        </md-dialog-actions>
                    </form>
                </md-dialog>`,
            bindToController: true,
            locals: {praca, membrogestor},
            multiple: true,
            clickOutsideToClose: true,
            targetEvent: event,
            fullscreen: true,
        })
    }
}