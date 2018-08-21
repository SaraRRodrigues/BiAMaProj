app.controller("BiamaController", ['$scope', "BiAMaInfoService","BiamaMaterialService", "$http", "jQuery", function($scope,  BiAMaInfoService, BiamaMaterialService, $http){
		
		/* hide footer of index page because of click in buttons footer reload page */
		jQuery("#footerMain").hide();
		//jQuery("#footerMainMobile").hide();
		/* my current page */
		$scope.namePage='biamaPage';

		$scope.miniSearchResults=false;
		$scope.resultSearch = [];
	
    $scope.loading = true;
    var getBiamaInfo = BiAMaInfoService.getBiAMaInfo(function(infoBiama){});
    getBiamaInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.biamaDetails;
        $scope.descriptionBiama=data[0].description;
		});

		$scope.loading = true;
		$scope.getMaterials = BiamaMaterialService.getMaterialComparation(function(infoMaterial){});
		$scope.getMaterials.then(function(result) {
			$scope.loading = false;
			var data=result.data.comparationDetails;
			$scope.materialsToSearch = data;

		});

		$scope.goToHomePage = function() {
			window.setTimeout("location.href = 'http://localhost:8080'")
		}

		$scope.openMaterial = function(material) {
			$scope.showDetailsOfMaterial=true;
			$scope.showMaterials=false;
			$scope.openedMaterial=material;
			$scope.miniSearchResults=false;
		}

		$scope.closeMaterial = function() {
			$scope.miniSearchResults=true;
			$scope.showDetailsOfMaterial=false;
		}

		$scope.clickTopSearch = function() {
			$scope.miniSearchResults = false;
			$scope.showInitSearch=true;
	
				if($scope.showSearch){
					$scope.enableUserIcon=false;
					$scope.showSearch = false;
				}else {
					$scope.enableUserIcon=true;
					$scope.showSearch = true;
				}
		}

		$scope.closeMiniSearch = function() {
			$scope.miniSearchResults = false;
			$scope.search=true;
			$scope.openMaterialDetail=false; 
			$scope.showInitSearch=true;
			$scope.showSearch=false;
			$scope.enableUserIcon=false;
		}

		$scope.initMiniSearch = function() {

			var inputMini = jQuery("#miniSearch").val();
			if(inputMini !== '') {
				for(var index=0; index < $scope.materialsToSearch.length; ++index) {
					var resultMaterial = {
						'name': $scope.materialsToSearch[index].name,
						'category': $scope.materialsToSearch[index].category,
						'description': $scope.materialsToSearch[index].description,
						'code': $scope.materialsToSearch[index].code
					}
					if(($scope.materialsToSearch[index].type).toLowerCase().indexOf(inputMini) !== -1) {
						$scope.resultSearch.push(resultMaterial);
					} else if(($scope.materialsToSearch[index].color).toLowerCase().indexOf(inputMini) !== -1) {
						$scope.resultSearch.push(resultMaterial);
					} else if(($scope.materialsToSearch[index].category).toLowerCase().indexOf(inputMini) !== -1) {
						$scope.resultSearch.push(resultMaterial);
					} else if(($scope.materialsToSearch[index].description).toLowerCase().indexOf(inputMini) !== -1) {
						$scope.resultSearch.push($scope.materialsToSearch[index].name);
					}
				}
		
				$scope.showInitSearch=false;
				$scope.miniSearchResults = true;
			}
		}

}])

app.factory("BiAMaInfoService", function($q, $http, $timeout){
    
	var getBiAMaInfo = function() {
		var deferred = $q.defer();
	
		$timeout(function() {
		  deferred.resolve($http.get('/biamaInfo'));
		}, 2000);
	
		return deferred.promise;
	  };
	
	  return {
		getBiAMaInfo: getBiAMaInfo
	  };
});

app.factory("BiamaMaterialService", function($q, $http, $timeout){
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

