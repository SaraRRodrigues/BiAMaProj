app.controller('FavoritesController',['$scope', "$http", "FavoritesService", "LibraryMaterialInfoService","QuestionFavoriteService","$route", "$sce", function($scope, $http, FavoritesService, LibraryMaterialInfoService,QuestionFavoriteService,$route, $sce) {
    
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
    $scope.showFavorites = false;
    var MINIMUM_CATEGORIES=7;
    $scope.showFavorites=true;
    $scope.zoomInMaterial = false;
    $scope.pathURL='https://www.google.com/maps/';
    $scope.likes=0;
    $scope.indexQuestionAnswer=1;

    $scope.categories= [];
    $scope.favorites = [];
    $scope.descriptionAnswer=[];

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
        debugger
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
  