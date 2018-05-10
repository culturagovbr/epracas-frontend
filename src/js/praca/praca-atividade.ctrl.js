import angular from "angular"
import moment from "moment"

class PracaAtividadeCtrl {
  constructor($scope, $document, $window, $mdDialog, $log, User, Atividade, $timeout, Praca, objData, AppConstants, ErrorCatcher, $http, Toast, $state) {
    "ngInject";

    angular.extend(this, {
      $http,
      $scope,
      $document,
      $mdDialog,
      $log,
      $state,
      Toast,
      currentUser: User.current,
      AppConstants,
      ErrorCatcher,
    })

    this.praca = {}

    Atividade.options().then(
      (data) => {
        objData.tipos = data.tipo.choices.filter((objValue) => { return (objData.tipo == objValue.value) });
        objData.espacos = data.espaco.child.choices.filter((objValue) => { return (objData.espaco.indexOf(objValue.value) >= 0) });
        objData.faixa_etarias = data.faixa_etaria.child.choices.filter((objValue) => { return (objData.faixa_etaria.indexOf(objValue.value) >= 0) });
        objData.territorios = data.territorio.choices.filter((objValue) => { return (objData.territorio == objValue.value) });
        objData.publicos = data.publico.choices.filter((objValue) => { return (objData.publico == objValue.value) });
      }
    );

    objData.ocorrencia.repeat_until = moment(objData.ocorrencia.repeat_until).format("DD/MM/YYYY");
    objData.ocorrencia.start = moment(objData.ocorrencia.start).format("DD/MM/YYYY");
    this.objData = objData;

    Praca.get(this.objData.praca).then((response) => {
      this.objData.praca = response
      this.praca = response
    })
  }

  permissionIsManagerOrAdmin(user, praca) {
    if (user.is_staff === true) {
      return true
    } else if ((angular.isDefined(praca.gestor) && praca.gestor !== null)) {
      return user.id_pub == praca.gestor.user_id_pub
    }
    return false
  }


dialogDelete(event, objValue){
  event.stopPropagation()
  const caller = this.ErrorCatcher.callerName()
  if (this.permissionIsManagerOrAdmin(this.currentUser, this.praca)) {
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
        if (typeof objValue.id_pub === "string") {
          this.$http({
            url: `${this.AppConstants.api}/atividades/` + objValue.id_pub,
            method: "DELETE",
            data: objValue,
          }).then(() => {
            this.$state.go('app.praca', { pk: this.objData.praca.id_pub })
            this.Toast.showSuccessToast("Atividade excluída com sucesso")
          }).catch((err) => {
            this.Toast.showRejectedToast("Erro ao excluir")
            this.ErrorCatcher.error(caller, err)
          })
        }
      })
  }
}

editDialog(event, praca, objValue) {
  if (this.permissionIsManagerOrAdmin(this.currentUser, this.praca)) {
    this.$mdDialog.show({
      controller: "EventCtrl",
      controllerAs: "$ctrl",
      templateUrl: "praca/event-dialog.tmpl.html",
      parent: angular.element(this.$document.body),
      locals: { praca, objValue },
      bindToController: true,
      clickOutsideToClose: true,
      targetEvent: event,
      fullscreen: true,
    })
  }
}
}
export default PracaAtividadeCtrl
