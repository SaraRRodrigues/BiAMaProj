app.controller('FavoritesController',['$scope', "$http", function($scope, $http) {
    

    $scope.showQuestions = false;
    $scope.showMaterials = true;

    $scope.getValues = function(){
        var value = document.getElementById('selectedFav');
        $scope.itemSelecionado = value.options[value.selectedIndex].text

        console.log('selecionado:' + $scope.itemSelecionado);
        if($scope.itemSelecionado === 'Perguntas') {
       
            $scope.showQuestions = true;
            $scope.showMaterials = false;
        } else {
            $scope.showQuestions = false;
            $scope.showMaterials = true;
        }
    }

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