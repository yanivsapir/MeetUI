pairsModule.service('pairsService', pairsService);

function pairsService($http,$rootScope) {
    var self = this;
    self.getPairs = function(){
        return $http.get('https://meetws.herokuapp.com/getAllPairs')
    }

    self.saveNewPair = function(newPair){
        return $http.post('https://meetws.herokuapp.com/savePair/' + newPair.title + "/" + newPair.names[0]  + "/" + newPair.names[1])
    }
}