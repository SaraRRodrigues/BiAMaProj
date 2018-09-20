
app.controller("QuestionsUsersForumController", ['$scope', "UserForumQuestionService", "LikeQuestionService", "LikeAnswerService","FavoritesQuestionForumService", "QuestionsForumMaterialService", "QuestionsForumBiamaService", "NotificationQuestionForumService", "$http", "$window", "jQuery", function($scope, UserForumQuestionService, LikeQuestionService, LikeAnswerService, FavoritesQuestionForumService, QuestionsForumMaterialService, QuestionsForumBiamaService,NotificationQuestionForumService, $http, $window){

    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMainMobile").hide();
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
      $scope.nameclick='forum'

      $scope.firtTimeOnPage=true;
      $scope.loading=true;
      $scope.getQuestionDetails=false;
      $scope.favoriteQuestion=false;
      $scope.favoriteAnswer=false;
      $scope.showDivAnswer=false;
      $scope.textAnswer=null;
      $scope.clickAddFavorite=false;
      $scope.clickRemoveFavorite=false;
      $scope.clickRemoveLike=false;
      $scope.clickAddLike=false;
      $scope.likes=0;
      $scope.descriptionAnswer=[];
      $scope.indexQuestionAnswer=1;
      $scope.resultSearch = [];
      $scope.showDetailsOfMaterial=false;
      $scope.miniSearchResults=false;
      $scope.showAllQuestions=true;
      $scope.favoriteQuestion=false;
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
  
      if($scope.idUserLoggerIn !== "" && $scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect'  && $scope.idUserLoggerIn !== 'anonymous') {
        $scope.confirmSession=true;
      } else {
        $scope.loading = true;
        $scope.confirmSession=false;
      }
    }

    /* -------------- INIT DESKTOP & MOBILE -------------- */
    /* get information of questions and materials to display */
    $scope.getAllRequests = function() {
      var getUserQuestionInfo = UserForumQuestionService.getUserQuestionInfo(function(infoUserAnswer){});
      getUserQuestionInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.questionDetails;
        $scope.questions=data;

        var getAnswerQuestionInfo = UserForumQuestionService.getQuestionAnswer(function(infoUserAnswer){});
        getAnswerQuestionInfo.then(function(result) {
            $scope.loading = false;
            var data=result.data.questionDetails;
            $scope.details=data;
            $scope.calculateAnswerId($scope.details);
        });

      });

      
      var getMaterials = QuestionsForumMaterialService.getMaterialComparation(function(infoMaterial){});
      getMaterials.then(function(result) {
        $scope.loading = false;
        var data=result.data.comparationDetails;
        $scope.materialsToSearch = data;
      });

      var getFavorites = FavoritesQuestionForumService.getAllFavorites(function(infoFavorites){});
      getFavorites.then(function(result) {
            $scope.loading = false;
            var data=result.data.allFavoritesDetails;
            $scope.favorites = data;
            $scope.nextIdFavorite = data[data.length-1].id_favorite; 
          
      });

      $scope.getAllUsers = QuestionsForumBiamaService.getUsers(function(users){});
      $scope.getAllUsers.then(function(usersDB) {
        $scope.users = usersDB.data.users;
        for(var index=0; index<$scope.users.length; ++index){
                
          if($scope.users[index].id === $scope.idUserLoggerIn) {
              $scope.userName = $scope.users[index].username;
              $scope.userPassword = $scope.users[index].password;
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
        
      });
      
      var getNotifications = NotificationQuestionForumService.getAllNotifications(function(infoNotification){});
        getNotifications.then(function(result) {
        $scope.loading = false;
        var data=result.data.notificationDetails;
        $scope.notifications=data;
        $scope.numberOfNotifications=$scope.notifications.length;
        $scope.currentNotificationId = $scope.notifications[$scope.notifications.length-1].id_notification;
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
      if($scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect') {
        if(!$scope.showDivAnswer) {
          if(!$scope.isMobileView) {
            $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/forumPage?userName=' + $scope.idUserLoggerIn + '&redirect';
          } else {
            $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/forumPageMobile?userName=' + $scope.idUserLoggerIn;
          }
        } else if($scope.showAllQuestions){
          if(!$scope.isMobileView) {
            $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/questionsUsersForum?userName=' + $scope.idUserLoggerIn + '&redirect';
          } else {
            $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/questionsForumMobile?userName=' + $scope.idUserLoggerIn;
          }
        }
      } else {
        if(!$scope.showDivAnswer) {
          if($scope.isMobileView) {
            $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/forumPageMobile?userName=anonymous';
          } else {
            $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/forumPage?userName=anonymous' + '&redirect';
          }
        } else {
          $window.location.href = 'https://biamaweb.herokuapp.com?username=' + 'anonymous';
        }
      }
    }

    /* get question with questionId */
    $scope.getQuestion = function(questionId, indexQuestion) {
      $scope.showQuestionDetails = true;
      $scope.indexQuestion=indexQuestion+1;
      for(var index=0; index< $scope.questions.length; ++index) {
        if($scope.questions[index].id_question === questionId) {
          $scope.idQuestion=$scope.questions[index].id_question;
          $scope.likeQuestion=$scope.questions[indexQuestion].likesQuestion;
          $scope.getAnswersOfQuestion(index);
        }
      }
      
      /* reset indexQuestionAnswer: number of answer of questions */
      $scope.indexQuestionAnswer=1;
    }

    /* get answers of question with index(is question id) */
    $scope.getAnswersOfQuestion = function(index) {
      $scope.descriptionQuestion=$scope.questions[index].text_question;
      
      for(var indexFav=0; indexFav< $scope.favorites.length; ++indexFav) {
        if($scope.questions[index].id_question == $scope.favorites[indexFav].question_id) {
          $scope.favoriteQuestion=true;
          break;
        } else {
          $scope.favoriteQuestion=false;
        }
      }

      $scope.questionFavorite = {
        'idQuestion':$scope.questions[index].id_question,
        'favorite':$scope.favoriteQuestion,
        'like': $scope.questions[index].likes_question,
        'description':  $scope.questions[index].text_question
      }
      
      for(var indexAnswer=0; indexAnswer<$scope.details.length; ++indexAnswer){
        if($scope.details[indexAnswer].id_question == $scope.questions[index].id_question){
          var resultAnswer = {
            id: $scope.details[indexAnswer].id_answer,
            numberOfQuestion: $scope.indexQuestionAnswer,
            text: $scope.details[indexAnswer].text_answer,
            likes: $scope.details[indexAnswer].likes_answer,
            id_question: $scope.details[indexAnswer].id_question,
            favorite: false
          }
          for(var indexFav=0; indexFav< $scope.favorites.length; ++indexFav) {
            if(resultAnswer.id == $scope.favorites[indexFav].answer_id) {
              resultAnswer.favorite=true;
            } 
          }
          $scope.indexQuestionAnswer+=1;
          $scope.descriptionAnswer.push(resultAnswer);
        }
      }
    }

    /* click on answer to show section of answer */
    $scope.clickOnAnswer = function() {
      if($scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "" && $scope.idUserLoggerIn !== "undefined"){
        $scope.showDivAnswer=true;
      } else {
        $scope.goToLogin=true;
      }
    }

    /* user answer */
    $scope.putAnswer = function(textAnswer) {
      $scope.clickOnInsertAnswer=true;
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
      $scope.descriptionAnswer.push(resultAnswer);

      var valueIdQuestion = parseInt($scope.idQuestion)+1;
      var data='';
      if($scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "" && $scope.idUserLoggerIn !== "undefined") {
          data = {
              'id_notification': parseInt($scope.currentNotificationId)+1,
              'text_notification': 'Resposta à pergunta número ' + valueIdQuestion,
              'date_notification': 'Agora mesmo',
              'insert_notification': 'yes',
              'id_user': $scope.idUserLoggerIn
          }
      } else {
          data = {
              'id_notification': parseInt($scope.currentNotificationId)+1,
              'text_notification': 'Resposta à pergunta número ' + valueIdQuestion,
              'date_notification': 'Agora mesmo',
              'insert_notification': 'yes',
              'id_user': 'anonymous'
          }
      }

      $http.post('/insertNotifications', data);

      setTimeout(function() {
        $(".questionForum").fadeOut().empty();
      }, 2000);

      $scope.insertedAnswer=true;

    }

    /* add to favorites question */
    $scope.addToFavoritesQuestion = function(){
      $scope.clickAddFavQuestion=true;
      /* get favorites material */
      if($scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect') {
        var data = {
          idFavorite:  parseInt($scope.nextIdFavorite)+1,
          idUser: $scope.idUserLoggerIn,
          idMaterial: null,
          idQuestion: $scope.idQuestion,
          idAnswer: -1
        }
        $scope.insertedFavoriteQuestion=false;
        $http.post('/insertFavoriteQuestion', data);

        $scope.questionFavorite.favorite=true;
        $scope.goToLogin=false;
      } else {
        $scope.questionFavorite.favorite=false;
        $scope.goToLogin=true;
      }

      setTimeout(function() {
        $(".questionFavorite").fadeOut().empty();
      }, 2000);
      
      $scope.insertedFavoriteQuestion=true;
    }

    /* remove from favorites question */
    $scope.removeFromFavoritesQuestion = function(question) {
      $scope.clickRemoveFavQuestion=true;
      if($scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect') {
        var data = {
          'idQuestion':question-1
        }

        $scope.removedFavoriteQuestion=false;
        $http.post('/deleteFavoriteQuestion', data);

        $scope.questionFavorite.favorite=false;
        $scope.goToLogin=false;
      } else {
        $scope.questionFavorite.favorite=false;
        $scope.goToLogin=true;
      }

      setTimeout(function() {
        $(".removeQuestionFavorite").fadeOut().empty();
      }, 2000);

      $scope.removedFavoriteQuestion=true;

    }

    /* add to favorites question */
    $scope.addToFavoritesAnswer = function(answerQuestion){
      $scope.clickAddFavAnswer=true;
      /* get favorites material */
      if($scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect') {
        var data = {
          idFavorite: parseInt($scope.nextIdFavorite)+1,
          idUser: $scope.idUserLoggerIn,
          idMaterial: null,
          idQuestion: -1,
          idAnswer: answerQuestion.id
        }

        $scope.insertedFavoriteAnswer=false;
        $http.post('/insertFavoriteAnswer', data);

        answerQuestion.favorite=true;
        $scope.goToLogin=false;
      } else {
        answerQuestion.favorite=false;
        $scope.goToLogin=true;
      }
      
      setTimeout(function() {
        $(".answerFavorite").fadeOut().empty();
      }, 2000);

      $scope.insertedFavoriteAnswer=true;
    }

    /* remove from favorites answer */
    $scope.removeFromFavoritesAnswer = function(answer) {
      $scope.clickRemoveFavAnswer=true;
      if($scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect') {
        var data = {
          'idAnswer':parseInt(answer.id)
        }

        $scope.removedFavoriteAnswer=true;
        $http.post('/deleteFavoriteAnswer', data);

        answer.favorite=false;
        $scope.goToLogin=false;
      } else {
        answer.favorite=false;
        $scope.goToLogin=true;
      }

      setTimeout(function() {
        $(".removeAnswerFavorite").fadeOut().empty();
      }, 2000);

      $scope.removedFavoriteAnswer=true;
    }

    /* add like on question */
    $scope.addLikeQuestion = function() {
      $scope.clickAddLikeQuestion=true;
      if($scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect') {
        $scope.questionFavorite.like=$scope.questionFavorite.like+1;
        var data = {
          'like': $scope.questionFavorite.like,
          'id_question': $scope.questionFavorite.idQuestion
        }

        $scope.addedLikeQuestion=false;
        $http.post('updateLikeQuestion', data);
        $scope.goToLogin=false;
      } else {
        $scope.goToLogin=true;
      }

      setTimeout(function() {
        $(".addLikeQuestion").fadeOut().empty();
      }, 2000);

      $scope.addedLikeQuestion=true;
    }

    /* remove like of question */
    $scope.removeLikeQuestion = function() {
      $scope.clickRemoveLikeQuestion=true;
      if($scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect') {
        if($scope.questionFavorite.like > 0) {
          $scope.questionFavorite.like=$scope.questionFavorite.like-1;
          var data = {
            'like': $scope.questionFavorite.like,
            'id_question': $scope.questionFavorite.idQuestion
          }

          $scope.removedLikeQuestion=false;
          $http.post('updateLikeQuestion', data);
          $scope.goToLogin=false;
        }
      } else {
        $scope.goToLogin=true;
      }

      setTimeout(function() {
        $(".removeLikeQuestion").fadeOut().empty();
      }, 2000);

      $scope.removedLikeQuestion=true;
    }

    /* add like on answer */
    $scope.addLikeAnswer = function(answer) {
      $scope.clickAddLikeAnswer=true;
      if($scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect') {
        
        answer.likes=answer.likes+1;
        var data = {
          'like': answer.likes,
          'id_answer': answer.id
        }

        $scope.addedLikeAnswer=false;
        $http.post('updateLikeAnswer', data);
        $scope.goToLogin=false;
      } else {
        $scope.goToLogin=true;
      }

      setTimeout(function() {
        $(".addLikeAnswer").fadeOut().empty();
      }, 2000);

      $scope.addedLikeAnswer=true;
    }

    /* remove like of question */
    $scope.removeLikeAnswer = function(answer) {
      $scope.clickRemoveLikeAnswer=true;
      if($scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect') {
        
        if(answer.likes > 0) {
          
          answer.likes=answer.likes-1;
          var data = {
            'like': answer.likes,
            'id_answer': answer.id
          }

          $scope.removedLikeAnswer=false;
          $http.post('updateLikeAnswer', data);
          $scope.goToLogin=false;
        }
        
      } else {
        $scope.goToLogin=true;
      }

      setTimeout(function() {
        $(".removeLikeAnswer").fadeOut().empty();
      }, 2000);

      $scope.removedLikeAnswer=false;
    }
    /* -------------- END DESKTOP & MOBILE -------------- */

    /* -------------- INIT MOBILE -------------- */
	  /* open material of small search result */
    $scope.openMaterial = function(material) {
      $scope.miniSearchResults=false;
      $scope.showDetailsOfMaterial=true;
      $scope.showMaterials=false;
      $scope.openedMaterial=material;
      $scope.showLocation=false;
      $scope.showAllQuestions=false;
    }

    /* close material that are opened */
    $scope.closeMaterial = function(){
      $scope.miniSearchResults=false;
      $scope.showDetailsOfMaterial=false;
      $scope.showLocation=true;
      $scope.showForum = true;
      $scope.showAllQuestions=true;
      $scope.showQuestionDetails=false;
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
      $scope.showCategory=false;
      $scope.showMaterialDetails=false;
      $scope.showLocation=true;
      $scope.showForum = true;
      $scope.showAllQuestions=true;
      $scope.showQuestionDetails=false;
    }

    /* action of click button "Ok" present on small search line */
    $scope.initMiniSearch = function() {
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
      
              $scope.showCategory=true;
              $scope.showMaterialDetails=false;
              $scope.showLocation=false;
              $scope.showForum = false;
              $scope.showAllQuestions=false;
              $scope.showQuestionDetails=false;
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
    }
     
    /* routes of click on links page */
    $scope.getRequest = function(buttonClick) {
  
      if($scope.isMobileView) {
        if(buttonClick === 'favorites') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/favoritesMobile?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'questions') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/myQuestionsMobile?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'world_share') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/worldShareMobile?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'notification') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/notificationsMobile?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'perfil') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/perfilPageMobile?userId=' + $scope.idUserLoggerIn;
        }
    
        if(buttonClick == 'compare') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/compareMobile?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
        
      } else {
        if(buttonClick === 'biamaPage') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/biamaPage?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick === 'whereWeAre') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/whereWeAre?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
  
        if(buttonClick === 'library') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/library?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
  
        if(buttonClick === 'myBiama') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/myBiama?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
  
        if(buttonClick === 'forum') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/forumPage?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
  
        if(buttonClick === 'favorites') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/favorites?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'questions') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/myQuestions?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'world_share') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/worldShare?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'notification') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/notifications?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'perfil') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/perfilPage?userId=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'compare') {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/compare?userName=' + $scope.idUserLoggerIn + '&redirect';
        }

        if(buttonClick == 'regist') {
          $scope.regist();
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/registUser?userName=' + $scope.idUserLoggerIn + '&redirect';
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
  
    $scope.goToForum = function() {
      if(!$scope.showQuestionDetails) {
        if($scope.isMobileView) {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/forumPageMobile?userName=' + $scope.idUserLoggerIn;
        } else {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/forumPage?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
      } else {
        if($scope.isMobileView) {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/questionsForumMobile?userName=' + $scope.idUserLoggerIn;
        } else {
          $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/questionsUsersForum?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
      }
    }
   /* -------------- END MOBILE -------------- */

	  /* init QuestionsController  */
    $scope.viewType();
    $scope.initData();
    $scope.getAllRequests();
    $scope.validateUserLoggedIn();
}])

app.factory("UserForumQuestionService", function($q, $http, $timeout){
  var getUserQuestionInfo = function() {
    var deferred = $q.defer();

    $timeout(function() {
      deferred.resolve($http.get('/userQuestions'));
    }, 30000);

    return deferred.promise;
  };
  var getQuestionAnswer = function() {
    var deferred = $q.defer();

    $timeout(function() {
      deferred.resolve($http.get('/userAnswerAndQuestion'));
    }, 30000);

    return deferred.promise;
  };

  return {
    getUserQuestionInfo: getUserQuestionInfo,
    getQuestionAnswer: getQuestionAnswer
  };
});

app.factory("LikeQuestionService", function($q, $http, $timeout){

  var getLikesQuestion = function() {
      var deferred = $q.defer();
  
      $http.get('/userLikeQuestions').then(successCallback, errorCallback);

        function successCallback(response){
            //success code
            $timeout(function() {
              deferred.resolve(response);
            }, 30000);
        }
        function errorCallback(error){
            //error code
            deferred.reject(status);
        }
      return deferred.promise;
    };
  
    return {
      getLikesQuestion: getLikesQuestion
    };
});

app.factory("LikeAnswerService", function($q, $http, $timeout){

  var getLikesAnswer = function() {   
      var deferred = $q.defer();

      $http.get('/userLikeAnswers').then(successCallback, errorCallback);

        function successCallback(response){
            //success code
            $timeout(function() {
              deferred.resolve(response);
            }, 30000);
        }
        function errorCallback(error){
            //error code
            deferred.reject(status);
        }
  
      return deferred.promise;
    };
  
    return {
      getLikesAnswer: getLikesAnswer
    };
});

app.factory("QuestionsForumMaterialService", function($q, $http, $timeout){
  var getMaterialComparation = function() {
      var deferred = $q.defer();

      $http.get('/compareMaterials').then(successCallback, errorCallback);

        function successCallback(response){
            //success code
            $timeout(function() {
              deferred.resolve(response);
            }, 30000);
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

app.factory("QuestionsForumBiamaService", function($q, $http, $timeout){
  
  var getUsers = function() {
    var deferred = $q.defer();

    $http.get('/users').then(successCallback, errorCallback);

    function successCallback(response){
        //success code
        $timeout(function() {
          deferred.resolve(response);
        }, 30000);
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

app.factory("FavoritesQuestionForumService", function($q, $http, $timeout){
    
	var getAllFavorites = function(data) {
		var deferred = $q.defer();
  
    $http.get('/allFavorites').then(successCallback, errorCallback);

    function successCallback(response){
        //success code
        $timeout(function() {
          deferred.resolve(response);
        }, 30000);
    }
    function errorCallback(error){
        //error code
        deferred.reject(status);
    }
		return deferred.promise;
	  };

	  return {
			getAllFavorites: getAllFavorites
	  };
});

app.factory("NotificationQuestionForumService", function($q, $http, $timeout){
  var getMyNotifications = function(data) {
      var deferred = $q.defer();
      
      $http.get('/myNotifications', {params: {'data': data}}).then(successCallback, errorCallback);

       function successCallback(response){
           //success code
          $timeout(function() {
            deferred.resolve(response);
          }, 30000);
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
  getMyNotifications: getMyNotifications,
  getAllNotifications: getAllNotifications
  };
});