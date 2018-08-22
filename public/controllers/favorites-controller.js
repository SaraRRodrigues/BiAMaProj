app.controller('FavoritesController',['$scope', "$http", "FavoritesService", "LibraryMaterialInfoService","QuestionFavoriteService","UserFavoriteService","FavoritesMaterialService","$route", "$sce", function($scope, $http, FavoritesService, LibraryMaterialInfoService,QuestionFavoriteService,UserFavoriteService,FavoritesMaterialService,$route, $sce) {
    
    /* hide footer of index page because of click in buttons footer reload page */
	jQuery("#footerMain").hide();
	/* my current page */
    $scope.namePage='favorites';
    
    var window_width = $( window ).width();
	if(window_width <= 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
    }

    $scope.loading = true;
    $scope.showSchools = false;
    $scope.showMyQuestions=false;
    $scope.showMaterials = true;
    var MINIMUM_CATEGORIES=7;
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

    $scope.goToHomePage = function() {
        window.setTimeout("location.href = 'http://localhost:8080'")
    }

    var splitLocation = location.href.split('=');
    $scope.idUserLoggerIn =splitLocation[1];
    
    if($scope.idUserLoggerIn !== undefined) {
        $scope.doLogin=false;
        $scope.confirmSession=true;
    } else {
        $scope.doLogin=true;
        $scope.loading = true;
        $scope.confirmSession=false;
    }

    $scope.getMaterials = FavoritesMaterialService.getMaterialComparation(function(infoMaterial){});
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

        $scope.showMaterialDetails=false;
        $scope.showForum = false;
        $scope.showQuestionDetails=false;

        $scope.showFavorites = true;
        $scope.showCategory = false;
        $scope.showMaterials=false;
      }
    }

    $scope.closeMaterial = function(){
      $scope.miniSearchResults=false;
      $scope.showDetailsOfMaterial=false;
      $scope.showForum = true;
      $scope.showQuestionDetails=false;

      $scope.showMaterials=true;
    }
  
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

    $scope.logout = function(){
		$scope.confirmSession = false;
		/*firebase.auth().signOut().then(function() {
			// Sign-out successful.
		
		}, function(error) {
			// An error happened.
			console.log(error);

		});*/
	}

    if($scope.idUserLoggerIn !== undefined){
        /* get favorites material */
        var getMyFavorites = FavoritesService.getMyFavorites(function(infoFavorites){});
        getMyFavorites.then(function(result) {
            $scope.loading = false;
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
    }
    
    /*$scope.getValues = function(){

        var value = document.getElementById('selectedFav');
        $scope.itemSelecionado = value.options[value.selectedIndex].text
        if($scope.itemSelecionado === 'Perguntas') {
            $scope.showMyQuestions = true;
            $scope.showMaterials = false;
        } else {
            $scope.showMyQuestions = false;
            $scope.showMaterials = true;
        }
    }*/
    $scope.clickUserDetails = function() {
		if($scope.userDetails){
			$scope.userDetails = false;
		}else {
			$scope.userDetails = true;
			$scope.showSearch = false;
		}
    }

    $scope.showInitSessionDiv = function () {
		if($scope.showInitSession){
			$scope.showInitSession = false;
		}else {
			$scope.showInitSession = true;
		}
    }
    
    $scope.clickTopSearch = function() {
		if($scope.showSearch){
			$scope.showSearch = false;
		}else {
			$scope.showSearch = true;
		}
	}

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

    $scope.getRequest = function(buttonClick) {

		if($scope.isMobileView) {
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
    
    $scope.reload = function() {
        $route.reload();
    }
    $scope.getFavorites = function() {
        if($scope.showFavorites){
			$scope.showFavorites = false;
		}else {
			$scope.showFavorites = true;
		}
    }

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

    $scope.openFavoritesButton = function(){
        if($scope.showFavoritesButton){
			$scope.showFavoritesButton = false;
		}else {
            $scope.showFavoritesButton = true;
            $scope.showMyQuestions = false;
            $scope.showMaterials = false;
		}
        $scope.favoritesButton = ['Materiais', 'Perguntas']
    }

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
    
    $scope.closeMaterialZoomInMaterial = function(){
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
        var materialId = $scope.detailsFavorite.idMaterial;
        var getSchoolOfMaterial = LibraryMaterialInfoService.getSchoolOfMaterial(materialId, function(infoSchool){});
        getSchoolOfMaterial.then(function(result) {
            $scope.loadingSchool = false;
            var data=result.data.materialSchools;
            $scope.schools=data;
        });
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
    
    var getUserQuestionInfo = QuestionFavoriteService.getUserQuestionInfo(function(infoUserAnswer){});
    getUserQuestionInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.questionDetails;
        $scope.questions=data;
        console.log('a ', $scope.questions)
    });

    var getAnswerQuestionInfo = QuestionFavoriteService.getQuestionAnswer(function(infoUserAnswer){});
    getAnswerQuestionInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.questionDetails;
        $scope.details=data;
        //console.log('b: ', $scope.details)
        $scope.calculateAnswerId($scope.details);
    });

    $scope.calculateAnswerId = function(details) {
        $scope.biggestId=0;
        for(var index=0; index<details.length; ++index){
            if(details[index].id_answer>$scope.biggestId){
            $scope.biggestId=details[index].id_answer;
            }
        }
    }

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
        console.log('description ',  $scope.descriptionAnswer);
    }

    $scope.clickOnAnswer = function() {
        $scope.showDivAnswer=true;
    }

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