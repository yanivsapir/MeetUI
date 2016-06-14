pairsModule.service('pairsService', pairsService);

function pairsService($http,$rootScope) {
    var self = this;
    self.getPairs = function(){
        return $http.get('https://meetws.herokuapp.com/getAllPairs')
    }
}