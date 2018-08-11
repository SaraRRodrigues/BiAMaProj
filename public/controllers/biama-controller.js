app.controller("BiamaController", ['$scope', "BiAMaInfoService", "$http", "jQuery", function($scope,  BiAMaInfoService, $http){
		
		/* hide footer of index page because of click in buttons footer reload page */
		jQuery("#footerMain").hide();
		//jQuery("#footerMainMobile").hide();
		/* my current page */
		$scope.namePage='biamaPage';

		console.log('window width: ', window.innerWidth);
	
    $scope.loading = true;
    var getBiamaInfo = BiAMaInfoService.getBiAMaInfo(function(infoBiama){});
    getBiamaInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.biamaDetails;
        $scope.descriptionBiama=data[0].description;
		});

		$scope.goToHomePage = function() {
			window.setTimeout("location.href = 'http://localhost:8080'")
		}
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

