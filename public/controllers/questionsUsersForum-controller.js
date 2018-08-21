
app.controller("QuestionsUsersForumController", ['$scope', "UserForumQuestionService", "LikeQuestionService", "LikeAnswerService", "QuestionsForumMaterialService","$http", "jQuery", function($scope, UserForumQuestionService, LikeQuestionService, LikeAnswerService, QuestionsForumMaterialService,$http){

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