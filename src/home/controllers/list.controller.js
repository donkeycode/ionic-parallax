function($log, $scope, $filter, $ionicPopup) {

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
}
