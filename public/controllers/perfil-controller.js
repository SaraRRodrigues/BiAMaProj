
app.controller("PerfilController", ['$scope', "$http", "jQuery", function($scope, $http){

    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='perfil';
    
    var window_width = $( window ).width();
	if(window_width <= 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
	}
   
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

    $scope.initUserDetails= function() {
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
    
    $scope.clickUserDetails = function() {
        $scope.birthdateValue='';
        $scope.editDate=true;
        $scope.upgradeInformations=true;
        $scope.invalidDate=false;
        $scope.invalidEmail=false;
        $scope.fieldsEmpty=false;
    }

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
            for(var index=0; index<$scope.users.length; ++index) {
                if($scope.users[index].id === $scope.idUserLoggerIn){
                    $scope.updateUserDetails($scope.users[index].id, $scope.users[index].name
                        , email, $scope.birthdateValue, image 
                        , username, password);
                    break;
                }
            }
        }
        $scope.upgradeInformations=false;
    }

    $scope.validDataNotEquals = function(username, password) {
		for(var index=0; index<$scope.users.length; ++index) {
			if(username === $scope.users[index].username) {
				return false;
			}
		}
		return true;
    },
    
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

    $scope.validEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $scope.validBirthDate = function(birthdate) {
       /* var pattern =/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
        return pattern.test(birthdate);*/
    }

    $scope.saveUploadFile = function () {
        var splitDeviceRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;
        var res = splitDeviceRe.exec(($("#uploadPicture").val()));
        $scope.imageUser=res[2];
        
        $scope.openImageUploadLabel=false;
    }

    $scope.openImageUpload = function() {
        $scope.openImageUploadLabel=true;
    }

    $scope.initUserDetails();
    
}])