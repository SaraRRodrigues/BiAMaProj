var app = angular.module("myApp", []);

app.factory("UserService", function($http){
    return{
        getUsers: function(){
            $http.get('/perfil')
                .then(function(response) {});

        }
    }
});