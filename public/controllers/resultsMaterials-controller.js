app.controller('SearchController',['$scope', "$http", function($scope, $http) {
    
    $scope.imageMaterials = [];
    $scope.imageMaterials.push({
        imgPath: '../images/people_1.jpg',
        desc: 'best1'
    })
    $scope.imageMaterials.push({
        imgPath: '../images/people_2.jpg',
        desc: 'best2'
    })
    $scope.imageMaterials.push({
        imgPath: '../images/people_3.jpg',
        desc: 'best3'
    })
    $scope.imageMaterials.push({
        imgPath: '../images/people_3.jpg',
        desc: 'best4'
    })
}])