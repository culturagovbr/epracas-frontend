import moment from 'moment'

class EventPreviewerCtrl {
  constructor($location) {
    "ngInject";

    this.navigateTo = url => $location.url(url)
  }

  limitString(inStr) {
    return {
      to: quantity => {
        if(inStr.length > quantity)
          return inStr.slice(0, quantity) + "..."
        return inStr
      }
    }
  }
}

const EventPreviewer = {
  controller: EventPreviewerCtrl,
  template: `
    <div class="event-previewer" layout="column" ng-click="$ctrl.navigateTo($ctrl.event.url)">
      <span class="period">de {{ $ctrl.event.data_inicio }} a {{ $ctrl.event.data_encerramento }}</span>
      <div class="local">{{ $ctrl.event.espaco }} </div>
      <h1 class="title">{{ $ctrl.event.titulo }}</h1>
      <p class="description">{{ $ctrl.limitString($ctrl.event.descricao).to(80) }}</p>
    </div>
  `,
  bindings: {
    event: '='
  }
}

export default EventPreviewer
