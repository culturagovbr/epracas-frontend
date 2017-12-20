// import Magnifier from 'magnifier'

// class MagnifierController {
//   constructor($scope, $document) {
//     "ngInject";


//     // $scope.$watch(() => {
//     //   return document.getElementById('epracas-magnifier');
//     // }, () => {
//     //   let magnifier = new Magnifier();

//     //   magnifier.attach({
//     //     thumb: "#epracas-magnifier",
//     //     large: this.src,
//     //     zoom: 3,
//     //     zoomable: true,
//     //     mode: 'inside'
//     //   })
//     // });
//     this.$postLink = () => {
//       let magnifier = new Magnifier();

//       magnifier.attach({
//         thumb: "#epracas-magnifier",
//         large: this.src,
//         zoom: 3,
//         zoomable: true,
//         mode: 'inside'
//       })
//     }
//   }
// }

// const ZoomableImage = {
//   controller: MagnifierController,
//   template: `
//     <div>
//       <div class="magnifier-thumb-wrapper">
//         <img flex="100" height="auto" id="epracas-magnifier" ng-src="{{ $ctrl.src }}" />
//       </div>
//     </div>
//   `,
//   bindings: {
//     src: '@'
//   }
// }

// export default ZoomableImage
