class HomeCtrl {
    constructor($q, $state, AppConstants, Praca, $document, $window, $scope) {
        "ngInject";

        this.appName = AppConstants.appName;
        this._Praca = Praca;
        this._$state = $state;
        this._$q = $q;

        // Pegando o evento scroll da tela para deixar as abas dinamicas conforme o scroll.
        // angular.element(document).ready(function(){
        $document.ready(function () {
            $('.materialboxed').materialbox();
            let elmTab = $('.tab-home'),
                intPracasPosition = elmTab.offset().top,
                strColorCurrent = '',
                intCurrentTab = 0;
            $document.on('scroll', () => {
                let arrElmScrollContainers = $('md-tab'),
                    arrObjScrollContainers = arrElmScrollContainers.map((intKey, elm) => {
                        let intPositionStart = $($(elm).attr('scroll')).offset().top, // Pega a posicao do container.
                            elmScrollContainer = $($(arrElmScrollContainers[intKey + 1]).attr('scroll')),
                            intPositionEnd = (arrElmScrollContainers[intKey + 1]) ? elmScrollContainer.offset().top : ''; // Pega a posicao do proximo container e diminui um, no caso e o limite deste container.
                        return {
                            strSelector: $(elm).attr('scroll'),
                            intPositionStart: intPositionStart - 96,
                            intPositionEnd: intPositionEnd - 1
                        }
                    });
                let intPosition = $window.scrollY;
                arrObjScrollContainers.each((intKey, objValue) => {
                    if (intPosition >= objValue.intPositionStart && intKey != $scope.tabIntSelected) {
                        let elmScrollContainer = $($(arrElmScrollContainers[intKey]).attr('scroll')),
                            strColor = elmScrollContainer.attr('scroll-color');
                        $scope.tabIntSelected = intKey;
                        $('md-content').removeClass(strColorCurrent);
                        $('md-content').addClass(strColor);
                        strColorCurrent = strColor;
                        $scope.$apply();
                    }
                });
                if (intCurrentTab != $scope.tabIntSelected) {
                    let elmContentCurrent = $($(arrElmScrollContainers[$scope.tabIntSelected]).attr('scroll')).find('.content'),
                        arrElmContent = $('.content');
                    arrElmContent.removeClass('animtated').addClass('fadeOutUp animtated');
                    elmContentCurrent.removeClass('fadeOutUp animtated');
                    elmContentCurrent.addClass('animtated');
                    elmContentCurrent.show();
                    intCurrentTab = $scope.tabIntSelected;
                }

                console.info(intCurrentTab);
                console.info($scope.tabIntSelected);


                if ($window.scrollY >= intPracasPosition) {
                    elmTab.addClass('fixed');
                    elmTab.addClass('md-whiteframe-8dp');
                } else {
                    elmTab.removeClass('fixed');
                    elmTab.removeClass('md-whiteframe-8dp');
                }
            });
        });
    }

    getMatches(query) {
        let deferred = this._$q.defer();
        this._Praca.search(query).then(
            res => deferred.resolve(res),
            err => deferred.reject(err)
        );
        return deferred.promise;
    }

    selectedItemChange(item) {
        this._$state.go('app.praca', {pk: item.id_pub});
    }

}

export default HomeCtrl;
