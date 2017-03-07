class DashboardEventsCtrl {
  constructor($log, Atividade) {
    "ngInject";

    this.config = {
      calendarView: 'month',
      viewDate: new Date(),
    }

    this.events = [];

    Atividade.list()
      // .then(events => events.map(this.returnEvent(a)))
      .then(apiReturn => apiReturn.map(this.returnEvent))
      .then(mappedEvents => {
        //debugger;


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
