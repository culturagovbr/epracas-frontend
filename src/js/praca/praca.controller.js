class PracaCtrl {
	constructor(
		$scope,
	 	$mdDialog,
	 	praca,
	 	leafletData) {
		'ngInject';

		this._$mdDialog = $mdDialog;

		// $scope.praca = praca;
		$scope.praca = {
		'nome': 'Praça CEU de blablabla',
		'modelo_descricao': '3000 m',
		'bio': 'Inaugurada em 7 de abril de 2016, a estrutura possui dois edificios multiuso, dispostos em uma praça de esporte e lazer, com sala multimidia, salas para realização de oficinas e workshops, cineteatro/auditório, quadra poliesportiva coberta, pista de skate, parquinho para crianças, biblioteca e um Centro de Referência de Assistencia Social(Cras).',
		'agenda': [
			{
				'titulo': 'Aulas de Tai-Chi-Chuan',
				'data_inicio': '13/09/2016',
				'data_encerramento': '17/09/2016',
				'horario_inicio': '06:00',
				'horario_encerramento': '08:00',
				'descricao': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis dignissim magna, sit amet imperdiet diam facilisis ut. Nullam lacinia faucibus ipsum, eu cursus ante sollicitudin non. Maecenas fringilla gravida rutrum. Duis velit mi, gravida eget tellus a, varius ultricies risus. Nunc faucibus congue dui, id tincidunt orci iaculis ut. Fusce vel quam volutpat, bibendum massa ut, pulvinar metus. Aenean pretium, ante ac ultricies efficitur, mi quam tincidunt odio, in consectetur neque tellus non velit. Donec aliquam eget quam nec tempor. Vivamus dolor neque, eleifend non pharetra ut, mollis non massa. In vitae lorem urna. Aliquam dapibus condimentum accumsan. Aliquam porttitor nec est id sagittis. Phasellus in placerat nisi. Duis sem nisl, elementum non tempor at, accumsan ut dui. Maecenas erat massa, egestas at egestas nec, vulputate et odio.',
				'local': 'Quadra de Esportes',
			},
			{
				'titulo': 'Aulas de Tai-Chi-Chuan',
				'data_inicio': '13/09/2016',
				'data_encerramento': '17/09/2016',
				'horario_inicio': '06:00',
				'horario_encerramento': '08:00',
				'descricao': 'Aulas de Tai Chi Chuan com o professor Jin Wo, na Quadra de Esportes',
				'local': 'Quadra de Esportes',
			},
			{
				'titulo': 'Aulas de Tai-Chi-Chuan',
				'data_inicio': '13/09/2016',
				'data_encerramento': '17/09/2016',
				'horario_inicio': '06:00',
				'horario_encerramento': '08:00',
				'descricao': 'Aulas de Tai Chi Chuan com o professor Jin Wo, na Quadra de Esportes',
				'local': 'Quadra de Esportes',
			},

		],
		'localizacao': 'Rua 28, próximo ao Fórum de Valparaíso(TJGO). Aberto todos os dias de 8h às 22h.',
		'lat': -15.7833,
		'long': -47.9167,	
		};

		if (!$scope.praca.header_url){ 
			$scope.praca.header_url = "/header2.jpg";
		}

		$scope.menu = [
			{ id: 'vinculo', name: 'Requisitar vinculo com esta Praça', icon: 'assignment_ind', direction: 'left'},
			{ id: 'evento', name: 'Adicionar Evento', icon: 'insert_invitation', direction: 'left'},
			{ id: 'rh', name: 'Adicionar RH', icon: 'people', direction: 'left'},
			{ id: 'profile', name: 'Alterar informações sobre a Praça', icon: 'android', direction: 'left'},
		];


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
			fullscreen: $scope.customFullscreen,
		});
	}

}

export default PracaCtrl;
