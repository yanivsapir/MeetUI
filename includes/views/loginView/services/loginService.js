loginModule.service('loginService', loginService);

function loginService(GData, $rootScope,userInfoService) {
    var self = this;

    self.assignUser = function(){
        userInfoService.getUserInfo().then(
            function (response) {
                $rootScope.userData.loaded = true;
                $rootScope.userData.role = response.data.role;
                $rootScope.userData.memebranceDate = new Date();
                $rootScope.userData.name = GData.getUser().name;
                $rootScope.userData.picture = GData.getUser().picture;
            },
            function (errResponse) {
                console.log(errResponse);
            });

    };

    $rootScope.getUser = function() {
        console.log(GData.getUser())
    };
}