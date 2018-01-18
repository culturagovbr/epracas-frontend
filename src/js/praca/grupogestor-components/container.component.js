class GrupoGestorController {
  constructor($mdDialog, $log) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $log,
    })

    console.info(this.praca.grupo_gestor);

  }

  $onInit() {
    if (
      (angular.isUndefined(this.praca.grupo_gestor)) ||
      (this.praca.grupo_gestor === null) ||
      (this.praca.grupo_gestor.length === 0)
    ) {
      this.ggEmpty = true
    } else {
      this.ggEmpty = false
    }
  }

  showGrupoGestorDialog(praca) {
    console.log('a ');
    const grupogestor = praca.grupo_gestor
    this.$mdDialog.show({
      controller: "GrupoGestorDialogController",
      controllerAs: "$ctrl",
      templateUrl: "praca/grupogestor-components/grupogestor.dialog.tmpl.html",
      locals: { praca, grupogestor },
      fullscreen: true,
    })
  }

  showMembroGestorDialog(praca) {
    alert('a ');
    this.$mdDialog.show({
      controller: "MembroGestorDialogController",
      controllerAs: "$ctrl",
      templateUrl: "praca/grupogestor-components/membrogestor.dialog.tmpl.html",
      locals: { praca },
      fullscreen: true,
    })
  }

  showMembroGestorListDialog(praca) {
    console.info('b ');
    this.$mdDialog.show({
      controller: "MembroGestorListDialogController",
      controllerAs: "$ctrl",
      templateUrl: "praca/grupogestor-components/membrogestor-list.dialog.tmpl.html",
      locals: { praca },
      fullscreen: true,
    })
  }

  showGestorDialog(praca) {
    console.info('c ');
    if (this.ggEmpty) {
      this.showGrupoGestorDialog(praca)
    } else {
      this.showMembroGestorDialog(praca, praca.grupo_gestor)
    }
  }
}

const GrupoGestorContainer = {
  controller: GrupoGestorController,
  template: `
    <div id="container-grupogestor" layout-padding layout-gt-xs="row">
      <div flex layout-padding class="info">
        <div class="layout-row title">
          <md-icon>group</md-icon>
          <h1 flex><a href="#" ng-disable="!$ctrl.praca.grupo_gestor.membros" ng-click="$ctrl.showMembroGestorListDialog($ctrl.praca)"> Grupo Gestor</a></h1>
        </div>
        <div ng-show="$ctrl.ggEmpty">
          <p>Os dados sobre o Grupo Gestor ainda não foram inseridos nesta Praça.</p>
        </div>
        <div layout-wrap layout-margin class="layout-row">
          <md-card layout-padding>
          <span class="epr-name"><md-icon type="link">description</md-icon> Documentos</span>
            <span>
            <!--https://epracas.cultura.gov.br-->
                <a flex href="{{$ctrl.praca.grupo_gestor.documento_constituicao}}">
                  <span class="epr-subname"> Constituição 
                  </span>
                </a> 
                &nbsp;&nbsp;
                <a flex href="{{$ctrl.praca.grupo_gestor.estatuto}}">
                  <span class="epr-subname">Estatuto</span>
                </a>
            </span>
          </md-card>
        </div>
        
        <div layout-wrap layout-margin layout="row">
          <md-card ng-repeat="membro in $ctrl.praca.grupo_gestor.membros" layout-padding flex="18">
            <div ng-show="membro.imagem" class="epr-avatar" style="background-image: url('{{ membro.imagem }}')"></div>
            <span class="epr-name">{{ membro.nome }}</span>
            <span class="epr-subname">{{ membro.origem_descricao }}</span>
          </md-card>
        </div>

      <md-fab-speed-dial show-as-manager="true" class="md-fab-top-right" ng-click="$ctrl.showGestorDialog($ctrl.praca)">
        <md-fab-trigger>
          <md-button class="md-fab">
            <md-icon>add</md-icon>
          </md-button>
        </md-fab-trigger>
      </md-fab-speed>
      </div>
    </div>
    `,
  bindings: {
    praca: "<",
    grupo_gestor: "<",
    ggEmpty: "<",
    situacao: "<",
  },

}

export default GrupoGestorContainer
