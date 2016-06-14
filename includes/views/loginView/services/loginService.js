loginModule.service('loginService', loginService);

function loginService(GData, $rootScope,userInfoService) {
    var self = this;

    self.assignUser = function(){
        userInfoService.getUserInfo();
        $rootScope.userData.loaded = true;
        $rootScope.userData.role = "Diner";
        $rootScope.userData.memebranceDate = new Date();
        $rootScope.userData.name = GData.getUser().name;
        $rootScope.userData.picture = GData.getUser().picture;
    };

    $rootScope.getUser = function() {
        console.log(GData.getUser())
    };
}