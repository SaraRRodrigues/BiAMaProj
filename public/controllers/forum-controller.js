
app.controller("ForumController", ['$scope', "$http", "jQuery", function($scope, $http){

	/* hide footer of index page because of click in buttons footer reload page */
	jQuery("#footerMain").hide();
	/* my current page */
	$scope.namePage='forum';
	$scope.nameclick='forum';
	
  	var window_width = $( window ).width();
	if(window_width <= 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
	}
	
	$scope.changeColorClick = function(name) {
		$scope.userDetails = false;
		$scope.search = false;
		$scope.nameclick=name;
	}
	$scope.goToHomePage = function() {
		window.setTimeout("location.href = 'http://localhost:8080'")
	}

	$scope.clickTopSearch = function() {
		if($scope.showSearch){
			$scope.showSearch = false;
		}else {
			$scope.showSearch = true;
		}
	}

	$scope.reloadQuestions = function() {
		window.setTimeout("location.href = 'http://localhost:8080/BiAMa/questionsForumMobile'")
	}

	$scope.reloadCuriosities = function() {
		window.setTimeout("location.href = 'http://localhost:8080/BiAMa/curiositiesForumMobile'")
	}

	$scope.reloadWorldShares = function() {
		window.setTimeout("location.href = 'http://localhost:8080/BiAMa/worldSharesForum'")
	}
}])
.config(function($routeProvider, $locationProvider) {

	$routeProvider.when('/BiAMa/curiositiesForum', {
		templateUrl: 'views/curiositiesForum',
		controller: 'CuriosityForumController'
	})
	$routeProvider.when('/BiAMa/questionsUsersForum', {
	  templateUrl: 'views/questionsUsersForum',
	  controller: 'QuestionsUsersForumController'
	});
	$routeProvider.when('/BiAMa/worldSharesForum', {
		templateUrl: 'views/worldSharesForum',
		controller: 'WorldShareForumController'
	  });
	
	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);
})