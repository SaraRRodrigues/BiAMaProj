
app.controller("QrCodeController", ['$scope',"$http", "jQuery",function($scope, $http){

	/* hide footer of index page because of click in buttons footer reload page */
	jQuery("#footerMain").hide();
	/* my current page */
    $scope.namePage='qrCode';
    $scope.showSearch = false;
    $scope.userDetails = false;
    
    $scope.clickTopSearch = function() {
		if($scope.showSearch){
			$scope.showSearch = false;
		}else {
			$scope.showSearch = true;
		}
    }
    
    $scope.goToHomePage = function() {
        window.setTimeout("location.href = 'http://localhost:8080'")
	}
}])
