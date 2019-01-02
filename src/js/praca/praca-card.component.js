import angular from "angular"

class Controller {
  constructor($mdDialog, $http, $state, ErrorCatcher, AppConstants, Toast) {
    "ngInject"

    angular.extend(this, {
      $http,
      $mdDialog,
      $state,
      ErrorCatcher,
      AppConstants,
      Toast,
    })
  }

  dialogForm(event, strCtrl, strUrl, praca, objValue, booDisabled) {
    event.stopPropagation()
    this.$mdDialog.show({
      controller: strCtrl,
      templateUrl: strUrl,
      controllerAs: "$ctrl",
      locals: { praca, objValue, booDisabled },
      bindToController: true,
      clickOutsideToClose: true,
      targetEvent: event,
      fullscreen: true,
    })
  }

  dialogDelete(event, mixDelete, praca, objValue) {
    event.stopPropagation()
    const caller = this.ErrorCatcher.callerName()
    this.$mdDialog.show(
        this.$mdDialog.confirm()
        .title("Você tem certeza?")
        .textContent("Ao excluir, você não poderá reverter esta ação. Será preciso cadastrar novamente.")
        .ariaLabel("Excluir")
        .targetEvent(event)
        .clickOutsideToClose(true)
        .ok("Excluir")
        .cancel("Cancelar"))
      .then(() => {
        if (typeof mixDelete === "string") {
          this.$http({
            url: mixDelete + objValue.id,
            method: "DELETE",
            data: objValue,
          }).then(() => {
            // this.parceiros = this.parceiros.filter((res) => res !== objValue)
            this.Toast.showSuccessToast("Excluído com sucesso")
            this.$state.reload()
          }).catch((err) => {
            this.Toast.showRejectedToast("Erro ao excluir")
            this.ErrorCatcher.error(caller, err)
          })
        } else {
          this.mixDelete.delete(praca, objValue)
          .then(() => {
            // this.atores = this.atores.filter(res => res !== objValue)
            this.Toast.showSuccessToast("Excluido com sucesso")
            this.$state.reload()
          })
          .catch((err) => {
            this.Toast.showRejectedToast("Erro ao excluir ator")
            this.ErrorCatcher.error(caller, err)
          })
        }
      })
  }

  membroGestorEndDialog(event, praca, membrogestor) {
    event.stopPropagation()
    const caller = this.ErrorCatcher.callerName()
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
            <md-dialog layout="column" flex="50">
                <form name="MembroGestorEndForm" ng-submit="$ctrl.finalizaGestao($event, $ctrl.praca, $ctrl.membrogestor)">
                  <md-dialog-content>
                    <md-toolbar>
                      <div class="md-toolbar-tools">
                      <h2>
                          <b>Tem certeza que deseja encerrar o vínculo com este gestor do grupo?</b>
                      </h2>
                      <span flex></span>
                          <md-button class="md-icon-button" ng-click="$ctrl.$mdDialog.cancel()">
                              <md-icon>close</md-icon>
                          </md-button>
                      </div>
                    </md-toolbar>
                    <md-content layout="column" layout-padding>
                        <md-input-container class="md-block" flex>
                            <label>Data de encerramento</label>
                            <md-datepicker name="dataSaidaGrupo" ng-required="true" ng-model="$ctrl.membrogestor.data_desligamento"  md-placeholder="Selecione uma data"></md-datepicker>
                        </md-input-container>
                    </md-content>
                  </md-dialog-content>
                  <md-dialog-actions>
                    <button type="button" ng-click="$ctrl.cancel()" class="btn waves-effect waves-orange transparent orange-text">Cancelar</button>
                    <button class="btn waves-effect waves-light orange darken-2" type="submit" ng-disabled="MembroGestorEndForm.$invalid">Encerrar</button>
                  </md-dialog-actions>
                </form>
            </md-dialog>`,
        bindToController: true,
        locals: { praca, membrogestor },
        multiple: true,
        clickOutsideToClose: true,
        targetEvent: event,
        fullscreen: true,
    })
  }

  rhEndDialog(event, praca, rh) {
    event.stopPropagation()
    this.$mdDialog.show({
      controller: ["$state", "$mdDialog", "RecursoHumano", "Toast", function DialogController($state, $mdDialog, RecursoHumano, Toast) {
        this.finalizaVinculo = () => {
          angular.extend(rh, this.rh)
          RecursoHumano.delete(praca, rh)
            .then(() => {
              Toast.showSuccessToast("Vínculo finalizado com sucesso")
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
        <md-dialog layout="column" flex="50">
          <md-toolbar>
            <div class="md-toolbar-tools">
            <h2>
                <b>Tem certeza que deseja encerrar o vínculo?</b>
            </h2>
            <span flex></span>
                <md-button class="md-icon-button" ng-click="$ctrl.$mdDialog.cancel()">
                    <md-icon>close</md-icon>
                </md-button>
            </div>
          </md-toolbar>
          <form name="RhEndForm" ng-submit="$ctrl.finalizaVinculo($ctrl.praca, $ctrl.rh)">
              <md-content layout="column" layout-padding>
                <md-input-container class="md-block" flex>
                  <label>Data de encerramento</label>
                  <md-datepicker name="datasaidaRh" ng-required="true" ng-model="$ctrl.rh.data_saida"></md-datepicker>
                </md-input-container>
              </md-content>
            </md-dialog-content>
            <md-dialog-actions>
              <button type="button" ng-click="$ctrl.cancel()" class="btn waves-effect waves-orange transparent orange-text">Cancelar</button>
              <button class="btn waves-effect waves-light orange darken-2" type="submit" ng-disabled="RhEndForm.$invalid">Encerrar</button>
            </md-dialog-actions>
          </form>
        </md-dialog>
    `,
      locals: { rh },
      fullscreen: true,
    })
  }
}

const CardComponent = {
  controller: Controller,
  template: `
  <md-card class="hoverable" style="cursor: pointer; min-width: 250px;" ng-click="$ctrl.dialogForm($event, $ctrl.strController, $ctrl.urlDialog, $ctrl.praca, $ctrl.objValue, true)">
    <div layout="column" layout-padding layout-align="center center" style="padding: 20px;">
      <div ng-show="$ctrl.booImg && $ctrl.objValue.image" class="epr-avatar" style="background-image: url('{{$ctrl.objValue.image}}')"></div>
      <div ng-show="$ctrl.booImg && !$ctrl.objValue.image" class="epr-avatar" style="background-image: url('https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y')"></div>
      <span class="epr-name">{{$ctrl.objValue.title}}</span>
      <span class="epr-subname">{{$ctrl.objValue.subtitle}}</span>
      <span layout-align="center center" show-as-manager="true" class="epr-subname">{{$ctrl.objValue.email}}</span>
      <span layout-align="center center" show-as-manager="true" class="epr-subname">{{$ctrl.objValue.telefone}}</span>
    </div>
    <md-card-actions layout="row" layout-align="center center" show-as-manager="true" pracaid="{{$ctrl.praca.id_pub}}" pracagestor="{{$ctrl.praca.gestor.user_id_pub}}">
      <button ng-if="$ctrl.mixDelete != 'rh' && $ctrl.mixDelete != 'membroGestor' " ng-click="$ctrl.dialogDelete($event, $ctrl.mixDelete, $ctrl.praca, $ctrl.objValue)" class="btn waves-effect waves-red transparent orange-text" type="submit" name="action">Excluir</button>
      <button ng-if="$ctrl.mixDelete == 'membroGestor'" ng-click="$ctrl.membroGestorEndDialog($event, $ctrl.praca, $ctrl.objValue)" class="btn waves-effect waves-red transparent orange-text" type="submit" name="action">Excluir</button>
      <button ng-if="$ctrl.mixDelete == 'rh'" ng-click="$ctrl.rhEndDialog($event, $ctrl.praca, $ctrl.objValue)" class="btn waves-effect waves-red transparent orange-text" type="submit" name="action">Excluir</button>
      <button ng-click="$ctrl.dialogForm($event, $ctrl.strController, $ctrl.urlDialog, $ctrl.praca, $ctrl.objValue, false)" class="btn waves-effect waves-green transparent orange-text" type="submit" name="action">Editar</button>
    </md-card-actions>
  </md-card>
  `,
  bindings: {
    booImg: "<",
    praca: "<",
    objValue: "<",
    mixDelete: "<",
    urlDialog: "<",
    strController: "<",
    onDelete: "&",
  },
}

export default CardComponent
