app.controller("OndeEstamosController", ['$scope', "$http" , "UserService", function($scope, $http,UserService){
    $scope.biamaPage = false;
    $scope.ondeEstamosPage = true;
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