app.controller("WhereWeAreController", ['$scope', "$http" , "UserService", function($scope, $http,UserService){
    $scope.biamaPage = false;
    $scope.showSchools = false;
    $scope.schools = ['Instituto Superior Técnico', 'Faculdade de Ciências e Tecnologias']

    $scope.getSchools = function () {
        if($scope.showSchools){
			$scope.showSchools = false;
		}else {
			$scope.showSchools = true;
		}
    }
}])