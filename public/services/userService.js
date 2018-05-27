app.factory("UserService", function($http){
    return{
        getUsers: function(){
            
                $http.get('/perfilPage')
                        .then(function(response) {
                
                    //console.log(response);
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
