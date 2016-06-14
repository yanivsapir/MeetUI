'use strict';
var MeetApp = angular.module('MeetApp', [
    'ngCookies',
    'ui.router',
    'angular-google-gapi',
    'ui.bootstrap',
    'loginModule',
    'favouriteRestaurantsModule',
    'homeModule',
    'pairsModule',
    'restaurantsModule',
    'bookOrderModule',
    'userInfoModule'
]);


MeetApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('home', {
            url: "/home",
            controller : 'homeController as hm',
            templateUrl : 'includes/views/homeView/home.html'
        })
        .state('favouriteRestaurants', {
            url: "/favouriteRestaurants",
            controller : 'favouriteRestaurantsController as fr',
            templateUrl : 'includes/views/favouriteRestaurantsView/favouriteRestaurants.html'
        })
        .state('bookOrder', {
            url: "/bookOrder/{restaurantId}",
            controller : 'bookOrderController as bo',
            templateUrl : 'includes/views/bookOrderView/bookOrder.html'
        })
        .state('login', {
            url: "/login",
            controller : 'loginController as lg',
            templateUrl : 'includes/views/loginView/login.html'
        })
});

MeetApp.run(['GAuth', 'GApi', 'GData', '$state', '$rootScope', '$window', '$cookies', 'loginService', 'logoutService',
    function(GAuth, GApi, GData, $state, $rootScope, $window, $cookies, loginService, logoutService) {

        $rootScope.gdata = GData;
        logoutService.removeUser();

        var CLIENT = '798478620041-khfq97vuarnh161t8rdnvdvjbr8mh9bm.apps.googleusercontent.com';

        GApi.load('calendar', 'v3');
        GAuth.setClient(CLIENT);
        GAuth.setScope('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly');
        var currentUser = $cookies.get('userId');
        if(currentUser) {
            GData.setUserId(currentUser);
            GAuth.checkAuth().then(
                function () {
                    if($state.includes('login'))
                    {
                        loginService.assignUser();
                        $state.go('home');
                    }
                    else {
                        loginService.assignUser();
                    }
                },
                function() {
                    $state.go('login');
                }
            );
        } else {
            $state.go('login');
        }
    }
]);