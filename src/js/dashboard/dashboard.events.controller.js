import moment from "moment"
import { basename } from "path";

class DashboardEventsCtrl {
    constructor($log, Praca, Atividade, $stateParams, $state) {
        "ngInject";

        this._$state = $state;

        //montando seletor de Estados(uf)
        this.arrUf = [];
        this.arrUf.unshift({ value: -1, display_name: "Todos" });

        let intYear = (typeof $stateParams.year === 'undefined') ? moment().format('YYYY') : $stateParams.year,
            intMonth = (typeof $stateParams.month === 'undefined') ? parseInt(moment().format('MM')) : $stateParams.month,
            uf = (typeof $stateParams.uf === 'undefined') ? this.arrUf.indexOf(0) : $stateParams.uf,
            municipio = (typeof $stateParams.municipio === 'undefined') ? null : $stateParams.municipio;
            
        this.objForm = {
            intYear: intYear,
            intMonth: intMonth,
            uf: uf,
            municipio: municipio
        };

        // Montando os meses para o formulario.
        this.arrMonth = moment.months().map((data, intIndex) => {
            return { id: intIndex + 1, name: data };
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

            this.arrUf = this.arrUf.sort();

            dateCalendar = new Date(this.objForm.intYear + '-' + this.objForm.intMonth + '-' + '01 12:00:00'); // Firefox nao e tao flexivel quanto o chrome, por isso foi colocado as horas.
            this.config = {
                calendarView: 'month',
                viewDate: dateCalendar,
            };

            //Resetando filtro evitando duplicidade de UF/estados
            if (this.objForm.uf == -1) {
                this.arrUf = [];
                this.arrUf.unshift({ value: -1, display_name: "Todos" });
            }
            this.arrMunicipio = [];
            this.events = [];
            Atividade.list(null, this.objForm.intMonth, this.objForm.intYear)
                .then(apiReturn => apiReturn.map(this.returnEvent))
                .then(mappedEvents => {

                    mappedEvents.forEach(event => {
                        if (this.objForm.uf == -1) {
                            this.events.push(event);
                        } else if (this.objForm.uf != -1) {
                            if (event.uf.toUpperCase() == this.objForm.uf.toUpperCase()) {
                                this.events.push(event);  
                            }
                            if(event.uf.toUpperCase() == this.objForm.uf.toUpperCase()){
                                if(this.arrMunicipio.indexOf(event.municipio)<0 ){
                                    this.arrMunicipio.push(event.municipio);
                                }
                            }
                        }
                        
                        
                        if (this.objForm.uf == -1) {
                            if (this.arrUf.indexOf(event.uf.toLowerCase()) < 0) {
                                this.arrUf.push(event.uf.toLowerCase());
                            }
                        }
                        this.arrUf = this.arrUf.sort();
                    });
                    setTimeout(function () {
                        $('div.cal-month-day:not(.cal-day-today)').removeClass('cal-day-event');
                        $('small.cal-events-num:not(.ng-hide)').closest('div.cal-month-day:not(.cal-day-today)').addClass('cal-day-event');
                    }, 500);

                    Praca.options().then((data) => {
                        angular.forEach(data.uf.choices, (uf) => {
                            var i = 0;

                            if (this.arrUf.indexOf(uf.display_name) in this.arrUf) {
                                i = 1;
                            }
                            if (i != 1) {
                                if (this.arrUf.indexOf(uf.value) in this.arrUf) {
                                    this.arrUf.splice(this.arrUf.indexOf(uf.value), 1, uf);
                                }
                            }
                        });
                    });

                    this.arrUf = this.arrUf.sort();

                }).catch($log.log('Erro na transformação de eventos'));
                console.log(this.arrMunicipio);
        };
        this.navigateTo = (pk) => {
            this._$state.go('app.atividade', { pk: pk });
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