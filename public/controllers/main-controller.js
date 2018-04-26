//var angular = require('angular');

var app = angular.module("myApp", []);

app.controller('MainController', function MainController($scope, $http) {

	$scope.cenas = [
		{
			'desc': "cenas1",

		},
		{
			'desc':"cenas2"
		}
	];

	$scope.s = function() {
		console.log('ja cheguei');
		$scope.xk = "lalalaal";
		
	}	
	
	$http.get('/users')	
		.then(function (response) {

			$scope.users = response.data;
	});
	
});
