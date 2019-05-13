class GestorDetailController {
  constructor(ErrorCatcher, $mdDialog, Gestor, Toast, $stateParams) {
    "ngInject"

    angular.extend(this, {
      ErrorCatcher,
    });

    let ctrl = this;
    this.delete = (ev, pk) => {
      var confirm = $mdDialog.confirm()
          .title('Você tem certeza que deseja desfazer este vínculo?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Sim, Desfazer vínculo')
          .cancel('Não desfazer vínculo');
      $mdDialog.show(confirm).then(function() {

        pk = pk.split('/')[4];
          Toast.showSuccessToast('Vínculo desfeito com sucesso');
        Gestor.delete(pk)
            .then(
                response => {
                    Toast.showSuccessToast('Vínculo desfeito com sucesso');
                  ctrl.onDelete(); // Retira do array de objetos um objeto especifico da listagem.
                })
            .catch(
                err => {
                    Toast.showRejectedToast("Erro ao desfazer o vínculo.");
                  $log.error(`Erro ao desfazer o vínculo. ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`);
                }
            );
      }, function() {
          $scope.status = 'You decided to keep your debt.';
      });
    }
  }
}

const GestorDetailElement = {
  controller: GestorDetailController,
  template: `
    <md-card class="hoverable" style="cursor: auto;">
      <img ng-src="{{$ctrl.gestor.praca.header_img ? 'https://epracas.cultura.gov.br' + $ctrl.gestor.praca.header_img : '/assets/header.jpg' }}" class="md-card-image" alt="Washed Out">
      <md-card-header>
        <md-card-avatar>
          <img ng-src="{{$ctrl.gestor.profile_picture_url}}" class="md-avatar-icon">
        </md-card-avatar>
        <md-card-header-text>
          <span class="md-title">{{$ctrl.gestor.nome}}</span>
          <!--<span class="md-subhead">Início da gestão: {{$ctrl.gestor.data_inicio_gestao | date:'dd/MM/yyyy' }}</span>-->
        </md-card-header-text>
      </md-card-header>
      <md-card-title>
        <md-card-title-text>
          <span class="md-headline">{{$ctrl.gestor.praca.nome}}</span>
          <span class="md-subhead">{{$ctrl.gestor.praca.municipio | ucfirst}} - {{$ctrl.gestor.praca.uf | uppercase}}</span>
        </md-card-title-text>
      </md-card-title>
      <md-card-content>
        <p>Início da gestão em: {{$ctrl.gestor.data_inicio_gestao | date:'dd/MM/yyyy' }}</p>
        <p>Situação da praça: {{$ctrl.gestor.praca.situacao_descricao}}</p>
      </md-card-content>
      <md-card-actions layout="row" layout-align="end center">
        <md-button class="md-icon-button" aria-label="Share" ng-click="$ctrl.delete($event, $ctrl.gestor.url)">
          <md-tooltip md-direction="top">Desfazer vínculo</md-tooltip>
          <i class="material-icons">delete</i>
        </md-button>
      </md-card-actions>
    </md-card>
  `,
  bindings: {
    gestor: "<",
    onDelete: "&",
    pk: "<",
  },
}

export default GestorDetailElement
