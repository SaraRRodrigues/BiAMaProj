app.controller("NotificationsController", ['$scope', "MyNotificationService","UserNotificationService", "NotificationMaterialService", "$http", "jQuery", function($scope,MyNotificationService, UserNotificationService, NotificationMaterialService, $http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='notifications';
	$scope.loading = true;
	$scope.showNotificationClick = false;
	$scope.showNotifications=true;
	$scope.resultSearch = [];
    $scope.showDetailsOfMaterial=false;
    $scope.miniSearchResults=false;

    var window_width = $( window ).width();
	if(window_width <= 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
    }
	
	$scope.getMaterials = NotificationMaterialService.getMaterialComparation(function(infoMaterial){});
    $scope.getMaterials.then(function(result) {
      $scope.loading = false;
      var data=result.data.comparationDetails;
      $scope.materialsToSearch = data;
  
      });

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

        $scope.showMaterialDetails=false;
        $scope.showForum = false;
		$scope.showQuestionDetails=false;
		
		$scope.showNotifications=false;
      }
    }

    $scope.closeMaterial = function(){
      $scope.miniSearchResults=false;
      $scope.showDetailsOfMaterial=false;
	  $scope.showNotifications=true;
    }
  
    $scope.closeMiniSearch = function() {
      $scope.miniSearchResults = false;
      $scope.search=true;
      $scope.openMaterialDetail=false; 
      $scope.showInitSearch=true;
      $scope.showSearch=false;
	  $scope.enableUserIcon=false;
	  $scope.showNotifications=true;
    }
  
    $scope.openMaterial = function(material) {
      $scope.miniSearchResults=false;
      $scope.showDetailsOfMaterial=true;
      $scope.showMaterials=false;
	  $scope.openedMaterial=material;
	  $scope.showNotifications=false;
	}
	
    $scope.goToHomePage = function() {
        window.setTimeout("location.href = 'http://localhost:8080'")
    }

    $scope.getRequest = function(buttonClick) {

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
    
    var splitLocation = location.href.split('=');
    $scope.idUserLoggerIn =splitLocation[1];

    if($scope.idUserLoggerIn !== undefined) {
        $scope.confirmSession=true;
    } else {
        $scope.loading = true;
        $scope.confirmSession=false;
    }

    $scope.logout = function(){
		$scope.confirmSession = false;
		/*firebase.auth().signOut().then(function() {
			// Sign-out successful.
		
		}, function(error) {
			// An error happened.
			console.log(error);

		});*/
	}
	
	$scope.openNotification = function(notification) {
		$scope.currentNotification=notification;
		$scope.showNotificationClick = true;
	}

    $scope.confirmSessionAction = function (username, password) {

		$scope.users = 'loadUser';
		var getAllUsers = UserNotificationService.getUsers(function(users){});
		
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

    $scope.showInitSessionDiv = function () {
		if($scope.showInitSession){
			$scope.showInitSession = false;
		}else {
			$scope.showInitSession = true;
		}
    }


    $scope.getMyNotifications = MyNotificationService.getMyNotifications(function(infoNotification){});

    $scope.getMyNotifications.then(function(result) {
        $scope.loading = false;
        var data=result.data.notificationDetails;
        $scope.myNotifications=data;
		
    });
}])

app.factory("MyNotificationService", function($q, $http, $timeout){
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

app.factory("UserNotificationService", function($q, $http, $timeout){
    
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

app.factory("NotificationMaterialService", function($q, $http, $timeout){
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