app.controller('FavoritesController',['$scope', "$http", "FavoritesService", "LibraryMaterialInfoService", "$sce", function($scope, $http, FavoritesService, LibraryMaterialInfoService,$sce) {
    
    $scope.loading = true;
    $scope.showSchools = false;
    $scope.showQuestions = false;
    $scope.showMaterials = true;
    $scope.showFavorites = false;
    var MINIMUM_CATEGORIES=7;
    $scope.showFavorites=true;
    $scope.zoomInMaterial = false;
    $scope.pathURL='https://www.google.com/maps/';

    $scope.favorites = ['Materiais', 'Perguntas']
    $scope.categories= [];
    $scope.favorites = [];

    $scope.getValues = function(){
        var value = document.getElementById('selectedFav');
        $scope.itemSelecionado = value.options[value.selectedIndex].text
        if($scope.itemSelecionado === 'Perguntas') {
            $scope.showQuestions = true;
            $scope.showMaterials = false;
        } else {
            $scope.showQuestions = false;
            $scope.showMaterials = true;
        }
    }

    $scope.getFavorites = function() {
        if($scope.showFavorites){
			$scope.showFavorites = false;
		}else {
			$scope.showFavorites = true;
		}
    }

    $scope.selectFavorite = function(favorite){
		if(favorite == 'Materiais'){
            $scope.showQuestions = false;
            $scope.showMaterials = true;
        }else {
            $scope.showQuestions = true;
            $scope.showMaterials = false;
        }
    }
    
    /* get favorites material */
	var getMyFavorites = FavoritesService.getMyFavorites(function(infoFavorites){});
	getMyFavorites.then(function(result) {
		var data=result.data.favoriteDetails;
		$scope.favoriteDetails=data;
    });
    
    /* get information of material and of library - when i do get library */
    var getMaterialInfo = LibraryMaterialInfoService.getMaterial(function(infoMaterial){});
    getMaterialInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.materialsCategories;
        $scope.materialsCategories=data;
        for(var index=0; index<$scope.materialsCategories.length; ++index){
            if(index<MINIMUM_CATEGORIES){
                $scope.categories.push($scope.materialsCategories[index])
            } else {
                break;
            }
        }
        $scope.getFavInMaterials();
        
    });

    $scope.getFavInMaterials = function() {
        for(var index=0; index<$scope.materialsCategories.length; ++index){
            for(var indexFav=0; indexFav<$scope.favoriteDetails.length; ++indexFav) {
                if($scope.materialsCategories[index].material_id === $scope.favoriteDetails[indexFav].material_id) {
                    var infoFav = {
                        "materialId": $scope.materialsCategories[index].material_id,
                        "description": $scope.materialsCategories[index].description,
                        "category": $scope.materialsCategories[index].category,
                        "image": $scope.materialsCategories[index].name,
                        "isFavorite": true
                    }
                    $scope.favorites.push(infoFav)
                }
            }
        }
    }

    $scope.openFavorite = function(favorite) {
        $scope.showCategory = true;
		$scope.favorite = favorite;
        
        for(var index=0; index<$scope.materialsCategories.length; ++index) {
            if($scope.materialsCategories[index].material_id === favorite.materialId) {
                $scope.detailsFavorite = {
                    "idMaterial": $scope.materialsCategories[index].material_id,
                    "description": $scope.materialsCategories[index].description,
                    "category": $scope.materialsCategories[index].category,
                    "image": $scope.materialsCategories[index].name,
                    "isFavorite": true
                }
                break;
            }
        }

        $scope.showFavorites=false;
    }
    $scope.clickLocation = function(material) {
        $scope.schools= [];
		for(var index=0; index<$scope.materialsCategories.length; ++index) {
			if($scope.materialsCategories[index].material_id === material.idMaterial){
					$scope.locationsURL= $sce.trustAsResourceUrl($scope.pathURL + $scope.materialsCategories[index].location);
					$scope.descriptionLocation=$scope.materialsCategories[index].locationDescription;
					var returnLocation = {
						descriptionSchool: '$scope.descriptionLocation'
					}
					$scope.schools.push(returnLocation);
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
    
    $scope.clickZoomIn = function(material) {
		if($scope.zoomInMaterial){
			$scope.zoomInMaterial = false;
		}else {
			$scope.zoomInMaterial = true;
			//ir buscar a imagem do material que se quer fazer zoom 
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

    $scope.getSchools = function () {
		if($scope.showSchools){
			$scope.showSchools = false;
		}else {
			$scope.showSchools = true;
		}
    }
    $scope.selectSchool = function (locationSchool) {
        debugger
		for(var index=0; index <$scope.materialsCategories.length; ++index) {
            if($scope.materialsCategories[index].locationDescription === locationSchool){
                $scope.locationsURL= $sce.trustAsResourceUrl($scope.pathURL + $scope.materialsCategories[index].location)
                $scope.descriptionLocation = $scope.materialsCategories[index].locationDescription;
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
		if($scope.detailsFavorite.isFavorite) {
            $scope.detailsFavorite.isFavorite=false;
            /* update table of favorites to remove this favorite material */
            var data = {
                idFavorite: $scope.idFavoriteMaterial,
                idUser: -1,
                idMaterial: -1,
                idQuestion: -1
            };
            $scope.clickAddFavoriteMaterial=false;
            $http.post('/deleteFavoriteQuestion', data);
		} else {
			$scope.detailsFavorite.isFavorite=true;
			
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
		}
	}
}])