class DashboardUsersCtrl {
  constructor($state, $mdDialog, $log, AppConstants, User) {
    "ngInject";

    this._$mdDialog = $mdDialog;
    this._$log = $log;
    this._AppConstants = AppConstants;

    User.list()
      .then(
        users => (this.users = users)
      )
      .catch(
        err => $log.log(`Error: DashBoardUsers ${err}`)
    );

    this.pracaMenu = {};

    this.pracaMenu.userInfo = {
      name: "Visualizar informações do usuário",
      icon: "info",
    };

    if (angular.isUndefined(User.current.is_staff)) {
      this.pracaMenu.changeStaffPowers = {
        name: "Conceder acesso como gestor do Ministério",
        icon: "supervisor_account",
        action: this.grantStaffPowers,
      };
    } else {
      this.pracaMenu.changeStaffPowers = {
        name: "Revogar acesso como gestor do Ministério",
        icon: "clear",
        action: this.revokeStaffPowers,
      };
    }

    this.pracaMenu.deleteUser = {
      name: "Excluir usuário",
      icon: "delete",
    };
  }


  // showUserInfo(user) {

  // }

  grantStaffPowers(id_pub, status) {
    this._$mdDialog.show(
      this._$mdDialog.confirm()
        .title("Conceder permissões de Gestor do MinC")
        .textContent("Ao conceder permissões de Gestor do MinC, o usuário poderá utilizar o sistema, executar tarefas administrativas e visualizar informações que não sejam públicas.")
        .ariaLabel("Conceder permissões de Gestor do MinC")
        // .targetEvent(ev)
        .ok("Sim, conceder permissão")
        .cancel("Não, não conceda a permissão")
    )
    .then(
      () => this._User.changeStaffPowers(id_pub, true)
    );
  }

  revokeStaffPowers(id_pub, status) {
    this._$mdDialog.show(
      this._$mdDialog.confirm()
        .title("Revogar permissões de Gestor do MinC")
        .textContent("Ao revogar as permissões de Gestor do MinC, o usuário ainda poderá utilizar o sistema, porém, não poderá executar tarefas administrativas e nem visualizar informações que não sejam públicas.")
        .ariaLabel("Revogar permissões de Gestor do MinC")
        // .targetEvent(ev)
        .ok("Sim, revogar permissão")
        .cancel("Não, mantenha a permissão")
    )
    .then(
      () => this._User.changeStaffPowers(id_pub, false)
    );
  }

  deleteUser(user) {
    this._User.delete(user);
  }
}

export default DashboardUsersCtrl;
