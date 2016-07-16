bookOrderModule.controller('tnxMsgController', tnxMsgController);

function tnxMsgController($location) {
    var self = this;
    
    self.goBackHome = function() {
        $location.path("/home");
    };
}