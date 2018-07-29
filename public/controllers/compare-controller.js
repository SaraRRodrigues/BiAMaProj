app.controller("CompareController", ['$scope',"CompareMaterialService","jQuery", "$http", function($scope, CompareMaterialService, $http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='compare';

    $scope.showMaterialsCompare=false;
    $scope.searchToCompare=true;
    $scope.materialToCompare=[];
    $scope.loading = true;

    $scope.searchMaterial = function() {
        $scope.searchToCompare=true;
    }

    $scope.selectedMaterial = function() {

        $scope.showMaterial=true;
        var valueSearchMaterial=jQuery( "#tags" ).val();
        var result=valueSearchMaterial.split('-');

        var type=result[0];
        var category=result[1];

        for(var index=0; index<$scope.materialComparation.length; ++index) {
            if($scope.materialComparation[index].type === type && $scope.materialComparation[index].category === category) {
                var result = {
                    'image': $scope.materialComparation[index].name,
                    'category': $scope.materialComparation[index].category,
                    'text': $scope.materialComparation[index].description
                }
                $scope.materialToCompare.push(result);
                break;
            }
        }
        $scope.showMaterialsCompare=true;
    }

    $scope.getMaterials.then(function(result) {
		$scope.loading = false;
		var data=result.data.comparationDetails;
		$scope.materialComparation=data;

		for(var index=0; index<$scope.materialComparation.length; ++index) {
			$scope.compareMaterials.push($scope.materialComparation[index].type + '-' +  $scope.materialComparation[index].category)
		}

		jQuery( function() {
			var availableTags = $scope.compareMaterials;
		jQuery( "#tags" ).autocomplete({
			source: availableTags
		});
		} );
	}); 
}])
