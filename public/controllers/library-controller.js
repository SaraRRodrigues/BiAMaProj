app.controller("LibraryController", ['$scope', "$http","MaterialInfoService", function($scope, $http, MaterialInfoService){

    $scope.loading = true;

    var getMaterialInfo = MaterialInfoService.getMaterial(function(infoMaterial){});
    getMaterialInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.materialDetails;
        $scope.materialDetails=data;
    });
}])

app.factory("MaterialInfoService", function($q, $http, $timeout){
    
	var getMaterial = function() {
		var deferred = $q.defer();
	
		$timeout(function() {
		  deferred.resolve($http.get('/materials'));
		}, 2000);
	
		return deferred.promise;
	  };
	
	  return {
		getMaterial: getMaterial
	  };
});