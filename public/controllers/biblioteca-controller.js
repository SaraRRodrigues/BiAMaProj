
app.controller("BibliotecaController", ['$scope', "$http", function($scope, $http){

  $scope.imagesLibrary = [];
    $scope.imagesLibrary.push({
        imgPath: '../images/plastic.jpg'
    })
    $scope.imagesLibrary.push({
        imgPath: '../images/metal.jpg'
    })
    $scope.imagesLibrary.push({
        imgPath: '../images/ceramica.jpg'
    })
    $scope.imagesLibrary.push({
        imgPath: '../images/madeira.jpg'
    })
    
}])