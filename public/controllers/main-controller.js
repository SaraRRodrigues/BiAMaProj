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
	
	$routeProvider.when('/BiAMa/whereWeAre', {
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

	$routeProvider.when('/BiAMa/registUser', {
		templateUrl: 'views/registUser',
		controller: 'RegistUserController'
	});
	
	/* mobile view */
	$routeProvider.when('/BiAMa/libraryMobile', {
		templateUrl: 'views/libraryMobile',
		controller: 'LibraryController'
	})

	$routeProvider.when('/BiAMa/whereWeAreMobile', {
		templateUrl: 'views/whereWeAreMobile',
		controller: 'WhereWeAreController'
	})
	
	$routeProvider.when('/BiAMa/qrCodeMobile', {
		templateUrl: 'views/qrCodeMobile',
		controller: 'QrCodeController'
	})
	
	$routeProvider.when('/BiAMa/biamaPageMobile', {
		templateUrl: 'views/biamaPageMobile',
		controller: 'BiamaController'
	})
	
	$routeProvider.when('/BiAMa/forumPageMobile', {
		templateUrl: 'views/forumPageMobile',
		controller: 'ForumController'
	})
	
	$routeProvider.when('/BiAMa/registUserMobile', {
		templateUrl: 'views/registUserMobile',
		controller: 'RegistUserController'
	});

	$routeProvider.when('/BiAMa/favoritesMobile', {
		templateUrl: 'views/favoritesMobile',
		controller: 'FavoritesController'
	});

	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);
})
 
.controller('MainController',['$scope', "UserService", "CompareMaterialService", "NotificationService", "$http", "jQuery", function($scope, UserService, CompareMaterialService,NotificationService, $http) {
	
	/* define view of app */
	$scope.viewType = function() {
		var window_width = $( window ).width();
		if(window_width < 1024) {
			$scope.isMobileView=true;
		} else {
			$scope.isMobileView=false;
		}
	}
	
	/* init my variables data */
	$scope.initData = function() {
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
		$scope.resultSearch = [];
		$scope.showInitSearch=true;
		$scope.userGoogle=null;
		$scope.showResultsOfMiniSearch=false;
	}
	 
	/* verify if user is logged in */
    $scope.validateUserLoggedIn = function() { 
        var splitLocation = location.href.split('=');
        $scope.idUserLoggerIn =splitLocation[1];
        if($scope.idUserLoggerIn === 'anonymous') {
			$scope.doLogin=true;
            $scope.loading = true;
            $scope.confirmSession=false;
		} else {
			if($scope.idUserLoggerIn !== undefined)  {
				$scope.doLogin=false;
				$scope.confirmSession=true;
			} else {
				$scope.doLogin=true;
				$scope.loading = true;
				$scope.confirmSession=false;
			}
		}
        
	}
	
	/* -------------- INIT DESKTOP & MOBILE -------------- */
	/* get information of user, library and materials to display */
	$scope.getAllRequests = function() { 
		$scope.getLibraryUser = UserService.getLibraryUserDetails(function(infoMyBiama){});
		$scope.getAllUsers = UserService.getUsers(function(users){});
		$scope.getMaterials = CompareMaterialService.getMaterialComparation(function(infoMaterial){});
		
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
			$scope.materialsToSearch = data;
	
			for(var index=0; index<$scope.materialComparation.length; ++index) {
				$scope.compareMaterials.push($scope.materialComparation[index].type + '-' +  $scope.materialComparation[index].category)
			}
		});
	}
	
	/* redirect to homepage with arrow */
	$scope.goToHomePage = function() {
        if($scope.idUserLoggerIn !== undefined) {
			location.href = 'http://localhost:8080?userName=' + $scope.idUserLoggerIn;
		} else {
			location.href = 'http://localhost:8080?username=' + 'anonymous';
		}
	}

	/* change color of button */
	$scope.changeColorClick = function(name) {
		$scope.userDetails = false;
		$scope.search = false;
		$scope.nameclick=name;
	}

	/* configuration of firebase */
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

	/* login with google with firebase */
	$scope.loginWithGoogle = function() {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(result => {
			
			//window.setTimeout("location.href = 'http://localhost:8080'")
		})
		.catch(console.log)
    	/*firebase.onuth().signInWithPopup(provider)
            .then(result => {

				const user = result.user;
				//window.setTimeout("location.href = 'http://localhost:8080'")
            })
			.catch(console.log)
		*/

		$scope.confirmSession = true;
		//$scope.validateUserLogin();
	}

	/* login with facebook with firebase */
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

	/* validate date of birth format */
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

	/* validate if data not exists already */
	$scope.validDataNotEquals = function(username, password) {
		for(var index=0; index<$scope.users.length; ++index) {
			if(username === $scope.users[index].username) {
				return false;
			}
		}
		return true;
	},

	/* created user: insert user on database */
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

	/* open image of user */
	$scope.openImageUpload = function() {
        $scope.openImageUploadLabel=true;
	}
	
	/* save upload file */
	$scope.saveUploadFile = function () {
        var splitDeviceRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;
        var res = splitDeviceRe.exec(($("#uploadPicture").val()));
        $scope.image=res[2];
        
        $scope.openImageUploadLabel=false;
	}
	
	/* selected type of materials */
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
	/* -------------- END DESKTOP & MOBILE -------------- */

	/* -------------- INIT MOBILE -------------- */
	/* open material of small search result */
	$scope.openMaterial = function(material) {
		$scope.showDetailsOfMaterial=true;
		$scope.showMaterials=false;
		$scope.openedMaterial=material;
		$scope.miniSearchResults=false;
	}

	/* close material that are opened */
	$scope.closeMaterial = function() {
		if($scope.searchValue === 'Materiais'){
			$scope.showCategoryMaterial=false;
			$scope.showProjectMaterial=false;
		} else if($scope.searchValue === 'Projeto de materiais') {
			$scope.showProjectMaterial=true;
			$scope.showCategoryMaterial=false;
		} else if($scope.searchValue ==='Categoria de materiais'){
			$scope.showCategoryMaterial=true;
			$scope.showProjectMaterial=false;
		} 
		$scope.showDetailsOfMaterial=false;
		$scope.showInitSearch=true;
		$scope.showResultsOfMiniSearch=false;
	}

	/* open and close the small search icon */
	$scope.clickTopSearch = function() {
		$scope.miniSearchResults = false;
		$scope.showInitSearch=true;
		$scope.showResultsOfMiniSearch=false;

		if($scope.isMobileView) {
			if($scope.showSearch){
				$scope.enableUserIcon=false;
				$scope.showSearch = false;
			}else {
				$scope.enableUserIcon=true;
				$scope.showSearch = true;
			}
		} else {
			if($scope.showSearch){
				$scope.showSearch = false;
			}else {
				$scope.showSearch = true;
			}
		}
	}

	/* close the results of small search */
	$scope.closeMiniSearch = function() {
		$scope.miniSearchResults = false;
		$scope.search=true;
		$scope.openMaterialDetail=false; 
		$scope.showInitSearch=true;
		$scope.showSearch=false;
		$scope.enableUserIcon=false;
		$scope.showResultsOfMiniSearch=false;
	}

	/* action of click button "Ok" present on small search line */
	$scope.initMiniSearch = function() {
		$scope.resultSearch=[];
		var inputMini = jQuery("#miniSearch").val();
		if(inputMini !== '') {
			for(var index=0; index < $scope.materialsToSearch.length; ++index) {
				var resultMaterial = {
					'name': $scope.materialsToSearch[index].name,
					'category': $scope.materialsToSearch[index].category
				}
				if(($scope.materialsToSearch[index].type).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(($scope.materialsToSearch[index].color).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(($scope.materialsToSearch[index].category).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(($scope.materialsToSearch[index].description).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				}
			}
	
			if($scope.resultSearch.length == 0) {
				$scope.noResultsOnSearch=true;
			} else {
				$scope.showInitSearch=false;
				$scope.showSearch=false;
				$scope.miniSearchResults = true;
				$scope.noResultsOnSearch=false;
				$scope.showResultsOfMiniSearch=true;
			}
		}
	}

	/* open and close the section of user details and search icon */
	$scope.clickUserDetails = function() {
		if($scope.userDetails){
			$scope.userDetails = false;
			$scope.showInitSession=false;
		}else {
			$scope.userDetails = true;
			$scope.showSearch = false;
			$scope.showInitSession=false;
		}
	}

	/* section of init session in user details section */
	$scope.showInitSessionDiv = function () {
		if($scope.showInitSession){
			$scope.showInitSession = false;
		}else {
			$scope.showInitSession = true;
		}
	}
	
	/* confirmed user logged in */
	$scope.confirmSessionAction = function (username, password) {
		$scope.users = 'loadUser';
		var getAllUsers = UserService.getUsers(function(users){});
		
		getAllUsers.then(function(usersDB) {
			$scope.users = usersDB.data.users;
			for(var index=0; index<$scope.users.length; ++index){
				$scope.userName = $scope.users[index].username;
				$scope.userPassword = $scope.users[index].password;
				$scope.userImage = $scope.users[index].image;
				$scope.userEmail = $scope.users[index].email;
				$scope.nameUser=$scope.users[index].name;
				$scope.userBirthdate = $scope.users[index].birthdate;

				var splitDateBirth = $scope.userBirthdate.split('/');
				$scope.dayBirth = splitDateBirth[0];
				$scope.monthBirth = splitDateBirth[1];
				$scope.yearBirth = splitDateBirth[2];

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

	/* routes of click on links page */
	$scope.disableSearch = function(buttonClick) {

		if($scope.isMobileView) {
			if(buttonClick === 'favorites') {
				location.href = 'http://localhost:8080/BiAMa/favoritesMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'questions') {
				location.href = 'http://localhost:8080/BiAMa/myQuestionsMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'world_share') {
				location.href = 'http://localhost:8080/BiAMa/worldShareMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'notification') {
				location.href = 'http://localhost:8080/BiAMa/notificationsMobile?userName=' + $scope.idUserLoggerIn;
	
			}
	
			if(buttonClick == 'perfil') {
				location.href = 'http://localhost:8080/BiAMa/perfilPageMobile?userId=' + $scope.idUserLoggerIn + '&userName=' 
				+ $scope.userName + '&userPassword=' + $scope.userPassword + '&userImage=' + $scope.userImage + '&userBirthdate=' + $scope.dayBirth + '-' + $scope.monthBirth + '-' + $scope.yearBirth 
				+ '&nameUser=' + $scope.nameUser + '&userEmail=' + $scope.userEmail;
			}
	
			if(buttonClick == 'compare') {
				location.href = 'http://localhost:8080/BiAMa/compareMobile?userName=' + $scope.idUserLoggerIn;
	
			}
			if(buttonClick == 'regist') {
				$scope.regist();
				location.href = 'http://localhost:8080/BiAMa/registUserMobile';
			}
		}
		
		if(buttonClick === 'notification') {
			var getNotifications = NotificationService.getMyNotifications($scope.idUserLoggerIn, function(infoNotification){});
				getNotifications.then(function(result) {
				$scope.loading = false;
				var data=result.data.notificationDetails;
				$scope.notifications=data;
				$scope.numberOfNotifications=$scope.notifications.length;
			});
			$scope.userDetails = true;
			$scope.notificationNumber=true;
		} else {
			$scope.userDetails = false;
			$scope.notificationNumber = false;
		}

		$scope.registUser=false;
		$scope.search = false;
	}

	/* logout of user details section */
	$scope.logout = function(){
		$scope.confirmSession = false;
		/*firebase.auth().signOut().then(function() {
			// Sign-out successful.
			debugger
			//const user = result.user;
			
		
		}, function(error) {
			// An error happened.
			console.log(error);

		});*/
		firebase.auth().signOut().then(() => {
	
		})
	}

	/* regist new user on user details section */
	$scope.regist = function() {
		$scope.userDetails = false;
		$scope.registUser=true;
		$scope.search=false;
		$scope.showInitSession=false;
	}
	/* -------------- END MOBILE -------------- */

	$scope.tagsOfSearch = function() {
		jQuery( function() {
			var availableTags = $scope.compareMaterials;
			jQuery( "#tags" ).autocomplete({
				source: availableTags
			});
		});
	
		jQuery( function() {
			$scope.itemSearch = [
				'Materiais',
				'Categoria de materiais',
				'Projeto de materiais'
			];
			jQuery( "#tags_search" ).autocomplete({
				source: $scope.itemSearch
			});
		});
	}
	
	/* init MainController  */
	$scope.viewType();
	$scope.initData();
	$scope.validateUserLoggedIn();
	$scope.getAllRequests();
	$scope.initDataFirebase();
	$scope.tagsOfSearch();
}])

app.factory("NotificationService", function($q, $http, $timeout){
    var getMyNotifications = function(data) {
        var deferred = $q.defer();

        $timeout(function() {
        deferred.resolve($http.get('/myNotifications', 
        {params: {
            'data': data
        }}));
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
	
		return deferred.promise;
	};

	var getLibraryUserDetails = function() {
		
		var deferred = $q.defer();

		$timeout(function() {
			deferred.resolve($http.get('/getLibraryUser'));
		}, 2000);

		return deferred.promise;
	}

	return {
		getUsers: getUsers,
		getLibraryUserDetails: getLibraryUserDetails
	};
});

app.factory("CompareMaterialService", function($q, $http, $timeout){
    var getMaterialComparation = function() {
        var deferred = $q.defer();

        $timeout(function() {
        deferred.resolve($http.get('/compareMaterials'));
        }, 4000);

        return deferred.promise;
	};
	
    return {
        getMaterialComparation: getMaterialComparation
    };
});
