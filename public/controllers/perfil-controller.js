
app.controller("PerfilController", ['$scope', "$http", "jQuery", function($scope, $http){

    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='perfil';

    $scope.username='';
    $scope.email = '';
    $scope.birthdate = '';
    $scope.password = '';

    $scope.clickUserDetails = function(username, email, birthdate, password) {
        debugger
        if(username === '' || email === '' || birthdate === '' || password === '') {
            $scope.fieldsEmpty=true;
        } else {
            $scope.fieldsEmpty=false;
        }
        if(!$scope.validateEmail(email)) {
            $scope.invalidEmail=true;
            $scope.fieldsEmpty=false;
        } 
        
        $scope.birthdate=birthdate.toLocaleDateString();

        //fazer update na base de dados
        if(!$scope.invalidEmail && !$scope.fieldsEmpty) {
            for(var index=0; index<$scope.users.length; ++index) {
                if($scope.users[index].id === $scope.idUserLoggerIn){
                    var data
                    $scope.updateUserDetails($scope.users[index].id, $scope.users[index].name
                        , email, birthdate, $scope.users[index].image 
                        , username, password);
                    break;
                }
            }
        }
    }

    $scope.updateUserDetails = function(id, name, email, birthdate, image, username, password) {
        debugger        
        $scope.loadingSchool=true;
        var data = {
            'idUser': id,
            'name': name,
            'email': email,
            'birthdate': birthdate, 
            'username': username,
            'password': password
        }
        
        $http.post('/updateUserDetails', data);
    }

    $scope.validateEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    
}])
