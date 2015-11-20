function($document) {
    // var shrink = function(header, content, amt, max) {
    //   amt = Math.min(250, amt);
    //   ionic.requestAnimationFrame(function() {
    //     header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, +' + amt + 'px, 0)';
    //   });
    // };

    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            var resizeFactor, scrollFactor, blurFactor;
            var header = $document[0].body.querySelector('.map');

            $element.bind('scroll', function(e) {
                console.log(e.target.scrollTop);
                if (e.target.scrollTop >= 0) {
                    // Start shrinking
                    // shrinkAmt = headerHeight - Math.max(0, (starty + headerHeight) - e.target.scrollTop);
                    // shrink(header, $element[0], shrinkAmt, headerHeight);
                    scrollFactor = e.target.scrollTop / 2;
                    header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, +' + scrollFactor + 'px, 0)';
                } else {
                    // shrink(header, $element[0], 0, headerHeight);
                    resizeFactor = -e.target.scrollTop/100 + 0.99;
                    blurFactor = - e.target.scrollTop/10;
                    header.style[ionic.CSS.TRANSFORM] = 'scale('+resizeFactor+','+resizeFactor+')';
                    header.style.webkitFilter = 'blur('+blurFactor+'px)';
                }
            });
        }
    };
}
