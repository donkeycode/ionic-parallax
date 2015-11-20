function($stateProvider) {
    $stateProvider.state('dc.parallax', {
        url: '/parallax',
        views: {
            menuContent: {
                templateUrl: 'dc.parallax.templates.parallax'
            }
        }
    })
}
