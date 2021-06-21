function AgendaConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('app.agenda', {
			url: '/agenda',
			controller: 'AgendaCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'agenda/agenda.tmpl.html',
			title: 'Agenda de Atividades das Pracinha da Cultura',
			resolve: {
				agenda: function(Agenda, $state) {
					return Agenda.list().then(
						(agenda) => agenda,
						(err) => $state.go('app.home')
					);
				}
			}	
		}
		)
		.state('app.evento', {
			url: '/agenda/{pk}',
			controller: 'EventoCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'agenda/evento.tmpl.html',
			resolve: {
				evento: function(Agenda, $state, $stateParams) {
					return Agenda.get($stateParams.pk).then(
						(evento) => evento,
						(err) => $state.go('app.home')
					);
				}
			}
		})
		.state('app.eventos', {
			// url: "/eventos/{year}/{month}",
			url: "/eventos/{pk}",
			controller: "DashboardEventsCtrl",
			controllerAs: "$ctrl",
			templateUrl: "dashboard/events.tmpl.html",
		});
}

export default AgendaConfig;
