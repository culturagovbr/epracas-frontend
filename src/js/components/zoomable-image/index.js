import Magnifier from 'magnifier'

class MagnifierController {
  constructor() {
    "ngInject";

    this.$postLink = () => {
      let magnifier = new Magnifier();

      magnifier.attach({
        thumb: "#epracas-magnifier",
        large: this.src,
        zoom: 3,
        zoomable: true,
        mode: 'inside'
      })
    }
  }
}

const ZoomableImage = {
  controller: MagnifierController,
  template: `
    <div>
      <div class="magnifier-thumb-wrapper">
        <img id="epracas-magnifier" src="{{ $ctrl.src }}" />
      </div>
    </div>
  `,
  bindings: {
    src: '@'
  }
}

export default ZoomableImage
