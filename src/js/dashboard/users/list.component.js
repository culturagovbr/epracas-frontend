class DashboardUsersCtrl {
  constructor($state, $mdDialog, $log, AppConstants, User, Toast, ErrorCatcher) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $log,
      AppConstants,
      User,
      Toast,
      ErrorCatcher,
    })

    User.list()
      .then(users => this.users = users)
      .catch((err) => {
        ErrorCatcher.error("DashboardUsersCtrl.constructor", err)
      })
  }

  deleteUser(user) {
    const caller = this.ErrorCatcher.callerName()

    this.$mdDialog.show(
      this.$mdDialog.confirm()
      .title("Excluir Usuário")
      .textContent("Ao excluir um usuário, você remove quaisquer permissões que ele tenha no e-Praças, permitindo que ele tenha acesso apenas às informações publicas disponiveis.")
      .ariaLabel("Excluir Usuário")
      .ok("Sim, excluir usuário")
      .cancel("Não, matenha o usuário"))
      .then(() => this.User.delete(user.sub))
      .then(() => {
        const idx = this.users.indexOf(user)
        if (idx >= 0) {
          this.users.splice(idx, 1)
        }
      })
      .then(this._Toast.showSuccessToast("Usuário excluido com sucesso"))
      .catch((err) => {
        this.ErrorCatcher.error(caller, err)
        this.Toast.showRejectedToast(`Problema ao excluir usuário. ${err.data}`)
      })
  }
}

const DashboardUsersListElement = {
  controller: DashboardUsersCtrl,
  template: `
  <div layout="row" layout-margin>
    <user-card user="user" on-delete="$ctrl.deleteUser(user)" ng-repeat="user in $ctrl.users" class="col s12 m6 l4">
    </user-card>
  </div>
  `,
  bindings: {
    user: "<",
  },
}

export default DashboardUsersListElement
