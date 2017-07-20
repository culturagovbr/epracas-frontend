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
        Gestor.delete(pk)
            .then(
                response => {
                  ctrl.onDelete(); // Retira do array de objetos um objeto especifico da listagem.
                  Toast.showSuccessToast('Vínculo desfeito com sucesso');
                })
            .catch(
                err => {
                  $log.error(`Erro ao desfazer o vínculo. ${angular.toJson(err.status)} - ${angular.toJson(err.data)}`);
                  Toast.showRejectedToast("Erro ao desfazer o vínculo.");
                }
            );
      });
    }
  }
}

const GestorDetailElement = {
  controller: GestorDetailController,
  template: `
    <md-card>
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
          <span class="md-subhead">{{$ctrl.gestor.praca.municipio}} - {{$ctrl.gestor.praca.uf | uppercase}}</span>
        </md-card-title-text>
      </md-card-title>
      <md-card-content>
        <p>Início da gestão em: {{$ctrl.gestor.data_inicio_gestao | date:'dd/MM/yyyy' }}</p>
        <p>Situação da praça: {{$ctrl.gestor.praca.situacao}}</p>
      </md-card-content>
      <md-card-actions layout="row" layout-align="end center">
        <md-button class="md-icon-button" aria-label="Share" ng-click="$ctrl.delete($event, $ctrl.gestor.url)">
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
