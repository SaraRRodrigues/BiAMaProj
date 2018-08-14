//var angular = require('angular');
var app = angular.module("myApp", ['ngRoute'])
app.constant('jQuery', window.jQuery)
.run(['$route', angular.noop])
.config(function($interpolateProvider,$httpProvider) {
	$httpProvider.useApplyAsync(true);
    $interpolateProvider.startSymbol('[{');
	$interpolateProvider.endSymbol('}]');
})
.config(function($routeProvider, $locationProvider, $httpProvider) {
	
	$routeProvider
	 .when('/BiAMa/whereWeAre', {
	  templateUrl: 'views/whereWeAre',
	  controller: 'WhereWeAreController'
	})
	$routeProvider.when('/BiAMa/biamaPage', {
		templateUrl: 'views/biamaPage',
		controller: 'BiamaController'
	})
	$routeProvider.when('/BiAMa/library', {
	  templateUrl: 'views/library',
	  controller: 'LibraryController'
	});
	$routeProvider.when('/BiAMa/myBiama', {
		templateUrl: 'views/myBiama',
		controller: 'MyBiamaController'
	  });

	$routeProvider.when('/BiAMa/forumPage', {
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
	})
	
	/* mobile view */
	$routeProvider.when('/BiAMa/libraryMobile', {
		templateUrl: 'views/libraryMobile',
		controller: 'LibraryController'
	})

	$routeProvider.when('/BiAMa/whereWeAreMobile', {
		templateUrl: 'views/whereWeAreMobile',
		controller: 'WhereWeAreController'
	})
	
	$routeProvider.when('/BiAMa/biamaPageMobile', {
		templateUrl: 'views/biamaPageMobile',
		controller: 'BiamaController'
	})
	
	$routeProvider.when('/BiAMa/forumPageMobile', {
		templateUrl: 'views/forumPageMobile',
		controller: 'ForumController'
	})
	/*$routeProvider.when('/BiAMa/login', {
		templateUrl: 'views/login',
		controller: 'LoginController'
	});*/
	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);
})
 
.controller('MainController',['$scope', "UserService","MyBiamaService", "CompareMaterialService", "NotificationService", "$http", "jQuery", function($scope, UserService, MyBiamaService, CompareMaterialService,NotificationService, $http) {
	
	var window_width = $( window ).width();
	if(window_width < 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
	}
	$scope.namePage='index';
	$scope.nameclick='index';

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
	$scope.materials=[];
	$scope.showDetailsOfMaterial=false;
	$scope.loading=true;
	$scope.languages = ['Português', 'Inglês']
	$scope.biamaPage = true;
	$scope.compareMaterials = [];
	$scope.getLibraryUser = UserService.getLibraryUserDetails(function(infoMyBiama){});
	$scope.getAllUsers = UserService.getUsers(function(users){});
	$scope.getMaterials = CompareMaterialService.getMaterialComparation(function(infoMaterial){});

	jQuery( function() {
		var availableTags = $scope.compareMaterials;
	jQuery( "#tags" ).autocomplete({
		source: availableTags
	});
	} );

	$scope.getLibraryUser.then(function(result) {
		$scope.loading = false;
		var data=result.data.userLibrary;
		$scope.userLibrary=data;
	});

	$scope.getAllUsers.then(function(usersDB) {
		$scope.loading=false;
		$scope.users = usersDB.data.users;
	});

	$scope.getMaterials.then(function(result) {
		$scope.loading = false;
		var data=result.data.comparationDetails;
		$scope.materialComparation=data;

		for(var index=0; index<$scope.materialComparation.length; ++index) {
			$scope.compareMaterials.push($scope.materialComparation[index].type + '-' +  $scope.materialComparation[index].category)
		}

	}); 
  
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

	$scope.clickUserDetails = function() {
		if($scope.userDetails){
			$scope.userDetails = false;
		}else {
			$scope.userDetails = true;
			$scope.showSearch = false;
		}
	}

	$scope.disableSearch = function(buttonClick) {
		if(buttonClick === 'favorites') {
			location.href = 'http://localhost:8080/BiAMa/favoritesMobile?userName=' + $scope.idUserLoggerIn;
		}

		if(buttonClick == 'questions') {
			location.href = 'http://localhost:8080/BiAMa/myQuestionsMobile?userName=' + $scope.idUserLoggerIn;
		}

		if(buttonClick == 'world_share') {
			location.href = 'http://localhost:8080/BiAMa/worldSharesForumMobile?userName=' + $scope.idUserLoggerIn;
		}

		if(buttonClick === 'notification') {
			$scope.userDetails = true;
			$scope.notificationNumber=true;
		} else {
			$scope.userDetails = false;
			$scope.notificationNumber = false;
		}
		$scope.search = false;
	}

	$scope.changeColorClick = function(name) {
		$scope.userDetails = false;
		$scope.search = false;
		$scope.nameclick=name;
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

	$scope.initDataFirebase = function() {
		var config = {
			apiKey: "AIzaSyBsHmuOee9ByAiOeFq3_z8fdGD86aNINEc",
			authDomain: "fir-biama.firebaseapp.com",
			databaseURL: "https://fir-biama.firebaseio.com",
			projectId: "fir-biama",
			storageBucket: "fir-biama.appspot.com",
			messagingSenderId: "861577986516"
		};
	
		firebase.initializeApp(config);
	}

	$scope.initDataFirebase();
	$scope.loginWithGoogle = function() {
		
		const provider = new firebase.auth.GoogleAuthProvider();

    	firebase.auth().signInWithPopup(provider)
            .then(result => {

				const user = result.user;
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

		$scope.users = 'loadUser';
		var getAllUsers = UserService.getUsers(function(users){});
		
		getAllUsers.then(function(usersDB) {
			$scope.users = usersDB.data.users;
			for(var index=0; index<$scope.users.length; ++index){
				$scope.userName = $scope.users[index].username;
				$scope.userPassword = $scope.users[index].password;
				if($scope.userName !== null && $scope.userName === username){
					if($scope.userPassword !== null && $scope.userPassword === password){
						$scope.userLoggedIn=$scope.users[index].username;
						$scope.idUserLoggerIn=$scope.users[index].id;
						$scope.confirmSession = true;
						break;
					}
				}
			}
		});
	}
	
	$scope.selectLanguage = function(language){
		$scope.languageSelected = language;
	}

	$scope.regist = function() {
		$scope.userDetails = false;
		$scope.registUser=true;
		$scope.search=false;
	}

	$scope.validDateOfBirth = function(dateOfBirth) {
		var resultBirth = dateOfBirth.split("/");

		var currentDate = new Date();
		currentDate=currentDate.toLocaleDateString();
		var resultCurrentDate = currentDate.split("/");

		var calculateYear = parseInt(resultCurrentDate[2]) - parseInt(resultBirth[2]);
		if(calculateYear < 18) {
			return false;
		}
		return true;
	},

	$scope.validDataNotEquals = function(username, password) {
		for(var index=0; index<$scope.users.length; ++index) {
			if(username === $scope.users[index].username) {
				return false;
			}
		}
		return true;
	},

	$scope.insertUser = function(name, username, email, birthdate, password) {
		if(name === undefined && username === undefined && email === undefined && birthdate === undefined && password === undefined) {
			$scope.emptyData=true;
		} else {
			var idUser = $scope.users[$scope.users.length-1].id;
			$scope.insertedIdUser=idUser;
			var data = {
				'idUser': parseInt(idUser)+1,
				'name': name,
				'email': email,
				'birthdate': birthdate.toLocaleDateString(), 
				'username': username,
				'password': password,
				'image': $scope.image
			}
			if($scope.image == undefined) {
				data.image='noImage';
			}

			var validData = $scope.validDataNotEquals(data.username, data.password);
			
			if(validData) {
				var validBirthdate = $scope.validDateOfBirth(data.birthdate);
				if(validBirthdate){
					$http.post('/insertUserDetails', data);
					
					var dataLibraryUser = {
						'idUser': parseInt($scope.insertedIdUser)+1,
						'idLibrary': ($scope.userLibrary[$scope.userLibrary.length-1].library_id)+1
					}

					$http.post('/insertLibraryUser', dataLibraryUser);
				} else {
					$scope.underAge=true;
				}
			} else {
				$scope.usernameRepeated=true;
			}
		}
	}

	$scope.openImageUpload = function() {
        $scope.openImageUploadLabel=true;
	}
	
	$scope.saveUploadFile = function () {
        var splitDeviceRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;
        var res = splitDeviceRe.exec(($("#uploadPicture").val()));
        $scope.image=res[2];
        
        $scope.openImageUploadLabel=false;
	}
	
	jQuery( function() {
        $scope.itemSearch = [
			'Materiais',
			'Categoria de materiais',
			'Projeto de materiais'
		];
    jQuery( "#tags_search" ).autocomplete({
        source: $scope.itemSearch
    });
	} );
	
	$scope.selectedMaterialSearch = function() {
		$scope.openMaterialDetail=false;

		var valueSearchMaterial=jQuery( "#tags_search" ).val();
		$scope.searchValue=valueSearchMaterial;

		$scope.materials=[];
		
		if(valueSearchMaterial === 'Materiais') {
			$scope.materials=$scope.materialComparation;
			$scope.showCategoryMaterial=false;
			$scope.showProjectMaterial=false;
		} 
		if(valueSearchMaterial === 'Categoria de materiais') {
			var firstCategory = $scope.materialComparation[0].category;
			for(var index=1; index<$scope.materialComparation.length; ++index) {
				if(firstCategory !== $scope.materialComparation[index].category){
					$scope.materials.push($scope.materialComparation[index].name);
				} else {
					break;
				}
			}
			$scope.showCategoryMaterial=true;
			$scope.showProjectMaterial=false;
		} 
		if(valueSearchMaterial === 'Projeto de materiais') {
			for(var index=0; index<$scope.materialComparation.length; ++index) {
				if($scope.materialComparation[index].code > parseInt('46')){
					$scope.materials.push($scope.materialComparation[index].name);
				} 
			}	
			$scope.showProjectMaterial=true;
			$scope.showCategoryMaterial=false;
		}
		$scope.showDetailsOfMaterial=false;
        $scope.showMaterials=true;
	}
	
	$scope.openMaterial = function(material) {
		$scope.showDetailsOfMaterial=true;
		$scope.showMaterials=false;
		$scope.openedMaterial=material;
	}

	$scope.closeMaterial = function() {
		if($scope.searchValue === 'Materiais'){
			$scope.showCategoryMaterial=false;
			$scope.showProjectMaterial=false;
			$scope.showMaterials=true;
		}

		if($scope.searchValue === 'Projeto de materiais') {
			$scope.showProjectMaterial=true;
			$scope.showCategoryMaterial=false;
			$scope.showMaterials=true;
		} 
		
		if($scope.searchValue ==='Categoria de materiais'){
			$scope.showCategoryMaterial=true;
			$scope.showProjectMaterial=false;
			$scope.showMaterials=true;
		}
		$scope.showDetailsOfMaterial=false;
	}

	$scope.getNotifications = NotificationService.getMyNotifications(function(infoNotification){});

    $scope.getNotifications.then(function(result) {
        $scope.loading = false;
        var data=result.data.notificationDetails;
        $scope.notifications=data;
		$scope.numberOfNotifications=$scope.notifications.length;
		$scope.loading = true;
    });
}])

app.factory("NotificationService", function($q, $http, $timeout){
    var getMyNotifications = function() {
        var deferred = $q.defer();

        $timeout(function() {
        deferred.resolve($http.get('/myNotifications'));
        }, 2000);

        return deferred.promise;
    };


    return {
        getMyNotifications: getMyNotifications
    };
});

app.factory("UserService", function($q, $http, $timeout){
    
	var getUsers = function() {
		var deferred = $q.defer();
	
 		$timeout(function() {
		  deferred.resolve($http.get('/users',  {cache:true}));
		}, 2000); 
	
		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			deferred.resolve(resp);
		}

		xhr.open('GET','/users', true);
		xhr.send();*/

		return deferred.promise;
	};

	var getMyQuestionsLogged = function() {
		var deferred = $q.defer();

		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			deferred.resolve(resp);
		}

		xhr.open('GET','/myQuest', true);
		xhr.send();*/

		$timeout(function() {
			deferred.resolve($http.get('/myQuest'));
		}, 2000);

		return deferred.promise;
	};

	var insertLibraryUserDetails = function() {
		var deferred = $q.defer();

		
		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			var response = resp.response;
			deferred.resolve(response);
		}

		xhr.open('GET','/insertLibraryUser', true);
		xhr.send();*/

		$timeout(function() {
			deferred.resolve($http.post('/insertLibraryUser'));
		}, 2000);

		return deferred.promise;
	}

	var getLibraryUserDetails = function() {
		
		var deferred = $q.defer();

		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			var response = resp.response;
			deferred.resolve(response);
		}

		xhr.open('GET','/getLibraryUser', true);
		xhr.send();*/

		$timeout(function() {
			deferred.resolve($http.get('/getLibraryUser'));
		}, 2000);

		return deferred.promise;
	}

	return {
		getUsers: getUsers,
		getMyQuestionsLogged: getMyQuestionsLogged,
		insertLibraryUserDetails: insertLibraryUserDetails,
		getLibraryUserDetails: getLibraryUserDetails
	};
});

app.factory("MyBiamaService", function($q, $http, $timeout){
    
	var getMyBiamaInfo = function() {
		var deferred = $q.defer();
	
		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			var response = resp.response;
			deferred.resolve(response);
		}

		xhr.open('GET','/myBiamaInfo', true);
		xhr.send();*/

		$timeout(function() {
		  deferred.resolve($http.get('/myBiamaInfo'));
		}, 3000);
	
		return deferred.promise;
	  };
	
	  return {
		getMyBiamaInfo: getMyBiamaInfo
	  };
});

app.factory("CompareMaterialService", function($q, $http, $timeout){
    var getMaterialComparation = function() {
        var deferred = $q.defer();

		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			if (this.readyState == 4 && this.status == 200) {
				var response = resp.response;
				debugger
				deferred.resolve(response);
			}
			
		}

		xhr.open('GET','/compareMaterials', true);
		xhr.send();*/

        $timeout(function() {
        deferred.resolve($http.get('/compareMaterials'));
        }, 4000);

        return deferred.promise;
    };


    return {
        getMaterialComparation: getMaterialComparation
    };
});
