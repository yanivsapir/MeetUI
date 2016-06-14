loginModule.controller('loginController', loginController);

function loginController(GAuth, GData, $state, $cookies,loginService) {
    var self = this;
    if(GData.isLogin()){
        $state.go('home');
    }

    var ifLogin = function() {
        $cookies.put('userId', GData.getUserId());
        $cookies.put('email', GData.getUser().email);
        loginService.assignUser();
        $state.go('home');
    };

    self.doLogin = function() {
        GAuth.checkAuth().then(
            function () {
                ifLogin();
            },
            function() {
                GAuth.login().then(function(){
                    ifLogin();
                });
            }
        );
    };
}