
app.controller("CuriosityForumController", ['$scope', "$http", "CuriositiesService", function($scope, $http, CuriositiesService){

    $scope.loading=true;
    $scope.descriptionCuriosity=[];
    $scope.showCuriosity=true;
    $scope.showBigImage=false;

    var window_width = $( window ).width();
    if(window_width <= 1024) {
      $scope.isMobileView=true;
    } else {
      $scope.isMobileView=false;
    }

    var getCuriosities = CuriositiesService.getCuriosities(function(infoCuriosities){});
    getCuriosities.then(function(result) {
            $scope.loading = false;
            var data=result.data.curiosityDetails;
            for(var index=0; index<data.length; ++index){
              $scope.descriptionCuriosity.push(data[index]);
            }
    });

    $scope.openDetailsCuriosity = function(image) {
      for(var index=0; index<$scope.descriptionCuriosity.length; ++index) {
				if($scope.descriptionCuriosity[index].image === image){
            $scope.curiosityInfo={
              'image':$scope.descriptionCuriosity[index].image,
              'description': $scope.descriptionCuriosity[index].descriptionCuriosity,
              "curiosity": index+1
            }
            $scope.showCuriosityDetails=true;
            $scope.showCuriosity=false;
            break;
				}
			}
    }

    $scope.openBigImage = function(image) {
      $scope.showBigImage=true;
      $scope.showCuriosityDetails=false;
      $scope.bigImage=image;
    }

    $scope.closeCuriosityImage = function() {
      $scope.showBigImage=false;
      $scope.showCuriosityDetails=true;
    }
}])

app.factory("CuriositiesService", function($q, $http, $timeout){

var getCuriosities = function() {
    var deferred = $q.defer();

    $timeout(function() {
      deferred.resolve($http.get('/curiosities'));
    }, 2000);

    return deferred.promise;
  };

  return {
    getCuriosities: getCuriosities
  };
});