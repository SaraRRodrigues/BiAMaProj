
app.controller("MyBiamaController", ['$scope', "$http", "MyBiamaService", "jQuery", function($scope, $http, MyBiamaService){

	/* hide footer of index page because of click in buttons footer reload page */
	jQuery("#footerMain").hide();
	/* my current page */
	$scope.namePage='myBiama';

	$scope.showMyBiamaConf = false;

	var window_width = $( window ).width();
	if(window_width <= 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
	}

	$scope.nameclick='myBiama';
	$scope.changeColorClick = function(name) {
		$scope.userDetails = false;
		$scope.search = false;
		$scope.nameclick=name;
	}
	
	$scope.goToHomePage = function() {
		window.setTimeout("location.href = 'http://localhost:8080'")
	}

	$scope.loading=true;
	var getMyBiamaInfo = MyBiamaService.getMyBiamaInfo(function(infoMyBiama){});
	getMyBiamaInfo.then(function(result) {
			$scope.loading = false;
			var data=result.data.biamaDetails;
			$scope.descriptionMyBiama=data[0].description;
	});

	$scope.createMyBiama = function() {
		
		if($scope.showMyBiamaConf){
			$scope.showMyBiamaConf = false;
        }else {
			$scope.showMyBiamaConf = true;
        }
	}
}])
