class UserCardController {
  constructor($mdDialog, User, Toast, ErrorCatcher) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      User,
      Toast,
      ErrorCatcher,
    })
  }

  $onInit() {
    const user = this.buildMenu(this.user)
  }

  buildMenu(user) {
    const menu = {
      userInfo: {
        name: "Visualizar informações do usuário",
        icon: "info",
        action: this.showUserDetailDialog(user),
        dialog: this.$mdDialog,
      },
      changeStaffPowers: {
        dialog: this.$mdDialog,
        User: this.User,
        Toast: this.Toast,
      },
      deleteUser: {
        name: "Excluir usuário",
        icon: "delete",
        action: this.deleteUserFactory({user: user}),
        dialog: this.$mdDialog,
        User: this.User,
        Toast: this.Toast,
      },
    }

    if (user.is_staff === false) {
      Object.assign(menu.changeStaffPowers, {
        name: "Conceder acesso como gestor do Ministério",
        icon: "supervisor_account",
        action: this.grantStaffPowersFactory(user.sub),
      })
    } else {
      Object.assign(menu.changeStaffPowers, {
        name: "Revogar acesso como gestor do Ministério",
        icon: "clear",
        action: this.revokeStaffPowersFactory(user.sub),
      })
    }

    user.menu = menu
    return user
  }

  grantStaffPowersFactory(sub) {
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
          () => this.User.changeStaffPowers(sub, true)
          .then(this.Toast.showSuccessToast("Permissão concedida com sucesso"))
          .catch((err) => this.Toast.showRejectedToast(`Problemas ao conceder permissão. ${err.data}`))
        )
    }
  }

  revokeStaffPowersFactory(sub) {
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
          () => this.User.changeStaffPowers(sub, false)
          .then(this.Toast.showSuccessToast("Permissões revogadas com sucesso"))
          .catch((err) => this.Toast.showRejectedToast(`Problema ao revogar permissões. ${err.data}`))
        )
    }
  }

  deleteUserFactory(user) {
    const vm = this

    return function() {
      vm.onDelete({ user: vm.user })
    }
  }

  showUserDetailDialog(user, ev) {
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
        <md-card md-theme="default" md-theme-watch="" class="_md md-default-theme user-card-item hoverable" style="cursor: auto;">
          <md-card-title>
            <md-card-title-text>
              <span class="md-headline">{{$ctrl.user.full_name}}</span>
              <span class="md-subhead">{{$ctrl.user.email}}</span>
            </md-card-title-text>
            <md-card-title-media>
              <div class="md-media-sm card-media epr-avatar" style="background-image: url('{{$ctrl.user.profile_picture_url}}')"></div>
              <md-button class="md-fab md-mini" ng-if="$ctrl.user.praca_manager">
                <md-tooltip>Este usuário é um gestor de praças.</md-tooltip>
                <md-icon>store</md-icon>
              </md-button>

              <md-button ng-class="$ctrl.user.praca_manager ? 'second-badge md-fab md-mini' : 'md-fab md-mini'" ng-if="$ctrl.user.is_staff">
                <md-tooltip>Este usuário é um administrador.</md-tooltip>
                <md-icon>supervisor_account</md-icon>
              </md-button>
            </md-card-title-media>
          </md-card-title>
          <md-card-actions layout="row" layout-align="end center" class="layout-align-end-center layout-row">
            <div layout="row" layout-align="space-between">
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
        `,
  bindings: {
    user: "<",
    onDelete: "&",
  },
}

export default UserCardElement
