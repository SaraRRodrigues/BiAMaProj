
app.controller("QuestionsUsersForumController", ['$scope', "$http", "UserQuestionService", "LikeQuestionService", "LikeAnswerService", function($scope, $http, UserQuestionService, LikeQuestionService, LikeAnswerService){

    $scope.loading=true;
    $scope.getQuestionDetails=false;
    $scope.favoriteQuestion=false;
    $scope.favoriteAnswer=false;
    $scope.showDivAnswer=false;

    var getUserQuestionInfo = UserQuestionService.getUserQuestionInfo(function(infoUserAnswer){});
    getUserQuestionInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.questionDetails;
        $scope.details=data;
        console.log(data)
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
        console.log('answer likes: ' ,  $scope.dataAnswer)
    });

    $scope.getQuestion = function(questionId, indexQuestion) {
      
      $scope.showQuestionDetails = true;
      $scope.indexQuestion=indexQuestion;
      for(var index=0; index< $scope.details.length; ++index) {
        if($scope.details[index].id_question === questionId) {
          if(index===0) {
            $scope.answer=index+1;
          }else {
            $scope.answer=index;
          }
          $scope.descriptionQuestion=$scope.details[index].text_question;
          $scope.descriptionAnswer=$scope.details[index].text_answer;
          $scope.getLikesAnswer($scope.details[index].id_answer);
        }
      }

      $scope.getLikesQuestion(questionId);
    }

    $scope.getLikesQuestion = function(questionId) {
      for(var index=0; index<$scope.dataQuestion.length; ++index){
        if(questionId === $scope.dataQuestion[index].id_question){
          $scope.likeQuestion=$scope.dataQuestion[index].likes;
        }
      }
    }
    $scope.getLikesAnswer = function(answerId) {
      for(var index=0; index<$scope.dataAnswer.length; ++index){
        if(answerId === $scope.dataAnswer[index].id_answer){
          $scope.likeAnswer=$scope.dataAnswer[index].likes;
        }
      }
    }
    $scope.clickOnAnswer = function() {
      $scope.showDivAnswer=true;
    }
    $scope.putAnswer = function() {
      //Inserir na base de dados
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

  return {
    getUserQuestionInfo: getUserQuestionInfo
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
