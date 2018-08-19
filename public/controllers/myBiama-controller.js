
app.controller("MyBiamaController", ['$scope', "MyBiamaService","jQuery","$http",function($scope, MyBiamaService,$http){

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
	$scope.showAddNewMaterial = false;
	$scope.newMaterials=[];
	$scope.errorInsertImage=false;

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

	$scope.removeMaterial = function() {
		$scope.imageMaterial='';
		$scope.showInsertedImage = false;
	}

	$scope.saveInfo = function(descBiama, locationBiama, categoryBiama, colorMaterial, codeMaterial,imageMaterial,descriptionMaterial) {
		$scope.showMaterials = false;
		
		if($scope.descriptionNewBiama !== '' && $scope.locationNewBiama !== '' && $scope.categoryMaterial !== ''
		&& $scope.colorMaterial !== '' && $scope.codeMaterial !== '' && $scope.imageMaterial !== '' && $scope.descriptionMaterial !== '') {
		
			// Default export is a4 paper, portrait, using milimeters for units
			var doc = new jsPDF()
			
			doc.text('A sua BiAMa', 10, 10)

			/* INIT: description of my biama */
			doc.setFont("helvetica");
			doc.setFontType("bold");
			doc.text(20, 30, 'Descrição da sua BiAMa');

			doc.setFont("courier");
			doc.setFontType("normal");
			doc.text(25, 40, $scope.descriptionNewBiama);
			/* END: description of my biama */

			/* INIT: location of my biama */
			doc.setFont("helvetica");
			doc.setFontType("bold");
			doc.text(20, 50, 'Localização da sua BiAMa');

			doc.setFont("courier");
			doc.setFontType("normal");
			doc.text(25, 60, $scope.locationNewBiama);
			/* END: location of my biama */

			/* INIT: Materials of my biama */
			doc.setFont("helvetica");
			doc.setFontType("bold");
			doc.text(20, 70, 'Materiais da sua BiAMa');

			/* Category of material */
			doc.setFont("helvetica");
			doc.setFontType("italic");
			doc.text(25, 80, 'Categoria');

			doc.setFont("courier");
			doc.setFontType("normal");
			doc.text(30, 90, $scope.categoryMaterial);
			/* END: category of my biama */

			/* Color of material */
			doc.setFont("helvetica");
			doc.setFontType("italic");
			doc.text(25, 100, 'Cor');

			doc.setFont("courier");
			doc.setFontType("normal");
			doc.text(30, 110, $scope.colorMaterial);
			/* END: color of my biama */

			/* Code of material */
			doc.setFont("helvetica");
			doc.setFontType("italic");
			doc.text(25, 120, 'Código');

			doc.setFont("courier");
			doc.setFontType("normal");
			doc.text(30, 130, $scope.codeMaterial);
			/* END: code of my biama */

			/* Image of material */
			doc.setFont("helvetica");
			doc.setFontType("italic");
			doc.text(25, 140, 'Imagem');

			var category = $scope.categoryMaterial.charAt(0).toUpperCase() + $scope.categoryMaterial.slice(1);
			var img = new Image;
			img.onload = function() {
				doc.addImage(this, 30, 150, 40, 30);
				doc.setFont("courier");
				doc.setFontType("normal");
				//doc.save("test.pdf");
				doc.save('suaBiama.pdf')
			};
			img.crossOrigin = "";  // for demo as we are at different origin than image
			img.src = "../images/categories/" + category + '/' + $scope.imageMaterial;  // some random imgur image

			/* END: image of my biama */

			/* Description of material */
			doc.setFont("helvetica");
			doc.setFontType("italic");
			doc.text(25, 190, 'Descrição');

			doc.setFont("courier");
			doc.setFontType("normal");
			doc.text(30, 200, $scope.descriptionMaterial);
			/* END: image of my biama */

			/* END: Materials of my biama */

			
		}
	}

	$scope.insertImage = function(image) {

		if($scope.categoryMaterial !== '') {
			
			if($scope.showInsertedImage){
				$scope.showInsertedImage = false;
			}else {
				$scope.showInsertedImage = true;
				
			}
			var splitDeviceRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;
			var res = splitDeviceRe.exec(($("#image").val()));
			$scope.imageMaterial=res[2];
			$scope.errorInsertImage=false;
			
			$scope.material = {
				'image': $scope.imageMaterial,
				'category': $scope.categoryMaterial
			}
		} else {
			$scope.errorInsertImage=true;
		}
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
