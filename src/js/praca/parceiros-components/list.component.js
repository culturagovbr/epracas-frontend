const ParceirosListElement = {
  template: `
        <div ng-if="$ctrl.parceiros.length == 0">
          <p>Ainda não existem Parceiros para esta Praça. <b>:(</b></p>
        </div>
        <div layout-wrap layout-margin layout="row">
        <md-list flex>
            <md-list-item class="md-3-line" ng-repeat="parceiro in $ctrl.parceiros" ng-click="null">
              <!--<img ng-src="{{parceiro.imagem}}" class="md-avatar" alt="{{parceiro.nome}}" />-->
              <div class="md-list-item-text" layout="column">
                <h3>{{parceiro.nome}}</h3>
                <h4>{{parceiro.email}}</h4>
                <p>{{parceiro.ramo_atividade_name}}</p>
              </div>
            <md-divider></md-divider>
            </md-list-item>
        </md-list>
        </div>
      `,
  bindings: {
    parceiros: "<",
  },
}

export default ParceirosListElement
