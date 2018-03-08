import angular from "angular"
import moment from "moment"

class PracaAtividadeCtrl {
  constructor($scope, $document, $window, $mdDialog, $log, User, Atividade, $timeout, Praca, objData){
    "ngInject";
    
    angular.extend(this, {
      $scope,
      $document,
      $mdDialog,
      $log,
      currentUser: User.current,
    })
    
    this.praca = {}
  
    Atividade.options().then(
          (data) => {
              objData.tipos = data.tipo.choices.filter((objValue) => {return (objData.tipo == objValue.value)});
              objData.espacos = data.espaco.child.choices.filter((objValue) => {return (objData.espaco.indexOf(objValue.value) >= 0)});
              objData.faixa_etarias = data.faixa_etaria.child.choices.filter((objValue) => {return (objData.faixa_etaria.indexOf(objValue.value) >= 0)});
              objData.territorios = data.territorio.choices.filter((objValue) => {return (objData.territorio == objValue.value)});
              objData.publicos = data.publico.choices.filter((objValue) => {return (objData.publico == objValue.value)});
          }
      );

    objData.ocorrencia.repeat_until = moment(objData.ocorrencia.repeat_until).format("DD/MM/YYYY");
    objData.ocorrencia.start = moment(objData.ocorrencia.start).format("DD/MM/YYYY");
    this.objData = objData;

    Praca.get(this.objData.praca).then((response) => {
      this.objData.praca = response
      this.praca = response
      this.userMenu = this.buildMenu(this.currentUser)
    })
  }
  
  permissionIsManagerOrAdmin(user, praca){
    if (user.is_staff === true) {
     return true
    } else if ((angular.isDefined(praca.gestor) && praca.gestor !== null)) {
      return user.id_pub == praca.gestor.user_id_pub
    } else {
      return false
    }
  }

  showDialog($event, dialog) {
    dialog.targetEvent = $event
    this.$mdDialog.show(dialog)
  }

  dialogDelete(event, mixDelete, praca, objValue) {
    //event.stopPropagation()
    //const caller = this.ErrorCatcher.callerName()
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

  buildMenu(currentUser) {
    const userMenu = {}

    if (this.permissionIsManagerOrAdmin(this.currentUser, this.praca)) {
      userMenu.event = {
        id: "evento",
        name: "Adicionar Evento",
        icon: "add",
        dialog: {
          controller: "EventCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/event-dialog.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: this.praca },
          fullscreen: true,
        },
      }

      userMenu.edit = {
        id: "evento",
        name: "Editar Evento",
        icon: "create",
        dialog: {
          controller: "EventCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/event-dialog.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: this.praca },
          bindToController: true,
          multiple: true,
          clickOutsideToClose: true,
          targetEvent: event,
          fullscreen: true,
        },
      }

      userMenu.exclud = {
        id: "evento",
        name: "Excluir Evento",
        icon: "delete",
        dialog: this.dialogDelete(),
      }
    }
    return userMenu
  }

}

export default PracaAtividadeCtrl
