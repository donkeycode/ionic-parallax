function($stateProvider) {
    $stateProvider.state('dc.parallaxMahart', {
        url: '/parallax-mahart',
        views: {
            menuContent: {
                templateUrl: 'dc.parallaxMahart.templates.parallax'
            }
        }
    })
}
