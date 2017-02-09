import angular from "angular"

export default
function pracaCard($state, $document, $mdDialog, Praca) {
  "ngInject";

  return {
    restrict: 'E',
    scope: {
      praca: '='
    },
    templateUrl: 'components/praca-card/template.html',
    link: (scope, element, attrs) => {
      // XXX: use proper header_url's
      if (scope.praca.header_url.lastIndexOf(".jpg") == -1) {
        scope.praca.header_url = "/assets/header.jpg";
      }

      scope.situations = [
        {
          value: "",
          descricao: "",
        },
        {
          value: "i",
          descricao: "Inaugurada",
        },
        {
          value: "a",
          descricao: "Obras em Andamento",
        },
        {
          value: "c",
          descricao: "Obras Concluidas",
        }
      ];

      scope.models = [
        {
          value: "",
          descricao: "",
        },
        {
          value: "p",
          descricao: "700m²",
        },
        {
          value: "m",
          descricao: "3000m²",
        },
        {
          value: "g",
          descricao: "7000m²",
        }
      ];

      scope.infoPraca = function(praca)
      {
        Praca.get(praca.id_pub)
        .then(result => {
          $mdDialog.show({
            controller: 'PracaInfoCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'praca/pracainfo-dialog.tmpl.html',
            parent: angular.element($document.body),
            locals: { pracaData: result }
          })
        })
      }

      scope.infoGestor = function(gestor)
      {
        //TODO: implement
      }

      scope.excluirPraca = function(praca)
      {
        //TODO: implement
      }

      scope.navigateTo = (route, params) => $state.go(route, params)
    }
  }
}
