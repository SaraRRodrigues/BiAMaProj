
app.controller("MyBiamaController", ['$scope', "MyBiamaService","$http","jQuery",function($scope, MyBiamaService,$http){

	/* hide footer of index page because of click in buttons footer reload page */
	jQuery("#footerMain").hide();
	/* my current page */
	$scope.namePage='myBiama';

	$scope.showMyBiamaConf = false;
	$scope.showAllOptions = false;
	$scope.descriptionNewBiama = '';
	$scope.locationNewBiama = '';
	$scope.categoryMaterial = '';
	$scope.colorMaterial = '';
	$scope.codeMaterial = '';
	$scope.imageMaterial = '';
	$scope.descriptionMaterial = '';
	$scope.showInsertedImage = false;

	$scope.optionCategories = ['animal', 'ceramic', 'composite', 'metal', 'mineral', 'polymers', 'vegetable'];
	
	jQuery( function() {
		var availableTags = $scope.optionCategories;
	jQuery( "#tags" ).autocomplete({
		source: availableTags
	});
	} );

	jQuery( function() {
		$scope.availableTags = $scope.optionCategories;
	jQuery( "#category" ).autocomplete({
		source: $scope.availableTags
	});
	});

	$scope.optionColors = ['black', 'white', 'gray', 'blue', 'beige', 'green', 'pink', 'orange', 'brown', 'yellow', 'diamond', 'red'];
	jQuery( function() {
		$scope.availableTags = $scope.optionColors;
	jQuery( "#colors" ).autocomplete({
		source: $scope.availableTags
	});
	});

	var window_width = $( window ).width();
	if(window_width <= 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
	}

	$scope.nameclick='myBiama';
	$scope.changeColorClick = function(name) {
		$scope.userDetails = false;
		$scope.search = false;
		$scope.nameclick=name;
	}
	
	$scope.goToHomePage = function() {
		window.setTimeout("location.href = 'http://localhost:8080'")
	}

	$scope.loading=true;
	var getMyBiamaInfo = MyBiamaService.getMyBiamaInfo(function(infoMyBiama){});
	getMyBiamaInfo.then(function(result) {
			$scope.loading = false;
			var data=result.data.biamaDetails;
			$scope.descriptionMyBiama=data[0].description;
	});

	$scope.createMyBiama = function() {
		
		if($scope.showMyBiamaConf){
			$scope.showMyBiamaConf = false;
        }else {
			$scope.showMyBiamaConf = true;
			
        }
	}

	$scope.saveInfo = function(descBiama, locationBiama, categoryBiama, colorMaterial, codeMaterial,imageMaterial,descriptionMaterial) {
		
		if($scope.descriptionNewBiama !== '' && $scope.locationNewBiama !== '' && $scope.categoryMaterial !== ''
		&& $scope.colorMaterial !== '' && $scope.codeMaterial !== '' && $scope.imageMaterial !== '' && $scope.descriptionMaterial !== '') {

			// Default export is a4 paper, portrait, using milimeters for units
			var doc = new jsPDF()
			
			doc.text('Hello world!', 10, 10)
			doc.save('a4.pdf')
		}
	}

	$scope.insertImage = function(image) {
		
		if($scope.showInsertedImage){
			$scope.showInsertedImage = false;
        }else {
			$scope.showInsertedImage = true;
			
        }
		var splitDeviceRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;
        var res = splitDeviceRe.exec(($("#image").val()));
		$scope.imageMaterial=res[2];
	}

	$scope.allCategories = function() {
		
		if($scope.showAllCategories){
			$scope.showAllCategories = false;
        }else {
			$scope.showAllCategories = true;
			
        }
	}

	$scope.allColors = function() {
		
		if($scope.showAllColors){
			$scope.showAllColors = false;
        }else {
			$scope.showAllColors = true;
			
        }
	}
}])
