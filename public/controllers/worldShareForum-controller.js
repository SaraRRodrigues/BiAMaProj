
app.controller("WorldShareForumController", ['$scope', "$http", "MyBiamaService", "WorldSharesForumService", function($scope, $http, MyBiamaService, WorldSharesForumService){

    $scope.loading=true;
    $scope.showWorldShares=true;
    $scope.showWorldSharesDetails=false;

    var getMyBiamaInfo = MyBiamaService.getMyBiamaInfo(function(infoMyBiama){});
    getMyBiamaInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.biamaDetails;
        $scope.descriptionMyBiama=data[0].description;
    });

    var getWorldSharesForum = WorldSharesForumService.getWorldSharesForum(function(infoWorldSharesForum){});
    getWorldSharesForum.then(function(result) {
      $scope.loading = false;
      var data=result.data.worldShareForumDetails;

      $scope.worldShareItems=[];
      $scope.worldShareData=[];
      $scope.shareNumber=[];
      console.log(data)
      for(var index=0; index<data.length; ++index) {
          $scope.worldShareItems.push(data[index].image);
          $scope.worldShareData.push(data[index]);
      }
    });

    $scope.openDetailsWorldShare = function(image) {
      for(var index=0; index<$scope.worldShareData.length; ++index) {
				if($scope.worldShareData[index].image === image){
            $scope.worldSharesInfo={
              'image':$scope.worldShareData[index].image,
              'description': $scope.worldShareData[index].descriptionShare,
              "share": index+1
            }
            $scope.showWorldSharesDetails=true;
            $scope.showWorldShares=false;
            break;
				}
			}
    }

    $scope.openBigImage = function(image) {
      $scope.showBigImage=true;
      $scope.showWorldSharesDetails=false;
      $scope.bigImage=image;
    }

    $scope.closeWorldShareImage = function() {
      $scope.showBigImage=false;
      $scope.showWorldSharesDetails=true;
    }
}])

app.factory("MyBiamaService", function($q, $http, $timeout){

var getMyBiamaInfo = function() {
    var deferred = $q.defer();

    $timeout(function() {
      deferred.resolve($http.get('/myBiamaInfo'));
    }, 2000);

    return deferred.promise;
  };

  return {
    getMyBiamaInfo: getMyBiamaInfo
  };
});

app.factory("WorldSharesForumService", function($q, $http, $timeout){

  var getWorldSharesForum = function() {
      var deferred = $q.defer();
  
      $timeout(function() {
        deferred.resolve($http.get('/worldSharesForum'));
      }, 2000);
  
      return deferred.promise;
    };
  
    return {
      getWorldSharesForum: getWorldSharesForum
    };
  });