
app.controller("PerfilController", ['$scope', "$http", "jQuery", function($scope, $http){

    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='perfil';
   
    $scope.name='';
    $scope.username='';
    $scope.imageUser='';
    $scope.email='';
    $scope.birthdate='';
    $scope.new_birthdate='';
    $scope.password='';
    $scope.upgradeInformations=false;

    $scope.initUserDetails= function() {
        for(var index=0; index<$scope.users.length; ++index) {
            if($scope.users[index].id === $scope.idUserLoggerIn){
                $scope.name=$scope.users[index].name;
                $scope.username=$scope.users[index].username;
                $scope.imageUser=$scope.users[index].image;
                $scope.email=$scope.users[index].email;
                $scope.birthdate=new Date($scope.users[index].birthdate).toLocaleDateString();
                $scope.password=$scope.users[index].password;
            }
        }
    }
    
    $scope.clickUserDetails = function() {
        $scope.upgradeInformations=true; 
        $scope.invalidDate=false;
        $scope.invalidEmail=false;
        $scope.fieldsEmpty=false;
    }

    $scope.doneUpgrade = function(username, email, birthdate, password, image) {
        $scope.upgradeInformations=false; 

        if(username === '' || email === '' || birthdate === '' || password === '') {
            $scope.fieldsEmpty=true;
        } else {
            $scope.fieldsEmpty=false;
        }
        if(!$scope.validEmail(email)) {
            $scope.invalidEmail=true;
            $scope.fieldsEmpty=false;
        } 
        
        if($scope.birthdate === undefined || $scope.birthdate==='') {
            $scope.invalidDate=true;
        } else {
            $scope.birthdate=birthdate.toLocaleDateString();
            $scope.invalidDate=false;
        }
        //fazer update na base de dados
        if(!$scope.invalidEmail && !$scope.fieldsEmpty && !$scope.invalidDate) {
            for(var index=0; index<$scope.users.length; ++index) {
                if($scope.users[index].id === $scope.idUserLoggerIn){
                    $scope.updateUserDetails($scope.users[index].id, $scope.users[index].name
                        , email, $scope.birthdate, image 
                        , username, password);
                    break;
                }
            }
        }
    }

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
        
        $http.post('/updateUserDetails', data);
    }

    $scope.validEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $scope.validBirthDate = function(birthdate) {
        var pattern =/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
        return pattern.test(birthdate);
    }

    $scope.initUserDetails();
    
}])