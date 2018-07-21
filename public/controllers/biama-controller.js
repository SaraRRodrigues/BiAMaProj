app.controller("BiamaController", ['$scope', "BiAMaInfoService", "$http", "jQuery", function($scope,  BiAMaInfoService, $http){
		
		/* hide footer of index page because of click in buttons footer reload page */
		jQuery("#footerMain").hide();
		/* my current page */
		$scope.namePage='biamaPage';	
	
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

