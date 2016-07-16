restaurantMenuModule.controller('restaurantMenuController', restaurantMenuController);

function restaurantMenuController(restaurantsService, pairsService, userInfoService,$stateParams) {
    var self = this;

    self.pairs = [];
    self.restaurants = [];
    self.userInfo = {};
    self.pairsLoaded = false;
    self.restaurantsLoaded = false;
    self.restaurantsById = {};
    self.selectedRestaurant = {};
    self.restaurantId = $stateParams.restaurantId;
    self.isUserInfoLoaded = false;
    self.mealsCategories = {};
    self.restaurants = restaurantsService.getRestaurants();
    self.mealTypeTrue = { "color": "#e7565d","font-size":"160%" };
    self.mealTypeFalse = { "color": "#27b6ba","font-size":"160%" };
    self.preferedPair = {};
    self.selectedMeal = {};
    self.loadPairs = function(){
        self.pairsLoaded = false;
        pairsService.getPairs().then(
            function (response) {
                self.pairs = response.data;
                self.pairsLoaded = true;
                self.loadUserInfo();
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
                    self.restaurantsById[restaurant.id] = restaurant;
                });
                self.selectedRestaurant = self.restaurantsById[self.restaurantId];
                self.selectedRestaurant.meals.forEach(function(meal){
                    if(!self.mealsCategories[meal.category])
                        self.mealsCategories[meal.category] = [];
                    self.mealsCategories[meal.category].push(meal);
                });
                self.restaurantsLoaded = true;
            },
            function (errResponse) {
                console.log(errResponse);
            }
        );
    }

    self.loadUserInfo = function(){
        userInfoService.getUserInfo().then(
            function (response) {
                self.userInfo = response.data;
                self.isUserInfoLoaded = true;
                self.pairs.forEach(function (pair) {
                   if(self.userInfo.pair == pair.title) {
                       self.preferedPair = pair;
                   }
                });
            },
            function (errResponse) {
                console.log(errResponse);
            }
        );
    };

    self.isMealTypeTrue = function(meal){
        var answer = false;
        meal.types.forEach(function(type){
           if(self.userInfo.pair == type.name){
               answer = type.value;
           }
        });
        return answer;
    };

    self.editMeal = function (meal) {
        self.selectedMeal = meal;
        $('#editMeal').modal('show');
    };

    self.saveMeal = function () {
        restaurantsService.saveMeals(self.selectedRestaurant).then(
            function (response) {
                if(response.data.response == "success") {
                    $('#editMeal').modal('hide');
                    swal("Success!", "Meal Was Updated!", "success");
                }
            },
            function (errResponse) {
                $('#editMeal').modal('hide');
                swal("Error!", "There Was an Error With Updating The Meal!", "error");
                console.log(errResponse);
            }
        );
    };

    self.loadPairs();
    self.loadRestaurants();
}