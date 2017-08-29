class DashBoardCtrl {
    constructor($state, $scope, $document, $window) {
        "ngInject";

        $scope.$state = $state;

        $document.ready(function () {
            $('.showMenu').on('click', function () {
                var elm = $(this),
                    elmMenu = elm.closest('.menu'),
                    elmMenu2 = $('.menu2'),
                    elmContent = $('.dynamic .content-main');
                if (elmMenu.hasClass('extended')) {
                    elmMenu.removeClass('extended');
                    elmMenu2.removeClass('extended');
                    elmContent.removeClass('extended');
                    elmMenu.find('.material-icon').removeClass('arrow').addClass('hamburger');
                } else {
                    elmMenu.addClass('extended');
                    elmMenu2.addClass('extended');
                    elmContent.addClass('extended');
                    elmMenu.find('.material-icon').removeClass('hamburger').addClass('arrow');
                }
            });
            $document.on('scroll', () => {
                if ($window.scrollY >= 33) {
                    $('.dynamic .menu').css('top', 0);
                    $('.dynamic .menu').css('position', 'fixed');
                    $('.dynamic .content').css('height', '100vh');
                } else {
                    $('.dynamic .menu').css('top', '33px');
                    $('.dynamic .menu').css('position', 'absolute');
                    $('.dynamic .content').css('height', 'calc(100vh - 97px)');
                }
            });

            $('.tooltipped').tooltip({delay: 50});
        });
    }
}

export default DashBoardCtrl;
