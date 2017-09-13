export default class ParceirosListDialogCtrl {
    constructor($state, $mdDialog, $log, $http, Toast, ErrorCatcher, AppConstants, praca) {
        "ngInject"

        angular.extend(this, {
            $state,
            $mdDialog,
            $log,
            $http,
            Toast,
            ErrorCatcher,
            AppConstants,
            praca,
        })
        // @TODO: refatorar para o service de Parceiros
        $http({
            url: `${this.AppConstants.api}/pracas/${this.praca.id_pub}/parceiros/`,
            method: "GET"
        }).then((response) => {
            this.parceiros = response.data.filter((parceiro) => { return parceiro.praca === this.praca.id_pub })
        });
    }

    parceiroEditDialog(praca, parceiro) {
        this.$mdDialog.show({
          controller: "ParceirosCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/parceiros-components/parceiros-dialog.tmpl.html",
          locals: { praca, parceiro },
          bindToController: true,
          fullscreen: true,
          multiple: true,
        })
    }

    parceiroDelDialog(praca, parceiro) {
        const caller = this.ErrorCatcher.callerName()

        this.$mdDialog.show(
            this.$mdDialog.confirm()
            .title("Excluir Parceiro")
            .textContent("Ao excluir uma, informação você subtrai ela do sistema e impede que ela seja processada para qualquer tipo de estatistica. Tem certeza que deseja excluir esta informação?")
            .ariaLabel("Excluir Parceiro")
            .ok("Sim, excluir parceiro")
            .cancel("Não excluir parceiro"))
            .then(() => {
                this.$http({
                    url: `${this.AppConstants.api}/pracas/${this.praca.id_pub}/parceiros/${parceiro.id_pub}`,
                    method: "DELETE",
                    data: parceiro
                })
                .then(() => {
                    this.parceiros = this.parceiros.filter((res) => res !== parceiro)
                    this.Toast.showSuccessToast("Parceiro excluído com sucesso")
                    this.$state.reload()
                })
                .catch((err) => {
                    this.Toast.showRejectedToast("Erro ao excluir parceiro")
                    this.ErrorCatcher.error(caller, err)
                })
            })
    }
}