function leafletFlexFit($timeout, leafletData) {
  "ngInject";

  var directive = {
    restrict: 'A',
    compile: compile
  };

  return directive;

  function compile(tElem, attrs) {
    tElem.attr('flex', '');

    // A hack to get Leaflet to fill the flex container.
    // @link https://github.com/tombatossals/angular-leaflet-directive/issues/950
    leafletData.getMap().then(function (map) {
      $timeout(function() {map.invalidateSize()});
    });
  }
}

export default leafletFlexFit;
