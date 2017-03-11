function scroll() {
    "ngInject";
    return {
        restrict: "A",
        link(scope, element, attrs) {
            element.on('click', () => {
                let target = $(attrs.scroll);
                let intOffset = (attrs.offset)? attrs.offset : 0;
                if (target.length > 0) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - intOffset
                    });
                }
            });
        },
    };
}
export default scroll;