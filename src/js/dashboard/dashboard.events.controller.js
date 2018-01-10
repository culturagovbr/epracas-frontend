import moment from "moment"
import { basename } from "path";

class DashboardEventsCtrl {
    constructor($log, Praca, Atividade, $stateParams, $state) {
        "ngInject";

        this._$state = $state;

        let intYear = (typeof $stateParams.year === 'undefined') ? moment().format('YYYY') : $stateParams.year,
            intMonth = (typeof $stateParams.month === 'undefined') ? parseInt(moment().format('MM')) : $stateParams.month,
            uf = (typeof $stateParams.uf === 'undefined') ? null : $stateParams.uf;

        this.objForm = {
            intYear: intYear,
            intMonth: intMonth,
            uf: uf
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

        this.arrUf = [];
        this.events = [];
        this.loadEvents = () => {
            dateCalendar = new Date(this.objForm.intYear + '-' + this.objForm.intMonth + '-' + '01 12:00:00'); // Firefox nao e tao flexivel quanto o chrome, por isso foi colocado as horas.
            this.config = {
                calendarView: 'month',
                viewDate: dateCalendar,
            };
            this.arrUf = [];
            this.events = [];
            Atividade.list(null, this.objForm.intMonth, this.objForm.intYear)
                .then(apiReturn => apiReturn.map(this.returnEvent))
                .then(mappedEvents => {
                    mappedEvents.forEach(event => {
                        this.events.push(event);
                        if (this.arrUf.indexOf(event.uf.toLowerCase()) < 0) {
                            this.arrUf.push(event.uf.toLowerCase());
                        }
                           this.arrUf = this.arrUf.sort();
                    });
                    setTimeout(function(){
                        $('div.cal-month-day:not(.cal-day-today)').removeClass('cal-day-event');
                        $('small.cal-events-num:not(.ng-hide)').closest('div.cal-month-day:not(.cal-day-today)').addClass('cal-day-event');
                    }, 500);
               
                    Praca.options().then((data) => {
                        angular.forEach(data.uf.choices, (uf)=>{
                            if(this.arrUf.indexOf(uf.value) in this.arrUf){
                            this.arrUf.splice(this.arrUf.indexOf(uf.value),1, uf);
                        }
                        });
                    });
                    this.arrUf = this.arrUf.sort();

                }
            
            ).catch($log.log('Erro na transformação de eventos'));
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
            endsAt: new Date(event.ocorrencia.repeat_until),
            uf: event.praca_detail.uf,
            municipio: event.praca_detail.municipio
        };
        return newEvent;
    }

}

export default DashboardEventsCtrl;