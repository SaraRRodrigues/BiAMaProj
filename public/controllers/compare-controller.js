app.controller("CompareController", ['$scope', "$http", "jQuery", function($scope, $http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='compare';
    $scope.showMaterialsCompare=false;
    $scope.searchToCompare=true;
    $scope.countries=[];
    $scope.materialToCompare=[];

    for(var index=0; index<$scope.materialComparation.length; ++index) {
        $scope.countries.push($scope.materialComparation[index].type + '-' +  $scope.materialComparation[index].category)
    }

    $scope.searchMaterial = function() {
        $scope.searchToCompare=true;
    }

    jQuery( function() {
        var availableTags = $scope.countries;
    jQuery( "#tags" ).autocomplete({
        source: availableTags
    });
    } );

    $scope.selectedMaterial = function() {
        debugger
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
}])