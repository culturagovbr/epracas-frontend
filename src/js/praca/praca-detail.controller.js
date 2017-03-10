import moment from 'moment'

class PracaDetailCtrl {
  constructor($scope, $document, $window, $anchorScroll, $location, $mdDialog, $log, User, Atividade, praca) {
    "ngInject";

    this._$scope = $scope;
    this._$document = $document;
    this._$mdDialog = $mdDialog;
    this._$log = $log;

    this.currentUser = User.current;

    this._praca = praca;
    $scope.praca = praca;
    $scope.$mdDialog = $mdDialog;

    $scope.gotoAnchor = function(strContainerName) {
        var strNewHash = 'container-' + strContainerName;
        console.info(strNewHash);
        console.info($location.hash());
        if ($location.hash() !== strNewHash) {
            // set the $location.hash to `newHash` and
            // $anchorScroll will automatically scroll to it
            $location.hash(strNewHash);
        } else {
            // call $anchorScroll() explicitly,
            // since $location.hash hasn't changed
            $anchorScroll();
        }
    };

      // $document.on('scroll', function() {
          // do your things like logging the Y-axis
          // console.log($window.scrollY);
          // console.info($anchorScroll);

          // or pass this to the scope
          // $scope.$apply(function() {
          //     $scope.pixelsScrolled = $window.scrollY;
          // })
      // });

    // ocorrencia: Object
    // calendar: null
    // end: null
    // event: "d9b0be02-3f8e-41c7-a880-eb64d0ca5105"
    // frequency_type: "once"
    // id: 1
    // repeat: ""
    // repeat_until: "2017-02-21"
    // start: "2017-02-20T03:00:00Z"
    // weekday: null

    Atividade.list(praca)
    .then(atividades => atividades.map(atividade => {
      if(!atividade.ocorrencia) return atividade

      const formatString = "DD.MM.YYYY"
      atividade.data_inicio = moment(atividade.ocorrencia.start.slice(0, 10))
        .format(formatString)
      atividade.data_encerramento = moment(atividade.ocorrencia.repeat_until)
        .format(formatString)
      return atividade
    }))
    .then(atividades => {
      console.log(atividades)
      $scope.praca.agenda = atividades
    })

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

  parseDate(dataObj) {
    if(!this.dateSet)
    {
      return undefined
    }

    return moment(dataObj).format("DD.MM.YYYY")
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
