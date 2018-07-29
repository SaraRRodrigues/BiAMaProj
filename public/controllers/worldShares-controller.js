app.controller("WorldShareController", ['$scope', "$http", "jQuery", function($scope, $http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='worldShares';	

    $scope.showWorldShares=true;
    $scope.addWorldShare=false;

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
