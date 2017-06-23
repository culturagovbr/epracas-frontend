class GestorDetailController {
  constructor(ErrorCatcher) {
    "ngInject"

    angular.extend(this, {
      ErrorCatcher,
    })
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
    </md-card>
  `,
  bindings: {
    gestor: "<",
  },
}

export default GestorDetailElement
