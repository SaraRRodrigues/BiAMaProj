
app.controller("ForumController", ['$scope', "ForumMaterialService", "$http", "jQuery", function($scope, ForumMaterialService, $http){

	/* hide footer of index page because of click in buttons footer reload page */
	jQuery("#footerMain").hide();
	/* my current page */
	$scope.namePage='forum';
	$scope.nameclick='forum';
	
  	var window_width = $( window ).width();
	if(window_width <= 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
	}

	$scope.resultSearch = [];
    $scope.showDetailsOfMaterial=false;
	$scope.miniSearchResults=false;
	$scope.showForum = true;

	$scope.getMaterials = ForumMaterialService.getMaterialComparation(function(infoMaterial){});
	$scope.getMaterials.then(function(result) {
		$scope.loading = false;
		var data=result.data.comparationDetails;
		$scope.materialsToSearch = data;

    });
	
	$scope.changeColorClick = function(name) {
		$scope.userDetails = false;
		$scope.search = false;
		$scope.nameclick=name;
	}
	$scope.goToHomePage = function() {
		window.setTimeout("location.href = 'http://localhost:8080'")
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

			$scope.showCategory=true;
            $scope.showMaterialDetails=false;
			$scope.showLocation=false;
			$scope.showForum = false;
		}
	}

	$scope.closeMaterial = function(){
		$scope.miniSearchResults=false;
        $scope.showDetailsOfMaterial=false;
		$scope.showLocation=true;
		$scope.showForum = true;
	}

    $scope.closeMiniSearch = function() {
		$scope.miniSearchResults = false;
		$scope.search=true;
		$scope.openMaterialDetail=false; 
		$scope.showInitSearch=true;
		$scope.showSearch=false;
		$scope.enableUserIcon=false;
		$scope.showCategory=false;
        $scope.showMaterialDetails=false;
		$scope.showLocation=true;
		$scope.showForum = true;
	}

	$scope.openMaterial = function(material) {
		$scope.miniSearchResults=false;
		$scope.showDetailsOfMaterial=true;
		$scope.showMaterials=false;
		$scope.openedMaterial=material;
        $scope.showLocation=false;
	}
	
	$scope.clickTopSearch = function() {
		if($scope.showSearch){
			$scope.showSearch = false;
		}else {
			$scope.showSearch = true;
		}
	}

	$scope.reloadQuestions = function() {
		window.setTimeout("location.href = 'http://localhost:8080/BiAMa/questionsForumMobile'")
	}

	$scope.reloadCuriosities = function() {
		window.setTimeout("location.href = 'http://localhost:8080/BiAMa/curiositiesForumMobile'")
	}

	$scope.reloadWorldShares = function() {
		window.setTimeout("location.href = 'http://localhost:8080/BiAMa/worldSharesForumMobile'")
	}
}])
.config(function($routeProvider, $locationProvider) {

	$routeProvider.when('/BiAMa/curiositiesForum', {
		templateUrl: 'views/curiositiesForum',
		controller: 'CuriosityForumController'
	})
	$routeProvider.when('/BiAMa/questionsUsersForum', {
	  templateUrl: 'views/questionsUsersForum',
	  controller: 'QuestionsUsersForumController'
	});
	$routeProvider.when('/BiAMa/worldSharesForum', {
		templateUrl: 'views/worldSharesForum',
		controller: 'WorldShareForumController'
	  });
	
	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);
})

app.factory("ForumMaterialService", function($q, $http, $timeout){
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