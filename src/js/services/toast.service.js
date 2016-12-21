class Toast {
  constructor($mdToast) {
    "ngInject";

    this._$mdToast = $mdToast;
  }

  showSuccessToast(msg) {
    this._$mdToast.show({
      hideDelay: 4000,
      position: "top right",
      template:
        `<md-toast>
          <md-icon>done</md-icon>
          ${msg}
        </md-toast>`,
    });
  }

  showRejectedToast(msg) {
    this._$mdToast.show({
      hideDelay: 4000,
      position: "top right",
      template:
        `<md-toast>
          <md-icon>clear</md-icon>
          ${msg}
        </md-toast>`,
    });
  }
}

export default Toast;
