//var angular = require('angular');
var app = angular.module("myApp", ['ngRoute'])

app.constant('jQuery', window.jQuery)
.run(['$route', angular.noop])
.config(function($interpolateProvider,$httpProvider) {
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
	$httpProvider.defaults.cache = true;
})
 
.controller('MainController',['$scope', "UserService", "MaterialService", "NotificationService", "$http","$window","jQuery", function($scope, UserService, MaterialService,NotificationService, $http, $window) {

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
		$scope.iconOfUser=false;
	}
	 
	/* verify if user is logged in */
    $scope.validateUserLoggedIn = function() { 
        if(!$scope.isMobileView) {
			var splitLocation = location.href.split('=');
			//var splitParams = splitLocation[1].split('&');
			$scope.idUserLoggerIn =splitLocation[1];
			$scope.redirect = splitLocation[2];
		
		} else {
			var splitLocation = location.href.split('=');
			$scope.idUserLoggerIn =splitLocation[1];
		}

		if($scope.idUserLoggerIn !== "" && $scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect'  && $scope.idUserLoggerIn !== 'anonymous' ) {
			$scope.confirmSession=true;
		} else {
			$scope.loading = true;
			$scope.confirmSession=false;
		}
        
	}
	
	/* -------------- INIT DESKTOP & MOBILE -------------- */
	/* get information of user, library and materials to display */
	$scope.getAllRequests = function() { 
		$scope.getLibraryUser = UserService.getLibraryUserDetails(function(infoMyBiama){});
		$scope.getAllUsers = UserService.getUsers(function(users){});
		$scope.getMaterials = MaterialService.getMaterials(function(infoMaterial){});
		
		$scope.getLibraryUser.then(function(result) {
			$scope.loading = true;
			var data=result.data.userLibrary;
			$scope.userLibrary=data;
			
			$scope.loading = false;
		});
		$scope.getAllUsers.then(function(usersDB) {
			$scope.loading=true;
			$scope.users = usersDB.data.users;
			$scope.loading = false;

		});

		$scope.getMaterials.then(function(result) {
			$scope.loading = true;
			var data=result.data.categoryDetails;
			$scope.materialsToSearch = data;
			$scope.materials = $scope.materialsToSearch;
			$scope.loading = false;
		});
	}
	
	/* redirect to homepage with arrow */
	$scope.goToHomePage = function() {
        if($scope.idUserLoggerIn !== undefined) {
			location.href = '?userName=' + $scope.idUserLoggerIn;
		} else {
			location.href = '?username=' + 'anonymous';
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
		
			$scope.nameAlreadyExists=false;
			$scope.idUserLoggerIn=parseInt($scope.users[$scope.users.length-1].id)+1;
			$scope.userName = result.user.displayName;
			$scope.userPassword = '';
			$scope.nameUser = result.user.displayName;
			$scope.userEmail = result.user.email;
			$scope.userImage = "noImage";
			$scope.dayBirth = '';
			$scope.monthBirth = '';
			$scope.yearBirth = '';

			
		})
		.catch(console.log)

		for(var index=0; index < $scope.users.length; ++index) {
			if($scope.users[index].username == $scope.nameUser) {
				$scope.nameAlreadyExists=true;
				$scope.confirmSession = true;
				$scope.showInitSession=false;
				break;
			}
		}

		if(!$scope.nameAlreadyExists) {
			var data = {
				'idUser': parseInt($scope.users[$scope.users.length-1].id)+1,
				'name': $scope.nameUser,
				'email' : $scope.userEmail,
				'birthdate': '',
				'image': "noImage",
				'username': $scope.nameUser,
				'password': ''
			}
			
			$http.post('/insertUserDetails', data);
			$scope.confirmSession = true;
			$scope.showInitSession=false;
		}
	}

	/* login with facebook with firebase */
	$scope.loginWithFacebook = function() {
		
		$scope.facebookInDeveloping = true;
		const provider = new firebase.auth.FacebookAuthProvider();

    	firebase.auth().signInWithPopup(provider)
            .then(result => {
				$scope.idUserLoggerIn=parseInt($scope.users[$scope.users.length-1].id)+1;
				$scope.userName = result.user.displayName;
				$scope.userPassword = '';
				$scope.nameUser = result.user.displayName;
				$scope.userEmail = result.user.email;
				$scope.userImage = "noImage";
				$scope.dayBirth = '';
				$scope.monthBirth = '';
				$scope.yearBirth = '';

				for (var i=0; i < $scope.users.length; ++i) {
					if($scope.users[i].username == $scope.nameUser) {
						$scope.usernameDuplicated = true;
						$scope.confirmSession = false;
						break;
					} else {
						$scope.confirmSession = true;
					}
				}
				if(!$scope.usernameDuplicated) {
					var data = {
						'idUser': parseInt($scope.users[$scope.users.length-1].id)+1,
						'name': result.user.displayName,
						'email' : result.user.email,
						'birthdate': '',
						'image': "noImage",
						'username': result.user.displayName,
						'password': ''
					}
					
					$http.post('/insertUserDetails', data);
				}
				//window.setTimeout("location.href = ''")
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
		$scope.showInitSearch=false;

		var valueSearchMaterial=jQuery( "#tags_search" ).val();
		$scope.searchValue=valueSearchMaterial;

		$scope.materials=[];

		if(valueSearchMaterial === 'Materiais') {
			$scope.materials=$scope.materialsToSearch;
			$scope.showCategoryMaterial=false;
			$scope.showProjectMaterial=false;
		} 
		if(valueSearchMaterial === 'Categoria de materiais') {
			var firstCategory = $scope.materialsToSearch[0].category;
			for(var index=1; index<$scope.materialsToSearch.length; ++index) {
				if(firstCategory !== $scope.materialsToSearch[index].category){
					$scope.materials.push($scope.materialsToSearch[index]);
				} else {
					break;
				}
			}
			$scope.showCategoryMaterial=true;
			$scope.showProjectMaterial=false;
		} 
		if(valueSearchMaterial === 'Projeto de materiais') {
			for(var index=0; index<$scope.materialsToSearch.length; ++index) {
				if($scope.materialsToSearch[index].code > parseInt('46')){
					$scope.materials.push($scope.materialsToSearch[index]);
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
		$scope.showMaterials=true;
		$scope.search=true;
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
		$scope.showMaterials = false;

		$scope.miniSearchResults = false;
		$scope.search=true;
		$scope.openMaterialDetail=false; 
		$scope.showSearch=false;
		$scope.enableUserIcon=false;
		
	}

	/* open and close the small search icon */
	$scope.clickTopSearch = function() {
		$scope.miniSearchResults = false;
		$scope.showInitSearch=true;
		$scope.showResultsOfMiniSearch=false;
		$scope.showMaterials = false;

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
		if(!$scope.isMobileView) {
			$scope.search = false;
			$scope.showMaterials = false;
		}
		$scope.resultSearch=[];
		var inputMiniValue = jQuery("#miniSearch").val(); 		
		var inputMini = inputMiniValue.toLowerCase();
		
		if(inputMini !== '') {
			for(var index=0; index < $scope.materialsToSearch.length; ++index) {
				var resultMaterial = {
					'name': $scope.materialsToSearch[index].name,
					'category': $scope.materialsToSearch[index].category,
					'code': $scope.materialsToSearch[index].code,
					'description': $scope.materialsToSearch[index].description
				}
				var type = ($scope.materialsToSearch[index].type).toLowerCase();
				var color = ($scope.materialsToSearch[index].color).toLowerCase();
				var category = ($scope.materialsToSearch[index].category).toLowerCase();
				var description = ($scope.materialsToSearch[index].description).toLowerCase();

				if(type.indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(color.indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(category.indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(description.indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				}
			}
	
			if($scope.resultSearch.length == 0) {
				$scope.noResultsOnSearch=true;
			} else {
				$scope.showInitSearch=false;
				$scope.showSearch=true;
				$scope.miniSearchResults = true;
				$scope.noResultsOnSearch=false;
				$scope.showResultsOfMiniSearch=true;
			}
			$scope.userDetails = false;
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
		$scope.notificationNumber=false;
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
				$scope.username = $scope.users[index].username;
				$scope.userPassword = $scope.users[index].password;

				if($scope.userName !== null && $scope.userName === username){
					if($scope.userPassword !== null && $scope.userPassword === password){

						$scope.userImage = $scope.users[index].image;
						$scope.userEmail = $scope.users[index].email;
						$scope.nameUser=$scope.users[index].name;
						$scope.userBirthdate = $scope.users[index].birthdate;

						var splitDateBirth = $scope.userBirthdate.split('/');
						$scope.dayBirth = splitDateBirth[0];
						$scope.monthBirth = splitDateBirth[1];
						$scope.yearBirth = splitDateBirth[2];

						$scope.userLoggedIn=$scope.users[index].username;
						$scope.idUserLoggerIn=$scope.users[index].id;
						$scope.confirmSession = true;
						
						setTimeout(function() {
							$(".alert").fadeOut().empty();
						}, 2000);

						$scope.clickInitSession=true;

					} else {
						$scope.errorLogin = true;
					}
					break;
				} else {
					$scope.incorrectCredentials=true;
				}
			}
		});
	}

	/**/
	$scope.selectOption = function() {
		$scope.needInitSession=false;
		$scope.clickOnNeedInitSession=true;

		$window.setTimeout(function() {
			$(".needInitSession").fadeOut().empty();
		}, 2000);
	}

	/* routes of click on links page */
	$scope.disableSearch = function(buttonClick) {
		if($scope.isMobileView) {

			if(buttonClick === 'library') {
				$window.location.href = '/BiAMa/libraryMobile?userName=' + $scope.idUserLoggerIn;
			}

			if(buttonClick === 'biamaPage') {
				$window.location.href = '/BiAMa/biamaPageMobile?userName=' + $scope.idUserLoggerIn;
			}

			if(buttonClick === 'whereWeAre') {
				$window.location.href =  '/BiAMa/whereWeAreMobile?userName=' + $scope.idUserLoggerIn;
			}

			if(buttonClick === 'qrCode') {
				$window.location.href = '/BiAMa/qrCodeMobile?userName=' + $scope.idUserLoggerIn;
			}

			if(buttonClick === 'forum') {
				$window.location.href = '/BiAMa/forumPageMobile?userName=' + $scope.idUserLoggerIn;
			}

			if(buttonClick === 'favorites') {
				$window.location.href = '/BiAMa/favoritesMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'questions') {
				$window.location.href = '/BiAMa/myQuestionsMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'world_share') {
				$window.location.href = '/BiAMa/worldShareMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'notification') {
				$window.location.href = '/BiAMa/notificationsMobile?userName=' + $scope.idUserLoggerIn;
	
			}
	
			if(buttonClick == 'perfil') {
				$window.location.href = '/BiAMa/perfilPageMobile?userId=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'compare') {
				$window.location.href = '/BiAMa/compareMobile?userName=' + $scope.idUserLoggerIn;
	
			}
			if(buttonClick == 'regist') {
				$scope.regist();
				$window.location.href = '/BiAMa/registUserMobile?userName=' + $scope.idUserLoggerIn;
			}
		} else {
			if(buttonClick === 'biamaPage') {
				$window.location.href = '/BiAMa/biamaPage?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'whereWeAre') {
				$window.location.href =  '/BiAMa/whereWeAre?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'library') {
				$window.location.href = '/BiAMa/library?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'myBiama') {
				$window.location.href = '/BiAMa/myBiama?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'forum') {
				$window.location.href = '/BiAMa/forumPage?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'favorites') {
				$window.location.href = '/BiAMa/favorites?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick == 'questions') {
				$window.location.href = '/BiAMa/myQuestions?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick == 'world_share') {
				$window.location.href = '/BiAMa/worldShare?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick == 'perfil') {
				$window.location.href = '/BiAMa/perfilPage?userId=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick == 'compare') {
				$window.location.href = '/BiAMa/compare?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick == 'regist') {
				$scope.regist();
				$window.location.href = '/BiAMa/registUser?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
		}
		if(buttonClick === 'notification') {
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

		$http.get('/myNotifications', {params: {'data': data}}).then(successCallback, errorCallback);

       function successCallback(response){
           //success code
           deferred.resolve(response);
       }
       function errorCallback(error){
           //error code
           deferred.reject(status);
       }
        return deferred.promise;
    };


    return {
        getMyNotifications: getMyNotifications
    };
});

app.factory("UserService", function($q, $http, $timeout){
    
	var getUsers = function() {
		var deferred = $q.defer();

		$http.get('/users').then(successCallback, errorCallback);

        function successCallback(response){
            //success code
            deferred.resolve(response);
        }
        function errorCallback(error){
			//error code
			deferred.reject(status);
        }
	
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

app.factory("MaterialService", function($q, $http, $timeout){
    var getMaterials = function() {
        var deferred = $q.defer();

		$http.get('/categories').then(successCallback, errorCallback);

        function successCallback(response){
			//success code
			$timeout(function() {
				deferred.resolve(response);
			}, 2000); 
        }
        function errorCallback(error){
			//error code
			deferred.reject(status);
        }
        return deferred.promise;
	};
	
    return {
        getMaterials: getMaterials
    };
});
