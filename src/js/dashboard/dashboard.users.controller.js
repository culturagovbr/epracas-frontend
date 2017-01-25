class DashboardUsersCtrl {
  constructor($state, $mdDialog, $log, AppConstants, User, Toast) {
    "ngInject";

    this._$mdDialog = $mdDialog;
    this._$log = $log;
    this._AppConstants = AppConstants;
    this._User = User;
    this._Toast = Toast;

    User.list()
      .then(users => users.map(this.buildMenu))
      .then(mappedUsers => this.users = mappedUsers) 
      .catch(
        err => $log.log(`Error: DashBoardUsers ${err}`)
      );

    const self = this;
  }

  buildMenu(user) {
    user.menu = {};
    user.menu.userInfo = {
      name: "Visualizar informações do usuário",
      icon: "info",
    };

    if (user.is_staff === false) {
      user.menu.changeStaffPowers = {
        name: "Conceder acesso como gestor do Ministério",
        icon: "supervisor_account",
        action: self.grantStaffPowers,
        dialog: self._$mdDialog,
        _User: self._User,
        _Toast: self._Toast,
      };
    } else {
      user.menu.changeStaffPowers = {
        name: "Revogar acesso como gestor do Ministério",
        icon: "clear",
        action: self.revokeStaffPowers,
        dialog: self._$mdDialog,
        _User: self._User,
        _Toast: self._Toast,
      };
    }

    user.menu.deleteUser = {
      name: "Excluir usuário",
      icon: "delete",
      action: self.deleteUser,
      dialog: self._$mdDialog,
      _User: self._User,
      _Toast: self._Toast,
    };

    return user;
  }

  grantStaffPowers(id_pub, status) {
    this.dialog.show(
      this.dialog.confirm()
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
    this.dialog.show(
      this.dialog.confirm()
        .title("Revogar permissões de Gestor do MinC")
        .textContent("Ao revogar as permissões de Gestor do MinC, o usuário ainda poderá utilizar o sistema, porém, não poderá executar tarefas administrativas e nem visualizar informações que não sejam públicas.")
        .ariaLabel("Revogar permissões de Gestor do MinC")
        // .targetEvent(ev)
        .ok("Sim, revogar permissão")
        .cancel("Não, mantenha a permissão")
    )
    .then(
      () => this._User.changeStaffPowers(id_pub, false)
        .then(
          this._Toast.showSuccessToast("Permissões revogadas com sucesso")
        )
        .catch(
          (err) => {
            this._Toast.showRejectedToast(`Problema ao revogar permissões. ${err.data}`);
          }
        )
    );
  }

  deleteUser(user) {
    this.dialog.show(
      this.dialog.confirm()
        .title("Excluir Usuário")
        .textContent("Ao excluir um usuário, você remove quaisquer permissões que ele tenha no e-Praças, permitindo que ele tenha acesso apenas às informações publicas disponiveis.")
        .ariaLabel("Excluir Usuário")
        .ok("Sim, excluir usuário")
        .cancel("Não, matenha o usuário")
    )
    .then(
      () => this._User.delete(user)
    );
  }
}

export default DashboardUsersCtrl;
