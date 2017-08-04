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

  rhDelDialog(praca, rh) {
    const caller = this.ErrorCatcher.callerName()

    this.$mdDialog.show(
      this.$mdDialog.confirm()
      .title("Excluir vinculo de R.H.")
      .textContent("Ao excluir uma informação, você subtrai ela do sistema e impede que ela seja processada para qualquer tipo de estatistica. Tem certeza que deseja excluir esta informação?")
      .ariaLabel("Excluir vinculo de R.H.")
      .ok("Sim, excluir o vinculo")
      .cancel("Não, não excluir o vinculo"))
      .then(() => {
        const data = angular.copy(rh)
        angular.extend(data, { excluir: true })
        this.RecursoHumano.delete(praca, data)
          .then(() => {
            this.rhs = this.rhs.filter(res => res !== rh)
            this.Toast.showSuccessToast("Vinculo excluido com sucesso")
            this.$state.reload()
          })
          .catch((err) => {
            this.Toast.showRejectedToast("Erro ao excluir vinculo")
            this.ErrorCatcher.error(caller, err)
          })
      })
  }
}
