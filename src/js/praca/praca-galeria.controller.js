class PracaGaleriaCtrl {
  constructor($scope, $document, $window, $mdDialog, $log, User, Atividade, imagens, $timeout) {
    "ngInject"
    angular.extend(this, {$scope});

    // let arrImgHeight = [];
    // arrImgHeight[1] = '150px';
    // arrImgHeight[2] = '200px';
    // arrImgHeight[3] = '250px';
    // this.intImgHeght = () => {
    //   return arrImgHeight[Math.floor((Math.random() * 3) + 1)];
    // };

      $scope.imagens = imagens;

      $document.ready(() =>{
          $('.materialboxed').materialbox();
      });

      this.paginator = {};
      this.paginator.page = 1;
      this.paginator.perpage = 2;
      $scope.paginatorData = [];
      this.paginator.intRendered = 0;

      // this.imagens = imagens;
      this.arrImg = this.buildGridModel(imagens);
      this.paginatorRender($scope);
      this.scope = $scope;

      $scope.$watch('paginatorData',
          () => {
              // $('.materialboxed').materialbox();
              // console.info('aa1');
              // console.info('aa2');
              // this.currentUser = newUser
              // this.userMenu = this.buildMenu(this.currentUser)
          }
      );
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
            intRenderedPerPage = this.paginator.page * this.paginator.perpage,
            strHtmlRow = '';
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
        }
    }
}

export default PracaGaleriaCtrl
