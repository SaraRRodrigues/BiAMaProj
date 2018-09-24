app.controller("PerfilController", ['$scope', "UserPerfilService", "PerfilMaterialService","NotificationPerfilService", "$http","$window", "jQuery", function($scope, UserPerfilService, PerfilMaterialService, NotificationPerfilService, $http, $window){

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
        $scope.namePage='perfil';
            
        $scope.editDate=false;
        $scope.name='';
        $scope.username='';
        $scope.imageUser='';
        $scope.email='';
        $scope.birthdateValue='';
        $scope.password='';
        $scope.upgradeInformations=false;
        $scope.openImageUploadLabel=false;
        $scope.uploadPhoto='';
        $scope.new_birthdate='';
        $scope.showPerfilDetails=false;
        $scope.loading=true;
        $scope.resultSearch = [];
        $scope.showDetailsOfMaterial=false;
        $scope.miniSearchResults=false;
    }

    /* verify if user is logged in */
	$scope.validateUserLoggedIn = function() {

		if(!$scope.isMobileView) {
            var splitLocation = location.href.split('=');
    
            $scope.showPerfilDetails=true;
            $scope.idUserLoggerIn = splitLocation[1].split('&')[0];
            $scope.redirect = splitLocation[1].split('&')[1];
		
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
	/* get information of user and materials to display on search */
	$scope.getAllRequests = function() {
        $scope.getAllUsers = UserPerfilService.getUsers(function(users){});
        $scope.getAllUsers.then(function(usersDB) {
            $scope.loading=true;
    
            $scope.users = usersDB.data.users;
            for(var index=0; index<$scope.users.length; ++index){
               
                if($scope.users[index].id === $scope.idUserLoggerIn) {
                    $scope.username = $scope.users[index].username;
                    $scope.password = $scope.users[index].password;
                    $scope.userLoggedIn=$scope.users[index].username;
                    $scope.idUserLoggerIn=$scope.users[index].id;
                    $scope.confirmSession = true;
                    
                    $scope.imageUser = $scope.users[index].image;
                    $scope.email = $scope.users[index].email;
                    $scope.name=$scope.users[index].name;
                    $scope.birthdateValue = $scope.users[index].birthdate;

                    break;
                }
            }
           
            $scope.loading=false;
        });

        var getNotifications = NotificationPerfilService.getAllNotifications(function(infoNotification){});
			getNotifications.then(function(result) {
			$scope.loading=true;
			var data=result.data.notificationDetails;
			$scope.notifications=data;
			$scope.numberOfNotifications=$scope.notifications.length;
			$scope.currentNotificationId = $scope.notifications[$scope.notifications.length-1].id_notification;
			$scope.loading=false;

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

    /* action of update information of user details */
    $scope.doneUpgrade = function(username, email, birthdate, password, image) {
        if(username === '' || email === '' || birthdate === '' || password === '' || image === '') {
            $scope.fieldsEmpty=true;
        } else {
            $scope.fieldsEmpty=false;
        }
        if(!$scope.validEmail(email)) {
            $scope.invalidEmail=true;
            $scope.fieldsEmpty=false;
        } 

        if(image === '') {
            $scope.invalidPhoto=true;
        }

        if(birthdate === undefined || birthdate === '') {
            $scope.invalidDate=true;
        } else {
            if(!$scope.editDate){
                if(!(birthdate instanceof Date)) {
                    if(birthdate.includes("/")) {
                        $scope.birthdateValue=birthdate; 
                    }
                } else {
                    $scope.birthdateValue=birthdate.toLocaleDateString();
                }
                     
            }  else if($scope.editDate){
                
                if(birthdate !== ''){
                    if(birthdate instanceof Date) {
                        $scope.invalidDate=false; 
                        $scope.birthdateValue=birthdate.toLocaleDateString();
                    } else {
                        $scope.invalidDate=false; 
                    }
                   
                } else {
                    $scope.invalidDate=true; 
                }
                
                      
            } else {
                $scope.invalidDate=true;
            }
        }

        //fazer update na base de dados
        if(!$scope.invalidEmail && !$scope.fieldsEmpty && !$scope.invalidDate && !$scope.invalidPhoto) {
            if($scope.users !== undefined) {
                for(var index=0; index<$scope.users.length; ++index) {
                    if($scope.users[index].id === $scope.idUserLoggerIn){
                        $scope.updateUserDetails($scope.users[index].id, $scope.users[index].name, 
                            email, $scope.birthdateValue, image, 
                            username, password);
                        break;
                    }
                }
            } else {
                $scope.updateUserDetails($scope.idUserLoggerIn, $scope.name, 
                    email, $scope.birthdateValue, image, 
                    username, password);
            }
        }
        $scope.upgradeInformations=false;
    }

    /* save file that been inserted */
    $scope.saveUploadFile = function () {
        var splitDeviceRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;
        var res = splitDeviceRe.exec(($("#uploadPicture").val()));
        $scope.imageUser=res[2];
        
        $scope.openImageUploadLabel=false;
    }

    /* open image that been uploaded */
    $scope.openImageUpload = function() {
        $scope.openImageUploadLabel=true;
    }
    /* -------------- END DESKTOP & MOBILE -------------- */

    /* -------------- INIT MOBILE -------------- */
    /* open material of small search result */
    $scope.openMaterial = function(material) {
        $scope.miniSearchResults=false;
        $scope.showDetailsOfMaterial=true;
        $scope.showMaterials=false;
        $scope.openedMaterial=material;
        $scope.showPerfilDetails=false;
    }

    $scope.getData = function() {
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
            $scope.showPerfilDetails=true;
		} else {
			$scope.loading = true;
			$scope.confirmSession=false;
		}
    }
   
    /* close material that are opened */
    $scope.closeMaterial = function(){
      $scope.miniSearchResults=false;
      $scope.showDetailsOfMaterial=false;
      $scope.showPerfilDetails=true;
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
      $scope.showPerfilDetails=true;
    }
  
    /* action of click button "Ok" present on small search line */
    $scope.initMiniSearch = function() {

        var getMaterials = PerfilMaterialService.getMaterialComparation(function(infoMaterial){});
        getMaterials.then(function(result) {
            $scope.loading = false;
            var data=result.data.comparationDetails;
            $scope.materialsToSearch = data;
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
                    $scope.showPerfilDetails=false;
                }
            }
        });
    }
    
    /* open and close the section of user details and search icon */
    $scope.clickUserDetails = function() {
		if($scope.userDetails){
            $scope.upgradeDate=true;
            $scope.upgradeInformations=true;
            $scope.upgradeDate=true;
            $scope.userDetails=false;
           // $scope.isEditable=false;
           
		}else {
            $scope.upgradeDate=true;
            $scope.isEditable=true;
            $scope.showSearch = false;
            $scope.upgradeInformations=true;
            $scope.userDetails=true;
        }
        if ($scope.birthdateValue !== '') {
            $scope.birthdateValue='';
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

				if($scope.userName !== null && $scope.userName === username){
					if($scope.userPassword !== null && $scope.userPassword === password){
						$scope.userLoggedIn=$scope.users[index].username;
						$scope.idUserLoggerIn=$scope.users[index].id;
						$scope.confirmSession = true;
                    }
                    break;
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

    /* update data */
    $scope.updateData = function() {
        $scope.birthdateValue='';
        $scope.editDate=true;
        $scope.upgradeInformations=true;
        $scope.invalidDate=false;
        $scope.invalidEmail=false;
        $scope.fieldsEmpty=false;
    }
    /* -------------- END MOBILE -------------- */

    /* init user details of perfil section */
    $scope.initUserDetails= function() {
        if($scope.users !== undefined) {
            $scope.showPerfilDetails=true;
            for(var index=0; index<$scope.users.length; ++index) {
                if($scope.users[index].id === $scope.idUserLoggerIn){
                    $scope.name=$scope.users[index].name;
                    $scope.username=$scope.users[index].username;
                    $scope.imageUser=$scope.users[index].image;
                    $scope.email=$scope.users[index].email;
                    $scope.birthdateValue=$scope.users[index].birthdate;
                    $scope.password=$scope.users[index].password;
                }
            }
        }
    }

    /* validate if data not exists already */
    $scope.validDataNotEquals = function(username, password) {
        if($scope.users !== undefined) {
            for(var index=0; index<$scope.users.length; ++index) {
                if(username === $scope.users[index].username) {
                    return false;
                }
            }
        } else {
            if(username === $scope.username) {
                return false;
            }
        }
        
		return true;
    },
    
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

    /* update information of user */
    $scope.updateUserDetails = function(id, name, email, birthdate, image, username, password) { 
        $scope.loadingSchool=true;
        $scope.usernameRepeatedPerfil=false;
        var data = {
            'idUser': id,
            'name': name,
            'email': email,
            'birthdate': birthdate, 
            'username': username,
            'password': password,
            'image': image
        }
        var validData = $scope.validDataNotEquals(data.username, data.password);
			
        if(validData) {
            var validBirthdate = $scope.validDateOfBirth(data.birthdate);
            if(validBirthdate){
                $scope.updatedData=false;
                $http.post('/updateUserDetails', data);

                var data = {
					'id_notification': parseInt($scope.currentNotificationId)+1,
					'text_notification': 'Alterou os seus dados pessoais',
					'date_notification': 'Agora mesmo',
					'insert_notification': 'yes',
					'id_user': id
				}
                $http.post('/insertNotifications', data);
              
                setTimeout(function() {
                    $(".updateData").fadeOut().empty();
                }, 2000);
    
                $scope.clickSaveData=true;
                $scope.updatedData=true;

                $scope.birthdateValue='';
            } else {
                $scope.underAgePerfil=true;
            }
        } else {
            $scope.usernameRepeatedPerfil=true;
        }

    }

    /* validate email format */
    $scope.validEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    /* -------------- END MOBILE -------------- */

	/* init PerfilController  */
	$scope.viewType();
	$scope.initData();
    $scope.getAllRequests();
    
    $scope.validateUserLoggedIn();
    $scope.initUserDetails();

    if($scope.isMobileView) {
        $scope.getData();
    }
}])

app.factory("UserPerfilService", function($q, $http, $timeout){
    
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

app.factory("PerfilMaterialService", function($q, $http, $timeout){
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

app.factory("NotificationPerfilService", function($q, $http, $timeout){
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
	
	var getAllNotifications = function() {
		var deferred = $q.defer();
	
		$timeout(function() {
		  deferred.resolve($http.get('/allNotifications'));
		}, 2000);
	
		return deferred.promise;
	};

    return {
		getMyNotifications: getMyNotifications,
		getAllNotifications: getAllNotifications
    };
});