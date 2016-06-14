restaurantsModule.service('restaurantsService', restaurantsService);

function restaurantsService($http,$rootScope) {
    var self = this;
    self.restaurants = [];
    self.getRestaurants = function(){
        return $http.get('https://meetws.herokuapp.com/getAllRestaurants');
    }
}