app.controller("MyQuestionsController", ['$scope', "QuestionService", "FavoritesQuestionService", "UserQuestionService","MyQuestionsMaterialService", "NotificationMyQuestionService","$http", "$window", "jQuery", function($scope, QuestionService,FavoritesQuestionService,UserQuestionService, MyQuestionsMaterialService, NotificationMyQuestionService, $http, $window){
    
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
        $scope.namePage='myQuestions';

        $scope.loading = true;
        $scope.favoriteQuestion=false;
        $scope.favoriteAnswer=false;
        $scope.showDivAnswer=false;
        $scope.showMyQuestions=false;
        $scope.questions=[];
        $scope.descriptionAnswer=[];
        $scope.likes=0;

        $scope.resultSearch = [];
        $scope.showDetailsOfMaterial=false;
        $scope.miniSearchResults=false;
        $scope.showAllQuestions=true;
        $scope.indexQuestionAnswer=1;

        $scope.clickAddFavorite=false;
        $scope.clickRemoveFavorite=false;
        $scope.clickAddLike=false;
        $scope.clickRemoveLike=false;
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

		if($scope.idUserLoggerIn !== "" && $scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect'  && $scope.idUserLoggerIn !== 'anonymous' ) {
            

            $scope.confirmSession=true;
		} else {
			$scope.loading = true;
			$scope.confirmSession=false;
		}
    }
  	
    /* -------------- INIT DESKTOP & MOBILE -------------- */
	/* get information of my favorites, my questions and answer to display */
    $scope.getAllRequests = function() {
        
        $scope.getUserQuestionInfo = QuestionService.getUserQuestionInfo(function(infoUserAnswer){});
        $scope.getUserQuestionInfo.then(function(result) {
            $scope.loading = true;
            var data=result.data.questionDetails;
            $scope.myQuestions=data;
            $scope.questions=data;

            $scope.loading = false;
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
			location.href = '?userName=' + $scope.idUserLoggerIn;
		} else {
			location.href = '?username=' + 'anonymous';
		}
    }

    /* get question with questionId */
    $scope.getQuestion = function(questionId, indexQuestion) {
        $scope.descriptionQuestion=$scope.myQuestions[indexQuestion].text_question;
        $scope.getAnswerQuestionInfo = QuestionService.getQuestionAnswer(function(infoUserAnswer){});
        $scope.getAnswerQuestionInfo.then(function(result) {
            $scope.loading = true;
            var data=result.data.questionDetails;
            $scope.details=data;
            $scope.calculateAnswerId($scope.details);

            $scope.indexQuestion=indexQuestion+1;
                for(var index=0; index< $scope.myQuestions.length; ++index) {
                    if($scope.myQuestions[index].id_question === questionId) {
                        $scope.idQuestion=$scope.myQuestions[index].id_question;
                        $scope.likeQuestion=$scope.myQuestions[indexQuestion].likesQuestion;
                        $scope.getAnswersOfQuestion(index);
                    }
                }
            $scope.showMyQuestions = true;
            /* reset indexQuestionAnswer: number of answer of questions */
            $scope.indexQuestionAnswer=1;
            $scope.loading = false;
        });
    }
    
    /* get answers of question with index(is question id) */
    $scope.getAnswersOfQuestion = function(index) {
        
        for(var indexAnswer=0; indexAnswer<$scope.details.length; ++indexAnswer){
            if($scope.details[indexAnswer].id_question == $scope.myQuestions[index].id_question){
              var resultAnswer = {
                  id: $scope.details[indexAnswer].id_answer,
                  numberOfQuestion: $scope.indexQuestionAnswer,
                  text: $scope.details[indexAnswer].text_answer,
                  likes: $scope.details[indexAnswer].likes_answer,
                  id_question: $scope.details[indexAnswer].id_question,
                  favorite: false
              }
  
              $scope.indexQuestionAnswer+=1;
              $scope.descriptionAnswer.push(resultAnswer);
            }
        }
        $scope.questionFavorite = {
            'idQuestion':$scope.myQuestions[index].id_question,
            'favorite':$scope.favoriteQuestion,
            'like': $scope.myQuestions[index].likes_question,
            'description':  $scope.myQuestions[index].text_question
        }
    }

    /* click on answer to show section of answer */
    $scope.clickOnAnswer = function() {
        $scope.showDivAnswer=true;
    }

    /* user answer */
    $scope.putAnswer = function(textAnswer) {
        $scope.clickOnPutAnswer=true;
        var data = {
            text: textAnswer,
            likes: $scope.likes,
            idQuestion: $scope.idQuestion,
            idAnswer: $scope.biggestId
        };
        $scope.insertedAnswer=false;
        
        $http.post('/insertAnswer', data);

        $scope.showDivAnswer=false;
        var resultAnswer = {
          numberOfQuestion: $scope.indexQuestionAnswer,
          text: textAnswer,
          likes: $scope.likes,
          favorite: false
        }
        $scope.indexQuestionAnswer+=1;
        $scope.descriptionAnswer.push(data);

        $scope.showDivAnswer=false;
        var valueIdQuestion = parseInt($scope.idQuestion)+1;
        var data = {
            'id_notification': parseInt($scope.currentNotificationId)+1,
            'text_notification': 'Resposta à pergunta número ' + valueIdQuestion,
            'date_notification': 'Agora mesmo',
            'insert_notification': 'yes',
            'id_user': $scope.idUserLoggerIn
        }
        $http.post('/insertNotifications', data);

        
      setTimeout(function() {
        $(".myQuestion").fadeOut().empty();
      }, 2000);

      $scope.insertedAnswer=true;
    }

    /* add to favorites question */
    $scope.addToFavoritesQuestion = function(){
        $scope.showMyQuestions=false;
        $scope.loading = true;

        /* get favorites material */
        $scope.getMyFavorites = FavoritesQuestionService.getMyFavorites($scope.idUserLoggerIn,function(infoFavorites){});
        $scope.getMyFavorites.then(function(result) {
            $scope.loading = false;
            $scope.showMyQuestions=true;
            var data=result.data.allFavoritesDetails;
            $scope.favoriteDetails=data;

            if($scope.favoriteDetails.length===0) {
                $scope.favoriteId=1;
            } else {
                $scope.favoriteId=($scope.favoriteDetails[$scope.favoriteDetails.length-1].id_favorite)+1;
            }
            var data = {
                idFavorite: $scope.favoriteId,
                idUser: $scope.idUserLoggerIn,
                idMaterial: null,
                idQuestion: $scope.idQuestion,
                idAnswer: -1
            };
            $http.post('/insertFavoriteQuestion', data);
            $scope.questionFavorite.favorite=true;
            
        });
    }
  
    /* remove from favorites question */
    $scope.removeFromFavoritesQuestion = function(question) {
        var data = {
            'idQuestion':question-1
        }
        $http.post('/deleteFavoriteQuestion', data);
        $scope.questionFavorite.favorite=false;  
    }

    /* add to favorites question */
    $scope.addToFavoritesAnswer = function(answerQuestion){
        /* get favorites material */
        if($scope.idUserLoggerIn !== undefined) {
          var data = {
            idFavorite: parseInt($scope.nextIdFavorite)+1,
            idUser: $scope.idUserLoggerIn,
            idMaterial: null,
            idQuestion: -1,
            idAnswer: answerQuestion.id
          }
          $http.post('/insertFavoriteAnswer', data);
  
          answerQuestion.favorite=true;
          $scope.goToLogin=false;
        } else {
          answerQuestion.favorite=false;
          $scope.goToLogin=true;
        }
    }
  
    /* remove from favorites answer */
    $scope.removeFromFavoritesAnswer = function(answer) {
        if($scope.idUserLoggerIn !== undefined) {
            var data = {
            'idAnswer':parseInt(answer.id)
            }
            $http.post('/deleteFavoriteAnswer', data);

            answer.favorite=false;
            $scope.goToLogin=false;
        } else {
            answer.favorite=false;
            $scope.goToLogin=true;
        }
    }

    /* add like on answer */
    $scope.addLikeAnswer = function(answer) {
        if($scope.idUserLoggerIn !== undefined) {
            
            answer.likes=answer.likes+1;
            var data = {
            'like': answer.likes,
            'id_answer': answer.id
            }
            $http.post('updateLikeAnswer', data);
            $scope.goToLogin=false;
            answerQuestion.likes=true;
        } else {
            $scope.goToLogin=true;
        }
    }
  
    /* remove like of question */
    $scope.removeLikeAnswer = function(answer) {
        if($scope.idUserLoggerIn !== undefined) {
            
            if(answer.likes > 0) {
            
            answer.likes=answer.likes-1;
            var data = {
                'like': answer.likes,
                'id_answer': answer.id
            }
            $http.post('updateLikeAnswer', data);
            $scope.goToLogin=false;
            answerQuestion.likes=true;
            }
            
        } else {
            $scope.goToLogin=true;
        }
    }

    /* add like on question */
    $scope.addLikeQuestion = function() {
        $scope.questionFavorite.like=$scope.questionFavorite.like+1;
        var data = {
            'like': $scope.questionFavorite.like,
            'id_question': $scope.questionFavorite.idQuestion
        }
        $http.post('updateLikeQuestion', data);
        $scope.goToLogin=false;
    }

    /* remove like of question */
    $scope.removeLikeQuestion = function() {
        if($scope.questionFavorite.like > 0) {
            $scope.questionFavorite.like=$scope.questionFavorite.like-1;
            var data = {
              'like': $scope.questionFavorite.like,
              'id_question': $scope.questionFavorite.idQuestion
            }
            $http.post('updateLikeQuestion', data);
            $scope.goToLogin=false;
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
        $scope.getMaterials = MyQuestionsMaterialService.getMaterialComparation(function(infoMaterial){});
        $scope.getMaterials.then(function(result) {
            $scope.loading = true;
            var data=result.data.comparationDetails;
            $scope.materialsToSearch = data;
            $scope.loading = false;

            $scope.resultSearch=[];
            var inputMiniValue = jQuery("#miniSearch").val(); 		
            var inputMini = inputMiniValue.toLowerCase();
            if(inputMini !== '') {
                for(var index=0; index < $scope.materialsToSearch.length; ++index) {
                    var resultMaterial = {
                        'name': $scope.materialsToSearch[index].name,
                        'category': $scope.materialsToSearch[index].category,
                        'code': $scope.materialsToSearch[index].code,
                        'description': $scope.materialsToSearch[index].description
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
                    $scope.showSearch=false;
                    $scope.miniSearchResults = true;
                    $scope.noResultsOnSearch=false;
                    $scope.showResultsOfMiniSearch=true;
                    $scope.showPerfilDetails=false;
    
                    $scope.showMaterialDetails=false;
                    $scope.showForum = false;
                    $scope.showQuestionDetails=false;
            
                    $scope.showFavorites = true;
                    $scope.showCategory = false; 
                    $scope.showAllQuestions=false;
                }
            }
        });
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

        $scope.getAllUsers = UserQuestionService.getUsers(function(users){});

		$scope.getAllUsers.then(function(usersDB) {
            $scope.users = usersDB.data.users;
            for(var index=0; index<$scope.users.length; ++index){
                $scope.userName = $scope.users[index].username;
                $scope.userPassword = $scope.users[index].password;
                
                if($scope.userName !== null && $scope.userName === username){
                    if($scope.userPassword !== null && $scope.userPassword === password){
                        $scope.userLoggedIn=$scope.users[index].username;
                        $scope.idUserLoggerIn=$scope.users[index].id;
                        $scope.confirmSession = true;
                        
                        $scope.userImage = $scope.users[index].image;
                        $scope.userEmail = $scope.users[index].email;
                        $scope.nameUser=$scope.users[index].name;
                        $scope.userBirthdate = $scope.users[index].birthdate;
    
                        var splitDateBirth = $scope.userBirthdate.split('/');
                        $scope.dayBirth = splitDateBirth[0];
                        $scope.monthBirth = splitDateBirth[1];
                        $scope.yearBirth = splitDateBirth[2];
                        break;
                    }
                }
            }
        });
    }

    /* routes of click on links page */
    $scope.getRequest = function(buttonClick) {
        if(buttonClick === 'notification') {
			var getNotifications = NotificationMyQuestionService.getAllNotifications(function(infoNotification){});
			getNotifications.then(function(result) {
			$scope.loading=true;
			var data=result.data.notificationDetails;
			$scope.notifications=data;
			$scope.numberOfNotifications=$scope.notifications.length;
			$scope.currentNotificationId = $scope.notifications[$scope.notifications.length-1].id_notification;
			$scope.loading=false;

            });
        }  
		if($scope.isMobileView) {
			if(buttonClick === 'favorites') {
				$window.location.href = '/BiAMa/favoritesMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'questions') {
				$window.location.href = '/BiAMa/myQuestionsMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'world_share') {
				$window.location.href = '/BiAMa/worldShareMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'notification') {
				$window.location.href = '/BiAMa/notificationsMobile?userName=' + $scope.idUserLoggerIn;
	
			}
	
			if(buttonClick == 'perfil') {
                $window.location.href = '/BiAMa/perfilPageMobile?userId=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'compare') {
				$window.location.href = '/BiAMa/compareMobile?userName=' + $scope.idUserLoggerIn;
	
            }

            if(buttonClick == 'regist') {
				$scope.regist();
				$window.location.href = '/BiAMa/registUserMobile?userName=' + $scope.idUserLoggerIn;
			}
		} else {
            if(buttonClick === 'biamaPage') {
				$window.location.href = '/BiAMa/biamaPage?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick === 'whereWeAre') {
				$window.location.href = '/BiAMa/whereWeAre?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'library') {
				$window.location.href = '/BiAMa/library?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'myBiama') {
				$window.location.href = '/BiAMa/myBiama?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'forum') {
				$window.location.href = '/BiAMa/forumPage?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'favorites') {
				$window.location.href = '/BiAMa/favorites?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick == 'questions') {
				$window.location.href = '/BiAMa/myQuestions?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick == 'world_share') {
				$window.location.href = '/BiAMa/worldShare?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick == 'notification') {


				$window.location.href = '/BiAMa/notifications?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick == 'perfil') {
				$window.location.href = '/BiAMa/perfilPage?userId=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick == 'compare') {
				$window.location.href = '/BiAMa/compare?userName=' + $scope.idUserLoggerIn + '&redirect';
            }
            
            if(buttonClick == 'regist') {
				$scope.regist();
				$window.location.href = '/BiAMa/registUser?userName=' + $scope.idUserLoggerIn + '&redirect';
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

        $http.get('/userQuestions').then(successCallback, errorCallback);

        function successCallback(response){
            //success code
            $timeout(function() {
                deferred.resolve(response);
            }, 2000);
        }
        function errorCallback(error){
            //error code
            deferred.reject(status);
        }

        return deferred.promise;
    };
    
    var getQuestionAnswer = function() {
        var deferred = $q.defer();

        $http.get('/userAnswerAndQuestion').then(successCallback, errorCallback);

        function successCallback(response){
            //success code
            $timeout(function() {
                deferred.resolve(response);
            }, 2000);
        }
        function errorCallback(error){
            //error code
            deferred.reject(status);
        }

        return deferred.promise;
    };

    var getAllMyQuestions = function(data) {
        var deferred = $q.defer();

        $http.get('/allMyQuestions', {params: {'data': data}}).then(successCallback, errorCallback);

       function successCallback(response){
           //success code
           $timeout(function() {
			deferred.resolve(response);
	   	   }, 2000);
       }
       function errorCallback(error){
           //error code
           deferred.reject(status);
       }
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
    
        $http.get('/users').then(successCallback, errorCallback);

        function successCallback(response){
            //success code
            $timeout(function() {
                deferred.resolve(response);
            }, 2000);
        }
        function errorCallback(error){
            //error code
            deferred.reject(status);
        }
	
		return deferred.promise;
	};

	return {
		getUsers: getUsers
	};
});

app.factory("MyQuestionsMaterialService", function($q, $http, $timeout){
    var getMaterialComparation = function() {
        var deferred = $q.defer();

        $http.get('/compareMaterials').then(successCallback, errorCallback);

        function successCallback(response){
            //success code
            $timeout(function() {
                deferred.resolve(response);
            }, 2000);
        }
        function errorCallback(error){
            //error code
            deferred.reject(status);
        }

        return deferred.promise;
    };

    return {
        getMaterialComparation: getMaterialComparation
    };
});
app.factory("FavoritesQuestionService", function($q, $http, $timeout){
    
	var getMyFavorites = function() {
		var deferred = $q.defer();
        
        $http.get('/allFavorites').then(successCallback, errorCallback);

        function successCallback(response){
            //success code
            $timeout(function() {
                deferred.resolve(response);
            }, 2000);
        }
        function errorCallback(error){
            //error code
            deferred.reject(status);
        }
	
		return deferred.promise;
    };
   
    return {
        getMyFavorites: getMyFavorites
    };
});

app.factory("NotificationMyQuestionService", function($q, $http, $timeout){
    var getMyNotifications = function(data) {
        var deferred = $q.defer();

        $http.get('/myNotifications', {params: {'data': data}}).then(successCallback, errorCallback);

       function successCallback(response){
           //success code
           $timeout(function() {
			deferred.resolve(response);
	   	   }, 2000);
       }
       function errorCallback(error){
           //error code
           deferred.reject(status);
       }

        return deferred.promise;
    };
	
	var getAllNotifications = function() {
		var deferred = $q.defer();
        
        $http.get('/allNotifications').then(successCallback, errorCallback);

        function successCallback(response){
            //success code
            deferred.resolve(response);
        }
        function errorCallback(error){
            //error code
            deferred.reject(status);
        }
	
		return deferred.promise;
	};

    return {
		getMyNotifications: getMyNotifications,
		getAllNotifications: getAllNotifications
    };
});