app.controller("LibraryController", ['$scope', "$http","LibraryMaterialInfoService", "CategoryInfoService", "MaterialOfLibraryService", "$sce", function($scope, $http, LibraryMaterialInfoService, CategoryInfoService, MaterialOfLibraryService, $sce){

		$scope.loading = true;
		$scope.showCategory = false;
		$scope.category = '';
		$scope.materialInfo = null;
		$scope.showMaterialDetails = false;
		$scope.favoriteMaterial = false;
		$scope.locationMaterial = false;
		$scope.zoomInMaterial = false;
		$scope.pathURL='https://www.google.com/maps/';

		/* get information of material and of library - when i do get library */
    var getMaterialInfo = LibraryMaterialInfoService.getMaterial(function(infoMaterial){});
    getMaterialInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.materialsCategories;
				$scope.materialsCategories=data;
				console.log($scope.materialsCategories);
		});

		/* get category of material */
		var getCategoryInfo = CategoryInfoService.getCategory(function(infoCategory){});
    getCategoryInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.categoryDetails;
				$scope.categoryDetails=data;
				console.log($scope.categoryDetails);
		});

		/* get material of library */
		var getMaterialOfLibrary = MaterialOfLibraryService.getMaterialDetails(function(infoMaterial){});
    getMaterialOfLibrary.then(function(result) {
        $scope.loading = false;
				var data=result.data.biamaDetails;
				$scope.materialOfLibraryDetails=data;
				console.log($scope.materialOfLibraryDetails);
		});
		
		$scope.openCategory = function(category) {
			$scope.showCategory = true;
			$scope.category = category;

			$scope.materialOfCategory=[];
			for(var index=0; index<$scope.categoryDetails.length; ++index) {
				if($scope.categoryDetails[index].category===category) {
					$scope.materialOfCategory.push($scope.categoryDetails[index]);
				}
			}
		}

		$scope.openDetailsMaterial = function(material) {
			for(var index=0; index<$scope.categoryDetails.length; ++index) {
				if($scope.categoryDetails[index].id === material.id){
					$scope.materialInfo={
						'image': $scope.categoryDetails[index].name,
						'category': $scope.categoryDetails[index].category,
						'description': $scope.categoryDetails[index].description
					}
					$scope.showMaterialDetails=true;
					break;
				}
			}
		}

		$scope.clickFavorite = function() {
			if($scope.favoriteMaterial){
				$scope.favoriteMaterial = false;
			}else {
				$scope.favoriteMaterial = true;
			}
		}
		$scope.clickZoomIn = function(material) {
			if($scope.zoomInMaterial){
				$scope.zoomInMaterial = false;
			}else {
				$scope.zoomInMaterial = true;
				//ir buscar a imagem do material que se quer fazer zoom 
			}
		}
		$scope.clickLocation = function(material) {
			if($scope.locationMaterial){
				$scope.locationMaterial = false;
			}else {
				$scope.locationMaterial = true;
				//$scope.locationsURL= $sce.trustAsResourceUrl($scope.pathURL + $scope.biamaDetails[1].location);

				window.setTimeout("location.href = 'http://localhost:8080/BiAMa/whereWeAre'")
			}
		
		}
		$scope.closeMaterial = function(){
			$scope.zoomInMaterial = false;
		}
}])

app.factory("LibraryMaterialInfoService", function($q, $http, $timeout){
    
	var getMaterial = function() {
		var deferred = $q.defer();
	
		$timeout(function() {
		  deferred.resolve($http.get('/materialsCategories'));
		}, 2000);
	
		return deferred.promise;
	  };
	
	  return {
		getMaterial: getMaterial
	  };
});

app.factory("CategoryInfoService", function($q, $http, $timeout){
    
	var getCategory = function() {
		var deferred = $q.defer();
	
		$timeout(function() {
		  deferred.resolve($http.get('/categories'));
		}, 2000);
	
		return deferred.promise;
	  };
	
	  return {
			getCategory: getCategory
	  };
});

app.factory("MaterialOfLibraryService", function($q, $http, $timeout){
    
	var getMaterialDetails = function() {
		var deferred = $q.defer();
	
		$timeout(function() {
		  deferred.resolve($http.get('/biamaInfo'));
		}, 2000);
	
		return deferred.promise;
	  };
	
	  return {
			getMaterialDetails: getMaterialDetails
	  };
});