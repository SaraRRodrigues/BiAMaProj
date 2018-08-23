app.controller("PerfilController", ['$scope', "UserPerfilService", "PerfilMaterialService", "$http", "jQuery", function($scope, UserPerfilService, PerfilMaterialService, $http){

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
		var splitLocation = location.href.split('=');
		$scope.idUserLoggerIn =splitLocation[1];
	
		if($scope.idUserLoggerIn !== undefined) {
			$scope.confirmSession=true;
		} else {
			$scope.loading = true;
			$scope.confirmSession=false;
		}
    }
    /* -------------- INIT DESKTOP & MOBILE -------------- */
	/* get information of user and materials to display on search */
	$scope.getAllRequests = function() {
        var getAllUsers = UserPerfilService.getUsers(function(users){});
        getAllUsers.then(function(usersDB) {
            $scope.loading=false;
            $scope.users = usersDB.data.users;
            for(var index=0; index<$scope.users.length; ++index){
                $scope.username = $scope.users[index].username;
                $scope.password = $scope.users[index].password;
                $scope.imageUser = $scope.users[index].image;
                $scope.email = $scope.users[index].email;
                $scope.name=$scope.users[index].name;
                $scope.birthdateValue = $scope.users[index].birthdate;
    
                if($scope.userName !== null && $scope.userName === $scope.username){
                    if($scope.userPassword !== null && $scope.userPassword === $scope.password){
                        $scope.userLoggedIn=$scope.users[index].username;
                        $scope.idUserLoggerIn=$scope.users[index].id;
                        $scope.confirmSession = true;
                        break;
                    }
                }
            }
        });

        var getMaterials = PerfilMaterialService.getMaterialComparation(function(infoMaterial){});
        getMaterials.then(function(result) {
            $scope.loading = false;
            var data=result.data.comparationDetails;
            $scope.materialsToSearch = data;
        });
    
    }
    
    /* redirect to homepage with arrow */
    $scope.goToHomePage = function() {
        window.setTimeout("location.href = 'http://localhost:8080'")
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
            if(!$scope.editDate && birthdate.includes("/") ){
                $scope.birthdateValue=birthdate;             
            } else if($scope.editDate){
                $scope.birthdateValue=birthdate.toLocaleDateString();
            }
            $scope.invalidDate=false;
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

        $scope.showPerfilDetails=true;
        var splitLocation = location.href.split('&');
      
        $scope.idUserLoggerIn = splitLocation[0].split('=')[1];
        $scope.username = splitLocation[1].split('=')[1];
        $scope.password = splitLocation[2].split('=')[1];
        $scope.imageUser = splitLocation[3].split('=')[1];
        $scope.birth = (splitLocation[4].split('=')[1]).split('-');

        $scope.birthdateValue = $scope.birth[0] + '/' + $scope.birth[1] + '/' + $scope.birth[2];
        $scope.name = splitLocation[5].split('=')[1];
        $scope.email = splitLocation[6].split('=')[1];
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
          
          $scope.showPerfilDetails=false;
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
		var getAllUsers = UserPerfilService.getUsers(function(users){});
		
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

    /* logout of user details section */
    $scope.logout = function(){
		$scope.confirmSession = false;
		/*firebase.auth().signOut().then(function() {
			// Sign-out successful.
		
		}, function(error) {
			// An error happened.
			console.log(error);

		});*/
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
                $http.post('/updateUserDetails', data);
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

    /* validate date of birth format */
    $scope.validBirthDate = function(birthdate) {
       /* var pattern =/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
        return pattern.test(birthdate);*/
    }
    /* -------------- END MOBILE -------------- */

	/* init PerfilController  */
	$scope.viewType();
	$scope.initData();
    $scope.getAllRequests();
    $scope.initUserDetails();
    $scope.validateUserLoggedIn();

    if($scope.isMobileView) {
        $scope.getData();
    }
}])

app.factory("UserPerfilService", function($q, $http, $timeout){
    
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