class PracaCtrl {
	constructor($scope, $state, $stateParams, pracas) {
		'ngInject';

		this.pracas = pracas;

		$scope.$state = $state;
		$scope.$stateParams = $stateParams;

		$scope.situacoes = [
			{
				'value': '',
				'descricao': ''
			},
			{
				'value': 'i',
				'descricao': 'Inaugurada'
			},
			{
				'value': 'a',
				'descricao': 'Obras em Andamento'
			},
			{
				'value': 'c',
				'descricao': 'Obras Concluidas'
			}
		];

		$scope.modelos = [
			{
				'value': '',
				'descricao': ''
			},
			{
				'value': 'p',
				'descricao': '700m²'
			},
			{
				'value': 'm',
				'descricao': '3000m²'
			},
			{
				'value': 'g',
				'descricao': '7000m²'
			}
		];


		$scope.myDate = new Date();

	}
}

export default PracaCtrl;

