app.controller("LibraryController", ['$scope', "$http","LibraryMaterialInfoService", "CategoryInfoService", "MaterialOfLibraryService", "$sce", "$route", function($scope, $http, LibraryMaterialInfoService, CategoryInfoService, MaterialOfLibraryService, $sce, $route){

		$scope.loading = true;
		$scope.showCategory = false;
		$scope.category = '';
		$scope.materialInfo = null;
		$scope.showMaterialDetails = false;
		$scope.favoriteMaterial = false;
		$scope.locationMaterial = false;
		$scope.zoomInMaterial = false;
		$scope.pathURL='https://www.google.com/maps/';
		$scope.clickAddFavoriteMaterial=false;

		/* get information of material and of library - when i do get library */
    var getMaterialInfo = LibraryMaterialInfoService.getMaterial(function(infoMaterial){});
    getMaterialInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.materialsCategories;
				$scope.materialsCategories=data;
		});

		/* get category of material */
		var getCategoryInfo = CategoryInfoService.getCategory(function(infoCategory){});
    getCategoryInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.categoryDetails;
				$scope.categoryDetails=data;
		});

		/* get material of library */
		var getMaterialOfLibrary = MaterialOfLibraryService.getMaterialDetails(function(infoMaterial){});
    getMaterialOfLibrary.then(function(result) {
        $scope.loading = false;
				var data=result.data.biamaDetails;
				$scope.materialOfLibraryDetails=data;
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
						'idMaterial': $scope.categoryDetails[index].id,
						'image': $scope.categoryDetails[index].name,
						'category': $scope.categoryDetails[index].category,
						'description': $scope.categoryDetails[index].description,
					}
					$scope.showMaterialDetails=true;
					break;
				}
			}
		}

		$scope.clickFavorite = function() {
			if($scope.showInitSession){

			} else {
				$scope.clickAddFavoriteMaterial=true;
			}
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
			for(var index=0; index<$scope.materialsCategories.length; ++index) {
				if($scope.materialsCategories[index].material_id === material.idMaterial){
						$scope.locationsURL= $sce.trustAsResourceUrl($scope.pathURL + $scope.materialsCategories[index].location);
						$scope.descriptionLocation=$scope.materialsCategories[index].locationDescription;
						$scope.loading=false;
						break;
				}
			}
			if($scope.locationMaterial){
				$scope.locationMaterial = false;
			}else {
			
					$scope.locationMaterial = true;
			
			}
		}

		$scope.closeMaterial = function(){
			$scope.zoomInMaterial = false;
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

		$scope.getSchools = function () {
			if($scope.showSchools){
				$scope.showSchools = false;
			}else {
				$scope.showSchools = true;
			}
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