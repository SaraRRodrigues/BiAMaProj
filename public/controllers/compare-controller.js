app.controller("CompareController", ['$scope', "$http", "jQuery", function($scope, $http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='compare';
        
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