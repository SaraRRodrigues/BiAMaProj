app.controller("MyQuestionsController", ['$scope', "$http", "jQuery", function($scope, $http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='myQuestions';	

    $scope.favoriteQuestion=false;
    $scope.favoriteAnswer=false;
    $scope.showDivAnswer=false;
    $scope.showMyQuestions=false;
    $scope.questions=[];
    $scope.descriptionAnswer=[];

    $scope.clickAddFavorite=false;
    $scope.clickRemoveFavorite=false;
    $scope.clickAddLike=false;
    $scope.clickRemoveLike=false;
   
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

    $scope.addToFavoritesQuestion = function(){
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
      }
  
      $scope.removeFromFavoritesQuestion = function() {
        if($scope.showInitSession){
            var data = {
                idFavorite: $scope.favoriteId,
                idUser: $scope.idUserLoggerIn,
                idMaterial: null,
                idQuestion: $scope.idQuestion
            };
            $http.post('/deleteFavoriteQuestion', data);
          
            $scope.clickAddFavorite=false;
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
            if($scope.clickAddLike) {
                $scope.clickAddLike=false;
            } else {
                $scope.clickAddLike=true;
            }
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

            if($scope.clickRemoveLike) {
                $scope.clickRemoveLike=false;
            } else {
                $scope.clickRemoveLike=true;
            }
        }
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
