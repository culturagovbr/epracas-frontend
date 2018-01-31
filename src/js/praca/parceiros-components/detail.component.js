class ParceirosDetailController {
  constructor($mdDialog, ErrorCatcher, AppConstants) {
    "ngInject"
    angular.extend(this, {
      $mdDialog,
      ErrorCatcher,
      AppConstants,
    })
  }

  showAddDialog(praca) {
    this.$mdDialog.show({
      controller: "ParceirosCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/parceiros-components/parceiros-dialog.tmpl.html",
      locals: { praca },
      fullscreen: true,
    })
  }

  showListDialog(praca) {
    this.$mdDialog.show({
      controller: "ParceirosListDialogCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/parceiros-components/parceiros-list.dialog.tmpl.html",
      locals: { praca },
      fullscreen: true,
    })
  }

  dialogVisualize(event, praca, parceiro) {
    let booDisabled = true;
    event.stopPropagation();
    this.$mdDialog.show({
      controller: "ParceirosCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/parceiros-components/parceiros-dialog.tmpl.html",
      locals: { praca, parceiro , booDisabled},
      bindToController: true,
      clickOutsideToClose:true,
      targetEvent: event,
      fullscreen: true,
    })
  }

  dialogEdit(event, praca, parceiro) {
    event.stopPropagation();
    let booDisabled = false;
    this.$mdDialog.show({
      controller: "ParceirosCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/parceiros-components/parceiros-dialog.tmpl.html",
      locals: { praca, parceiro, booDisabled},
      bindToController: true,
      clickOutsideToClose:true,
      targetEvent: event,
      fullscreen: true,
    })
  }
  dialogDelete(event, praca, parceiro) {
    event.stopPropagation();
    const caller = this.ErrorCatcher.callerName()
    this.$mdDialog.show(
      this.$mdDialog.confirm()
        .title("Você tem certeza?")
        .textContent("Ao excluir um parceiro, você não poderá reverter esta ação. Será preciso cadastrar novamente.")
        .ariaLabel("Excluir Parceiro")
        .targetEvent(event)
        .clickOutsideToClose(true)
        .ok("Excluir")
        .cancel("Cancelar"))
      .then(() => {
        this.$http({
          url: `${this.AppConstants.api}/pracas/${this.praca.id_pub}/parceiros/${parceiro.id_pub}`,
          method: "DELETE",
          data: parceiro
        }).then(() => {
          this.parceiros = this.parceiros.filter((res) => res !== parceiro)
            this.Toast.showSuccessToast("Parceiro excluído com sucesso")
            this.$state.reload()
        }).catch((err) => {
          this.Toast.showRejectedToast("Erro ao excluir parceiro")
            this.ErrorCatcher.error(caller, err)
        })
    })
  }
}

const ParceirosDetailElement = {
  controller: ParceirosDetailController,
  template: `
    <md-card class="hoverable" ng-click="$ctrl.dialogVisualize($event, $ctrl.praca, $ctrl.parceiro)" style="cursor: pointer; min-width: 250px;">
      <div layout="column" layout-padding layout-align="center center" style="padding: 20px;">
        <div ng-show="$ctrl.parceiro.imagem" class="epr-avatar" style="background-image: url('{{$ctrl.parceiro.imagem}}')"></div>
        <div ng-show="!$ctrl.parceiro.imagem" class="epr-avatar" style="background-image: url('https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y')"></div>
        <span flex class="epr-name">{{ $ctrl.parceiro.nome }}</span>
        <span flex class="epr-subname">
          <p>{{$ctrl.parceiro.ramo_atividade_name}}</p>
        </span>
      </div>
      <md-card-actions layout="row" layout-align="center center" show-as-manager="true">
        <button ng-click="$ctrl.dialogDelete($event, $ctrl.praca, $ctrl.parceiro)" class="btn waves-effect waves-red transparent orange-text" type="submit" name="action">Excluir
          <!--<i class="material-icons left">delete</i>-->
        </button>
        <button ng-click="$ctrl.dialogEdit($event, $ctrl.praca, $ctrl.parceiro)" class="btn waves-effect waves-green transparent orange-text" type="submit" name="action">Editar
          <!--<i class="material-icons left">edit</i>-->
        </button>
      </md-card-actions>
    </md-card>
    `,
  bindings: {
    parceiro: "<",
    onDelete: "&",
  },
}

export default ParceirosDetailElement
