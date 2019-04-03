import angular from "angular"
import moment from "moment"
import { log } from "util"

class PracaDetailCtrl {
  constructor($scope, $document, $window, $mdDialog, $log, User, Atividade, praca, $timeout, 
    $filter, $state, Praca, Atores, RecursoHumano) {
    "ngInject"

      angular.extend(this, {
        $scope,
        $document,
        $mdDialog,
        $log,
        currentUser: User.current,
        praca,
      })


    this.markDate = (arrAtividadeAllDate) => {
      arrAtividadeAllDate.forEach(value => {
        const arrDate = value.date.split(".").reverse()
        arrDate[1] = arrDate[1].replace("0", "") - 1 // Mes
        arrDate[2] = arrDate[2][0].replace("0", "") + arrDate[2][1] // Dia
        $('[id$="-month-' + arrDate.join("-") + '"]' + " .md-calendar-date-selection-indicator").css("background-color", value.color)
      })
    }

    this.ramo_atividade = Praca.getAllRamoAtividade()
        
    praca.parceiros.map((objData) => {
      objData.ramo_atividade_name = this.ramo_atividade.filter(objValue => (objData.ramo_atividade === objValue.value))[0].display_name
      objData.id = objData.id_pub
      objData.image = objData.imagem
      objData.title = objData.nome
      objData.subtitle = objData.ramo_atividade_name
      return objData
    })

    this.mascaraTelefone = (telefone) => {
      let aux = '';
      telefone = telefone.replace(/ /g, '');
      
      if(telefone.toString().length == 11){
        aux = telefone.match(/(\d{2})(\d{1})(\d{4})(\d{4})/);
        telefone = '(' + aux[1] + ') ' + aux[2] + ' ' + aux[3] + '-' + aux[4];
      }
      if(telefone.toString().length == 10){
        aux = telefone.match(/(\d{2})(\d{4})(\d{4})/);
        telefone = '(' + aux[1] + ') ' + aux[2] + '-' + aux[3];
      }else{
        return telefone
      }
      return telefone
    }

    if (praca.grupo_gestor !== null) {
      praca.grupo_gestor.membros.map((objData) => {
        objData.id = objData.id_pub
        objData.title = objData.nome
        objData.subtitle = objData.origem_descricao
        objData.telefone = (objData.telefone != null) ? this.mascaraTelefone(objData.telefone.replace(/-/g, "")) : ''
        return objData
      })
    }

    RecursoHumano.list(praca).then((res) => {
      praca.rh = res.data
      praca.rh.map((objData) => {
        objData.id = objData.id_pub
        objData.title = objData.nome
        objData.image = objData.imagem
        return objData
      })
      praca.rh = praca.rh.filter(arrData => (arrData.data_saida == null))
    })

    Atores.list(praca).then((res) => {
      praca.atores = res.data
      praca.atores.map((objData) => {
        objData.id = objData.id_pub
        objData.title = objData.nome
        objData.image = objData.imagem
        return objData
      })
    })

    Atividade.list(praca.id_pub)
      .then(atividades => atividades.map((atividade) => {
        if (!atividade.ocorrencia) return atividade
        const formatString = "DD.MM.YYYY"
        atividade.data_inicio = moment(atividade.ocorrencia.start.slice(0, 10))
        .format(formatString)
        atividade.data_encerramento = moment(atividade.ocorrencia.repeat_until)
        .format(formatString)
        return atividade
      }))
    .then((atividades) => {
      atividades = atividades.map((objData) => {
          Atividade.options().then(
              (data) => {
                  objData.espacos = data.espaco.child.choices.filter((objValue) => {return (objData.espaco.indexOf(objValue.value) >= 0)})
              }
          );
          return objData
      });

      praca.agenda = atividades
      let arrAtividadeAllDateStart = []
      let arrAtividadeAllDate = []
      let intLoop = 0
      atividades.forEach((value) => {
        const dateA = moment(value.data_inicio, "DD.MM.YYYY")
        const dateB = moment(value.data_encerramento, "DD.MM.YYYY")
        const intTotal = dateB.diff(dateA, "days")
        arrAtividadeAllDateStart[intLoop] = { date: dateA.format("DD.MM.YYYY"), color: "#ffa634" }
        for (let i = 0; i < intTotal; i++) {
          const newDate = dateA.add(1, "days").format("DD.MM.YYYY")
          intLoop++
          arrAtividadeAllDate[intLoop] = { date: newDate, color: "#ffdc88" }
        }
        intLoop++
        arrAtividadeAllDate[intLoop] = { date: dateB.format("DD.MM.YYYY"), color: "#ffdc88" }
      })

      arrAtividadeAllDate = arrAtividadeAllDate.concat(arrAtividadeAllDateStart)

      setTimeout(() => this.markDate(arrAtividadeAllDate), 500)
      $(".md-virtual-repeat-scroller, .md-virtual-repeat-scroller div:first").on("scroll", () => {
        setTimeout(() => this.markDate(arrAtividadeAllDate), 500)
      })
    })

    if (angular.isUndefined(praca.header_img) || praca.header_img === null) {
      praca.header_img = "/assets/header.jpg"
    }

    if (!praca.bio) {
      praca.bio = "Texto de apresentação da Praça(a ser preenchido pelo Gestor)"
    }

    if (praca.data_inauguracao) {
      praca.data_inauguracao = moment(praca.data_inauguracao).format('YYYY-MM-DD')
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

    $document.ready(function () {
        $('.parallax').parallax();
      $(".materialboxed").materialbox()
      let elmTabPracas = $(".tab-pracas"),
      intPracasPosition = elmTabPracas.offset().top,
          elmLink = elmTabPracas.find('a').closest('div');


    setTimeout(()=>{
      $(document).scrollTop(0)
        intPracasPosition = elmTabPracas.offset().top
    }, 20)
      let booFixed = false;
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
        });

        let intPosition = $window.scrollY;
          arrObjScrollContainers.each((intKey, objValue) => {
            if (intPosition >= objValue.intPositionStart && intPosition <= objValue.intPositionEnd && intKey != $scope.tabIntSelected) {
              $scope.tabIntSelected = intKey;
              $scope.$apply()
            }
          });

        if (intPosition >= intPracasPosition) {
          elmTabPracas.addClass("fixed");
          if (!booFixed) {
            booFixed = true;
            elmLink.show();
            elmLink.animateCss("fadeInUp", () => {
              elmLink.removeClass("animated fadeInUp");
            });
          }
        } else {
          elmTabPracas.removeClass("fixed");
          if (booFixed) {
            booFixed = false;
            elmLink.animateCss("fadeOutDown", () => {
              elmLink.hide();
              elmLink.removeClass("animated fadeOutDown");
            });
          }
        }
      })
    });
    praca.imagem = praca.imagem.reverse();
    $scope.arrPhotos = this.buildGridModel(praca.imagem);

    document.onkeydown = (e) => {
      e = e || window.event;
      if (e.keyCode == '37') {
        this.imgChange('prev');
      } else if (e.keyCode == '39') {
        this.imgChange('next');
      }
    };

    this.imgChange = (strDirection) => {
      let elmActive = $('.materialboxed.active'),
          elmPrev = elmActive.closest('md-grid-tile').prev(),
          elmNext = elmActive.closest('md-grid-tile').next();
      if (elmActive.length > 0) {
        if (strDirection == 'prev') {
          elmActive.click();
          setTimeout(() => {
            elmPrev.find('img').click();
          }, 250);
          if (elmPrev.length == 0) {
            $('.container-arrow').fadeOut('slow');
          }
        } else {
          elmActive.click();
          setTimeout(() => {
            elmNext.find('img').click();
          }, 250);

          if (elmNext.length == 0) {
            $('.container-arrow').fadeOut('slow');
          }
        }
      } else {
        $('.container-arrow').fadeOut('slow');
      }
    };

    $('body').on('click touchend', '.material-placeholder img', () => {
      let elmActive = $('.materialboxed.active');
      if (elmActive.length > 0) {
        $('.container-arrow').fadeIn('slow');
      } else {
        $('.container-arrow').fadeOut('slow');
      }
    });

    let intervel = setInterval(() => {
      if ($('#materialbox-overlay').length == 0) $('.container-arrow').fadeOut('slow');
      if ( $state.current.name != 'app.praca') clearInterval(intervel);
    }, 1000);
  }

  buildGridModel(arrValue) {
    let arrValueTreated = [], arrDefault = [];
    arrDefault[0] = {title: "Bloco 1", description: " ", url: "/assets/praca-grid/bloco1.jpg", background : "red", span : {row : 2, col : 2}};
    arrDefault[1] = {title: "Bloco 2", description: " ", url: "/assets/praca-grid/bloco2.jpg", background : "green", span : {row : 1, col : 1}};
    arrDefault[2] = {title: "Bloco 3", description: " ", url: "/assets/praca-grid/bloco3.jpg", background : "darkBlue", span : {row : 1, col : 1}};
    arrDefault[3] = {title: "Bloco 4", description: " ", url: "/assets/praca-grid/bloco4.jpg", background : "blue", span : {row : 1, col : 2}};
    arrDefault[4] = {title: "Bloco 5", description: " ", url: "/assets/praca-grid/bloco5.jpg", background : "yellow", span : {row : 2, col : 2}};
    arrDefault[5] = {title: "Bloco 6", description: " ", url: "/assets/praca-grid/bloco6.jpg", background : "pink", span : {row : 1, col : 1}};
    arrDefault[6] = {title: "Bloco 7", description: " ", url: "/assets/praca-grid/bloco7.jpg", background : "darkBlue", span : {row : 1, col : 1}};
    arrDefault[7] = {title: "Bloco 8", description: " ", url: "/assets/praca-grid/bloco8.jpg", background : "purple", span : {row : 1, col : 1}};
    arrDefault[8] = {title: "Bloco 9", description: " ", url: "/assets/praca-grid/bloco9.jpg", background : "deepBlue", span : {row : 1, col : 1}};
    arrDefault[9] = {title: "Bloco 10", description: " ", url: "/assets/praca-grid/bloco10.jpg", background : "lightPurple", span : {row : 1, col : 1}};
    arrDefault[10] = {title: "Bloco 11", description: " ", url: "/assets/praca-grid/bloco11.jpg", background : "yellow", span : {row : 1, col : 1}};
    arrDefault[11] = {title: "Bloco 12", description: " ", url: "/assets/praca-grid/bloco12.jpg", background : "yellow", span : {row : 1, col : 1}};
    arrDefault[12] = {title: "Bloco 13", description: " ", url: "/assets/praca-grid/bloco12.jpg", background : "pink", span : {row : 1, col : 1}};
    arrDefault[13] = {title: "Bloco 14", description: " ", url: "/assets/praca-grid/bloco14.jpg", background : "darkBlue", span : {row : 1, col : 1}};
    arrDefault[14] = {title: "Bloco 15", description: " ", url: "/assets/praca-grid/bloco15.jpg", background : "purple", span : {row : 1, col : 2}};
    arrDefault[15] = {title: "Bloco 16", description: " ", url: "/assets/praca-grid/bloco16.jpg", background : "deepBlue", span : {row : 1, col : 1}};
    arrDefault[16] = {title: "Bloco 17", description: " ", url: "/assets/praca-grid/bloco17.jpg", background : "lightPurple", span : {row : 1, col : 1}};
    arrDefault[17] = {title: "Bloco 18", description: " ", url: "/assets/praca-grid/bloco18.jpg", background : "yellow", span : {row : 1, col : 1}};
    for (let i = 0; i < 16; i++) {
      let objValueTreated = {
        title : arrDefault[i].title,
        url : arrDefault[i].url,
        span : arrDefault[i].span,
        background : arrDefault[i].background,
        description : ' '
      };
      if (typeof arrValue[i] == 'object') {
        objValueTreated.title = arrValue[i].titulo;
        objValueTreated.url = arrValue[i].arquivo;
        objValueTreated.description = (typeof arrValue[i].descricao == 'string' && arrValue[i].descricao.length > 1)? arrValue[i].descricao : ' '; // Tratando bug do materialize caso nao exista o objeto.
      }
      arrValueTreated.push(objValueTreated);
    }
    return arrValueTreated;
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
      return user.id_pub == praca.gestor.user_id_pub
    } else {
      return false
    }
  }

  buildMenu(currentUser) {
    const userMenu = {}

    if (!this.permissionIsManagerOrAdmin(this.currentUser, this.praca)) {
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
