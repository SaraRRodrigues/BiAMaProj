app.controller("NotificationsController", ['$scope', "MyNotificationService","UserNotificationService", "NotificationMaterialService", "$http","$window", "jQuery", function($scope,MyNotificationService, UserNotificationService, NotificationMaterialService, $http, $window){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
	jQuery("#headerMain").hide();
	jQuery("#searchMain").hide();
	jQuery("#userDetailsMain").hide();
	jQuery("#divControllerMain").removeClass("divController");

    /* define view of app */
    $scope.viewType = function() {
        var window_width = $( window ).width();
        if(window_width <= 1024) {
            $scope.isMobileView=true;
        } else {
            $scope.isMobileView=false;
        }
    }

    /* init my variables data */
	$scope.initData = function() {
        /* my current page */
        $scope.namePage='notifications';
        $scope.loading = true;
        $scope.showNotificationClick = false;
        $scope.showNotifications=true;
        $scope.resultSearch = [];
        $scope.showDetailsOfMaterial=false;
        $scope.miniSearchResults=false;
        if(!$scope.isMobileView) {
            $scope.userDetails=true;
            $scope.notificationNumber = true;
        }
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

		if($scope.idUserLoggerIn !== "" && $scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect'  && $scope.idUserLoggerIn !== 'anonymous' ) {
			$scope.confirmSession=true;
		} else {
			$scope.loading = true;
			$scope.confirmSession=false;
		}
    }
    
    /* -------------- INIT DESKTOP & MOBILE -------------- */
	/* get information of notifications to display on screen */
	$scope.getAllRequests = function() {
        var getMaterials = NotificationMaterialService.getMaterialComparation(function(infoMaterial){});
        getMaterials.then(function(result) {
            $scope.loading = false;
            var data=result.data.comparationDetails;
            $scope.materialsToSearch = data;
        });
        var getMyNotifications = MyNotificationService.getMyNotifications($scope.idUserLoggerIn,function(infoNotification){});
        getMyNotifications.then(function(result) {
            $scope.loading = false;
            var data=result.data.notificationDetails;
            $scope.myNotifications=data;   
            $scope.notifications=data; 
            $scope.numberOfNotifications=$scope.notifications.length;           
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
    /* -------------- END DESKTOP & MOBILE -------------- */

    /* -------------- INIT MOBILE -------------- */
	/* open material of small search result */
    $scope.openMaterial = function(material) {
      $scope.miniSearchResults=false;
      $scope.showDetailsOfMaterial=true;
      $scope.showMaterials=false;
	  $scope.openedMaterial=material;
	  $scope.showNotifications=false;
    }
    
    /* close material that are opened */
	$scope.closeMaterial = function(){
        $scope.miniSearchResults=false;
        $scope.showDetailsOfMaterial=false;
        $scope.showNotifications=true;
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
        $scope.showNotifications=true;
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
                    'category': $scope.materialsToSearch[index].category,
                    'code': $scope.materialsToSearch[index].code,
					'description': $scope.materialsToSearch[index].description
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
                $scope.showMaterialDetails=false;
                $scope.showForum = false;
                $scope.showQuestionDetails=false;
                
                $scope.showNotifications=false;
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
        
        $scope.getAllUsers = UserNotificationService.getUsers(function(users){});
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

		if($scope.isMobileView) {
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
				$window.location.href = '/BiAMa/whereWeAre?userName=' + $scope.idUserLoggerIn + '&redirect';
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
	
			if(buttonClick == 'notification') {
				$window.location.href = '/BiAMa/notifications?userName=' + $scope.idUserLoggerIn + '&redirect';
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
            if(!$scope.isMobileView) {
                $scope.userDetails = true;
                $scope.notificationNumber=true;
            } else {
               $scope.userDetails = false;
            }
			
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
    
    /* open information of notification on screen */
	$scope.openNotification = function(notification) {
		$scope.currentNotification=notification;
		$scope.showNotificationClick = true;
    }
    /* -------------- END MOBILE -------------- */

    /* init NotificationsController  */
	$scope.viewType();
    $scope.initData();
    $scope.validateUserLoggedIn();
    $scope.getAllRequests();

}])

app.factory("MyNotificationService", function($q, $http, $timeout){
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

app.factory("UserNotificationService", function($q, $http, $timeout){
    
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

	return {
		getUsers: getUsers
	};
});

app.factory("NotificationMaterialService", function($q, $http, $timeout){
    var getMaterialComparation = function() {
        var deferred = $q.defer();

        $http.get('/compareMaterials').then(successCallback, errorCallback);

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
        getMaterialComparation: getMaterialComparation
    };
});