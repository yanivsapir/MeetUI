bookOrderModule.controller('bookOrderController', bookOrderController);

function bookOrderController(restaurantsService,pairsService,$scope,userInfoService,$stateParams, $http) {
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
    self.preferedPair = userInfoService.preferedPair;
    self.months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

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

    self.bookReservation = function(){
        var dateToSend = self.date.getDate() + "." + (self.date.getMonth()+1) + "." + self.date.getFullYear();
        $http.post('https://meetws.herokuapp.com/saveReservations/' + self.preferedPair.names[0] + '/' + self.numOfPair1 + '/' +
            self.preferedPair.names[1] + '/' + self.numOfPair2 + '/' + dateToSend + '/' + self.restaurantId).then(
            function (response) {
                alert("booked");
                console.log("booked");
            },
            function (errResponse) {
                console.log(errResponse);
            }
        );
    }

    self.loadPairs();
    self.loadRestaurants();
    self.loadUserInfo();
}