export default class MembroUglListDialogController {
    constructor($state, $mdDialog, $log, Toast, UnidadeGestora, ErrorCatcher, praca) {
        "ngInject"

        angular.extend(this, {
            $state,
            $mdDialog,
            $log,
            Toast,
            UnidadeGestora,
            ErrorCatcher,
            praca,
        })

        UnidadeGestora.list(praca)
        .then(res => this.unidade_gestora = res.data)
    }

    uglEditDialog(praca, membrougl) {
        this.$mdDialog.show({
            controller: "MembroUglDialogController",
            controllerAs: "$ctrl",
            templateUrl: "praca/unidadegestora-components/membrougl.dialog.tmpl.html",
            locals: { praca, membrougl },
            bindToController: true,
            fullscreen: true,
            multiple: true,
        })
    }

    uglDelDialog(praca, membrougl) {
        this.$mdDialog.show(
            this.$mdDialog.confirm()
            .title("Excluir membro da Unidade Gestora Local")
            .textContent("Ao excluir uma informação, você subtrai ela do sistema e impede que ela seja processada para qualquer tipo de estatistica. Tem certeza que deseja excluir esta informação?")
            .ariaLabel("Excluir membro da Unidade Gestora Local")
            .ok("Sim, excluir Membro")
            .cancel("Não, não excluir o Membro"))
            .then(() => {
                this.UnidadeGestora.delete(praca, membrougl)
                    .then(() => {
                        this.Toast.showSuccessToast("Excluído com sucesso")
                        this.$state.reload()
                    })
                    .catch((err) => {
                        this.Toast.showRejectedToast("Erro ao excluir")
                        this.ErrorCatcher.error(caller, err)
                    })
            })
    }
}