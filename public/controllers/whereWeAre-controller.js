app.controller("WhereWeAreController", ['$scope',  "BiAMaInfoService", "LibraryMaterialInfoService", "$http" ,"$sce", "$route", "jQuery", function($scope, BiAMaInfoService, LibraryMaterialInfoService, $http, $sce, $route){
   
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='whereWeAre';

    var window_width = $( window ).width();
	if(window_width <= 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
    }
    
    $scope.loading = true;
    $scope.schools=[];
    $scope.pathURL='https://www.google.com/maps/';

    $scope.nameclick='whereWeAre';
	$scope.changeColorClick = function(name) {
		$scope.userDetails = false;
		$scope.search = false;
		$scope.nameclick=name;
    }
    
    $scope.clickTopSearch = function() {
		if($scope.showSearch){
			$scope.showSearch = false;
		}else {
			$scope.showSearch = true;
		}
    }
  
    $scope.goTo = function(name) {
		
    }
    
    var getBiamaInfo = BiAMaInfoService.getBiAMaInfo(function(infoBiama){});
    getBiamaInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.biamaDetails;
        $scope.biamaDetails=data;
        /**default - url of ESELx */
        $scope.locationsURL= $sce.trustAsResourceUrl($scope.pathURL + $scope.biamaDetails[1].location);
        $scope.schools=$scope.biamaDetails;
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
    $scope.reloadPage = function() {
        $route.reload();
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