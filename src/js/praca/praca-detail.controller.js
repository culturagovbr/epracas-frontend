import moment from "moment"

class PracaDetailCtrl {
  constructor($scope, $document, $window, $mdDialog, $log, User, Atividade, praca) {
    "ngInject"

      angular.extend(this, {
        $scope,
        $document,
        $mdDialog,
        $log,
        currentUser: User.current,
        praca,
      })


    Atividade.list(praca.id_pub)
      .then(atividades => atividades.map(atividade => {
        if (!atividade.ocorrencia) return atividade

        const formatString = "DD.MM.YYYY"
        atividade.data_inicio = moment(atividade.ocorrencia.start.slice(0, 10))
        .format(formatString)
        atividade.data_encerramento = moment(atividade.ocorrencia.repeat_until)
        .format(formatString)

        return atividade
      }))
    .then((atividades) => {
      // console.log(atividades)
      praca.agenda = atividades
    })

    if (angular.isUndefined(praca.header_img) || praca.header_img === null ) {
      praca.header_img = "/assets/header.jpg"
    }

    if (!praca.bio) {
      praca.bio = "Texto de apresentação da Praça(a ser preenchido pelo Gestor)"
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
    }
    $scope.geoLoc = geoLoc

    $scope.$watch(
        () => User.current,
        (newUser) => {
          if (newUser) {
            this.currentUser = newUser
            this.userMenu = this.buildMenu(this.currentUser)
          }
        }
    )
    $scope.tabIntSelected = 0
    $scope.intWindowHeight = $(window).height()

    // Pegando o evento scroll da tela para deixar as abas dinamicas conforme o scroll.
    // angular.element(document).ready(function(){
    $document.ready(function () {
      $(".materialboxed").materialbox()
      let elmTabPracas = $(".tab-pracas"),
      intPracasPosition = elmTabPracas.offset().top

    setTimeout(()=>{
      $(document).scrollTop(0)
        intPracasPosition = elmTabPracas.offset().top
    }, 20)
      $document.on("scroll", () => {
        let arrElmScrollContainers = $("md-tab"),
        arrObjScrollContainers = arrElmScrollContainers.map((intKey, elm) => {
          let intPositionStart = $($(elm).attr("scroll")).offset().top, // Pega a posicao do container.
          intPositionEnd = (arrElmScrollContainers[intKey + 1]) ? $($(arrElmScrollContainers[intKey + 1]).attr("scroll")).offset().top : "" // Pega a posicao do proximo container e diminui um, no caso e o limite deste container.
              return {
                strSelector: $(elm).attr("scroll"),
                intPositionStart: intPositionStart - 96,
                intPositionEnd: intPositionEnd - 1
              }
        })

        let intPosition = $window.scrollY
          arrObjScrollContainers.each((intKey, objValue) => {
            if (intPosition >= objValue.intPositionStart && intPosition <= objValue.intPositionEnd && intKey != $scope.tabIntSelected) {
              $scope.tabIntSelected = intKey
              $scope.$apply()
            }
          })
        if (intPosition >= intPracasPosition) {
          elmTabPracas.addClass("fixed")
        } else {
          elmTabPracas.removeClass("fixed")
        }
      })
    })

    // Dados fake para fotos.
    $scope.arrPhotos = this.buildGridModel({
      icon: "avatar:svg-",
      title: "Svg-",
      background: ""
    })
  }

  buildGridModel(tileTmpl) {
    let it, results = []
    for (let j = 0; j < 16; j++) {
      it = angular.extend({}, tileTmpl)
      it.icon = it.icon + (j + 1)
      it.title = it.title + (j + 1)
      it.span = {row: 1, col: 1}

    switch (j + 1) {
      case 1:
        it.title = "Bloco1"
        it.background = "red"
        it.span.row = it.span.col = 2
        it.url = "/assets/praca-grid/bloco1.jpg"
        break
      case 2:
          it.title = "Bloco2"
          it.background = "green"
          it.url = "/assets/praca-grid/bloco2.jpg"
          break
      case 3:
          it.title = "Bloco3"
          it.background = "darkBlue"
          it.url = "/assets/praca-grid/bloco3.jpg"
          break
      case 4:
          it.title = "Bloco4"
          it.background = "blue"
          it.span.col = 2
          it.url = "/assets/praca-grid/bloco4.jpg"
          break
      case 5:
          it.title = "Bloco5"
          it.background = "yellow"
          it.span.row = it.span.col = 2
          it.url = "/assets/praca-grid/bloco8.jpg"
          break
      case 6:
          it.title = "Bloco6"
          it.background = "pink"
          it.url = "/assets/praca-grid/bloco6.jpg"
          break
      case 7:
          it.title = "Bloco7"
          it.background = "darkBlue"
          it.url = "/assets/praca-grid/bloco7.jpg"
          break
      case 8:
          it.title = "Bloco8"
          it.background = "purple"
          it.url = "/assets/praca-grid/bloco5.jpg"
          break
      case 9:
          it.title = "Bloco9"
          it.background = "deepBlue"
          it.url = "/assets/praca-grid/bloco9.jpg"
          break
      case 10:
          it.title = "Bloco10"
          it.background = "lightPurple"
          it.url = "/assets/praca-grid/bloco10.jpg"
          break
      case 11:
          it.title = "Bloco11"
          it.background = "yellow"
          it.url = "/assets/praca-grid/bloco11.jpg"
          break
      case 12:
          it.title = "Bloco12"
          it.background = "yellow"
          it.url = "/assets/praca-grid/bloco12.jpg"
          // it.span.row = it.span.col = 2
          break
      case 13:
          it.title = "Bloco13"
          it.background = "pink"
          it.url = "/assets/praca-grid/bloco13.jpg"
          break
      case 14:
          it.title = "Bloco14"
          it.background = "darkBlue"
          it.url = "/assets/praca-grid/bloco14.jpg"
          break
      case 15:
          it.title = "Bloco15"
          it.background = "purple"
          it.url = "/assets/praca-grid/bloco15.jpg"
          it.span.col = 2
          // it.span.row = it.span.col = 2
          break
      case 16:
          it.title = "Bloco16"
          it.background = "deepBlue"
          it.url = "/assets/praca-grid/bloco16.jpg"
          break
      case 17:
          it.title = "Bloco17"
          it.background = "lightPurple"
          it.url = "/assets/praca-grid/bloco17.jpg"
          break
      case 18:
          it.title = "Bloco18"
          it.background = "yellow"
          it.url = "/assets/praca-grid/bloco18.jpg"
          break
    }
      results.push(it)
    }
    return results
  }

  parseDate(dataObj) {
    if (!this.dateSet) {
      return undefined
    }

    return moment(dataObj).format("DD.MM.YYYY")
  }

  permissionIsManagerOrAdmin(user, praca){
    if (user.is_staff === true) {
      return true
    } else if ((angular.isDefined(praca.gestor) && praca.gestor !== null)) {
      return user.id_pub === praca.gestor.user_id_pub
    } else {
      return false
    }
  }

  buildMenu(currentUser) {
    const userMenu = {}

    if (!this.permissionIsManagerOrAdmin(this.currentUser, this.praca)) {
    // if ((currentUser.is_staff === false) && (angular.isUndefined(this.praca.gestor) || this.praca.gestor === null)) {
      userMenu.vinculo = {
        id: "vinculo",
        name: "Solicitar vinculo para gestão da Praça",
        icon: "assignment_ind",
        // action: this.showVinculacao,
        dialog: {
          controller: "VinculacaoCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/vinculacao.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: this.praca },
          clickOutsiteToClose: false,
          fullscreen: true,
        },
      }
    }

    if (this.permissionIsManagerOrAdmin(this.currentUser, this.praca)) {
      userMenu.event = {
        id: "evento",
        name: "Adicionar Evento",
        icon: "insert_invitation",
        dialog: {
          controller: "EventCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/event-dialog.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: this.praca },
          fullscreen: true,
        },
      }

      userMenu.partner = {
        id: "parceiro",
        name: "Adicionar Parceiro",
        icon: "people",
        dialog: {
          controller: "ParceirosCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/parceiros-dialog.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: this.praca },
          fullscreen: true,
        },
      }

      userMenu.profile = {
        id: "perfil",
        name: "Editar informações sobre a Praça",
        icon: "info",
        dialog: {
          controller: "PracaInfoCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/pracainfo-dialog.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: this.praca },
          fullscreen: true,
        },
      }

      userMenu.headerImg = {
        id: "headerImg",
        name: "Editar o cabeçalho da pagina da Praça",
        icon: "aspect_ratio",
        dialog: {
          controller: "ChangeHeaderImgCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/header-dialog.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: this.praca },
        },
      }

      userMenu.uploadImg = {
        id: "uploadImg",
        name: "Enviar imagens para a Praça",
        icon: "photo_camera",
        dialog: {
          controller: "UploadImgCtrl",
          controllerAs: "$ctrl",
          templateUrl: "praca/galeria-upload.tmpl.html",
          parent: angular.element(this.$document.body),
          locals: { praca: this.praca },
        },
      }
    }

    return userMenu
  }

  showDialog($event, dialog) {
    dialog.targetEvent = $event
    this.$mdDialog.show(dialog)
  }
}

export default PracaDetailCtrl
