homeModule.controller('homeController', homeController);

function homeController(restaurantsService, pairsService, userInfoService, $scope) {
    var self = this;
    self.pairs = [];
    self.pairsLoaded = false;
    self.restaurants = [];
    self.restaurantsLoaded = false;
    self.selectedPairs = {"$$hashKey": "object:50", "_id": "575810b3dcba0f052b386f46", "id": 1, "names": ["kosher","not kosher"], "title": "isKosher"};
    userInfoService.preferedPair = self.selectedPairs;
    self.pairs = pairsService.getPairs();
    self.restaurants = restaurantsService.getRestaurants();
    $scope.slides = [];

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
                self.restaurantsLoaded = true;
                self.devideMealsByPair();
            },
            function (errResponse) {
                console.log(errResponse);
            }
        );
    }

    self.setCounts = function(){
        userInfoService.preferedPair = self.selectedPairs;
        self.devideMealsByPair();
    };

    self.devideMealsByPair = function(){
        if(self.restaurants){
            self.restaurants.forEach(function(restaurant){
                var trueCount = 0;
                var falseCount = 0;
                restaurant.meals.forEach(function(meal){
                    if(meal.types[self.selectedPairs.title] == true)
                        trueCount++;
                    else
                        falseCount++;
                });
                restaurant["trueCount"] = trueCount;
                restaurant["falseCount"] = falseCount;
            });
        }
    };

    self.loadPairs();
    self.loadRestaurants();
}