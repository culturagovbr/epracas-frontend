class ChangeHeaderImgCtrl {
	constructor($scope, $timeout, $mdDialog, Upload, AppConstants) {
		'ngInject';

		this._$mdDialog = $mdDialog;
		this._$scope = $scope;
		this._AppConstants = AppConstants;
		this._Upload = Upload;
		this._praca = $scope.praca;
		this._$timeout = $timeout;
		self = this;
	}

	cancel() {
		this._$mdDialog.cancel();
	}

	upload(dataUrl, name) {
		this._Upload.upload({
			url: this._AppConstants.api + '/pracas/' + this._praca.id_pub + '/header_upload/',
			data: { header_img: this._Upload.dataUrltoBlob(dataUrl, name) }, })
			.then(
				function(response) {
					self._$timeout(function() {
						$scope.result = response.data;
					});
				}, function(response) {
					if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
				}, function (evt) {
					$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
				}
			);
	}



}

export default ChangeHeaderImgCtrl;
