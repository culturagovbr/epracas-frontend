export default class RhListDialogController {
  constructor($state, $mdDialog, $log, orderByFilter, Toast, RecursoHumano, ErrorCatcher, praca) {
    "ngInject"

    angular.extend(this, {
      $state,
      $mdDialog,
      $log,
      orderByFilter,
      Toast,
      RecursoHumano,
      ErrorCatcher,
      praca,
    })

    this.isSaving = false

    RecursoHumano.list(praca)
    .then(res => this.rhs = this.orderByFilter(res.data, 'data_saida', true))
  }

  cancel() { this.$mdDialog.cancel() }

  rhEditDialog(praca, rh) {
    this.$mdDialog.show({
      controller: "RhAddDialogController",
      controllerAs: "$ctrl",
      templateUrl: "praca/rh-components/rh-add.dialog.tmpl.html",
      locals: { praca, rh },
      fullscreen: true,
      multiple: true,
    })
  }

  rhEndDialog(praca, rh) {
    this.$mdDialog.show({
      controller: ["$state", "$mdDialog", "RecursoHumano", "Toast", function DialogController($state, $mdDialog, RecursoHumano, Toast) {
        this.finalizaVinculo = () => {
          angular.extend(rh, this.rh)
          RecursoHumano.delete(praca, rh)
            .then(() => {
              Toast.showSuccessToast("Vinculo finalizado com sucesso")
              $mdDialog.cancel()
              $state.reload()
            })
        }

        this.cancel = () => {
          $mdDialog.cancel()
        }
      }],
      controllerAs: "$ctrl",
      template: `
        <md-dialog layout="column" flex="50" aria-label="Adiciona um Recurso Humano à Praça">
          <form name="RhEndForm" ng-submit="$ctrl.finalizaVinculo($ctrl.praca, $ctrl.rh)">
            <md-dialog-content>

              <md-content md-theme="docs-dark" layout-padding>
                <div layout="row" layout-align="space-between center">
                  <h2>Adicione um Recurso Humano à Praça</h2>
                </div>
              </md-content>

              <md-content layout="column" layout-padding>
                <md-input-container class="md-block" flex>
                  <label>Data de encerramento de vinculo</label>
                  <md-datepicker name="datasaidaRh" ng-required="true" ng-model="$ctrl.rh.data_saida"></md-datepicker>
                </md-input-container>
              </md-content>
            </md-dialog-content>

            <md-dialog-actions>
              <md-button ng-click="$ctrl.cancel()">
                Cancelar
              </md-button>
              <md-button class="md-no-focus md-raised md-primary" type="submit" ng-disabled="RhEndForm.$invalid">
                Enviar
              </md-button>
            </md-dialog-actions>

          </form>
        </md-dialog>
    `,
      locals: { rh },
      fullscreen: true,
    })
  }
}
