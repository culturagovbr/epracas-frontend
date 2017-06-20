class UserCardController {
  constructor($mdDialog, User, Toast) {
    "ngInject";

    this._$mdDialog = $mdDialog;
    this._User = User;
    this._Toast = Toast;

  }

  $onInit(){
    const user = this.buildMenu(this.user);
  }

  buildMenu(user) {
      let menu = {
        userInfo: {
          name: "Visualizar informações do usuário",
          icon: "info",
          action: this.showUserDetailDialog(user),
          dialog: this._$mdDialog,
        },
        changeStaffPowers: {
          dialog: this._$mdDialog,
          _User: this._User,
          _Toast: this._Toast
        },
        deleteUser: {
          name: "Excluir usuário",
          icon: "delete",
          action: this.deleteUserFactory(user.sub),
          dialog: this._$mdDialog,
          _User: this._User,
          _Toast: this._Toast,
        }
      };

      if (user.is_staff === false) {
        Object.assign(menu.changeStaffPowers, {
          name: "Conceder acesso como gestor do Ministério",
          icon: "supervisor_account",
          action: this.grantStaffPowersFactory(user.sub),
        });
      } else {
        Object.assign(menu.changeStaffPowers, {
          name: "Revogar acesso como gestor do Ministério",
          icon: "clear",
          action: this.revokeStaffPowersFactory(user.sub),
        })
      }

      user.menu = menu;
      return user;
  }

  grantStaffPowersFactory(sub)
  {
    return function() {
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
            () => this._User.changeStaffPowers(sub, true)
            .then(this._Toast.showSuccessToast("Permissão concedida com sucesso"))
            .catch((err) => this._Toast.showRejectedToast(`Problemas ao conceder permissão. ${err.data}`))
            );
    };
  }

  revokeStaffPowersFactory(sub)
  {
    return function() {
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
            () => this._User.changeStaffPowers(sub, false)
            .then(this._Toast.showSuccessToast("Permissões revogadas com sucesso"))
            .catch((err) => this._Toast.showRejectedToast(`Problema ao revogar permissões. ${err.data}`))
            );
    }
  }

  deleteUserFactory(sub)
  {
    return function() {
      this.dialog.show(
          this.dialog.confirm()
          .title("Excluir Usuário")
          .textContent("Ao excluir um usuário, você remove quaisquer permissões que ele tenha no e-Praças, permitindo que ele tenha acesso apenas às informações publicas disponiveis.")
          .ariaLabel("Excluir Usuário")
          .ok("Sim, excluir usuário")
          .cancel("Não, matenha o usuário")
          )
        .then(
            () => this._User.delete(sub)
            .then(this._Toast.showSuccessToast("Usuário excluido com sucesso"))
            .catch((err) => this._Toast.showRejectedToast(`Problema ao excluir usuário. ${err.data}`))
            );
    }
  }

  showUserDetailDialog(user, ev)
  {
    return function() {
      this.dialog.show({
        controller: "UserDetailController",
        controllerAs: "$ctrl",
        templateUrl: "dashboard/users/user-detail-dialog.html",
        targetEvent: ev,
        locals: { user: user },
        fullscreen: true,
      })
    }
  }
}

const UserCardElement = {
  controller: UserCardController,
  template: `
        <div class='col s12 m6 l4 '>
            <md-card style="min-height: 215px;">
            <div class="epr-avatar" style="background-image: url('{{$ctrl.user.profile_picture_url}}')">
            </div>
            <span class="epr-name">{{$ctrl.user.full_name}}</span>
            <!-- <span class="epr-subname">@João Pessoa - PB</span> -->
            <md-card-actions layout="row">
                <div layout="row" layout-align="space-between">
                <md-button class="md-icon-button no-action-btn"
                aria-label="is_staff">
                <md-tooltip>Este usuário<span ng-if="!$ctrl.user.is_staff"> não</span> é um administrador</md-tooltip>
                <md-icon ng-style="{
                color: $ctrl.user.is_staff? 'green' : 'red'
                }">supervisor_account</md-icon>
                </md-button>
        
                <md-button class="md-icon-button no-action-btn"
                aria-label="is_">
                <md-tooltip>Este usuário<span ng-if="!$ctrl.user.praca_manager"> não</span> é um gestor de praças.</md-tooltip>
                <md-icon ng-style="{
                color: $ctrl.user.praca_manager? 'green':'red'
                }">store</md-icon>
                </md-button>
        
                <div flex></div>
        
                <md-menu>
                <md-button class="md-icon-button" aria-label="Menu" ng-click="$mdOpenMenu($event)">
                <md-icon>menu</md-icon>
                </md-button>
                <md-menu-content width="4">
                <md-menu-item ng-repeat="item in $ctrl.user.menu">
                <md-button ng-click="item.action($ctrl.user.sub)">
                <md-icon>{{item.icon}}</md-icon>
                {{item.name}}
                </md-button>
                </md-menu-item>
                </md-menu-content>
                </md-menu>
                </div>
    
            </md-card-actions>
            </md-card>
        </div>
        `,
  bindings: {
    user: "=",
  },
};

export default UserCardElement;
