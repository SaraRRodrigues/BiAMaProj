app.controller("MyQuestionsController", ['$scope', "QuestionService", "FavoritesQuestionService", "UserQuestionService","MyQuestionsMaterialService", "$http", "jQuery", function($scope, QuestionService,FavoritesQuestionService,UserQuestionService, MyQuestionsMaterialService,$http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();

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
        $scope.namePage='myQuestions';

        $scope.loading = true;
        $scope.favoriteQuestion=false;
        $scope.favoriteAnswer=false;
        $scope.showDivAnswer=false;
        $scope.showMyQuestions=false;
        $scope.questions=[];
        $scope.descriptionAnswer=[];

        $scope.resultSearch = [];
        $scope.showDetailsOfMaterial=false;
        $scope.miniSearchResults=false;
        $scope.showAllQuestions=true;

        $scope.clickAddFavorite=false;
        $scope.clickRemoveFavorite=false;
        $scope.clickAddLike=false;
        $scope.clickRemoveLike=false;
    }
 
    /* verify if user is logged in */
	$scope.validateUserLoggedIn = function() {
		var splitLocation = location.href.split('=');
		$scope.idUserLoggerIn =splitLocation[1];
	
		if($scope.idUserLoggerIn !== undefined) {
			$scope.confirmSession=true;
		} else {
			$scope.loading = true;
			$scope.confirmSession=false;
		}
    }
  	
    /* -------------- INIT DESKTOP & MOBILE -------------- */
	/* get information of my favorites, my questions and answer to display */
    $scope.getAllRequests = function() {
        
        $scope.getMyFavorites = FavoritesQuestionService.getMyFavorites($scope.idUserLoggerIn,function(infoFavorites){});
        $scope.getMyQuestions = QuestionService.getAllMyQuestions($scope.idUserLoggerIn,function(infoMyQuestions){});
        $scope.getUserQuestionInfo = QuestionService.getUserQuestionInfo(function(infoUserAnswer){});
        $scope.getAnswerQuestionInfo = QuestionService.getQuestionAnswer(function(infoUserAnswer){});
    
        $scope.getMyQuestions.then(function(result) {
            $scope.loading = false;
            var data=result.data.questions;
            $scope.myQuestionDetails=data;
        });

        $scope.getUserQuestionInfo.then(function(result) {
            $scope.loading = false;
            var data=result.data.questionDetails;
            $scope.myQuestions=data;
        });
    
        $scope.getMaterials = MyQuestionsMaterialService.getMaterialComparation(function(infoMaterial){});
        $scope.getMaterials.then(function(result) {
          $scope.loading = false;
          var data=result.data.comparationDetails;
          $scope.materialsToSearch = data;
        });

        $scope.getAnswerQuestionInfo.then(function(result) {
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

    /* redirect to homepage with arrow */
    $scope.goToHomePage = function() {
        if($scope.idUserLoggerIn !== undefined) {
			location.href = 'http://localhost:8080?userName=' + $scope.idUserLoggerIn;
		} else {
			location.href = 'http://localhost:8080?username=' + 'anonymous';
		}
    }

    /* get question with questionId */
    $scope.getQuestion = function(questionId, indexQuestion) {
        $scope.showMyQuestions = true;
        $scope.indexQuestion=indexQuestion+1;
        for(var index=0; index< $scope.myQuestions.length; ++index) {
            if($scope.myQuestions[index].id_question === questionId) {
                $scope.idQuestion=$scope.myQuestions[index].id_question;
                $scope.likeQuestion=$scope.myQuestions[indexQuestion].likesQuestion;
                $scope.getAnswersOfQuestion(index);
            }
        }
        /* reset indexQuestionAnswer: number of answer of questions */
        $scope.indexQuestionAnswer=1;
    }
    
    /* get answers of question with index(is question id) */
    $scope.getAnswersOfQuestion = function(index) {
        $scope.descriptionQuestion=$scope.myQuestions[index].text_question;
        for(var indexAnswer=0; indexAnswer<$scope.details.length; ++indexAnswer){
          if($scope.details[indexAnswer].id_question == $scope.myQuestions[index].id_question){
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

    /* add to favorites question */
    $scope.addToFavoritesQuestion = function(){
        $scope.showMyQuestions=false;
        $scope.loading = true;

        /* get favorites material */
        $scope.getMyFavorites.then(function(result) {
            $scope.loading = false;
            $scope.showMyQuestions=true;
            var data=result.data.favoriteDetails;
            $scope.favoriteDetails=data;

            if($scope.showInitSession){
                if($scope.favoriteDetails.length===0) {
                    $scope.favoriteId=1;
                } else {
                    $scope.favoriteId=($scope.favoriteDetails[$scope.favoriteDetails.length-1].id_favorite)+1;
                }
                var data = {
                    idFavorite: $scope.favoriteId,
                    idUser: $scope.idUserLoggerIn,
                    idMaterial: null,
                    idQuestion: $scope.idQuestion
                };
                $http.post('/insertFavoriteQuestion', data);
                
                $scope.clickAddFavorite=true;
            } 
        });
    }
  
    /* remove from favorites question */
    $scope.removeFromFavoritesQuestion = function() {
        $scope.showMyQuestions=false;
        $scope.loading = true;

        if($scope.showInitSession){
            var data = {
                idFavorite: $scope.favoriteId,
                idUser: $scope.idUserLoggerIn,
                idMaterial: null,
                idQuestion: $scope.idQuestion
            };
            $http.post('/deleteFavoriteQuestion', data);
            $scope.loading = false;
            $scope.showMyQuestions=true;
            
            $scope.clickAddFavorite=false;
        } 
    }

    /* add like on question */
    $scope.addLikeQuestion = function() {
        if($scope.showInitSession){
            /*var data = {
            idFavorite: 0,
            idUser: 0,
            idMaterial: null,
            idQuestion: $scope.idQuestion
            };
            $http.post('/insertFavoriteQuestion', data);
            */
            if($scope.clickAddLike) {
                $scope.clickAddLike=false;
            } else {
                $scope.clickAddLike=true;
            }
        }
    }

    /* remove like of question */
    $scope.removeLikeQuestion = function() {
        if($scope.showInitSession){
            /*var data = {
            idFavorite: 0,
            idUser: 0,
            idMaterial: null,
            idQuestion: $scope.idQuestion
            };
            $http.post('/insertFavoriteQuestion', data);
            */

            if($scope.clickRemoveLike) {
                $scope.clickRemoveLike=false;
            } else {
                $scope.clickRemoveLike=true;
            }
        }
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
        $scope.showAllQuestions=false;
    }

    /* close material that are opened */
    $scope.closeMaterial = function(){
      $scope.miniSearchResults=false;
      $scope.showDetailsOfMaterial=false;
      $scope.showForum = true;
      $scope.showQuestionDetails=false;
      $scope.showAllQuestions=true;

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
      
      $scope.showAllQuestions=true;
    }
  
    /* action of click button "Ok" present on small search line */
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
          $scope.showAllQuestions=false;
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
		var getAllUsers = UserQuestionService.getUsers(function(users){});
		
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
    /* -------------- END MOBILE -------------- */

	/* init QuestionsController  */
	$scope.viewType();
    $scope.initData();
    $scope.validateUserLoggedIn();
    $scope.getAllRequests();
    
}])

app.factory("QuestionService", function($q, $http, $timeout){
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

    var getAllMyQuestions = function(data) {
        var deferred = $q.defer();
		$timeout(function() {
            deferred.resolve($http.get('/allMyQuestions', 
            {params: {
                'data': data
            }}));
		}, 2000);

		return deferred.promise;
    }
    
    return {
        getUserQuestionInfo: getUserQuestionInfo,
        getQuestionAnswer: getQuestionAnswer,
        getAllMyQuestions: getAllMyQuestions
    };
});

app.factory("UserQuestionService", function($q, $http, $timeout){
    
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

app.factory("MyQuestionsMaterialService", function($q, $http, $timeout){
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
app.factory("FavoritesQuestionService", function($q, $http, $timeout){
    
	var getMyFavorites = function() {
		var deferred = $q.defer();

		$timeout(function() {
          deferred.resolve($http.get('/favorites',
          {params: {
            'data': data
            }}));
		}, 2000);
	
		return deferred.promise;
	  };

	  return {
			getMyFavorites: getMyFavorites
	  };
});