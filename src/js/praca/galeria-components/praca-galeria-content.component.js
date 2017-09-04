class PracaGaleriaContentController {
  constructor($attrs, Praca, $scope, $stateParams, $document, $mdMedia, $mdMenu, $mdDialog, Toast, $log, $filter, $state) {
    "ngInject";
      $scope.imagens = [];
      Praca.getImages($stateParams.pk).then(function(arrResult) {
          // $scope.imagens = $filter('orderBy')(arrResult, 'titulo');
          $scope.imagens = arrResult.reverse();
      });

      this.$mdMenu = $mdMenu;
      // this.$event = $event;

      $document.ready(() =>{
        $('.materialboxed').materialbox();
      });
      this.paginator = {};
      this.paginator.page = 1;
      this.paginator.perpage = 9;
      if ($mdMedia('sm')) {
          this.paginator.perpage = 6;
      } else if ($mdMedia('lg')) {
          this.paginator.perpage = 10;
      } else if ($mdMedia('gt-lg')) {
          this.paginator.perpage = 15;
      }
      $scope.paginatorData = [];
      this.paginator.intRendered = 0;

      $scope.$watch('imagens',
          () => {
          this.arrImg = this.buildGridModel($scope.imagens);
              if (this.arrImg.length > 0) {
                  this.paginatorRender($scope);
              }
          }
      );
      this.scope = $scope;

      this.delete = (ev, pkImg) => {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title('Você tem certeza que deseja excluir esta imagem?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Sim, Exclur')
          .cancel('Não excluir');
          $mdDialog.show(confirm).then(function() {
            Praca.deleteImg($stateParams.pk, pkImg)
              .then(
                  response => {
                      $scope.paginatorData = $scope.paginatorData.filter((obj) => {return obj.id != pkImg;}); // Retira do array de objetos a imagem deletada.
                      Toast.showSuccessToast('Imagem excluida com sucesso');
                  })
              .catch(
                  err => {
                      $log.error(`Erro ao excluir esta imagem. ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`);
                      Toast.showRejectedToast("Erro ao excluir a imagem.");
                  }
              );
        }, function() {
          $scope.status = 'You decided to keep your debt.';
        });
      }

      this.edit = function(ev, id) {
          $mdDialog.show({
              controller: 'GaleriaEditDialogCtrl',
              controllerAs: "$ctrl",
              templateUrl: 'praca/galeria-edit.dialog.tmpl.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true,
              locals: {
                  id: id
              },
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          });
      };

      // Ao clicar em alguma tecla do teclado, verifica se existe imagem aberta, e conforme as setas do teclado vai trocando de imagem.
      document.onkeydown = (e) => {
          e = e || window.event;
          if (e.keyCode == '37') { // left arrow
              this.imgChange('prev');
          } else if (e.keyCode == '39') { // right
              this.imgChange('next');
          }
      };

      // Funcao de trocar as imagens que estao no zoom.
      this.imgChange = (strDirection) => {
          let elmActive = $('.materialboxed.active'),
              elmPrev = elmActive.closest('md-grid-tile').prev(),
              elmNext = elmActive.closest('md-grid-tile').next();
          if (elmActive.length > 0) {
              if (strDirection == 'prev') { // left arrow
                  elmActive.click();
                  setTimeout(() => {
                      elmPrev.find('img').click();
                  }, 250);
                  if (elmPrev.length == 0) {
                      $('.container-arrow').fadeOut('slow');
                  }
              } else { // right
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

      // Funcionalidades de alterar o zoom das imagens com as setas da tela.
      $('body').on('click touchend', '.material-placeholder img', () => {
          console.info('aaaa')
          let elmActive = $('.materialboxed.active');
          if (elmActive.length > 0) {
              $('.container-arrow').fadeIn('slow');
          } else {
              $('.container-arrow').fadeOut('slow');
          }
      });
      // Como nao foi possivel pegar o evento click ao retirar a imagem do zoom, foi feito dessa forma ate encontrar uma solucao melhor.
      let intervel = setInterval(() => {
          if ($('#materialbox-overlay').length == 0) $('.container-arrow').fadeOut('slow'); // Verificando se existe imagem em zoom, caso exista esconde os botoes de seta.
          if ( $state.current.name != 'app.galeria') clearInterval(intervel); // Retirando o setIntervel se estiver em outra tela.
      }, 1000);
  }

    openMenu($mdMenu, ev) {
        originatorEv = ev;
        $mdMenu.open(ev);
    };
    /**
     * Constroi o objecto da grid em mozaico com as imagens da praca ficando no formato que o componente do Material Angular espera.
     * @param {Array} arrValue - Array com as imagens das pracas.
     * @returns {Array} arrValueTreated - Array tratado para o componente do Material Angular.
     */
    buildGridModel(arrValue) {
        let arrValueTreated = [], arrDefault = [];
        arrValue.forEach((objValue, key) => {
            arrValueTreated[key] = {};
            arrValueTreated[key].id = objValue.id_pub;
            arrValueTreated[key].title = objValue.titulo;
            arrValueTreated[key].url = 'https://epracas.cultura.gov.br/' + objValue.arquivo;
            arrValueTreated[key].span = {row : 1, col : 1};
            arrValueTreated[key].description = (typeof objValue.descricao == 'string')? objValue.descricao : ' '; // Tratando bug do materialize caso nao exista o objeto.
        });
        return arrValueTreated;
    }
    paginatorRender($scope)
    {
        let intTotal = this.arrImg.length,
            intRenderedPerPage = this.paginator.page * this.paginator.perpage;
        if (this.paginator.intRendered < intTotal) {
            for (let i = 0; i < intRenderedPerPage; i++) {
                if (!angular.isUndefined(this.arrImg[this.paginator.intRendered]) && this.arrImg[this.paginator.intRendered].url != '') {
                    $scope.paginatorData[this.paginator.intRendered] = this.arrImg[this.paginator.intRendered];
                    this.paginator.intRendered++;
                    setTimeout(() => {
                        $('.materialboxed').materialbox();
                        $('.materialboxed').closest('md-grid-tile').css('transition', 'all 0.4s ease-out'); // Adicionando animacao para tornar o hover mais fluido, mas isso só deve ser feito apos a imagem ser renderizada,.
                    }, 100);
                }
            }
        } else if (intTotal != 0) {
            $('#container-btmais').fadeOut('slow');
        }
    }
}

const PracaGaleriaContent = {
  controller: PracaGaleriaContentController,
  controllerAs: "$ctrl",
  template: `
<div class="container-arrow" style="display: none; position: fixed; z-index: 1001;" >
    <a ng-click="$ctrl.imgChange('prev')" style="position: fixed; top: 50%; left: 5%;z-index: 1001;" class="btn-floating btn-large waves-effect waves-light orange accent-4"><i class="material-icons">keyboard_arrow_left</i></a>
    <a ng-click="$ctrl.imgChange('next')" style="position: fixed; top: 50%; right: 5%;z-index: 1001;" class="btn-floating btn-large waves-effect waves-light orange accent-4"><i class="material-icons">keyboard_arrow_right</i></a>
</div>
      <md-grid-list
        md-cols="1" md-cols-sm="2" md-cols-md="3" md-cols-gt-md="5"
        md-row-height-gt-md="1:1" md-row-height="4:3"
        md-gutter="8px" md-gutter-gt-sm="4px" 
        class="content-gallery">
        <md-grid-tile ng-repeat="objPhoto in paginatorData"
          md-rowspan="{{objPhoto.span.row}}"
          md-colspan="{{objPhoto.span.col}}"
          md-colspan-sm="1"
          md-colspan-xs="1"
          ng-class="objPhoto.background">
          <img width="135%" class="materialboxed animated fadeIn" data-caption="{{objPhoto.description}}" ngf-src="objPhoto.url">
          <md-grid-tile-footer>
              <h3>
                {{objPhoto.title}}
                <md-menu style="
                position: absolute;
                right: 0;
                top: 5px;"
                show-as-manager="true">
                      <md-button aria-label="Open phone interactions menu" class="md-icon-button" ng-click="$mdMenu.open()">
                        <i class="material-icons right">more_vert</i>
                      </md-button>
                      <md-menu-content width="4">
                        <md-menu-item>
                          <md-button ng-click="$ctrl.edit($event, objPhoto.id)">
                            <i class="material-icons left">edit</i>
                            Editar
                          </md-button>
                        </md-menu-item>
                        <md-menu-item>
                          <md-button ng-click="$ctrl.delete($event, objPhoto.id)">
                            <i class="material-icons left">delete</i>
                            Excluir
                          </md-button>
                        </md-menu-item>
                      </md-menu-content>
                </md-menu>
              </h3>
          </md-grid-tile-footer>
        </md-grid-tile>
      </md-grid-list>
    </md-grid-list>
    <div id="container-btmais" class="row md-padding">
      <div class="col s12"><a ng-click="$ctrl.paginatorRender($ctrl.scope)" class="waves-effect waves-light btn">Mais</a></div>
    </div>
      <br />
      <br />
      <br />
    `
};

export default PracaGaleriaContent
