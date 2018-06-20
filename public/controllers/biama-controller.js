app.controller("BiamaController", ['$scope', "BiAMaInfoService", "$http", function($scope,  BiAMaInfoService, $http){
    
    $scope.loading = true;

    var getBiamaInfo = BiAMaInfoService.getBiAMaInfo(function(infoBiama){});
    getBiamaInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.biamaDetails;
        $scope.descriptionBiama=data[0].description;
    });
}])

app.factory("BiAMaInfoService", function($q, $http, $timeout){
    
	var getBiAMaInfo = function() {
		var deferred = $q.defer();
	
		$timeout(function() {
		  deferred.resolve($http.get('/biamaInfo'));
		}, 2000);
	
		return deferred.promise;
	  };
	
	  return {
		getBiAMaInfo: getBiAMaInfo
	  };
});

