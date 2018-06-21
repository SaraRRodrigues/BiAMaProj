
app.controller("QuestionsUsersForumController", ['$scope', "$http", "UserQuestionService", function($scope, $http, UserQuestionService){

    $scope.loading=true;
    $scope.getQuestionDetails=false;

    var getUserQuestionInfo = UserQuestionService.getUserQuestionInfo(function(infoUserAnswer){});
    getUserQuestionInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.questionDetails;
        $scope.questions=data;
    });

    $scope.getQuestion = function(questionId, indexQuestion) {
      $scope.getQuestionDetails = true;
      $scope.indexQuestion=indexQuestion;

      for(var index=0; index<$scope.questions.length; ++index){
        if($scope.questions[index].idQuestion === questionId){
          $scope.descriptionQuestion=$scope.questions[index].text_question;
        }
      }
      /*var getUserQuestionInfo = UserQuestionService.getUserQuestionInfo(function(infoUserAnswer){});
      getUserQuestionInfo.then(function(result) {
          $scope.loading = false;
          var data=result.data.questionDetails;
          $scope.quantityQuestions=data;
      });*/
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
