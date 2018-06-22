app.controller("WhereWeAreController", ['$scope', "$http" , "BiAMaInfoService","$sce", function($scope, $http,BiAMaInfoService, $sce){
    
    $scope.loading = true;
    $scope.schools=[];
    $scope.pathURL='https://www.google.com/maps/';

    var getBiamaInfo = BiAMaInfoService.getBiAMaInfo(function(infoBiama){});
    getBiamaInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.biamaDetails;
        $scope.biamaDetails=data;
        /**default - url of ESELx */
        $scope.locationsURL= $sce.trustAsResourceUrl($scope.pathURL + $scope.biamaDetails[1].location);
        $scope.descriptionLocation=$scope.biamaDetails[1].locationDescription;
    });

    $scope.getSchools = function () {
        if($scope.showSchools){
			$scope.showSchools = false;
		}else {
			$scope.showSchools = true;
		}
    }

    $scope.selectSchool = function (locationSchool) {
        for(var index=0; index <$scope.biamaDetails.length; ++index) {
            if($scope.biamaDetails[index].locationDescription === locationSchool){
                $scope.locationsURL= $sce.trustAsResourceUrl($scope.pathURL + $scope.biamaDetails[index].location)
                $scope.descriptionLocation = $scope.biamaDetails[index].locationDescription;
                break;
            }
        }
    }

    $scope.expandIframe = function(){
        if($scope.zoomInIFrame){
			$scope.zoomInIFrame = false;
		}else {
			$scope.zoomInIFrame = true;
		}
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