app.controller("WorldShareController", ['$scope',"WorldSharesService", "ForumService","UserWorldShareService", "WorldShareMaterialService","NotificationWorldShareService", "$http", "$window", "jQuery", function($scope,WorldSharesService,ForumService,UserWorldShareService, WorldShareMaterialService, NotificationWorldShareService, $http, $window){
    
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
        $scope.namePage='worldShares';
        $scope.descriptionWorldShare='';
        $scope.savePhoto=false;
        $scope.openWorldShareUploadLabel=false;

        $scope.resultSearch = [];
        $scope.showDetailsOfMaterial=false;
        $scope.miniSearchResults=false;
        $scope.loading = true;
        $scope.showWorldShares=true;
        $scope.addWorldShare=false;
        $scope.numberOfNewShares=[
            {
            'insert': true
            }
        ];
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
    /* -------------- INIT DESKTOP -------------- */
    /* open add section of world share */
    $scope.openAddWorldShare = function() {
        $scope.addWorldShare=true;
        $scope.showWorldShares=false;
    }

    /* open image of user */
    $scope.openWorldShareUpload = function() {
        $scope.openWorldShareUploadLabel=true;
        $scope.savePhoto=false;

    }
    
    /* save upload file */
    $scope.saveUploadFile = function () {
        $scope.savePhoto=true;
        var splitDeviceRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;
        var res = splitDeviceRe.exec(($("#uploadPictureWorldShare").val()));
        $scope.imageWorldShare=res[2];
        $scope.numberOfNewShares[0].insert=false;
        $scope.openWorldShareUploadLabel=false;

        for(var index=0; index<$scope.worldShareData.length; ++index) {
            if(index===$scope.worldShareData.length-1) {
              var result = ($scope.worldShareData[index].title).split("s");
              var numberTitle=result[1];
              $scope.title='ws' + (parseInt(numberTitle)+1);
            }
        } 
        //$scope.uploadedFile($scope.imageWorldShare)
    }
    /* -------------- END DESKTOP -------------- */

    /* -------------- INIT DESKTOP & MOBILE -------------- */
    /* get information of my world shares on forum to display */
    $scope.getAllRequests = function() {

        var getMyWorldShares = WorldSharesService.getAllMyWorldShares( $scope.idUserLoggerIn, function(infoMyWorldShares){});
        getMyWorldShares.then(function(result) {
            $scope.loading = false;
            var data=result.data.worldShareDetails;

            $scope.worldShareItems=[];
            $scope.worldShareData=[];
            $scope.shareNumber=[];
            for(var index=0; index<data.length; ++index) {
                $scope.worldShareItems.push(data[index].image);
                $scope.worldShareData.push(data[index]);
                $scope.forumType=data[index].type_forum; 

                if(index===data.length-1) {
                    var result = (data[index].title).split("s");
                    var numberTitle=result[1];
                    $scope.title='ws' + (parseInt(numberTitle)+1);
                }
            }

        });
        var getMaterials = WorldShareMaterialService.getMaterialComparation(function(infoMaterial){});
        getMaterials.then(function(result) {
          $scope.loading = false;
          var data=result.data.comparationDetails;
          $scope.materialsToSearch = data;   
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

    /* open details of world share when clicks on material world share */
    $scope.openDetailsWorldShare = function(image) {
        for(var index=0; index<$scope.worldShareData.length; ++index) {
            if($scope.worldShareData[index].image === image){
                $scope.worldSharesInfo={
                    'image':$scope.worldShareData[index].image,
                    'description': $scope.worldShareData[index].descriptionShare,
                    "share": index+1
                }
                $scope.showWorldSharesDetails=true;
                $scope.showWorldShares=false;
                break;
            }
        }
    }

    /* open big image of world share (large image size) */
    $scope.openBigImage = function(image) {
        $scope.showBigImage=true;
        $scope.showWorldSharesDetails=false;
        $scope.bigImage=image;
    }

    /* close the image that are opened */
    $scope.closeWorldShareImage = function() {
        $scope.showBigImage=false;
        $scope.showWorldSharesDetails=true;
    }

    /* cancel insert of world share */
    $scope.cancelInsertWorldShare = function() {
        $scope.descriptionWorldShare='';
        $scope.imageWorldShare='';
        $scope.openWorldShareUploadLabel=true;
        $scope.savePhoto=false;
        $scope.addWorldShare=false;
        $scope.showWorldShares=true;
    }

    /* insert world share on database */
    $scope.saveConfigInsertWorldShare = function (image, description) {
    
        if(image !== undefined) {
            $scope.clickSaveWorldShare=true;
            var data = {
                'forumType': $scope.forumType, 
                'title': $scope.title,
                'image': image,
                'description': description
            }
            $scope.insertedWorldShare = false;
            $http.post('/insertWorldShares', data);
            
            var data = {
                'id_notification': parseInt($scope.currentNotificationId)+1,
                'text_notification': 'Nova partilha do mundo',
                'date_notification': 'Agora mesmo',
                'insert_notification': 'yes',
                'id_user': parseInt($scope.users[$scope.users.length-1].id)+1
            }
            $http.post('/insertNotifications', data);
               
            setTimeout(function() {
                $(".insertWorldShare").fadeOut().empty();
            }, 2000);
            
            $scope.insertedWorldShare = true;
            $scope.errorInsertWorldShare=false;
            $scope.clickInitSession=false;

            $window.location.href = '?userName=' + $scope.idUserLoggerIn;
            
        } else {
            $scope.errorInsertWorldShare=true;
        }
    }

    /*  post upload file */
    $scope.postUpload = function(valueInput) {
        console.log('x: ', valueInput);
        var inputResult = jQuery('#uploadPictureWorldShare');

        console.log('file: ', inputResult);
        var fd = new FormData();
        fd.append('file', inputResult);

        
    }

    /* create file on directory of image uploaded*/
    $scope.uploadedFile=function(element) {
        if(element !== undefined || element !== null || element !== '') {
            $scope.currentFile = element.files[0];
            /* var reader = new FileReader();

            reader.onload = function(event) {
                var output = jQuery('#output');
                output.src = URL.createObjectURL(element.files[0]);
            }
            reader.readAsDataURL(element.files[0]); */
       

            var assetLocalPath=""+$scope.currentFile.name;
            var file = new File([""],assetLocalPath);
            console.log(file.name);
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
        $scope.showWorldShares=false;
    }

    /* close material that are opened */
    $scope.closeMaterial = function(){
        $scope.miniSearchResults=false;
        $scope.showDetailsOfMaterial=false; 
        $scope.showWorldShares=true;
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
        $scope.showWorldShares=true;
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
        
            $scope.showInitSearch=false;
            $scope.miniSearchResults = true;

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

                $scope.showWorldShares=false;
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
        $scope.getAllUsers = UserWorldShareService.getUsers(function(users){});
        $scope.getAllUsers.then(function(usersDB) {
            $scope.users = usersDB.data.users;
            for(var index=0; index<$scope.users.length; ++index){
                $scope.userName = $scope.users[index].username;
                $scope.userPassword = $scope.users[index].password;
    
                if($scope.userName !== null && $scope.userName === username){
                    if($scope.userPassword !== null && $scope.userPassword === password){
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
            }
        });
    }

    /* routes of click on links page */
    $scope.getRequest = function(buttonClick) {

        if(buttonClick === 'notification') {
            var getNotifications = NotificationWorldShareService.getAllNotifications(function(infoNotification){});
            getNotifications.then(function(result) {
                $scope.loading = false;
                var data=result.data.notificationDetails;
                $scope.notifications=data;
                $scope.numberOfNotifications=$scope.notifications.length;
                $scope.currentNotificationId = $scope.notifications[$scope.notifications.length-1].id_notification;
                    
            });
        }
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
		/*firebase.auth().signOut().then(function() {
			// Sign-out successful.
		
		}, function(error) {
			// An error happened.
			console.log(error, '503 Service Unavailable');;

		});*/
	}
    
    /* regist new user on user details section */
    $scope.regist = function() {
        $scope.userDetails = false;
        $scope.registUser=true;
        $scope.search=false;
    }
    /* -------------- END MOBILE -------------- */

    /* init QuestionsController  */
    $scope.viewType();
    $scope.initData();
    $scope.validateUserLoggedIn();
    $scope.getAllRequests();
   
}])

app.factory("WorldSharesService", function($q, $http, $timeout){

    var getAllMyWorldShares = function(data) {
        var deferred = $q.defer();

        $timeout(function() {
            deferred.resolve($http.get('/worldMyShares', 
            {params: {
                'data': data
            }}));
        }, 2000);
        
        return deferred.promise;
      };
    
      return {
        getAllMyWorldShares: getAllMyWorldShares
      };
});

app.factory("ForumService", function($q, $http, $timeout){

    var getForum = function() {
        var deferred = $q.defer();
    
        $http.get('/forum').then(successCallback, errorCallback);

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
        getForum: getForum
      };
});

app.factory("UserWorldShareService", function($q, $http, $timeout){
    
	var getUsers = function() {
		var deferred = $q.defer();
	
        $http.get('/users').then(successCallback, errorCallback);

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
		getUsers: getUsers
	};
});

app.factory("WorldShareMaterialService", function($q, $http, $timeout){
    var getMaterialComparation = function() {
        var deferred = $q.defer();

        $http.get('/compareMaterials').then(successCallback, errorCallback);

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
        getMaterialComparation: getMaterialComparation
    };
});

app.factory("NotificationWorldShareService", function($q, $http, $timeout){
    var getMyNotifications = function(data) {
        var deferred = $q.defer();

        $http.get('/myNotifications', {params: {'data': data}}).then(successCallback, errorCallback);

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
	
	var getAllNotifications = function() {
		var deferred = $q.defer();
        
        $http.get('/allNotifications').then(successCallback, errorCallback);

        function successCallback(response){
            //success code
            $timeout(function() {
                deferred.resolve(response);
            }, 3000);
        }
        function errorCallback(error){
            //error code
            deferred.reject(status);
        }
	
		return deferred.promise;
	};

    return {
		getMyNotifications: getMyNotifications,
		getAllNotifications: getAllNotifications
    };
});