userInfoModule.service('userInfoService', userInfoService);

function userInfoService($http,$cookies) {
    var self = this;

    self.getUserInfo = function() {
        return $http.get('https://meetws.herokuapp.com/getUserByMail/' + $cookies.get('email'))
    };
}