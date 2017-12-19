import moment from "moment"

class PracaAtividadeCtrl {
  constructor($scope, $document, $window, $mdDialog, $log, User, Atividade, $timeout, Praca, objData) {
    "ngInject";
    angular.extend(this, {$scope});

      Atividade.options().then(
          (data) => {
              objData.tipos = data.tipo.choices.filter((objValue) => {return (objData.tipo == objValue.value)});
              objData.espacos = data.espaco.child.choices.filter((objValue) => {return (objData.espaco.indexOf(objValue.value) >= 0)});
              objData.faixa_etarias = data.faixa_etaria.child.choices.filter((objValue) => {return (objData.faixa_etaria.indexOf(objValue.value) >= 0)});
              objData.territorios = data.territorio.choices.filter((objValue) => {return (objData.territorio == objValue.value)});
              objData.publicos = data.publico.choices.filter((objValue) => {return (objData.publico == objValue.value)});
          }
      );

    objData.ocorrencia.repeat_until = moment(objData.ocorrencia.repeat_until).format("DD/MM/YYYY");
    objData.ocorrencia.start = moment(objData.ocorrencia.start).format("DD/MM/YYYY");
    this.objData = objData;
        
    Praca.get(this.objData.praca).then((response) => {this.objData.praca = response})
  }
}

export default PracaAtividadeCtrl
