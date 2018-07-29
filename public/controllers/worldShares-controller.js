app.controller("WorldShareController", ['$scope',"WorldSharesService", "$http", "jQuery", function($scope,WorldSharesService, $http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='worldShares';	

    $scope.loading = true;
    $scope.showWorldShares=true;
    $scope.addWorldShare=false;
    $scope.getWorldSharesForum = WorldSharesService.getWorldSharesForum(function(infoWorldSharesForum){});
    
    $scope.getWorldSharesForum.then(function(result) {
      $scope.loading = false;
      var data=result.data.worldShareForumDetails;

      $scope.worldShareItems=[];
      $scope.worldShareData=[];
      $scope.shareNumber=[];
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

    $scope.openAddWorldShare = function() {
        $scope.addWorldShare=true;
    }
}])

app.factory("WorldSharesService", function($q, $http, $timeout){

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
