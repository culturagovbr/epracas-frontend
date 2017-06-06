class GaleriaListController {
    constructor($timeout) {
        "ngInject"

        let arrImg = [];
        arrImg[0] = '1';
        arrImg[1] = '2';
        arrImg[2] = '3';
        this.imagens = arrImg;


        // paginatorData = this.imagens;
console.info('aaa');
// In this example, we set up our model using a plain object.
        // Using a class works too. All that matters is that we implement
        // getItemAtIndex and getLength.
        this.infiniteItems = {
            numLoaded_: 0,
            toLoad_: 0,
            // Required.
            getItemAtIndex: function(index) {
                console.info('aa');
                console.info(index);
                if (index > this.numLoaded_) {
                    this.fetchMoreItems_(index);
                    return null;
                }
                return index;
            },
            // Required.
            // For infinite scroll behavior, we always return a slightly higher
            // number than the previously loaded items.
            getLength: function() {
                return this.numLoaded_ + 5;
            },
            fetchMoreItems_: function(index) {
                console.info('cc');
                console.info(index);
                // For demo purposes, we simulate loading more items with a timed
                // promise. In real code, this function would likely contain an
                // $http request.
                if (this.toLoad_ < index) {
                    this.toLoad_ += 20;
                    $timeout(angular.noop, 300).then(angular.bind(this, function() {
                        this.numLoaded_ = this.toLoad_;
                    }));
                }
            }
        };

    }
}

const GaleriaList = {
  controller: GaleriaListController,
  controllerAs: "ctrl",
  template: `
    <md-content class="md-padding">
        <div class="row">
            <div class="col s12">
                teste - {{ctrl.infiniteItems}}
                <md-virtual-repeat-container id="vertical-container" style="height: 300px;">
                    <div md-virtual-repeat="item in ctrl.infiniteItems" md-on-demand class="animated fadeIn repeated-item" flex>
                        {{item}}
                    </div>
                </md-virtual-repeat-container>
            </div>
        </div>
    </md-content>
    <md-grid-list
      md-cols="1" md-cols-sm="2" md-cols-md="3" md-cols-gt-md="6"
      md-row-height-gt-md="1:1" md-row-height="4:3"
      md-gutter="8px" md-gutter-gt-sm="4px">
      <md-grid-tile
                    md-rowspan="1"
                    md-colspan="1"
                    md-colspan-sm="1"
                    md-colspan-xs="1">
        <img width="135%" class="materialboxed animated fadeIn" data-caption="teste" ng-src="teste">
        <md-grid-tile-footer><h3>teste2</h3></md-grid-tile-footer>
      </md-grid-tile>
    </md-grid-list>
    `,
  // bindings: {
  //   imagens: "=",
  // },
};

export default GaleriaList
