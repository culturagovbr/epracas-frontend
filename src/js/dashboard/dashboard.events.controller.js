import moment from "moment"
import { basename } from "path";

class DashboardEventsCtrl {
    constructor($log, Praca, Atividade, $stateParams, $state) {
        "ngInject";

        this._$state = $state;

        //montando seletor de Estados(uf)
        this.arrUf = [];
        this.arrMunicipio = [];

        let intYear = (typeof $stateParams.year === 'undefined') ? moment().format('YYYY') : $stateParams.year,
            intMonth = (typeof $stateParams.month === 'undefined') ? parseInt(moment().format('MM')) : $stateParams.month;
        this.objForm = {
            intYear: intYear,
            intMonth: intMonth,
            uf: (typeof $stateParams.uf === 'undefined') ? '0' : $stateParams.uf,
            municipio: (typeof $stateParams.municipio === 'undefined') ? '0' : $stateParams.municipio
        };

        console.info($stateParams.uf + ' ' + this.objForm.uf);
        console.info($stateParams.municipio + ' ' + this.objForm.municipio);
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

            dateCalendar = new Date(this.objForm.intYear + '-' + this.objForm.intMonth + '-' + '01 12:00:00'); // Firefox nao e tao flexivel quanto o chrome, por isso foi colocado as horas.
            this.config = {
                calendarView: 'month',
                viewDate: dateCalendar,
            };

            //Resetando filtro evitando duplicidade de UF/estados
            if (this.objForm.uf == '0') {
                this.arrUf = [];
                this.arrMunicipio = [];
            }
            //Resetando filtro evitando sobrecarga de municipios
            if (this.objForm.uf != this.arrMunicipio.indexOf(this.objForm.uf)) {
                this.arrMunicipio = [];
            }

            this.events = [];

            Atividade.list(null, this.objForm.intMonth, this.objForm.intYear)
                .then(apiReturn => apiReturn.map(this.returnEvent))
                .then(mappedEvents => {

                    if (this.arrMunicipio.length > 1 && this.objForm.uf != this.arrMunicipio[1].uf) {
                        this.arrMunicipio = [];
                    }

                    this.events = mappedEvents;

                    this.events = this.events.filter((obj) => {
                        let booResult = false;
                        if (obj.uf.toUpperCase() == this.objForm.uf.toUpperCase() || this.objForm.uf === '0') {
                            booResult = true;
                            let objMunicipio = {
                                value: obj.municipio.toLowerCase().replace(/(\b\w)/gi, function (m) { return m.toUpperCase(); }),
                                uf: obj.uf
                            };
                            let booMunicipio = false;
                            this.arrMunicipio.forEach((objValue) => { if (objValue.value === objMunicipio.value) booMunicipio = true; });
                            if (booMunicipio === false) {
                                this.arrMunicipio.push(objMunicipio);
                            }
                        }
                        if (this.arrUf.indexOf(obj.uf.toLowerCase()) < 0) this.arrUf.push(obj.uf.toLowerCase());
                        return booResult;
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

                    this.dtoEvent = [];

                    if (this.objForm.municipio != '0') {
                        angular.forEach(this.events, ev => {
                            if (this.objForm.municipio.toUpperCase() == ev.municipio.toUpperCase()) {
                                this.dtoEvent.push(ev);
                            }
                        });
                    }

                    if (this.dtoEvent.length > 0) {
                        this.events = [];
                        this.events = this.dtoEvent;
                    }

                    this.arrUf = this.arrUf.sort();

                }).catch($log.log('Erro na transformação de eventos'));

            console.info($stateParams.uf + ' ' + this.objForm.uf);
            console.info($stateParams.municipio + ' ' + this.objForm.municipio);
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