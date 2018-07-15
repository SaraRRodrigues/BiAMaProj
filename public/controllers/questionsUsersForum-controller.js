
app.controller("QuestionsUsersForumController", ['$scope', "$http", "UserQuestionService", "LikeQuestionService", "LikeAnswerService", function($scope, $http, UserQuestionService, LikeQuestionService, LikeAnswerService){

    $scope.firtTimeOnPage=true;
    $scope.loading=true;
    $scope.getQuestionDetails=false;
    $scope.favoriteQuestion=false;
    $scope.favoriteAnswer=false;
    $scope.showDivAnswer=false;
    $scope.textAnswer=null;
    $scope.likes=0;
    $scope.descriptionAnswer=[];
    $scope.indexQuestionAnswer=1;
    
    var getUserQuestionInfo = UserQuestionService.getUserQuestionInfo(function(infoUserAnswer){});
    getUserQuestionInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.questionDetails;
        $scope.questions=data;
    });

    var getAnswerQuestionInfo = UserQuestionService.getQuestionAnswer(function(infoUserAnswer){});
    getAnswerQuestionInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.questionDetails;
        $scope.details=data;
    });

    var getLikeQuestion = LikeQuestionService.getLikesQuestion(function(infoUserQuestion){});
    getLikeQuestion.then(function(result) {
        $scope.loading = false;
        $scope.dataQuestion=result.data.questionDetails;
    });

    var getLikeAnswer = LikeAnswerService.getLikesAnswer(function(infoUserAnswer){});
    getLikeAnswer.then(function(result) {
        $scope.loading = false;
        $scope.dataAnswer=result.data.questionDetails;
    });

    $scope.getQuestion = function(questionId, indexQuestion) {
      $scope.showQuestionDetails = true;
      $scope.indexQuestion=indexQuestion+1;
      for(var index=0; index< $scope.questions.length; ++index) {
        if($scope.questions[index].id_question === questionId) {

          $scope.likeQuestion=$scope.questions[indexQuestion].likesQuestion;
          $scope.getAnswersOfQuestion(index);
        }
        if(index== $scope.details.length-1) {
          $scope.idQuestion=$scope.questions[index].id_question;
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
    }
    $scope.clickOnAnswer = function() {
      $scope.showDivAnswer=true;
    }
    $scope.putAnswer = function(textAnswer) {
      var data = {
        text: textAnswer,
        likes: $scope.likes,
        idQuestion: $scope.idQuestion,
        idAnswer: $scope.idAnswer
      };
      
      $http.post('/insertAnswer', data);
      $scope.showDivAnswer=false;
    }
}])

app.factory("UserQuestionService", function($q, $http, $timeout){
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

