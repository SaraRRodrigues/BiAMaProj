app.controller("CompareController", ['$scope',"CompareMyMaterialService", "$http", "jQuery", function($scope, CompareMyMaterialService, $http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='compare';
    
    var window_width = $( window ).width();
	if(window_width <= 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
    }

    $scope.getMaterials = CompareMyMaterialService.getMaterialComparation(function(infoMaterial){});
    $scope.showMaterialsCompare=false;
    $scope.searchToCompare=true;
    $scope.materialToCompare=[];
    $scope.loading = true;
    $scope.doLogin=false;
    $scope.compareMaterials=[];

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

    $scope.goToHomePage = function() {
        window.setTimeout("location.href = 'http://localhost:8080'")
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

    jQuery("#ui-id-1").css("font-size", "26px");
    
}])
app.factory("CompareMyMaterialService", function($q, $http, $timeout){
    var getMaterialComparation = function() {
        var deferred = $q.defer();

		/*var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var resp = this;
			if (this.readyState == 4 && this.status == 200) {
				var response = resp.response;
				debugger
				deferred.resolve(response);
			}
			
		}

		xhr.open('GET','/compareMaterials', true);
		xhr.send();*/

        $timeout(function() {
        deferred.resolve($http.get('/compareMaterials'));
        }, 4000);

        return deferred.promise;
    };


    return {
        getMaterialComparation: getMaterialComparation
    };
});