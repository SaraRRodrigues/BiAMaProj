
app.controller("ForumController", ['$scope', "$http", function($scope, $http){

  
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
		templateUrl: 'views/worldShareForum',
		controller: 'WorldShareForumController'
	  });
	
	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);
})