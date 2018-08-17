app.controller("WorldShareController", ['$scope',"WorldSharesService", "ForumService","UserWorldShareService", "$http", "jQuery", function($scope,WorldSharesService,ForumService,UserWorldShareService,$http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='worldShares';	

    $scope.numberOfNewShares=[
        {
        'insert': true
        }
    ];
    $scope.descriptionWorldShare='';
    $scope.savePhoto=false;
    $scope.openWorldShareUploadLabel=false;

    var window_width = $( window ).width();
	if(window_width <= 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
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
    
    $scope.confirmSessionAction = function (username, password) {

		$scope.users = 'loadUser';
		var getAllUsers = UserWorldShareService.getUsers(function(users){});
		
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

    $scope.loading = true;
    $scope.showWorldShares=true;
    $scope.addWorldShare=false;
    $scope.getMyWorldShares = WorldSharesService.getAllMyWorldShares(function(infoMyWorldShares){});

    $scope.getMyWorldShares.then(function(result) {
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
    
    $scope.goToHomePage = function() {
        window.setTimeout("location.href = 'http://localhost:8080'")
    }

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

    $scope.openBigImage = function(image) {
        $scope.showBigImage=true;
        $scope.showWorldSharesDetails=false;
        $scope.bigImage=image;
    }

    $scope.closeWorldShareImage = function() {
        $scope.showBigImage=false;
        $scope.showWorldSharesDetails=true;
    }

    $scope.openAddWorldShare = function() {
        $scope.addWorldShare=true;
        $scope.showWorldShares=false;
    }

    $scope.openWorldShareUpload = function() {
        $scope.openWorldShareUploadLabel=true;
    }
    
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
    
    $scope.cancelInsertWorldShare = function() {
        $scope.descriptionWorldShare='';
        $scope.imageWorldShare='';
        $scope.openWorldShareUploadLabel=true;
        $scope.savePhoto=false;
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

    $scope.saveConfigInsertWorldShare = function (image, description) {  
        debugger
        if(image !== undefined) {
            var data = {
                'forumType': $scope.forumType, 
                'title': $scope.title,
                'image': image,
                'description': description
            }
            $http.post('/insertWorldShares', data);
        }
    }

    $scope.postUpload = function(valueInput) {
        console.log('x: ', valueInput);
        var inputResult = jQuery('#uploadPictureWorldShare');

        console.log('file: ', inputResult);
        var fd = new FormData();
        fd.append('file', inputResult);

        
    }
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
            alert(file.name);
        }
    }
}])

app.factory("WorldSharesService", function($q, $http, $timeout){

    var getAllMyWorldShares = function(data) {
        var deferred = $q.defer();

        $timeout(function() {
            deferred.resolve($http.get('/worldMyShares'));
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
    
        $timeout(function() {
          deferred.resolve($http.get('/forum'));
        }, 2000);
    
        return deferred.promise;
      };
    
      return {
        getForum: getForum
      };
});

app.factory("UserWorldShareService", function($q, $http, $timeout){
    
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