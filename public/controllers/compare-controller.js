app.controller("CompareController", ['$scope', "$http", function($scope, $http){
    $scope.imageMaterials = [];
    $scope.imageMaterials.push({
        imgPath: '../images/people_1.jpg'
    })
    $scope.imageMaterials.push({
        imgPath: '../images/people_2.jpg'
    })
    $scope.imageMaterials.push({
        imgPath: '../images/people_3.jpg'
    })
    $scope.imageMaterials.push({
        imgPath: '../images/people_3.jpg'
    })
}])