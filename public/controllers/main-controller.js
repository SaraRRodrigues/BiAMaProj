//var angular = require('angular');
var app = angular.module("myApp", ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	
	$routeProvider
	 .when('/BiAMa/ondeEstamos', {
	  templateUrl: '/views/ondeEstamosPage',
	  controller: 'OndeEstamosController',
	})
	$routeProvider.when('/BiAMa/biamaPage', {
		templateUrl: 'index',
		controller: 'MaincaController'
	  });
	$routeProvider.when('/BiAMa/biblioteca', {
	  templateUrl: 'bibliotecaPage',
	  controller: 'BibliotecaController'
	});
	$routeProvider.when('/BiAMa/aSuaBiAMa', {
		templateUrl: 'suaBiamaPage',
		controller: 'SuaBiamaController'
	  });
	$routeProvider.when('/BiAMa/forum', {
	templateUrl: 'forumPage',
	controller: 'ForumController'
	});
	
	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);
})

.controller('MainController',['$scope', "UserService", "$http", function($scope, UserService, $http) {
	
	$scope.UsersList = [
		{
			'desc': "cenas1",

		},
		{
			'desc':"cenas2"
		}
	];

	$scope.s = function() {
		
		window.setTimeout("location.href = 'http://localhost:8080/perfil.hbs'")
		
	}	

	$scope.getUsersAction = function(){
        UserService.getUsers(function(users){
			$scope.UsersList = users;
			
            console.log(users);
		});
    } 
}])

app.factory("UserService", function($http){
    return{
        getUsers: function(){
            
           return $http.get('/perfilPage')
                        .then(function(response) {
                
                    //console.log(response);
                    return response.data;
            });
            
            /*var x = function(data){

                console.log(data)
                return data;
            }*/
                /*.then(function(response) {
                
                    
                    
                    console.log(response);
                    return 'x';
                });*/

        }
    }
});

