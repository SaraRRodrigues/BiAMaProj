
app.controller("LibraryController", ['$scope', "$http","LibraryMaterialInfoService", "CategoryInfoService", "MaterialOfLibraryService", "$sce", "$route", "FavoritesService", "LibraryMaterialService","LibraryBiamaService", "jQuery" ,function($scope, $http, LibraryMaterialInfoService, CategoryInfoService, MaterialOfLibraryService, $sce, $route, FavoritesService, LibraryMaterialService, LibraryBiamaService){


	
	/* hide footer of index page because of click in buttons footer reload page */
	jQuery("#footerMain").hide();
	/* my current page */
	$scope.namePage='library';

	$scope.showSearch = false;
	$scope.userDetails = false;

	var window_width = $( window ).width();
	if(window_width <= 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
	}
	
	$scope.loading = true;
	$scope.category = '';
	$scope.materialInfo = null;
	$scope.favoriteMaterial = false;
	$scope.locationMaterial = false;
	$scope.zoomInMaterial = false;
	$scope.pathURL='https://www.google.com/maps/';
	$scope.clickAddFavoriteMaterial=false;
	$scope.categories=[];
	$scope.resultSearch= [];
	$scope.getMaterialInfo = LibraryMaterialInfoService.getMaterial(function(infoMaterial){});
	$scope.getCategoryInfo = CategoryInfoService.getCategory(function(infoCategory){});
	$scope.getMyFavorites = FavoritesService.getMyFavorites(function(infoFavorites){});

	$scope.clickTopSearch = function() {
		if($scope.showSearch){
			$scope.showSearch = false;
		}else {
			$scope.showSearch = true;
		}
	}

	$scope.goTo = function() {
		$scope.showCategory=false;
		$scope.showMaterialDetails=false;
		$scope.locationMaterial=false;
		$scope.zoomInMaterial=false;
	}

	$scope.nameclick='library';
	$scope.changeColorClick = function(name) {
		$scope.locationMaterial=false;
		$scope.zoomInMaterial=false;
		$scope.showCategory=false;
		$scope.showMaterialDetails=false;
		$scope.loading=false;
		$scope.userDetails = false;
		$scope.search = false;
		$scope.nameclick=name;
	}

	$scope.goToHomePage = function() {
		window.setTimeout("location.href = 'http://localhost:8080'")
	}

	/* get information of material and of library - when i do get library */
    $scope.getMaterialInfo.then(function(result) {
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
	$scope.getCategoryInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.categoryDetails;
				$scope.categoryDetails=data;
	});

	/* get favorites material */
	$scope.getMyFavorites.then(function(result) {
		var data=result.data.favoriteDetails;
		$scope.favoriteDetails=data;
	});

	$scope.getMaterials = LibraryMaterialService.getMaterialComparation(function(infoMaterial){});
	$scope.getMaterials.then(function(result) {
		$scope.loading = false;
		var data=result.data.comparationDetails;
		$scope.materialsToSearch = data;

	});

	$scope.initMiniSearch = function() {

		var inputMini = jQuery("#miniSearch").val();
		if(inputMini !== '') {
			for(var index=0; index < $scope.materialsToSearch.length; ++index) {
				var resultMaterial = {
					'name': $scope.materialsToSearch[index].name,
					'category': $scope.materialsToSearch[index].category,
					'description': $scope.materialsToSearch[index].description,
					'code': $scope.materialsToSearch[index].code
				}
				if(($scope.materialsToSearch[index].type).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(($scope.materialsToSearch[index].color).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(($scope.materialsToSearch[index].category).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(($scope.materialsToSearch[index].description).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push($scope.materialsToSearch[index].name);
				}
			}
	
			$scope.showInitSearch=false;
			$scope.miniSearchResults = true;

			$scope.showCategory=true;
			$scope.showMaterialDetails=false;
		}
	}

	
	$scope.clickUserDetails = function() {
		if($scope.userDetails){
			$scope.userDetails = false;
		}else {
			$scope.userDetails = true;
			$scope.showSearch = false;
		}
	}

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
		$scope.miniSearchResults=true;
		$scope.showDetailsOfMaterial=false;
	}

	$scope.closeZoomInMaterial = function() {
		$scope.zoomInMaterial = false;
	}

	$scope.closeMiniSearch = function() {
		$scope.miniSearchResults = false;
		$scope.search=true;
		$scope.openMaterialDetail=false; 
		$scope.showInitSearch=true;
		$scope.showSearch=false;
		$scope.enableUserIcon=false;
		$scope.showCategory=false;
		$scope.showMaterialDetails=false;
	}

	$scope.openMaterial = function(material) {
		$scope.showDetailsOfMaterial=true;
		$scope.showMaterials=false;
		$scope.openedMaterial=material;
		$scope.miniSearchResults=false;
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
	
	$scope.showInitSessionDiv = function () {
		if($scope.showInitSession){
			$scope.showInitSession = false;
		}else {
			$scope.showInitSession = true;
		}
	}

	$scope.confirmSessionAction = function (username, password) {

		$scope.users = 'loadUser';
		var getAllUsers = LibraryBiamaService.getUsers(function(users){});
		
		getAllUsers.then(function(usersDB) {
			$scope.users = usersDB.data.users;
			for(var index=0; index<$scope.users.length; ++index){
				$scope.userName = $scope.users[index].username;
				$scope.userPassword = $scope.users[index].password;
				$scope.userImage = $scope.users[index].image;
				$scope.userEmail = $scope.users[index].email;
				$scope.nameUser=$scope.users[index].name;
				$scope.userBirthdate = $scope.users[index].birthdate;

				var splitDateBirth = $scope.userBirthdate.split('/');
				$scope.dayBirth = splitDateBirth[0];
				$scope.monthBirth = splitDateBirth[1];
				$scope.yearBirth = splitDateBirth[2];

				if($scope.userName !== null && $scope.userName === username){
					if($scope.userPassword !== null && $scope.userPassword === password){
						$scope.userLoggedIn=$scope.users[index].username;
						$scope.idUserLoggerIn=$scope.users[index].id;
						$scope.confirmSession = true;
						break;
					}
				}
			}
		});
	}
	
	$scope.getRequest = function(buttonClick) {

		if(buttonClick === 'favorites') {
			location.href = 'http://localhost:8080/BiAMa/favoritesMobile?userName=' + $scope.idUserLoggerIn;
		}

		if(buttonClick == 'questions') {
			location.href = 'http://localhost:8080/BiAMa/myQuestionsMobile?userName=' + $scope.idUserLoggerIn;
		}

		if(buttonClick == 'world_share') {
			location.href = 'http://localhost:8080/BiAMa/worldShareMobile?userName=' + $scope.idUserLoggerIn;
		}

		if(buttonClick == 'notification') {
			location.href = 'http://localhost:8080/BiAMa/notificationsMobile?userName=' + $scope.idUserLoggerIn;
		}

		if(buttonClick == 'perfil') {
			location.href = 'http://localhost:8080/BiAMa/perfilPageMobile?userId=' + $scope.idUserLoggerIn + '&userName=' 
			+ $scope.userName + '&userPassword=' + $scope.userPassword + '&userImage=' + $scope.userImage + '&userBirthdate=' + $scope.dayBirth + '-' + $scope.monthBirth + '-' + $scope.yearBirth 
			+ '&nameUser=' + $scope.nameUser + '&userEmail=' + $scope.userEmail;
		}

		if(buttonClick == 'compare') {
			location.href = 'http://localhost:8080/BiAMa/compareMobile?userName=' + $scope.idUserLoggerIn;
		}
		
		if(buttonClick === 'notification') {
			$scope.userDetails = true;
			$scope.notificationNumber=true;
		} else {
			$scope.userDetails = false;
			$scope.notificationNumber = false;
		}
		$scope.search = false;
	}

	$scope.logout = function(){
		$scope.confirmSession = false;
	}

	$scope.regist = function() {
		$scope.userDetails = false;
		$scope.registUser=true;
		$scope.search=false;
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
		}, 1000);
	
		return deferred.promise;
	};
	  
	var getMaterial = function() {
		var deferred = $q.defer();
	
		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			var response = resp.response;
			deferred.resolve(response);
		}

		xhr.open('GET','/materialsCategories', true);
		xhr.send();*/

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
	
		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			var response = resp.response;
			deferred.resolve(response);
		}

		xhr.open('GET','/categories', true);
		xhr.send();*/

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
	
		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			var response = resp.response;
			deferred.resolve(response);
		}

		xhr.open('GET','/biamaInfo', true);
		xhr.send();*/

		$timeout(function() {
		  deferred.resolve($http.get('/biamaInfo'));
		}, 3000);
	
		return deferred.promise;
	  };
	
	  return {
			getMaterialDetails: getMaterialDetails
	  };
});

app.factory("FavoritesService", function($q, $http, $timeout){
    
	var getMyFavorites = function() {
		var deferred = $q.defer();
	
		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			var response = resp.response;
			deferred.resolve(response);
		}

		xhr.open('GET','/favorites', true);
		xhr.send();*/

		$timeout(function() {
		  deferred.resolve($http.get('/favorites'));
		}, 2000);
	
		return deferred.promise;
	  };

	  return {
			getMyFavorites: getMyFavorites
	  };
});

app.factory("LibraryMaterialService", function($q, $http, $timeout){
	var getMaterialComparation = function() {
			var deferred = $q.defer();

	/*var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		var resp = this;
		if (this.readyState == 4 && this.status == 200) {
			var response = resp.response;
			debugger
			deferred.resolve(response);
		}
		
	}

	xhr.open('GET','/compareMaterials', true);
	xhr.send();*/

			$timeout(function() {
			deferred.resolve($http.get('/compareMaterials'));
			}, 4000);

			return deferred.promise;
	};


	return {
			getMaterialComparation: getMaterialComparation
	};
});

app.factory("LibraryBiamaService", function($q, $http, $timeout){
    
	var getUsers = function() {
		var deferred = $q.defer();
	
 		$timeout(function() {
		  deferred.resolve($http.get('/users',  {cache:true}));
		}, 2000); 
	
		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			deferred.resolve(resp);
		}

		xhr.open('GET','/users', true);
		xhr.send();*/

		return deferred.promise;
	};

	var getMyQuestionsLogged = function() {
		var deferred = $q.defer();

		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			deferred.resolve(resp);
		}

		xhr.open('GET','/myQuest', true);
		xhr.send();*/

		$timeout(function() {
			deferred.resolve($http.get('/myQuest'));
		}, 2000);

		return deferred.promise;
	};

	var insertLibraryUserDetails = function() {
		var deferred = $q.defer();

		
		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			var response = resp.response;
			deferred.resolve(response);
		}

		xhr.open('GET','/insertLibraryUser', true);
		xhr.send();*/

		$timeout(function() {
			deferred.resolve($http.post('/insertLibraryUser'));
		}, 2000);

		return deferred.promise;
	}

	var getLibraryUserDetails = function() {
		
		var deferred = $q.defer();

		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			var response = resp.response;
			deferred.resolve(response);
		}

		xhr.open('GET','/getLibraryUser', true);
		xhr.send();*/

		$timeout(function() {
			deferred.resolve($http.get('/getLibraryUser'));
		}, 2000);

		return deferred.promise;
	}

	return {
		getUsers: getUsers,
		getMyQuestionsLogged: getMyQuestionsLogged,
		insertLibraryUserDetails: insertLibraryUserDetails,
		getLibraryUserDetails: getLibraryUserDetails
	};
});