class DashboardEventsCtrl {
  constructor($log, Atividade, $stateParams) {
    "ngInject";


    let intAno = $stateParams.ano,
        intMes = $stateParams.mes;

    console.info();

    console.info();

    this.config = {
      calendarView: 'month',
      viewDate: new Date(),
    };

    this.events = [];

    Atividade.list(null, intMes, intAno)
      // .then(events => events.map(this.returnEvent(a)))
      .then(apiReturn => apiReturn.map(this.returnEvent))
      .then(mappedEvents => {
        //debugger;

console.info('mappedEvents')
console.info(mappedEvents)
        // mappedEvents.forEach(this.events.push(event));
        mappedEvents.forEach(event => this.events.push(event));
      }
      )
      .catch($log.log('Erro na transformação de eventos'))
  }

  returnEvent(event) {
    let newEvent = {
        title: event.titulo,
        startsAt: new Date(event.ocorrencia.start),
        endsAt: new Date(event.ocorrencia.repeat_until)
      }
      return newEvent;
    }
  }

export default DashboardEventsCtrl;
