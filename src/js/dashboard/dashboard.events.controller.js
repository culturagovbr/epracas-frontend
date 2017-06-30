import moment from "moment"

class DashboardEventsCtrl {
  constructor($log, Atividade, $stateParams) {
    "ngInject";

    let intYear = (typeof $stateParams.year === 'undefined')? moment().format('YYYY') : $stateParams.year,
        intMonth = (typeof $stateParams.month === 'undefined')? parseInt(moment().format('MM')) : $stateParams.month;

    this.objForm = {
        intYear: intYear,
        intMonth: intMonth
    };

    // Montando os meses para o formulario.
    this.arrMonth = moment.months().map((data, intIndex) => {
        return {id : intIndex+1, name : data};
    });
    this.arrYear = [];
    for (let i = 2017; i < parseInt(moment().format('YYYY')) + 2; i++) {
        this.arrYear.push({
            id : i,
            name : i
        });
    }

    this.config = {
      calendarView: 'month',
      viewDate: new Date(),
    };

    this.events = [];
    this.loadEvents = () => {
          this.events = [];
          Atividade.list(null, this.objForm.intMonth, this.objForm.intYear)
          // .then(events => events.map(this.returnEvent(a)))
          .then(apiReturn => apiReturn.map(this.returnEvent))
          .then(mappedEvents => {
              mappedEvents.forEach(event => this.events.push(event));
          }).catch($log.log('Erro na transformação de eventos'));
      };

      this.loadEvents();
  }

  returnEvent(event) {
    let newEvent = {
        title: event.titulo,
        startsAt: new Date(event.ocorrencia.start),
        endsAt: new Date(event.ocorrencia.repeat_until)
      };
      return newEvent;
    }
  }

export default DashboardEventsCtrl;