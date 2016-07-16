bookOrderModule.controller('formController', formController);

function formController(userInfoService,$location,pairsService,$http) {
    var self = this;
    self.pairs = [];
    self.preferedPair = {};
    self.userInfo = {};
    self.pairsLoaded = false;
    self.isUserInfoLoaded = false;
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

    self.loadUserInfo = function(){
        userInfoService.getUserInfo().then(
            function (response) {
                self.userInfo = response.data;
                self.isUserInfoLoaded = true;
                self.pairs.forEach(function (pair) {
                    if(self.userInfo.pair == pair.title)
                        self.preferedPair = pair;
                });
            },
            function (errResponse) {
                console.log(errResponse);
            }
        );
    };

    self.bookReservation = function(restaurantId){
        var dateToSend = self.date.getDate() + "." + (self.date.getMonth()+1) + "." + self.date.getFullYear();
        $http.post('https://meetws.herokuapp.com/saveReservations/' + self.preferedPair.names[0] + '/' + self.numOfPair1 + '/' +
            self.preferedPair.names[1] + '/' + self.numOfPair2 + '/' + dateToSend + '/' + restaurantId).then(
            function (response) {
                $location.path("/bookOrder/" + restaurantId + "/thanks");
            },
            function (errResponse) {
                console.log(errResponse);
            }
        );
    };

    self.loadPairs();
    self.loadUserInfo();
}