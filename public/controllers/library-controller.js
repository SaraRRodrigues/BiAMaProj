
app.controller("LibraryController", ['$scope', "$http","LibraryMaterialInfoService", "CategoryInfoService", "MaterialOfLibraryService", "$sce", "$route", "FavoritesService", "jQuery", function($scope, $http, LibraryMaterialInfoService, CategoryInfoService, MaterialOfLibraryService, $sce, $route, FavoritesService){

	/* hide footer of index page because of click in buttons footer reload page */
	jQuery("#footerMain").hide();
	/* my current page */
	$scope.namePage='library';

	$scope.loading = true;
	$scope.category = '';
	$scope.materialInfo = null;
	$scope.favoriteMaterial = false;
	$scope.locationMaterial = false;
	$scope.zoomInMaterial = false;
	$scope.pathURL='https://www.google.com/maps/';
	$scope.clickAddFavoriteMaterial=false;
	$scope.categories=[];

	$scope.goTo = function() {
		$scope.showCategory=false;
		$scope.showMaterialDetails=false;
		$scope.locationMaterial=false;
		$scope.zoomInMaterial=false;
	}
		/* get information of material and of library - when i do get library */
    var getMaterialInfo = LibraryMaterialInfoService.getMaterial(function(infoMaterial){});
    getMaterialInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.materialsCategories;
		$scope.materialsCategories=data;
		for(var index=0; index<$scope.materialsCategories.length; ++index){
			if(index<7){
				$scope.categories.push($scope.materialsCategories[index])
			} else {
				break;
			}
		}
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
	/* get favorites material */
	var getMyFavorites = FavoritesService.getMyFavorites(function(infoFavorites){});
	getMyFavorites.then(function(result) {
		var data=result.data.favoriteDetails;
		$scope.favoriteDetails=data;
		
		console.log($scope.favoriteDetails)
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
				for(var indexFav=0; indexFav<$scope.favoriteDetails.length; ++indexFav) {
					if($scope.favoriteDetails[indexFav].material_id == material.id) {
						$scope.materialInfo={
							'idMaterial': $scope.categoryDetails[index].id,
							'image': $scope.categoryDetails[index].name,
							'category': $scope.categoryDetails[index].category,
							'description': $scope.categoryDetails[index].description,
							'isFavorite': true
						}
						break;
					} else {
						$scope.materialInfo={
							'idMaterial': $scope.categoryDetails[index].id,
							'image': $scope.categoryDetails[index].name,
							'category': $scope.categoryDetails[index].category,
							'description': $scope.categoryDetails[index].description,
							'isFavorite': false
						}
					}
				}
				if($scope.favoriteDetails.length === 0) {
					$scope.materialInfo={
						'idMaterial': $scope.categoryDetails[index].id,
						'image': $scope.categoryDetails[index].name,
						'category': $scope.categoryDetails[index].category,
						'description': $scope.categoryDetails[index].description,
						'isFavorite': false
					}
				}
				$scope.showMaterialDetails=true;
				break;
			}
		}
	}

	$scope.clickFavorite = function(favoriteMaterial) {
		$scope.idFavoriteMaterial=0;
		
		for(var index=0; index<$scope.favoriteDetails.length; ++index) {
			
			if($scope.favoriteDetails[index].material_id===favoriteMaterial.idMaterial){
				$scope.favAlreadyExists=true;
			} else {
				$scope.favAlreadyExists=false;
			}
			if(index===$scope.favoriteDetails.length-1){
				$scope.idFavoriteMaterial=$scope.favoriteDetails[index].id_favorite+1;
			}
		}
		if($scope.materialInfo.isFavorite) {
			if($scope.showInitSession ){
				$scope.materialInfo.isFavorite=false;
				/* update table of favorites to remove this favorite material */
				var data = {
					idFavorite: $scope.idFavoriteMaterial,
					idUser: -1,
					idMaterial: -1,
					idQuestion: -1
				};
				$scope.clickAddFavoriteMaterial=false;
				$http.post('/deleteFavoriteQuestion', data);
			}  else if(!$scope.showInitSession) {
				$scope.clickAddFavoriteMaterial=true;
			}

		} else {
			$scope.materialInfo.isFavorite=true;
			if($scope.showInitSession ){
				if(!$scope.favAlreadyExists){
					var data = {
						idFavorite: $scope.idFavoriteMaterial,
						idUser: $scope.idUserLoggerIn,
						idMaterial: favoriteMaterial.idMaterial,
						idQuestion: -1
					};
					$scope.favoriteAlreadyExists=false;
					$http.post('/insertFavoriteQuestion', data);
				} else {
					$scope.favoriteAlreadyExists=true;
					setTimeout(function () {
						$scope.$apply(function(){
							$scope.showMaterialDetails=false;
						$scope.showCategory=false;
						});
					}, 2000);
				}
				
				$scope.clickAddFavoriteMaterial=false;
			} else if(!$scope.showInitSession) {
				$scope.clickAddFavoriteMaterial=true;
			}
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
		$scope.schools= [];
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

	$scope.selectSchool = function (locationSchool) {
		for(var index=0; index <$scope.materialsCategories.length; ++index) {
				if($scope.materialsCategories[index].locationDescription === locationSchool){
						$scope.locationsURL= $sce.trustAsResourceUrl($scope.pathURL + $scope.materialsCategories[index].location)
						$scope.descriptionLocation = $scope.materialsCategories[index].locationDescription;
						break;
				}
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
		$scope.getSchoolsOfMaterial();
		if($scope.showSchools){
			$scope.showSchools = false;
		}else {
			$scope.showSchools = true;
		}
	}

	$scope.getSchoolsOfMaterial = function() {
		/* get schools of material */
		$scope.loadingSchool=true;
        var materialId = $scope.materialInfo.idMaterial;
        var getSchoolOfMaterial = LibraryMaterialInfoService.getSchoolOfMaterial(materialId, function(infoSchool){});
        getSchoolOfMaterial.then(function(result) {
			
            $scope.loadingSchool = false;
            var data=result.data.materialSchools;
            $scope.schools=data;
        });
    }
}])

app.factory("LibraryMaterialInfoService", function($q, $http, $timeout){
	
	var getSchoolOfMaterial = function(data) {
		var deferred = $q.defer();
	
		$timeout(function() {
          deferred.resolve($http.get('/materialSchool', 
          {params: {
            'data': data
          }}));
		}, 2000);
	
		return deferred.promise;
	};
	  
	var getMaterial = function() {
		var deferred = $q.defer();
	
		$timeout(function() {
		  deferred.resolve($http.get('/materialsCategories'));
		}, 2000);
	
		return deferred.promise;
	  };
	
	  return {
		getSchoolOfMaterial: getSchoolOfMaterial,
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

app.factory("FavoritesService", function($q, $http, $timeout){
    
	var getMyFavorites = function() {
		var deferred = $q.defer();
	
		$timeout(function() {
		  deferred.resolve($http.get('/favorites'));
		}, 2000);
	
		return deferred.promise;
	  };
	
	  return {
			getMyFavorites: getMyFavorites
	  };
});