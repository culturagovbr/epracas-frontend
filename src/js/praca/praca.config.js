function PracaConfig($stateProvider){
	'ngInject';

	$stateProvider
		.state('app.pracas', {
			url: '/pracas',	
			controller: 'PracasCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'praca/pracas.html',
			title: 'Listagem de Praças dos CEUs',
			resolve: {
				pracas: function(Praca, $state) {
					return Praca.list().then(
						(pracas) => pracas,
						(err) => $state.go('app.home')
					);
				}
			}
		}
		)
		.state('app.praca', {
			url: '/pracas/{pk}',	
			controller: 'PracaCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'praca/pracas.praca.html',
			title: 'Praça',
			resolve: {
				praca: function(Praca, $state, $stateParams) {
					return Praca.get($stateParams.pk).then(
						(praca) => praca,
						(err) => $state.go('app.pracas')
					);
				}
			}
		}
		);
}

export default PracaConfig;
