app.controller('FavoritesController',['$scope', "$http", "FavoritesService", "LibraryMaterialInfoService","QuestionFavoriteService","UserFavoriteService","FavoritesMaterialService","$route", "$sce","$window", function($scope, $http, FavoritesService, LibraryMaterialInfoService,QuestionFavoriteService,UserFavoriteService,FavoritesMaterialService,$route, $sce, $window) {
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
	jQuery("#headerMain").hide();
	jQuery("#searchMain").hide();
	jQuery("#userDetailsMain").hide();
	jQuery("#divControllerMain").removeClass("divController");

    /* define view of app */
	$scope.viewType = function() {
		var window_width = $( window ).width();
		if(window_width < 1024) {
			$scope.isMobileView=true;
		} else {
			$scope.isMobileView=false;
		}
	}
    
    /* init my variables data */
	$scope.initData = function() {
        /* my current page */
        $scope.namePage='favorites';
        $scope.loading = true;
        $scope.showSchools = false;
        $scope.showMyQuestions=false;
        $scope.showMaterials = true;
        $scope.MINIMUM_CATEGORIES=7;
        $scope.showFavorites=true;
        $scope.zoomInMaterial = false;
        $scope.pathURL='https://www.google.com/maps/';
        $scope.likes=0;
        $scope.indexQuestionAnswer=1;
    
        $scope.categories= [];
        $scope.favorites = [];
        $scope.descriptionAnswer=[];
        $scope.resultSearch = [];
        $scope.showDetailsOfMaterial=false;
        $scope.miniSearchResults=false;
    }

    /* verify if user is logged in */
    $scope.validateUserLoggedIn = function() { 
        if(!$scope.isMobileView) {
			var splitLocation = location.href.split('=');
			var splitParams = splitLocation[1].split('&');
			$scope.idUserLoggerIn =splitParams[0];
			$scope.redirect = splitParams[1];
		
		} else {
			var splitLocation = location.href.split('=');
			$scope.idUserLoggerIn =splitLocation[1];
		}

		if($scope.idUserLoggerIn !== "" && $scope.idUserLoggerIn !== undefined) {
			$scope.confirmSession=true;
		} else {
			$scope.loading = true;
			$scope.confirmSession=false;
        }
        
        if($scope.idUserLoggerIn !== "" && $scope.idUserLoggerIn !== undefined){
            /* get favorites material */
            var getMyFavorites = FavoritesService.getMyFavorites($scope.idUserLoggerIn,function(infoFavorites){});
            getMyFavorites.then(function(result) {
                $scope.loading = true;
                var data=result.data.favoriteDetails;
                $scope.favoritesInfo=data;
                $scope.favoriteDetails=[];
                $scope.favoriteMaterials=[];
                $scope.favoriteQuestions=[];
    
                for(var index=0; index<$scope.favoritesInfo.length; ++index) {
                    if($scope.favoritesInfo[index].user_id === parseInt($scope.idUserLoggerIn)) {
                        if($scope.favoritesInfo[index].question_id == -1) {
                            $scope.favoriteMaterials.push($scope.favoritesInfo[index]);  
                        } else {
                            $scope.favoriteQuestions.push($scope.favoritesInfo[index])
                        }
                    }
                }
                $scope.loading = false;
            });
            
            /* get information of material and of library - when i do get library */
            var getMaterialInfo = LibraryMaterialInfoService.getMaterial(function(infoMaterial){});
            getMaterialInfo.then(function(result) {
                $scope.loading = true;
                var data=result.data.materialsCategories;
                $scope.materialsCategories=data;
                for(var index=0; index<$scope.materialsCategories.length; ++index){
                    if(index<$scope.MINIMUM_CATEGORIES){
                        $scope.categories.push($scope.materialsCategories[index])
                    } else {
                        break;
                    }
                }
                $scope.getFavInMaterials();
                $scope.loading = false;
            });
            
        }
    }
    
    /* -------------- INIT DESKTOP & MOBILE -------------- */
    /* get information of favorite materials and my favorites to display */
    $scope.getAllRequests = function() {
        var getMaterials = FavoritesMaterialService.getMaterialComparation(function(infoMaterial){});
        getMaterials.then(function(result) {
          $scope.loading = false;
          var data=result.data.comparationDetails;
          $scope.materialsToSearch = data;
      
        });

        /*  */
        var getUserQuestionInfo = QuestionFavoriteService.getUserQuestionInfo(function(infoUserAnswer){});
        getUserQuestionInfo.then(function(result) {
            $scope.loading = false;
            var data=result.data.questionDetails;
            $scope.questions=data;
        });

        /*  */
        var getAnswerQuestionInfo = QuestionFavoriteService.getQuestionAnswer(function(infoUserAnswer){});
        getAnswerQuestionInfo.then(function(result) {
            $scope.loading = false;
            var data=result.data.questionDetails;
            $scope.details=data;
            $scope.calculateAnswerId($scope.details);
        });
    }

    /* calculate answer id */
    $scope.calculateAnswerId = function(details) {
        $scope.biggestId=0;
        for(var index=0; index<details.length; ++index){
            if(details[index].id_answer>$scope.biggestId){
            $scope.biggestId=details[index].id_answer;
            }
        }
    }

    /* get favorites in materials */
    $scope.getFavInMaterials = function() {
        for(var index=0; index<$scope.materialsCategories.length; ++index){
            for(var indexFav=0; indexFav<$scope.favoriteMaterials.length; ++indexFav) {
                if($scope.materialsCategories[index].material_id === $scope.favoriteMaterials[indexFav].material_id) {
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

    /* redirect to homepage with arrow */
    $scope.goToHomePage = function() {
        if($scope.idUserLoggerIn !== undefined) {
			location.href = 'http://localhost:8080?userName=' + $scope.idUserLoggerIn;
			if(!$scope.zoomInMaterial){
				location.href = 'http://localhost:8080/BiAMa/favorites?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
		} else {
			location.href = 'http://localhost:8080?username=' + 'anonymous';
			if(!$scope.zoomInMaterial){
				location.href = 'http://localhost:8080?userName=anonymous' + '&redirect';
			}
		}
    }

    /* select type of favorite: question or material */
    $scope.selectFavorite = function(favorite){
        $scope.showFavoritesButton=false;
		if(favorite == 'Materiais'){
            $scope.showMyQuestions = false;
            $scope.showMaterials = true;
            $scope.showQuestionDetails = false;
        }else {
            $scope.showMyQuestions = true;
            $scope.showMaterials = false;
           // $scope.showQuestionDetails = true;
        }
    }

    /* open favorites button */
    $scope.openFavoritesButton = function(){
        if($scope.showFavoritesButton){
            $scope.showFavoritesButton = false;
            $scope.showQuestionDetails=true;
		}else {
            $scope.showFavoritesButton = true;
            $scope.showMyQuestions = false;
            $scope.showMaterials = false;
            $scope.showQuestionDetails=false;
            $scope.descriptionAnswer=[];
		}
        $scope.favoritesButton = ['Materiais', 'Perguntas']
    }

    /* open all favorites */
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

    /* click on button of location to locate material */
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
    
    /* click on button of zoom in to zoom material */
    $scope.clickZoomIn = function(material) {
		if($scope.zoomInMaterial){
			$scope.zoomInMaterial = false;
		}else {
			$scope.zoomInMaterial = true;
			//ir buscar a imagem do material que se quer fazer zoom 
		}
    }
    
    /* resize iframe to screen size */
    $scope.expandIframe = function(){
		if($scope.zoomInIFrame){
			$scope.zoomInIFrame = false;
		}else {
			$scope.zoomInIFrame = true;
		}
    }

    /* get schools to show schools on options of material location */
    $scope.getSchools = function () {
        $scope.getSchoolsOfMaterial();
        
		if($scope.showSchools){
			$scope.showSchools = false;
		}else {
			$scope.showSchools = true;
		}
    }

    /* get schools of material is located */
    $scope.getSchoolsOfMaterial = function() {
        /* get schools of material */
        $scope.loadingSchool=true;
        var materialId = $scope.detailsFavorite.idMaterial;
        var getSchoolOfMaterial = LibraryMaterialInfoService.getSchoolOfMaterial(materialId, function(infoSchool){});
        getSchoolOfMaterial.then(function(result) {
            $scope.loadingSchool = false;
            var data=result.data.materialSchools;
            $scope.schools=data;
        });
    }

    /* select school to open map of location on screen */
    $scope.selectSchool = function (locationSchool) {
		for(var index=0; index <$scope.materialsCategories.length; ++index) {
            if($scope.materialsCategories[index].locationDescription === locationSchool){
                $scope.locationsURL= $sce.trustAsResourceUrl($scope.pathURL + $scope.materialsCategories[index].location)
                $scope.descriptionLocation = $scope.materialsCategories[index].locationDescription;
                break;
            }
		}
    }
    
    /* click on button of favorite material */
    $scope.clickFavorite = function(favoriteMaterial) {
		$scope.idFavoriteMaterial=0;
		
		for(var index=0; index<$scope.favoriteDetails.length; ++index) {
			
			if($scope.favoriteDetails[index].material_id===favoriteMaterial.idMaterial){
                $scope.favAlreadyExists=true;
                $scope.favoriteId=$scope.favoriteDetails[index].id_favorite;
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
                idFavorite: $scope.favoriteId,
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

    $scope.reload = function() {
        $route.reload();
    }
    
    /* get question with questionId */
    $scope.getQuestion = function(questionId, indexQuestion) {
        $scope.showQuestionDetails = true;
        $scope.showMyQuestions=false;
        $scope.indexQuestion=indexQuestion+1;
        for(var index=0; index< $scope.questions.length; ++index) {
          if(parseInt($scope.questions[index].id_question) === questionId) {
            $scope.idQuestion=$scope.questions[index].id_question;
            $scope.getAnswersOfQuestion(index);
          }
        }
        /* reset indexQuestionAnswer: number of answer of questions */
        $scope.indexQuestionAnswer=1;
    }

    /* get answers of question with index(is question id) */
    $scope.getAnswersOfQuestion = function(index) {
        
        $scope.descriptionQuestion=$scope.questions[index].text_question;
        for(var indexAnswer=0; indexAnswer<$scope.details.length; ++indexAnswer){
            if($scope.details[indexAnswer].id_question == $scope.questions[index].id_question){
                var resultAnswer = {
                    numberOfQuestion: $scope.indexQuestionAnswer,
                    text: $scope.details[indexAnswer].text_answer,
                    likes: $scope.details[indexAnswer].likesAnswer,
                    favorite: false
                }
                $scope.indexQuestionAnswer+=1;
                $scope.descriptionAnswer.push(resultAnswer);
            }
        }
    }

    /* click on answer to show section of answer */
    $scope.clickOnAnswer = function() {
        $scope.showDivAnswer=true;
    }

    /* user answer */
    $scope.putAnswer = function(textAnswer) {
        var data = {
          text: textAnswer,
          likes: $scope.likes,
          idQuestion: $scope.idQuestion,
          idAnswer: $scope.biggestId
        };
        
        $http.post('/insertAnswer', data);
        $scope.showDivAnswer=false;
    }
    /* -------------- END DESKTOP & MOBILE -------------- */

    /* -------------- INIT MOBILE -------------- */
    /* open material of small search result */
    $scope.openMaterial = function(material) {
        $scope.miniSearchResults=false;
        $scope.showDetailsOfMaterial=true;
        $scope.showMaterials=false;
        $scope.openedMaterial=material;
        $scope.showAllQuestions=false;
        $scope.showFavorites = true;
        $scope.showCategory = false;
        $scope.showMaterials=false;
    }

    /* close material that are opened */
    $scope.closeMaterial = function(){
        $scope.miniSearchResults=false;
        $scope.showDetailsOfMaterial=false;
        $scope.showForum = true;
        $scope.showQuestionDetails=false;
  
        $scope.showMaterials=true;
        $scope.zoomInMaterial = false;
    }

	/* open and close the small search icon */
    $scope.clickTopSearch = function() {
		if($scope.showSearch){
			$scope.showSearch = false;
		}else {
			$scope.showSearch = true;
		}
	}
    
    /* close the results of small search */
    $scope.closeMiniSearch = function() {
        $scope.miniSearchResults = false;
        $scope.search=true;
        $scope.openMaterialDetail=false; 
        $scope.showInitSearch=true;
        $scope.showSearch=false;
        $scope.enableUserIcon=false;
        $scope.showMaterialDetails=false;
        $scope.showQuestionDetails=false;

        $scope.showMaterials=true;
    }

    /* action of click button "Ok" present on small search line */
    $scope.initMiniSearch = function() {
        $scope.resultSearch=[];
        var inputMini = jQuery("#miniSearch").val();
        if(inputMini !== '') {
            for(var index=0; index < $scope.materialsToSearch.length; ++index) {
                var resultMaterial = {
                  'name': $scope.materialsToSearch[index].name,
                  'category': $scope.materialsToSearch[index].category
                }
                if(($scope.materialsToSearch[index].type).toLowerCase().indexOf(inputMini) !== -1) {
                  $scope.resultSearch.push(resultMaterial);
                } else if(($scope.materialsToSearch[index].color).toLowerCase().indexOf(inputMini) !== -1) {
                  $scope.resultSearch.push(resultMaterial);
                } else if(($scope.materialsToSearch[index].category).toLowerCase().indexOf(inputMini) !== -1) {
                  $scope.resultSearch.push(resultMaterial);
                } else if(($scope.materialsToSearch[index].description).toLowerCase().indexOf(inputMini) !== -1) {
                  $scope.resultSearch.push(resultMaterial);
                }
            }
        
            if($scope.resultSearch.length == 0) {
                $scope.noResultsOnSearch=true;
            } else {
                $scope.showInitSearch=false;
                $scope.miniSearchResults = true;
                $scope.showCategory=true;
                $scope.showMaterialDetails=false;
                $scope.showLocation=false;
                $scope.showForum = false;
                $scope.showAllQuestions=false;
                $scope.showQuestionDetails=false;
                $scope.showCuriosity=false;
                $scope.showSearch=false;
                $scope.noResultsOnSearch=false;
                
                $scope.showFavorites = true;
                $scope.showCategory = false;
                $scope.showMaterials=false;
            }
        }
    }

    /* open and close the section of user details and search icon */
    $scope.clickUserDetails = function() {
		if($scope.userDetails){
			$scope.userDetails = false;
		}else {
			$scope.userDetails = true;
			$scope.showSearch = false;
		}
    }

    /* section of init session in user details section */
    $scope.showInitSessionDiv = function () {
		if($scope.showInitSession){
			$scope.showInitSession = false;
		}else {
			$scope.showInitSession = true;
		}
    }
    
    /* confirmed user logged in */
    $scope.confirmSessionAction = function (username, password) {

		$scope.users = 'loadUser';
		var getAllUsers = UserFavoriteService.getUsers(function(users){});
		
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
   
    /* routes of click on links page */
    $scope.getRequest = function(buttonClick) {
		if($scope.isMobileView) {
			if(buttonClick === 'favorites') {
				$window.location.href = 'http://localhost:8080/BiAMa/favoritesMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'questions') {
				$window.location.href = 'http://localhost:8080/BiAMa/myQuestionsMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'world_share') {
				$window.location.href = 'http://localhost:8080/BiAMa/worldShareMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'notification') {
				$window.location.href = 'http://localhost:8080/BiAMa/notificationsMobile?userName=' + $scope.idUserLoggerIn;
	
			}
	
			if(buttonClick == 'perfil') {
				$window.location.href = 'http://localhost:8080/BiAMa/perfilPageMobile?userId=' + $scope.idUserLoggerIn + '&userName=' 
				+ $scope.userName + '&userPassword=' + $scope.userPassword + '&userImage=' + $scope.userImage + '&userBirthdate=' + $scope.dayBirth + '-' + $scope.monthBirth + '-' + $scope.yearBirth 
				+ '&nameUser=' + $scope.nameUser + '&userEmail=' + $scope.userEmail;
			}
	
			if(buttonClick == 'compare') {
				$window.location.href = 'http://localhost:8080/BiAMa/compareMobile?userName=' + $scope.idUserLoggerIn;
			}
		} else {

            if(buttonClick === 'biamaPage') {
				$window.location.href = 'http://localhost:8080/BiAMa/biamaPage?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick === 'whereWeAre') {
				$window.location.href =  'http://localhost:8080/BiAMa/whereWeAre?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'library') {
				$window.location.href = 'http://localhost:8080/BiAMa/library?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'myBiama') {
				$window.location.href = 'http://localhost:8080/BiAMa/myBiama?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'forum') {
				$window.location.href = 'http://localhost:8080/BiAMa/forumPage?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'favorites') {
				$window.location.href = 'http://localhost:8080/BiAMa/favorites?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick == 'questions') {
				$window.location.href = 'http://localhost:8080/BiAMa/myQuestions?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick == 'world_share') {
				$window.location.href = 'http://localhost:8080/BiAMa/worldShare?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick == 'notification') {
				$window.location.href = 'http://localhost:8080/BiAMa/notifications?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick == 'perfil') {
				$window.location.href = 'http://localhost:8080/BiAMa/perfilPage?userId=' + $scope.idUserLoggerIn + '&userName=' 
				+ $scope.userName + '&userPassword=' + $scope.userPassword + '&userImage=' + $scope.userImage + '&userBirthdate=' + $scope.dayBirth + '-' + $scope.monthBirth + '-' + $scope.yearBirth 
				+ '&nameUser=' + $scope.nameUser + '&userEmail=' + $scope.userEmail + '&redirect';
			}
	
			if(buttonClick == 'compare') {
				$window.location.href = 'http://localhost:8080/BiAMa/compare?userName=' + $scope.idUserLoggerIn;
			}
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

    /* logout of user details section */
    $scope.logout = function(){
		$scope.confirmSession = false;
	}

    /* regist new user on user details section */
	$scope.regist = function() {
		$scope.userDetails = false;
		$scope.registUser=true;
		$scope.search=false;
    }

    /* close zoom in on material */
    $scope.closeMaterialZoomInMaterial = function(){
		$scope.zoomInMaterial = false;
    }
    /* -------------- END MOBILE -------------- */
	
	/* init FavoriteController  */
	$scope.viewType();
	$scope.initData();
	$scope.getAllRequests();
    $scope.validateUserLoggedIn();
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

app.factory("UserFavoriteService", function($q, $http, $timeout){
    
	var getUsers = function() {
		var deferred = $q.defer();
	
 		$timeout(function() {
		  deferred.resolve($http.get('/users',  {cache:true}));
		}, 2000); 

		return deferred.promise;
	};

	return {
		getUsers: getUsers
	};
});

app.factory("QuestionFavoriteService", function($q, $http, $timeout){
    var getUserQuestionInfo = function() {
      var deferred = $q.defer();
  
      $timeout(function() {
        deferred.resolve($http.get('/userQuestions'));
      }, 2000);
  
      return deferred.promise;
    };
    var getQuestionAnswer = function() {
      var deferred = $q.defer();
  
      $timeout(function() {
        deferred.resolve($http.get('/userAnswerAndQuestion'));
      }, 2000);
  
      return deferred.promise;
    };
  
    return {
      getUserQuestionInfo: getUserQuestionInfo,
      getQuestionAnswer: getQuestionAnswer
    };
});
  
app.factory("FavoritesMaterialService", function($q, $http, $timeout){
    var getMaterialComparation = function() {
        var deferred = $q.defer();

        $timeout(function() {
        deferred.resolve($http.get('/compareMaterials'));
        }, 4000);

        return deferred.promise;
    };

    return {
        getMaterialComparation: getMaterialComparation
    };
});

app.factory("FavoritesService", function($q, $http, $timeout){
    
	var getMyFavorites = function(data) {
		var deferred = $q.defer();

		$timeout(function() {
		  deferred.resolve($http.get('/favorites',{params: {
            'data': data
            }}));
		}, 2000);
	
		return deferred.promise;
	  };

	  return {
			getMyFavorites: getMyFavorites
	  };
});
