
app.controller("ForumController", ['$scope', "ForumMaterialService", "ForumBiamaService", "$http", "$window", "jQuery", function($scope, ForumMaterialService, ForumBiamaService, $http, $window){

	/* hide footer of index page because of click in buttons footer reload page */
	jQuery("#footerMain").hide();
	jQuery("#headerMain").hide();
	jQuery("#searchMain").hide();
	jQuery("#userDetailsMain").hide();
	jQuery("#divControllerMain").removeClass("divController");
	
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
		/* my current page */
		$scope.namePage='forum';
		$scope.nameclick='forum';
		$scope.resultSearch = [];
		$scope.showDetailsOfMaterial=false;
		$scope.miniSearchResults=false;
		$scope.showForum = true;
	}

	/* verify if user is logged in */
    $scope.validateUserLoggedIn = function() {
		if(!$scope.isMobileView) {
			var splitLocation = location.href.split('=');
			var splitParams = splitLocation[1].split('&');
			$scope.idUserLoggerIn =splitParams[0];
			$scope.redirect = splitParams[1];
		
		} else {
			var splitLocation = location.href.split('=');
			$scope.idUserLoggerIn =splitLocation[1];
		}

		if($scope.idUserLoggerIn !== "" && $scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect' && $scope.idUserLoggerIn !== 'anonymous&redirect') {
			$scope.confirmSession=true;
		} else {
			$scope.loading = true;
			$scope.confirmSession=false;
		}
    }
	/* -------------- INIT DESKTOP & MOBILE -------------- */
	/* get information of materials to display when compare materials */
	$scope.getAllRequests = function() {
		var getMaterials = ForumMaterialService.getMaterialComparation(function(infoMaterial){});
		getMaterials.then(function(result) {
			$scope.loading = false;
			var data=result.data.comparationDetails;
			$scope.materialsToSearch = data;
	
		});

		$scope.getAllUsers = ForumBiamaService.getUsers(function(users){});
		$scope.getAllUsers.then(function(usersDB) {
			$scope.users = usersDB.data.users;
			for(var index=0; index<$scope.users.length; ++index){
				
				if($scope.users[index].id === $scope.idUserLoggerIn) {
					$scope.userName = $scope.users[index].username;
					$scope.userPassword = $scope.users[index].password;
					$scope.userLoggedIn=$scope.users[index].username;
					$scope.idUserLoggerIn=$scope.users[index].id;
					$scope.confirmSession = true;
					
					$scope.userImage = $scope.users[index].image;
					$scope.userEmail = $scope.users[index].email;
					$scope.nameUser=$scope.users[index].name;
					$scope.userBirthdate = $scope.users[index].birthdate;
	  
					var splitDateBirth = $scope.userBirthdate.split('/');
					$scope.dayBirth = splitDateBirth[0];
					$scope.monthBirth = splitDateBirth[1];
					$scope.yearBirth = splitDateBirth[2];
					break;
				}
			}
		});
	}

	/* redirect to homepage with arrow */
	$scope.goToHomePage = function() {
		if($scope.idUserLoggerIn !== "" && $scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect' && $scope.idUserLoggerIn !== 'anonymous&redirect') {
			location.href = 'https://biamaweb.herokuapp.com?userName=' + $scope.idUserLoggerIn;
		} else {
			location.href = 'https://biamaweb.herokuapp.com?username=' + 'anonymous';
		}
	}
	/* -------------- END DESKTOP & MOBILE -------------- */
	
	/* -------------- INIT MOBILE -------------- */
	/* open material of small search result */
	$scope.openMaterial = function(material) {
		$scope.miniSearchResults=false;
		$scope.showDetailsOfMaterial=true;
		$scope.showMaterials=false;
		$scope.openedMaterial=material;
        $scope.showLocation=false;
	}

	/* close material that are opened */
	$scope.closeMaterial = function(){
		$scope.miniSearchResults=false;
        $scope.showDetailsOfMaterial=false;
		$scope.showLocation=true;
		$scope.showForum = true;
	}

	/* open and close the small search icon */
	$scope.clickTopSearch = function() {
		if($scope.showSearch){
			$scope.showSearch = false;
		}else {
			$scope.showSearch = true;
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
		$scope.showCategory=false;
        $scope.showMaterialDetails=false;
		$scope.showLocation=true;
		$scope.showForum = true;
	}

	/* action of click button "Ok" present on small search line */
	$scope.initMiniSearch = function() {
		$scope.resultSearch=[];
		var inputMiniValue = jQuery("#miniSearch").val(); 		
		var inputMini = inputMiniValue.toLowerCase();
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
				$scope.miniSearchResults = true;
				$scope.showSearch=false;
				$scope.showCategory=true;
				$scope.showMaterialDetails=false;
				$scope.showLocation=false;
				$scope.showForum = false;
			}
		}
	}
	
	/* open and close the section of user details and search icon */
	$scope.clickUserDetails = function() {
		if($scope.userDetails){
			$scope.userDetails = false;
		}else {
			$scope.userDetails = true;
			$scope.showSearch = false;
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
		
		$scope.getAllUsers.then(function(usersDB) {
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
	$scope.getRequest = function(buttonClick) {

		if(!$scope.isMobileView) {
			if(buttonClick === 'biamaPage') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/biamaPage?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick === 'whereWeAre') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/whereWeAre?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'library') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/library?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'myBiama') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/myBiama?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'forum') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/forumPage?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'questionsForum') {
				$window.location.href = '/BiAMa/questionsUsersForum?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'curiositiesForum') {
				$window.location.href = '/BiAMa/curiositiesForum?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'worldSharesForum') {
				$window.location.href = '/BiAMa/worldSharesForum?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'favorites') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/favorites?userName=' + $scope.idUserLoggerIn + $scope.idUserLoggerIn+'&redirect';
			}
	
			if(buttonClick == 'questions') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/myQuestions?userName=' + $scope.idUserLoggerIn + $scope.idUserLoggerIn+'&redirect';
			}
	
			if(buttonClick == 'world_share') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/worldShare?userName=' + $scope.idUserLoggerIn + $scope.idUserLoggerIn+'&redirect';
			}
	
			if(buttonClick == 'notification') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/notifications?userName=' + $scope.idUserLoggerIn + $scope.idUserLoggerIn+'&redirect';
			}
	
			if(buttonClick == 'perfil') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/perfilPage?userId=' + $scope.idUserLoggerIn + '&userName=' 
				+ $scope.userName + '&userPassword=' + $scope.userPassword + '&userImage=' + $scope.userImage + '&userBirthdate=' + $scope.dayBirth + '-' + $scope.monthBirth + '-' + $scope.yearBirth 
				+ '&nameUser=' + $scope.nameUser + '&userEmail=' + $scope.userEmail + $scope.idUserLoggerIn+'&redirect';
			}
	
			if(buttonClick == 'compare') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/compare?userName=' + $scope.idUserLoggerIn + $scope.idUserLoggerIn+'&redirect';
			}

			if(buttonClick == 'regist') {
				$scope.regist();
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/registUser?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
		} else {
			if(buttonClick === 'favorites') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/favoritesMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'questions') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/myQuestionsMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'world_share') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/worldShareMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'notification') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/notificationsMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'perfil') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/perfilPageMobile?userId=' + $scope.idUserLoggerIn + '&userName=' 
				+ $scope.userName + '&userPassword=' + $scope.userPassword + '&userImage=' + $scope.userImage + '&userBirthdate=' + $scope.dayBirth + '-' + $scope.monthBirth + '-' + $scope.yearBirth 
				+ '&nameUser=' + $scope.nameUser + '&userEmail=' + $scope.userEmail;
			}
	
			if(buttonClick == 'compare') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/compareMobile?userName=' + $scope.idUserLoggerIn;
			}
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

	/* logout of user details section */
	$scope.logout = function(){
		$scope.confirmSession = false;
	}

	/* regist new user on user details section */
	$scope.regist = function() {
		$scope.userDetails = false;
		$scope.registUser=true;
		$scope.search=false;
	}

	/* refresh questions */
	$scope.reloadQuestions = function() {
		location.href = 'https://biamaweb.herokuapp.com/BiAMa/questionsForumMobile?userName=' + $scope.idUserLoggerIn;
	}

	/* refresh curiosities */
	$scope.reloadCuriosities = function() {
		location.href = 'https://biamaweb.herokuapp.com/BiAMa/curiositiesForumMobile?userName=' + $scope.idUserLoggerIn;
	}

	/* refresh world shares */
	$scope.reloadWorldShares = function() {
		location.href = 'https://biamaweb.herokuapp.com/BiAMa/worldSharesForumMobile?userName=' + $scope.idUserLoggerIn;
	}
	/* -------------- END MOBILE -------------- */

	/* init CompareController  */
	$scope.viewType();
	$scope.initData();
	$scope.getAllRequests();
    $scope.validateUserLoggedIn();
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

app.factory("ForumMaterialService", function($q, $http, $timeout){
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

app.factory("ForumBiamaService", function($q, $http, $timeout){
    
	var getUsers = function() {
		var deferred = $q.defer();
	
 		$timeout(function() {
		  deferred.resolve($http.get('/users',  {cache:true}));
		}, 2000); 

		return deferred.promise;
	};

	return {
		getUsers: getUsers
	};
});