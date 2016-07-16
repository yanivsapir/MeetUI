bookOrderModule.controller('bookOrderController', bookOrderController);

function bookOrderController(restaurantsService,pairsService,userInfoService,$stateParams) {
    var self = this;
    self.pairs = [];
    self.restaurants = [];
    self.userInfo = {};
    self.pairsLoaded = false;
    self.restaurantsLoaded = false;
    self.isUserInfoLoaded = false;
    self.restaurants = restaurantsService.getRestaurants();
    self.restaurantId = $stateParams.restaurantId;
    self.restaurantToBook = {};

    self.loadPairs = function(){
        self.pairsLoaded = false;
        pairsService.getPairs().then(
            function (response) {
                self.pairs = response.data;
                self.pairsLoaded = true;
            },
            function (errResponse) {
                console.log(errResponse);
            }
        );
    }

    self.loadRestaurants = function() {
        self.restaurantsLoaded = false;
        restaurantsService.getRestaurants().then(
            function (response) {
                self.restaurants = response.data;
                self.restaurants.forEach(function(restaurant){
                   if(restaurant.id == self.restaurantId)
                        self.restaurantToBook = restaurant;
                });
                self.restaurantsLoaded = true;
            },
            function (errResponse) {
                console.log(errResponse);
            }
        );
    };

    self.loadUserInfo = function(){
        userInfoService.getUserInfo().then(
            function (response) {
                self.userInfo = response.data;
                self.isUserInfoLoaded = true;
            },
            function (errResponse) {
                console.log(errResponse);
            }
        );
    };

    self.isUserStatusLoaded = function(){
        console.log(isUserInfoLoaded);
        return userInfoService.isUserInfoLoaded;
    }

    self.isFavouriteRestaurant = function(restaurant){
        if(self.isUserInfoLoaded && self.userInfo.likes.indexOf(restaurant.id) != -1)
            return restaurant;
    };


    self.loadPairs();
    self.loadRestaurants();
    self.loadUserInfo();
}