app.controller("BiamaController", ['$scope', "UserService", "$http", function($scope,  UserService, $http){

    UserService.getUsers(function(users){
		$scope.UsersList = users;
		
		console.log(users);
	});
}])

app.factory("UserService", function($http){
    return{
        getUsers: function(){
            
           return $http.get('/biama')
                        .then(function(response) {
					//debugger
                    console.log(response);
                    return response.data;
            });
        }
    }
});

