class PracaCtrl {
	constructor(
		$scope,
	 	$mdDialog,
		User,
	 	praca,
	 	leafletData) {
		'ngInject';

		this._$mdDialog = $mdDialog;

		this._$scope = $scope;

		$scope.praca = praca;

		if (!$scope.praca.header_url){ 
			$scope.praca.header_url = "/header2.jpg";
		}

		if (!$scope.praca.nome){
			$scope.praca.nome = "Praça CEU de " + $scope.praca.municipio + ' - ' + $scope.praca.uf.toUpperCase()
		}

		if (!$scope.praca.bio){
			$scope.praca.bio = "Texto de apresentação da Praça(a ser preenchido pelo Gestor)"
		}

		// $scope.menu = [
		// 	{ id: 'vinculo', name: 'Requisitar vinculo com esta Praça', icon: 'assignment_ind', direction: 'left'},
		// 	{ id: 'evento', name: 'Adicionar Evento', icon: 'insert_invitation', direction: 'left'},
		// 	{ id: 'rh', name: 'Adicionar RH', icon: 'people', direction: 'left'},
		// 	{ id: 'profile', name: 'Alterar informações sobre a Praça', icon: 'android', direction: 'left'},
		// ];
		if (!User.current.gestor){
			$scope.menu = [
				{ 
					id: 'vinculo', 
					name: 'Requisitar vinculo com esta Praça', 
					icon: 'assignment_ind',
					direction: 'left',
					func: 'showVinculacao($event)' 
				},
			];
		} else {
			$scope.menu = [
				{ id: 'evento', name: 'Adicionar Evento', icon: 'insert_invitation', direction: 'left'},
				{ id: 'rh', name: 'Adicionar RH', icon: 'people', direction: 'left'},
				{ id: 'profile', name: 'Alterar informações sobre a Praça', icon: 'android', direction: 'left'},
			];
		}


		$scope.defaults = {
			scrollWheelMouse: false,
			zoomControl: false,
			dragging: false,
		};

		$scope.center = {
			lat: $scope.praca.lat,
			lng: $scope.praca.long,
			zoom: 14,
		};

		$scope.markers = {
			marker: {
				lat: $scope.praca.lat,
				lng: $scope.praca.long,
				message: $scope.praca.localizacao,
			}
		};

		$scope.customFullscreen = true;

	}


	showVinculacao($scope, ev) {
		this._$mdDialog.show({
			controller: 'VinculacaoCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'praca/vinculacao.tmpl.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsiteToClose: false,
			fullscreen: true,
		})
	}

	showChangeHeaderImg($scope, ev) {
		this._$mdDialog.show({
			controller: 'ChangeHeaderImgCtrl',
			controllerAs: '$ctrl',
			templateUrl: 'praca/header-dialog.tmpl.html',
			parent: angular.element(document.body),
			// locals: { praca: $scope.praca },
			scope: this._$scope,
			preserveScope: true,
			targetEvent: ev,
		})	
	}
	// showAgenda($scope, ev) {
	// 	this._$mdDialog.show({
	// 		controller: 'AgendaCtrl'
	// 	})
	// }

}

export default PracaCtrl;
