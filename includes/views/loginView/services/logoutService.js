loginModule.service('logoutService', logoutService);

function logoutService(GAuth, $cookies, $state, $rootScope) {
    var self = this;

    self.removeUser = function(){
        $rootScope.userData = {};
        $rootScope.userData.loaded = false;
    };

    $rootScope.logout = function() {
        GAuth.logout().then(function () {
            $cookies.remove('userId');
            self.removeUser();
            $state.go('login');
        });
    };
}