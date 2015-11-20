function($stateProvider) {
    $stateProvider.state({
        url: '',
        name: 'dc',
        templateUrl: 'dc.home.templates.menu',
        controller: 'DcHomeMainController',
        abstract: true
    })
    .state('dc.home', {
        url: '/',
        views: {
            menuContent: {
                templateUrl: 'dc.home.templates.mapGame',
                controller: 'DcHomeListController'
            }
        }
    });
}
