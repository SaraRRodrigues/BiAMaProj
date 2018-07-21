
app.controller("MyBiamaController", ['$scope', "$http", "MyBiamaService", "jQuery", function($scope, $http, MyBiamaService){

		/* hide footer of index page because of click in buttons footer reload page */
		jQuery("#footerMain").hide();
		/* my current page */
		$scope.namePage='myBiama';

		$scope.loading=true;
		var getMyBiamaInfo = MyBiamaService.getMyBiamaInfo(function(infoMyBiama){});
		getMyBiamaInfo.then(function(result) {
				$scope.loading = false;
				var data=result.data.biamaDetails;
				$scope.descriptionMyBiama=data[0].description;
		});
}])

app.factory("MyBiamaService", function($q, $http, $timeout){
    
	var getMyBiamaInfo = function() {
		var deferred = $q.defer();
	
		$timeout(function() {
		  deferred.resolve($http.get('/myBiamaInfo'));
		}, 2000);
	
		return deferred.promise;
	  };
	
	  return {
		getMyBiamaInfo: getMyBiamaInfo
	  };
});