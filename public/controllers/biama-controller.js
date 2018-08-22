app.controller("BiamaController", ['$scope', "BiAMaInfoService","BiamaMaterialService", "UserBiamaService", "$http", "jQuery", function($scope,  BiAMaInfoService, BiamaMaterialService, UserBiamaService, $http){
		
		/* hide footer of index page because of click in buttons footer reload page */
		jQuery("#footerMain").hide();
		//jQuery("#footerMainMobile").hide();
		/* my current page */
		$scope.namePage='biamaPage';

		$scope.miniSearchResults=false;
		$scope.resultSearch = [];
		$scope.showInitSearch=true;
	
    $scope.loading = true;
    var getBiamaInfo = BiAMaInfoService.getBiAMaInfo(function(infoBiama){});
    getBiamaInfo.then(function(result) {
		$scope.loading = false;
		var data=result.data.biamaDetails;
		$scope.descriptionBiama=data[0].description;
	});

	$scope.loading = true;
	$scope.getMaterials = BiamaMaterialService.getMaterialComparation(function(infoMaterial){});
	$scope.getMaterials.then(function(result) {
		$scope.loading = false;
		var data=result.data.comparationDetails;
		$scope.materialsToSearch = data;

	});

	$scope.goToHomePage = function() {
		window.setTimeout("location.href = 'http://localhost:8080'")
	}

	$scope.openMaterial = function(material) {
		$scope.showDetailsOfMaterial=true;
		$scope.showMaterials=false;
		$scope.openedMaterial=material;
		$scope.miniSearchResults=false;
	}

	$scope.closeMaterial = function() {
		$scope.miniSearchResults=true;
		$scope.showDetailsOfMaterial=false;
	}

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

	$scope.closeMiniSearch = function() {
		$scope.miniSearchResults = false;
		$scope.search=true;
		$scope.openMaterialDetail=false; 
		$scope.showInitSearch=true;
		$scope.showSearch=false;
		$scope.enableUserIcon=false;
	}

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

	$scope.clickUserDetails = function() {
		if($scope.userDetails){
			$scope.userDetails = false;
		}else {
			$scope.userDetails = true;
			$scope.showSearch = false;
		}
	}

	$scope.showInitSessionDiv = function () {
		if($scope.showInitSession){
			$scope.showInitSession = false;
		}else {
			$scope.showInitSession = true;
		}
	}

	$scope.confirmSessionAction = function (username, password) {

		$scope.users = 'loadUser';
		var getAllUsers = UserBiamaService.getUsers(function(users){});
		
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
	
	$scope.getRequest = function(buttonClick) {

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

	$scope.logout = function(){
		$scope.confirmSession = false;
	}

	$scope.regist = function() {
		$scope.userDetails = false;
		$scope.registUser=true;
		$scope.search=false;
	}
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

app.factory("UserBiamaService", function($q, $http, $timeout){
    
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

