app.controller('FavoritesController',['$scope', "$http", function($scope, $http) {
    
    $scope.showQuestions = false;
    $scope.showMaterials = true;
    $scope.showFavorites = false;

    $scope.favorites = ['Materiais', 'Perguntas']

    $scope.getValues = function(){
        var value = document.getElementById('selectedFav');
        $scope.itemSelecionado = value.options[value.selectedIndex].text

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
    
    $scope.getFavorites = function() {
        if($scope.showFavorites){
			$scope.showFavorites = false;
		}else {
			$scope.showFavorites = true;
		}
    }

    $scope.selectFavorite = function(favorite){
		if(favorite == 'Materiais'){
            $scope.showQuestions = false;
            $scope.showMaterials = true;
        }else {
            $scope.showQuestions = true;
            $scope.showMaterials = false;

        }
	}
    
}])