class DashBoardCtrl {
    constructor($state, $scope, $document, $window) {
        "ngInject";

        $scope.$state = $state;

        $document.ready(function () {
            $('.showMenu').on('click', function () {
                var elm = $(this),
                    elmMenu = elm.closest('.menu');
                if (elmMenu.hasClass('extended')) {
                    elmMenu.find('.material-icon').removeClass('arrow').addClass('hamburger');
                    elmMenu.removeClass('extended');
                } else {
                    elmMenu.find('.material-icon').removeClass('hamburger').addClass('arrow');
                    elmMenu.addClass('extended');
                }
            });

            $document.on('scroll', () => {
                if ($window.scrollY >= 33) {
                    $('.dynamic .menu').css('top', 0);
                    $('.dynamic .menu').css('position', 'fixed');
                } else {
                    $('.dynamic .menu').css('top', '33px');
                    $('.dynamic .menu').css('position', 'absolute');
                }
            });

            $('.tooltipped').tooltip({delay: 50});
        });
    }
}

export default DashBoardCtrl;
