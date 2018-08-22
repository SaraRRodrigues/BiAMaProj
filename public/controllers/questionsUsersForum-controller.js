
app.controller("QuestionsUsersForumController", ['$scope', "UserForumQuestionService", "LikeQuestionService", "LikeAnswerService", "QuestionsForumMaterialService", "QuestionsForumBiamaService","$http", "jQuery", function($scope, UserForumQuestionService, LikeQuestionService, LikeAnswerService, QuestionsForumMaterialService, QuestionsForumBiamaService, $http){

    $scope.nameclick='forum'
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMainMobile").hide();
    /* my current page */

    var window_width = $( window ).width();
    if(window_width <= 1024) {
      $scope.isMobileView=true;
    } else {
      $scope.isMobileView=false;
    }
    
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
    
    var getUserQuestionInfo = UserForumQuestionService.getUserQuestionInfo(function(infoUserAnswer){});
    getUserQuestionInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.questionDetails;
        $scope.questions=data;
    });

    var getAnswerQuestionInfo = UserForumQuestionService.getQuestionAnswer(function(infoUserAnswer){});
    getAnswerQuestionInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.questionDetails;
        $scope.details=data;
        $scope.calculateAnswerId($scope.details);
    });

    
	$scope.getMaterials = QuestionsForumMaterialService.getMaterialComparation(function(infoMaterial){});
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
        $scope.showLocation=false;
        $scope.showForum = false;
        $scope.showAllQuestions=false;
        $scope.showQuestionDetails=false;
      }
    }

    $scope.closeMaterial = function(){
      $scope.miniSearchResults=false;
      $scope.showDetailsOfMaterial=false;
      $scope.showLocation=true;
      $scope.showForum = true;
      $scope.showAllQuestions=true;
      $scope.showQuestionDetails=false;
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
      $scope.showLocation=true;
      $scope.showForum = true;
      $scope.showAllQuestions=true;
      $scope.showQuestionDetails=false;
    }
  
    $scope.openMaterial = function(material) {
      $scope.miniSearchResults=false;
      $scope.showDetailsOfMaterial=true;
      $scope.showMaterials=false;
      $scope.openedMaterial=material;
      $scope.showLocation=false;
      $scope.showAllQuestions=false;
    }
  
    $scope.goToForum = function() {
      window.setTimeout("location.href = 'http://localhost:8080'")
    }

    $scope.goToHomePage = function() {
      window.setTimeout("location.href = 'http://localhost:8080'")
    }

    $scope.clickTopSearch = function() {
      if($scope.showSearch){
        $scope.showSearch = false;
      }else {
        $scope.showSearch = true;
      }
    }
    
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
      $scope.indexQuestion=indexQuestion+1;
      for(var index=0; index< $scope.questions.length; ++index) {
        if($scope.questions[index].id_question === questionId) {
          $scope.idQuestion=$scope.questions[index].id_question;
          $scope.likeQuestion=$scope.questions[indexQuestion].likesQuestion;
          $scope.getAnswersOfQuestion(index);
        }
      }
      
      $scope.showDivAnswer
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
      var resultAnswer = {
        numberOfQuestion: $scope.indexQuestionAnswer,
        text: textAnswer,
        likes: $scope.likes,
        favorite: false
      }
      $scope.indexQuestionAnswer+=1;
      $scope.descriptionAnswer.push(resultAnswer);

    }
    
    $scope.addToFavoritesQuestion = function(){
      if($scope.showInitSession){
        /*var data = {
          idFavorite: 0,
          idUser: 0,
          idMaterial: null,
          idQuestion: $scope.idQuestion
        };
        $http.post('/insertFavoriteQuestion', data);
        */
      } else {
        $scope.clickAddFavorite=true;
      }
    }

    $scope.removeFromFavoritesQuestion = function() {
      if($scope.showInitSession){
        /*var data = {
          idFavorite: 0,
          idUser: 0,
          idMaterial: null,
          idQuestion: $scope.idQuestion
        };
        $http.post('/insertFavoriteQuestion', data);
        */
      } else {
        $scope.clickRemoveFavorite=true;
      }
    }
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
      } else {
        $scope.clickAddLike=true;
      }
    }
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
      } else {
        $scope.clickRemoveLike=true;
      }
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
      var getAllUsers = QuestionsForumBiamaService.getUsers(function(users){});
      
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

app.factory("UserForumQuestionService", function($q, $http, $timeout){
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

app.factory("LikeQuestionService", function($q, $http, $timeout){

  var getLikesQuestion = function() {
      var deferred = $q.defer();
  
      $timeout(function() {
        deferred.resolve($http.get('/userLikeQuestions'));
      }, 2000);
  
      return deferred.promise;
    };
  
    return {
      getLikesQuestion: getLikesQuestion
    };
  });

app.factory("LikeAnswerService", function($q, $http, $timeout){

  var getLikesAnswer = function() {   
      var deferred = $q.defer();
  
      $timeout(function() {
        deferred.resolve($http.get('/userLikeAnswers'));
      }, 2000);
  
      return deferred.promise;
    };
  
    return {
      getLikesAnswer: getLikesAnswer
    };
  });

  app.factory("QuestionsForumMaterialService", function($q, $http, $timeout){
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

  app.factory("QuestionsForumBiamaService", function($q, $http, $timeout){
    
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