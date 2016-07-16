restaurantsModule.service('restaurantsService', restaurantsService);

function restaurantsService($http,$rootScope) {
    var self = this;
    self.restaurants = [];
    self.getRestaurants = function(){
        return $http.get('https://meetws.herokuapp.com/getAllRestaurants');
    }

    self.saveMeals = function(restaurant){
        return $http({
            url:'https://meetws.herokuapp.com/saveMeals/',
            method:'POST',
            data: restaurant,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}