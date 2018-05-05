var app = angular.module("myApp", []);

app.factory("UserService", function($http){
    return{
        getUsers: function(){
            
           return $http.get('/perfilPage')
                        .then(function(response) {
                
                    console.log(response);
                    return response.data;
            });
            
            /*var x = function(data){

                console.log(data)
                return data;
            }*/
                /*.then(function(response) {
                
                    
                    
                    console.log(response);
                    return 'x';
                });*/

        }
    }
});
app.controller("PerfilController", ['$scope', "UserService", "$http", function($scope, UserService, $http){

    UserService.getUsers(function(users){
        $scope.UsersList = users;
        console.log(users);
    });
}])



