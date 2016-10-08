class AgendaCtrl {
	constructor($scope, $state, $stateParams, agenda) {
		'ngInject';

		this.agenda = agenda;

		$scope.$state = $state;
		$scope.$stateParams = $stateParams;

	}
}
export default AgendaCtrl;
