function($stateProvider) {
    $stateProvider.state('dc.parallaxStellar', {
        url: '/parallax-stellar',
        views: {
            menuContent: {
                templateUrl: 'dc.parallaxStellar.templates.parallax'
            }
        }
    })
}
