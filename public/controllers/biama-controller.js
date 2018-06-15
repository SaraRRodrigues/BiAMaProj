app.controller("BiamaController", ['$scope', "UserService", "$http", function($scope,  UserService, $http){
    
    /*UserService.getUsers(function(users){
		$scope.usersDB = users;
        console.log('biama: ', users);
       
    });
    */
}])

/*app.factory("UserService", function($http){
    return{
        getUsers: function(){
            
           return $http.get('/users')
                        .then(function(response) {
					//debugger
                    console.log(response);
                    return response.data;
            });
        }
    }
});
*/
