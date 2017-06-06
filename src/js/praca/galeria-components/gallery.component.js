class GalleryController {
  constructor($attrs, Praca, $scope, $stateParams, $document, $mdMedia) {
    "ngInject";
      $scope.imagens = [];
      Praca.getImages($stateParams.pk).then(function(arrResult) {
          $scope.imagens = arrResult;
      });

      $document.ready(() =>{
        $('.materialboxed').materialbox();
      });
      this.paginator = {};
      this.paginator.page = 1;
      if ($mdMedia('sm')) {
          this.paginator.perpage = 6;
      } else if ($mdMedia('lg')) {
          this.paginator.perpage = 12;
      } else if ($mdMedia('gt-lg')) {
          this.paginator.perpage = 18;
      }
      $scope.paginatorData = [];
      this.paginator.intRendered = 0;

      $scope.$watch('imagens',
          () => {
          this.arrImg = this.buildGridModel($scope.imagens);
          this.paginatorRender($scope);
          }
      );
      this.scope = $scope;
  }

    /**
     * Constroi o objecto da grid em mozaico com as imagens da praca ficando no formato que o componente do Material Angular espera.
     * @param {Array} arrValue - Array com as imagens das pracas.
     * @returns {Array} arrValueTreated - Array tratado para o componente do Material Angular.
     */
    buildGridModel(arrValue) {
        let arrValueTreated = [], arrDefault = [];
        arrValue.forEach((objValue, key) => {
            arrValueTreated[key] = {};
            arrValueTreated[key].title = objValue.titulo;
            arrValueTreated[key].url = objValue.arquivo;
            arrValueTreated[key].span = {row : 1, col : 1};
        });
        return arrValueTreated;
    }
    paginatorRender($scope)
    {
        // console.info($scope.paginatorData);
        let intTotal = this.arrImg.length,
            intRenderedPerPage = this.paginator.page * this.paginator.perpage;
        if (this.paginator.intRendered < intTotal) {
            for (let i = 0; i < intRenderedPerPage; i++) {
                if (this.arrImg[this.paginator.intRendered].url != '') {
                    $scope.paginatorData[this.paginator.intRendered] = this.arrImg[this.paginator.intRendered];
                    this.paginator.intRendered++;
                    setTimeout(() => {
                        $('.materialboxed').materialbox();
                    }, 100);
                }
            }
        } else if (intTotal != 0) {
            $('#container-btmais').fadeOut('slow');
        }
    }
}

const Gallery = {
  controller: GalleryController,
  controllerAs: "$ctrl",
  template: `
    <md-icon></md-icon>
    <md-subheader>Galeriass</md-subheader>
    <!--<galeria-list></galeria-list>-->
    <md-grid-list
      md-cols="1" md-cols-sm="2" md-cols-md="3" md-cols-gt-md="6"
      md-row-height-gt-md="1:1" md-row-height="4:3"
      md-gutter="8px" md-gutter-gt-sm="4px">
      <md-grid-tile
                    ng-repeat="objPhoto in paginatorData"
                    md-rowspan="{{objPhoto.span.row}}"
                    md-colspan="{{objPhoto.span.col}}"
                    md-colspan-sm="1"
                    md-colspan-xs="1">
        <img width="135%" class="materialboxed animated fadeIn" data-caption="{{objPhoto.title}}" ng-src="{{objPhoto.url}}">
        <md-grid-tile-footer><h3>{{objPhoto.title}}</h3></md-grid-tile-footer>
      </md-grid-tile>
    </md-grid-list>
    <div id="container-btmais" class="row md-padding">
      <div class="col s12"><a ng-click="$ctrl.paginatorRender($ctrl.scope)" class="waves-effect waves-light btn">Mais</a></div>
    </div>
    `
};

export default Gallery
