//var angular = require('angular');
var app = angular.module("myApp", ['ngRoute'])
.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[{');
    $interpolateProvider.endSymbol('}]');
})

.config(function($routeProvider, $locationProvider) {
	
	$routeProvider
	 .when('/BiAMa/ondeEstamos', {
	  templateUrl: 'views/ondeEstamos',
	  controller: 'OndeEstamosController',
	})
	$routeProvider.when('/BiAMa/biamaPage', {
		templateUrl: 'views/biamaPage',
		controller: 'BiamaController'
	  });
	$routeProvider.when('/BiAMa/biblioteca', {
	  templateUrl: 'views/bibliotecaPage',
	  controller: 'BibliotecaController'
	});
	$routeProvider.when('/BiAMa/aSuaBiAMa', {
		templateUrl: 'views/suaBiamaPage',
		controller: 'SuaBiamaController'
	  });

	$routeProvider.when('/BiAMa/forum', {
	templateUrl: 'views/forumPage',
	controller: 'ForumController'
	});

	$routeProvider.when('/BiAMa/perfilPage', {
		templateUrl: 'views/perfilPage',
		controller: 'PerfilController'
	});

	$routeProvider.when('/BiAMa/searchResult', {
		templateUrl: 'views/resultSearch',
		controller: 'SearchController'
	});

	$routeProvider.when('/BiAMa/favorites', {
		templateUrl: 'views/favorites',
		controller: 'FavoritesController'
	});

	$routeProvider.when('/BiAMa/myQuestions', {
		templateUrl: 'views/myQuestions',
		controller: 'MyQuestionsController'
	});
		
	$routeProvider.when('/BiAMa/worldShare', {
		templateUrl: 'views/worldShare',
		controller: 'WorldShareController'
	});
	$routeProvider.when('/BiAMa/notifications', {
		templateUrl: 'views/notifications',
		controller: 'NotificationsController'
	});
	$routeProvider.when('/BiAMa/compare', {
		templateUrl: 'views/compare',
		controller: 'CompareController'
	});
	/*$routeProvider.when('/BiAMa/login', {
		templateUrl: 'views/login',
		controller: 'LoginController'
	});*/
	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);
})

.controller('MainController',['$scope', "UserService", "$http",
function($scope, UserService, $http) {
	
	$scope.showSearch = false;
	$scope.userDetails = false;
	$scope.search = true;
	$scope.showLanguages = false;
	$scope.languageSelected = 'Português'
	$scope.initSession = false;
	$scope.confirmSession = false;
	$scope.showInitSession = false;
	$scope.usernameModel = '';
	$scope.passwordModel = '';
	$scope.logoutLabel = false;
	$scope.terminateLogin = false;

	$scope.clickTopSearch = function() {
		if($scope.showSearch){
			$scope.showSearch = false;
		}else {
			$scope.showSearch = true;
		}
	}

	$scope.clickUserDetails = function() {
		if($scope.userDetails){
			$scope.userDetails = false;
		}else {
			$scope.userDetails = true;
			$scope.showSearch = false;
		}
	}

	$scope.disableSearch = function() {
		$scope.userDetails = false;
		$scope.search = false;
	}
	$scope.getLanguages = function() {
		if($scope.showLanguages){
			$scope.showLanguages = false;
		}else {
			$scope.showLanguages = true;
		}
	}

	$scope.initSession = function () {
		$scope.initSession = true;
	}

	$scope.showInitSessionDiv = function () {
		if($scope.showInitSession){
			$scope.showInitSession = false;
		}else {
			$scope.showInitSession = true;
		}
	}
	var config = {
		apiKey: "AIzaSyBsHmuOee9ByAiOeFq3_z8fdGD86aNINEc",
		authDomain: "fir-biama.firebaseapp.com",
		databaseURL: "https://fir-biama.firebaseio.com",
		projectId: "fir-biama",
		storageBucket: "fir-biama.appspot.com",
		messagingSenderId: "861577986516"
	};

	firebase.initializeApp(config);

	$scope.loginWithGoogle = function() {
		
		const provider = new firebase.auth.GoogleAuthProvider();

    	firebase.auth().signInWithPopup(provider)
            .then(result => {

				const user = result.user;
				console.log(user);
				//window.setTimeout("location.href = 'http://localhost:8080'")
            })
			.catch(console.log)
		
		$scope.confirmSession = true;
		$scope.validateUserLogin();
	}

	$scope.validateUserLogin = function() {

	}

	$scope.loginWithFacebook = function() {
		
		const provider = new firebase.auth.FacebookAuthProvider();

    	firebase.auth().signInWithPopup(provider)
            .then(result => {
				
				const user = result.user;
				$scope.confirmSession = true;
				//window.setTimeout("location.href = 'http://localhost:8080'")
            })
			.catch(console.log)
	}

	$scope.logout = function(){
		$scope.confirmSession = false;
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
		
		}, function(error) {
			// An error happened.
			console.log(error);

		});
	}

	$scope.confirmSessionAction = function (username, password) {

	}

	$scope.selectLanguage = function(language){
		$scope.languageSelected = language;
	}

	$scope.languages = ['Português', 'Inglês']
	$scope.biamaPage = true;
	$scope.UsersList = [
		{
			'desc': "cenas1",

		},
		{
			'desc':"cenas2"
		}
	];

	/*$scope.s = function() {
		
		window.setTimeout("location.href = 'http://localhost:8080/perfil.hbs'")
	}	*/

	$scope.searchMaterials = function(){
		
	}

	UserService.getUsers(function(users){
		$scope.UsersList = users;
		
		console.log(users);
	});

}])

app.factory("UserService", function($http){
    return{
        getUsers: function(){
            
           return $http.get('/views/index')
                        .then(function(response) {
					//debugger
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
