import moment from "moment"

class PracaAtividadeCtrl {
  constructor($scope, $document, $window, $mdDialog, $log, User, Atividade, $timeout, objData) {
    "ngInject";
    angular.extend(this, {$scope});

      // console.info(objData)

      Atividade.options().then(
          (data) => {
              objData.tipos = data.tipo.choices;
              objData.espacos = data.espaco.child.choices;
              objData.faixa_etarias = data.faixa_etaria.child.choices;
              objData.territorios = data.territorio.choices;
              objData.publicos = data.publico.choices;
          }
      );

      console.info(objData)


      // console.info(objData)
      // objData.options()
      //     .then((obj) => {
      //         console.info(obj)
      //     });


    objData.ocorrencia.repeat_until = moment(objData.ocorrencia.repeat_until).format("DD/MM/YYYY");
    objData.ocorrencia.start = moment(objData.ocorrencia.start).format("DD/MM/YYYY");
    this.objData = objData;

    // let arrImgHeight = [];
    // arrImgHeight[1] = '150px';
    // arrImgHeight[2] = '200px';
    // arrImgHeight[3] = '250px';
    // this.intImgHeght = () => {
    //   return arrImgHeight[Math.floor((Math.random() * 3) + 1)];
    // };

      // $scope.imagens = imagens;
      //
      // $document.ready(() =>{
      //     $('.materialboxed').materialbox();
      // });
      //
      // this.paginator = {};
      // this.paginator.page = 1;
      // this.paginator.perpage = 2;
      // $scope.paginatorData = [];
      // this.paginator.intRendered = 0;
      //
      // // this.imagens = imagens;
      // this.arrImg = this.buildGridModel(imagens);
      // this.paginatorRender($scope);
      // this.scope = $scope;

      // $scope.$watch('paginatorData',
      //     () => {
              // $('.materialboxed').materialbox();
              // console.info('aa1');
              // console.info('aa2');
              // this.currentUser = newUser
              // this.userMenu = this.buildMenu(this.currentUser)
      //     }
      // );
  }
}

export default PracaAtividadeCtrl
