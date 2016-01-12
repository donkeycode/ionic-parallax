function($log, $scope, $filter, $ionicPopup, $ionicScrollDelegate) {

    $scope.search = '';

    $scope.goLevel = function goLevel(nbLevel) {
        console.log("les renards gouverneront le monde");
        var alertPopup = $ionicPopup.alert({
            title: 'Coucou',
            template: 'Ce sera le level' + nbLevel
        });

        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };

    $scope.onSearchChanged = function onSearchChanged(term) {
        $log.debug('onSearchChanged', term);
        $scope.news = $filter('filter')(news, term);
    };

    $scope.onSwipe = function(event) {
      console.log("coucou", event);

      var getScrollMax = function getScrollMax() {
        return document.getElementById('background').scrollWidth;
      };

      /*if (event.gesture.velocityX > 0.5) {
        console.log("Sup");
        console.log("to scroll", event.gesture.deltaX);
        console.log(event.gesture.velocityX * 100);
          if (event.gesture.direction === 'right') {
            console.log(event.gesture.deltaX - event.gesture.velocityX * 100);
            $ionicScrollDelegate.scrollTo(0, 0);
          } else if (event.gesture.direction === 'left') {
            console.log(event.gesture.deltaX - event.gesture.velocityX * 100);
            $ionicScrollDelegate.scrollTo(getScrollMax(), 0);
            //console.log(event.gesture.deltaX + event.gesture.velocityX * 100);
              //controller1.left -= event.gesture.velocityX * 100;
          }
      }*/
    };
}
