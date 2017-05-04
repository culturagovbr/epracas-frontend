const GaleriaList = {
  template: `
    <md-grid-list
      md-cols="1" md-cols-sm="2" md-cols-md="3" md-cols-gt-md="6"
      md-row-height-gt-md="1:1" md-row-height="4:3"
      md-gutter="8px" md-gutter-gt-sm="4px">
      <md-grid-tile ng-repeat="objPhoto in arrPhotos"
        md-rowspan="{{objPhoto.span.row}}"
        md-colspan="{{objPhoto.span.col}}"
        md-colspan-sm="1"
        md-colspan-xs="1"
        ng-class="objPhoto.background">
          <img width="135%" class="materialboxed" data-caption="{{objPhoto.title}}" ng-src="{{objPhoto.url}}">
          <md-grid-tile-footer><h3>{{objPhoto.title}}</h3></md-grid-tile-footer>
        </md-grid-tile>
    </md-grid-list>
    `,
  bindings: {
    imagens: "<",
  },
}

export default GaleriaList
