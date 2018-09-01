app.controller("BiamaController", ['$scope', "BiAMaInfoService","BiamaMaterialService", "UserBiamaService", "$http",  "$window", "jQuery", function($scope,  BiAMaInfoService, BiamaMaterialService, UserBiamaService, $http, $window){

	/* hide footer of index page because of click in buttons footer reload page */
	jQuery("#footerMain").hide();

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
		$scope.namePage='biamaPage';
		$scope.miniSearchResults=false;
		$scope.resultSearch = [];
		$scope.showInitSearch=true;
	}

	/* verify if user is logged in */
    $scope.validateUserLoggedIn = function() {
        var splitLocation = location.href.split('=');
        $scope.idUserLoggerIn =splitLocation[1];
        
        if($scope.idUserLoggerIn !== undefined) {
            $scope.doLogin=false;
            $scope.confirmSession=true;
        } else {
            $scope.doLogin=true;
            $scope.loading = true;
            $scope.confirmSession=false;
        }
    }
    
    /* -------------- INIT DESKTOP & MOBILE -------------- */
	/* get information of biama and materials to display on search */
	$scope.getAllRequests = function() {

		$scope.loading = true;
		var getBiamaInfo = BiAMaInfoService.getBiAMaInfo(function(infoBiama){});
		getBiamaInfo.then(function(result) {
			$scope.loading = false;
			var data=result.data.biamaDetails;
			$scope.descriptionBiama=data[0].description;
		});
	
		/* this request needs only on results of small search results */
		if($scope.isMobileView) {
			$scope.loading = true;
			$scope.getMaterials = BiamaMaterialService.getMaterialComparation(function(infoMaterial){});
			$scope.getMaterials.then(function(result) {
				$scope.loading = false;
				var data=result.data.comparationDetails;
				$scope.materialsToSearch = data;
		
			});
		}
	}
	
	/* redirect to homepage with arrow */
	$scope.goToHomePage = function() {
		if($scope.idUserLoggerIn !== undefined) {
			location.href = 'http://localhost:8080?userName=' + $scope.idUserLoggerIn;
		} else {
			location.href = 'http://localhost:8080?username=' + 'anonymous';
		}
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
		$scope.miniSearchResults=true;
		$scope.showDetailsOfMaterial=false;
	}

	/* open and close the small search icon */
	$scope.clickTopSearch = function() {
		$scope.miniSearchResults = false;
		$scope.showInitSearch=true;

		if($scope.showSearch){
			$scope.enableUserIcon=false;
			$scope.showSearch = false;
		}else {
			$scope.enableUserIcon=true;
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
	}

	/* action of click button "Ok" present on small search line */
	$scope.initMiniSearch = function() {

		var inputMini = jQuery("#miniSearch").val();
		if(inputMini !== '') {
			for(var index=0; index < $scope.materialsToSearch.length; ++index) {
				var resultMaterial = {
					'name': $scope.materialsToSearch[index].name,
					'category': $scope.materialsToSearch[index].category,
					'description': $scope.materialsToSearch[index].description,
					'code': $scope.materialsToSearch[index].code
				}
				if(($scope.materialsToSearch[index].type).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(($scope.materialsToSearch[index].color).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(($scope.materialsToSearch[index].category).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(($scope.materialsToSearch[index].description).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push($scope.materialsToSearch[index].name);
				}
			}
	
			$scope.showInitSearch=false;
			$scope.miniSearchResults = true;
		}
	}

	/* open and close the section of user details and search icon */
	$scope.clickUserDetails = function() {
		if($scope.userDetails) {
			$scope.userDetails = false;
		} else {
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
		$scope.getAllUsers = UserBiamaService.getUsers(function(users){});
		
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
				$window.location.href = 'http://localhost:8080/BiAMa/biamaPage?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick === 'whereWeAre') {
				$window.location.href = 'http://localhost:8080/BiAMa/whereWeAre?userName=' + $scope.idUserLoggerIn;
			}

			if(buttonClick === 'library') {
				$window.location.href = 'http://localhost:8080/BiAMa/library?userName=' + $scope.idUserLoggerIn;
			}

			if(buttonClick === 'myBiama') {
				$window.location.href = 'http://localhost:8080/BiAMa/myBiama?userName=' + $scope.idUserLoggerIn;
			}

			if(buttonClick === 'forum') {
				$window.location.href = 'http://localhost:8080/BiAMa/forumPage?userName=' + $scope.idUserLoggerIn;
			}
		}
		
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
	/* -------------- END MOBILE -------------- */

	/* init BiAMaController  */
	$scope.viewType();
	$scope.initData();
	$scope.getAllRequests();
	$scope.validateUserLoggedIn();
}])

app.factory("BiAMaInfoService", function($q, $http, $timeout){
    
	var getBiAMaInfo = function() {
		var deferred = $q.defer();
	
		$timeout(function() {
		  deferred.resolve($http.get('/biamaInfo'));
		}, 2000);
	
		return deferred.promise;
	};
	
	return {
		getBiAMaInfo: getBiAMaInfo
	};
});

app.factory("BiamaMaterialService", function($q, $http, $timeout){
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

app.factory("UserBiamaService", function($q, $http, $timeout){
    
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

