<div class="md-card-wrapper">
  <md-card ng-repeat="pedido in $ctrl.pedidos" >
    <img ng-src={{pedido.praca.header_url}} class="md-card-image">
    <div layout="row" flex="100">
      <span>{{pedido.praca.nome}}</span>
    </div>
    <div>
    <md-card-content>
      <h2>Card headline</h2>
      <p>Card content</p>
      </md-card-content>
      <md-card-actions layout="row" layout-align="end center">
        <md-button>Action 1</md-button>
        <md-button>Action 2</md-button>
        </md-card-actions>
  </md-card>
</div>

