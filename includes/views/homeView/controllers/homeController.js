homeModule.controller('homeController', homeController);

function homeController(restaurantsService, pairsService, userInfoService, $scope,$http) {
    var self = this;
    self.pairs = [];
    self.userInfo = {};
    self.pairsLoaded = false;
    self.restaurants = [];
    self.restaurantsById = {};
    self.restaurantsLoaded = false;
    self.selectedPairs = {"$$hashKey": "object:50", "_id": "575810b3dcba0f052b386f46", "id": 1, "names": ["kosher","not kosher"], "title": "isKosher"};
    userInfoService.preferedPair = self.selectedPairs;
    self.pairs = pairsService.getPairs();
    self.restaurants = restaurantsService.getRestaurants();
    $scope.slides = [];
    self.adminSelectStyle = {"margin": "2%", "width": "70%", "display": "inline-block"};
    self.nonAdminSelectStyle = {"margin": "0 auto", "width": "80%"};
    self.newPair = {};
    self.yellowLike = {
        "-webkit-text-fill-color": "#fbd046"
    }

    self.transparentLike = {
        "-webkit-text-fill-color": "white"
    }

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
        $http.post('https://meetws.herokuapp.com/setUserPair/' + self.userInfo.email + '/'+ self.selectedPairs.title)
        self.devideMealsByPair();
    };

    self.devideMealsByPair = function(){
        if(self.restaurants){
            self.restaurants.forEach(function(restaurant){
                var trueCount = 0;
                var falseCount = 0;
                restaurant.meals.forEach(function(meal){
                    meal.types.forEach(function(type){
                        if(type.name == self.selectedPairs.title){
                            if(type.value == true)
                                trueCount++;
                            else
                                falseCount++;
                        }
                    });
                });
                restaurant["trueCount"] = trueCount;
                restaurant["falseCount"] = falseCount;
            });
        }
    };

    self.loadUserInfo = function(){
        userInfoService.getUserInfo().then(
            function (response) {
                self.userInfo = response.data;
                self.isUserInfoLoaded = true;
                self.pairs.forEach(function (pair) {
                    if(pair.title == self.userInfo.pair) {
                        self.selectedPairs = pair;
                    }
                })
            },
            function (errResponse) {
                console.log(errResponse);
            }
        );
    };

    self.like = function (id) {
        if(!self.isFavouriteRestaurant(self.restaurantsById[id])){
            self.userInfo.likes.push(id);
            var toRemove = 0;

        }else{
            self.userInfo.likes.splice(self.userInfo.likes.indexOf(id),1);
            var toRemove = 1;
        }
        $http.post('https://meetws.herokuapp.com/setUserLikes/' + self.userInfo.email + '/'+ id +'/' + toRemove)
    };

    self.isFavouriteRestaurant = function(restaurant){
        if(self.isUserInfoLoaded && self.userInfo.likes.indexOf(restaurant.id) != -1)
            return true;
        return false;
    };

    self.openModal = function(){
        self.newPair = {
            id: self.pairs.length + 1,
            names: ["",""]
        };
        $('#newPairModal').modal('show');
    };

    self.saveNewPair = function(){

        pairsService.saveNewPair(self.newPair).then(
            function (response) {
                if(response.data.response == "success") {
                    self.pairs.push(self.newPair);
                    $('#newPairModal').modal('hide');
                    swal("Success!", "New Pair Is Available!", "success");
                }
                else if(response.data.response == "exist") {
                    $('#newPairModal').modal('hide');
                    swal("Error!", "This Pair Was Already Exist!", "error");
                }
            },
            function (errResponse) {
                console.log(errResponse);
            }
        );
    };

    self.loadPairs();
    self.loadRestaurants();
}