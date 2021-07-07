class HomeCtrl {
    constructor($q, $state, AppConstants, Praca, $document, $window, $scope, $rootScope,  $mdMedia, $location) {
        "ngInject";

        $scope.$mdMedia = $mdMedia;
        // $scope.$mdMenu = $mdMenu;
        $scope.$state = $state;
        var originatorEv;

        this.appName = AppConstants.appName;
        this._Praca = Praca;
        this._$state = $state;
        this._$q = $q;

        var $comunicado = $rootScope.comunicado;

        if ($rootScope.comunicado == undefined){
            $rootScope.comunicado = true ;
        } else {
            $rootScope.comunicado = false ;
        }

         // Pegando o evento scroll da tela para deixar as abas dinamicas conforme o scroll.
        // angular.element(document).ready(function(){

        let elmTab = $('.tab-home'),
            intPracasPosition = elmTab.offset().top,
            strColorCurrent = '',
            intCurrentTab = 0;
            $document.ready(function () {
                $('.materialboxed').materialbox();
                let elmTab = $('.tab-home'),
                    intPracasPosition = elmTab.offset().top;

                $scope.scroll(elmTab, intPracasPosition);
                $document.on('scroll', () => {
                    $scope.scroll(elmTab, intPracasPosition);
                });

                $('.tooltipped').tooltip({delay: 20});

                $('#lnk_portaria').click(function() {
                    var absUrl = $location.absUrl();
                    $window.open(absUrl+"/assets/PORTARIA_MTUR_15.pdf");
                });

                $( "#btn_fechar" ).click(function() {
                    $rootScope.comunicado = false;
                    $('#myModal').hide();
                });
            });

        this.openMenu = function($mdMenu, ev) {
            originatorEv = ev;
            $mdMenu.open(ev);
        };

        $scope.scroll = (elmTab, intPracasPosition) => {
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
                let elmContentCurrent = $($(arrElmScrollContainers[$scope.tabIntSelected]).attr('scroll')).find('.content-hide'),
                    arrElmContent = $('.content-hide');
                arrElmContent.removeClass('animtated').addClass('fadeOutUp animtated');
                elmContentCurrent.removeClass('fadeOutUp animtated');
                elmContentCurrent.addClass('animtated');
                elmContentCurrent.show();
                intCurrentTab = $scope.tabIntSelected;
            }

            if ($window.scrollY >= intPracasPosition) {
                elmTab.fadeIn('slow');
                elmTab.addClass('fixed');
                elmTab.addClass('md-whiteframe-8dp');
            } else {
                elmTab.fadeOut();
                elmTab.removeClass('fixed');
                elmTab.removeClass('md-whiteframe-8dp');
            }
        }

    }

    DialogController($scope, $mdDialog) {
        $scope.hide = function () {
          $mdDialog.hide();
        };
    
        $scope.cancel = function () {
          $mdDialog.cancel();
        };
    
        $scope.answer = function (answer) {
          $mdDialog.hide(answer);
        };
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