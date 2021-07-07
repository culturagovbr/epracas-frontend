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
          ${msg}
          <md-icon>done</md-icon>
        </md-toast>`,
    });
  }

  showRejectedToast(msg) {
    this._$mdToast.show({
      hideDelay: 4000,
      position: "top right",
      template:
        `<md-toast>
          ${msg}
          <md-icon>clear</md-icon>
        </md-toast>`,
    });
  }

  showRejectedToastProx(msg) {
    this._$mdToast.show({
      hideDelay: 4000,
      position: "right",
      template:
        `<md-toast>
          ${msg}
          <md-icon>clear</md-icon>
        </md-toast>`,
    });
  }
}

export default Toast;
