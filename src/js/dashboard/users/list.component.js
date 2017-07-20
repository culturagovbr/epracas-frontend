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
    debugger
    this.$mdDialog.confirm()
    .title("Oi")
    .textContent("Ola ola")
    .ok("Sim")
    .cancel("Não")
    const idx = this.users.indexOf(user)
    if (idx >= 0) {
      this.users.splice(idx, 1)
    }
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
