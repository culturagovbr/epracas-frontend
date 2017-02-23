class PracaDetailCtrl {
  constructor($scope, $document, $mdDialog, $log, User, praca) {
    "ngInject";

    this._$scope = $scope;
    this._$document = $document;
    this._$mdDialog = $mdDialog;
    this._$log = $log;

    this.currentUser = User.current;

    this._praca = praca;
    $scope.praca = praca;
    $scope.$mdDialog = $mdDialog;

    if ($scope.praca.header_url.lastIndexOf(".jpg") == -1) {
      $scope.praca.header_url = "/assets/header.jpg";
    }

    if (!$scope.praca.bio) {
      $scope.praca.bio = "Texto de apresentação da Praça(a ser preenchido pelo Gestor)";
    }

    const geoLoc = {
      defaults: {
        tileLayerOptions: {
          detectRetina: true,
          reuseTiles: true,
        },
        scrollWheelMouse: false,
        doubleClickZoom: false,
        zoomControl: false,
        dragging: false,
      },

      center: {
        lat: Number(praca.lat),
        lng: Number(praca.long),
        zoom: 13,
      },

      markers: {
        marker: {
          lat: Number(praca.lat),
          lng: Number(praca.long),
          message: praca.localizacao,
          focus: true,
          draggable: false,
        },
      },
    };
    $scope.geoLoc = geoLoc;

    $scope.$watch(
      () => User.current,
      (newUser) => {
        this.currentUser = newUser;
        $scope.userMenu = this.buildMenu(this.currentUser);
        $log.log($scope.userMenu);
      });
  }

  buildMenu(currentUser) {
    const userMenu = {};

    if(angular.isDefined(currentUser) &&
      (currentUser.is_staff || currentUser.praca_manager === this._praca.id_pub)) {
      userMenu.event = {
        id: "evento",
        name: "Adicionar Evento",
        icon: "insert_invitation",
        dialog: {
          controller: "EventCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/event-dialog.tmpl.html",
          parent: angular.element(this._$document.body),
          scope: this._$scope,
          preserveScope: true,
          fullscreen: true,
        },
      };

      userMenu.partner = {
        id: "parceiro",
        name: "Adicionar Parceiro",
        icon: "people",
        dialog: {
          controller: "ParceirosCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/parceiros-dialog.tmpl.html",
          parent: angular.element(this._$document.body),
          locals: { pracaData: this._praca },
          fullscreen: true,
        },
      };

      userMenu.profile = {
        id: "perfil",
        name: "Editar informações sobre a Praça",
        icon: "info",
        dialog: {
          controller: "PracaInfoCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/pracainfo-dialog.tmpl.html",
          parent: angular.element(this._$document.body),
          locals: { pracaData: this._praca },
          scope: this._$scope,
          preserveScope: true,
          fullscreen: true,
        },
      };

      userMenu.headerImg = {
        id: "headerImg",
        name: "Editar o cabeçalho da pagina da Praça",
        icon: "aspect_ratio",
        dialog: {
          controller: "ChangeHeaderImgCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/header-dialog.tmpl.html",
          parent: angular.element(this._$document.body),
          locals: { praca: this._praca },
          scope: this._$scope,
          preserveScope: true,
          // targetEvent: $event,
        },
      };
    }

    if (angular.isUndefined(currentUser.praca_manager)) {
      userMenu.vinculo = {
        id: "evento",
        name: "Solicitar vinculo para gestão da Praça",
        icon: "assignment_ind",
        action: this.showVinculacao,
        dialog: {
          controller: "VinculacaoCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/vinculacao.tmpl.html",
          parent: angular.element(this._$document.body),
          // targetEvent: ev,
          clickOutsiteToClose: false,
          fullscreen: true,
          scope: this._$scope,
          preserveScope: true,
        },
      };
    }
    return userMenu;
  }
}


export default PracaDetailCtrl;
