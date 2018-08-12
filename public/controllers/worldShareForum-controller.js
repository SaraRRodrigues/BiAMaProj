
app.controller("WorldShareForumController", ['$scope',"WorldSharesForumService", "MyBiamaService", "$http", "jQuery", function($scope,WorldSharesForumService,MyBiamaService, $http){

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
      
      for(var index=0; index<data.length; ++index) {
          $scope.worldShareItems.push(data[index].image);
          $scope.worldShareData.push(data[index]);
      }
    });

    $scope.goToForum = function() {
      window.setTimeout("location.href = 'http://localhost:8080'")
    }

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