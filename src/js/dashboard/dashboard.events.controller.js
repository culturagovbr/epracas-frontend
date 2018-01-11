import moment from "moment"

class DashboardEventsCtrl {
    constructor($log, Atividade, $stateParams, $state) {
        "ngInject";
        this._$state = $state;

        let intYear = (typeof $stateParams.year === 'undefined') ? moment().format('YYYY') : $stateParams.year,
            intMonth = (typeof $stateParams.month === 'undefined') ? parseInt(moment().format('MM')) : $stateParams.month;

        this.objForm = {
            intYear: intYear,
            intMonth: intMonth
        };

        // Montando os meses para o formulario.
        this.arrMonth = moment.months().map((data, intIndex) => {
            return {id: intIndex + 1, name: data};
        });
        this.arrYear = [];
        for (let i = 2017; i < parseInt(moment().format('YYYY')) + 2; i++) {
            this.arrYear.push({
                id: i,
                name: i
            });
        }

        let dateCalendar = new Date();
        this.config = {
            calendarView: 'month',
            viewDate: dateCalendar,
        };

        this.events = [];
        this.loadEvents = () => {
            dateCalendar = new Date(this.objForm.intYear + '-' + this.objForm.intMonth + '-' + '01 12:00:00'); // Firefox nao e tao flexivel quanto o chrome, por isso foi colocado as horas.
            this.config = {
                calendarView: 'month',
                viewDate: dateCalendar,
            };
            this.events = [];
            Atividade.list(null, this.objForm.intMonth, this.objForm.intYear)
            // .then(events => events.map(this.returnEvent(a)))
                .then(apiReturn => apiReturn.map(this.returnEvent))
                .then(mappedEvents => {
                    mappedEvents.forEach(event => this.events.push(event));
                    setTimeout(function(){
                        $('div.cal-month-day:not(.cal-day-today)').removeClass('cal-day-event');
                        $('small.cal-events-num:not(.ng-hide)').closest('div.cal-month-day:not(.cal-day-today)').addClass('cal-day-event');
                    }, 500);
                }).catch($log.log('Erro na transformação de eventos'));
        };

        this.navigateTo = (pk) => {
            this._$state.go('app.atividade', {pk: pk});
        };

        this.loadEvents();
    }

    returnEvent(event) {
        let newEvent = {
            id_pub: event.id_pub,
            title: event.titulo,
            startsAt: new Date(event.ocorrencia.start),
            endsAt: new Date(event.ocorrencia.repeat_until)
        };
        return newEvent;
    }
}

export default DashboardEventsCtrl;