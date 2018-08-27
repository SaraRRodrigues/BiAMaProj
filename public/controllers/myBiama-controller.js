
app.controller("MyBiamaController", ['$scope', "MyBiamaService","MaterialsBiamaService", "MyBiAMaInfoService", "UserMyBiamaService","NotificationMyBiamaService","$http", "jQuery",function($scope, MyBiamaService,MaterialsBiamaService,MyBiAMaInfoService, UserMyBiamaService,NotificationMyBiamaService,$http){

	/* hide footer of index page because of click in buttons footer reload page */
	jQuery("#footerMain").hide();

	/* define view of app */
	$scope.viewType = function() {
		var window_width = $( window ).width();
		if(window_width <= 1024) {
			$scope.isMobileView=true;
		} else {
			$scope.isMobileView=false;
		}
	}

	/* init my variables data */
	$scope.initData = function() {
		/* my current page */
		$scope.namePage='myBiama';
		$scope.nameclick='myBiama';

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
		$scope.categories = [];
		$scope.createdMyBiama = false;
		$scope.loading = true;
		$scope.showBiamaInitPage = true;
		$scope.biamaUp = false;
	}

	/* verify if user is logged in */
    $scope.validateUserLoggedIn = function() {
        var splitLocation = location.href.split('=');
        $scope.idUserLoggerIn =splitLocation[1];
        
        if($scope.idUserLoggerIn !== undefined) {
            $scope.doLogin=false;
            $scope.confirmSession=true;
        } else {
            $scope.doLogin=true;
            $scope.loading = true;
            $scope.confirmSession=false;
        }
    }
	/* -------------- INIT DESKTOP & MOBILE -------------- */
	/* get information of biama and materials to display on search */
	$scope.getAllRequests = function() {
		$scope.getMaterialInfo = MaterialsBiamaService.getMaterial(function(infoMaterial){});
		/* get information of material and of library - when i do get library */
		$scope.getMaterialInfo.then(function(result) {
			$scope.loading = false;
			var data=result.data.materialsCategories;
			$scope.materialsCategories=data;
			for(var index=0; index<$scope.materialsCategories.length; ++index){
				if(index<7){
					$scope.categories.push($scope.materialsCategories[index].category)
				} else {
					break;
				}
			}
			jQuery( function() {
				var availableTags = $scope.categories;
			jQuery( "#category" ).autocomplete({
				source: availableTags
			});
			} );
	
			$scope.idMaterial = parseInt($scope.materialsCategories[$scope.materialsCategories.length-1].id) + 1;
			$scope.codeMaterial = parseInt($scope.materialsCategories[$scope.materialsCategories.length-1].code) + 1;
		});
	
		$scope.loading=true;
		var getMyBiamaInfo = MyBiamaService.getMyBiamaInfo(function(infoMyBiama){});
		getMyBiamaInfo.then(function(result) {
			$scope.loading = false;
			$scope.biamaUp = true;
			var data=result.data.biamaDetails;
			$scope.descriptionMyBiama=data[0].description;
		});

		var getBiamaInfo = MyBiAMaInfoService.getBiAMaInfo(function(infoBiama){});
		getBiamaInfo.then(function(result) {
			$scope.loading = false;
			var data=result.data.biamaDetails;
			$scope.idLibrary=data[data.length-1].id_library+1;
		});

		var getUsersMyBiama = UserMyBiamaService.getUsers(function(users){});
		getUsersMyBiama.then(function(usersDB) {
			$scope.users = usersDB.data.users;
		});

		var getMyBiamaLibraryUser = UserMyBiamaService.getLibraryUserDetails(function(infoMyBiama){});
		getMyBiamaLibraryUser.then(function(result) {
			$scope.loading = false;
			var data=result.data.userLibrary;
			$scope.userLibrary=data;
		});

		var getNotifications = NotificationMyBiamaService.getAllNotifications(function(infoNotification){});
			getNotifications.then(function(result) {
			$scope.loading = false;
			var data=result.data.notificationDetails;
			$scope.notifications=data;
			$scope.numberOfNotifications=$scope.notifications.length;
			$scope.currentNotificationId = $scope.notifications[$scope.notifications.length-1].id_notification;
		});
	}
	
	/* redirect to homepage with arrow */
	$scope.goToHomePage = function() {
		if($scope.idUserLoggerIn !== undefined) {
			location.href = 'http://localhost:8080?userName=' + $scope.idUserLoggerIn;
		} else {
			location.href = 'http://localhost:8080?username=' + 'anonymous';
		}
	}

	/* display mode of create biama */
	$scope.createMyBiama = function() {
		
		if($scope.showMyBiamaConf){
			$scope.showBiamaInitPage = true;
			$scope.showMyBiamaConf = false;
        }else {
			$scope.showBiamaInitPage = false;
			$scope.showMyBiamaConf = true;
			
        }
	}

	/* remove material that been inserted*/
	$scope.removeMaterial = function() {
		$scope.imageMaterial='';
		$scope.showInsertedImage = false;
	}

	/* save information of new biama in pdf file */
	$scope.saveInfo = function(descBiama, locationBiama, categoryBiama, colorMaterial, codeMaterial,imageMaterial,descriptionMaterial) {
		$scope.showMaterials = false;
		
		if($scope.descriptionNewBiama !== '' && $scope.locationNewBiama !== '' && $scope.categoryMaterial !== ''
		&& $scope.colorMaterial !== '' && $scope.codeMaterial !== '' && $scope.imageMaterial !== '' && $scope.descriptionMaterial !== '') {
			$scope.codeMaterial = $scope.codeMaterial + "";
			// Default export is a4 paper, portrait, using milimeters for units
			var doc = new jsPDF();
			
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

			$scope.typeMaterial = $scope.categoryMaterial;

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

			$scope.insertMyBiamaOnDB();
		}
	}

	/* insert new biama on database */
	$scope.insertMyBiamaOnDB = function() {
		$scope.locationIframe = '';
		if($scope.locationNewBiama == 'Instituto Superior Técnico') {
			$scope.locationIframe = 'embed?pb=!1m18!1m12!1m3!1d3112.171639197157!2d-9.140899049968251!3d38.73682336389977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1933a24aa81f17%3A0x880c7c731a54423!2sInstituto+Superior+T%C3%A9cnico!5e0!3m2!1spt-PT!2spt!4v1529528847654';
		} else if($scope.locationNewBiama == 'Escola Superior de Educação de Lisboa') {
			$scope.locationIframe = 'embed?pb=!1m18!1m12!1m3!1d6223.537995391765!2d-9.19961064513007!3d38.74606284620067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1eccd41dcab0e3%3A0x2f691f9dce18f0f5!2sEscola+Superior+de+Educa%C3%A7%C3%A3o+de+Lisboa%2C+Lisboa!5e0!3m2!1spt-PT!2spt!4v1529528684919';
		} else if($scope.locationNewBiama == 'Instituto Superior de Engenharia de Lisboa') {
			$scope.locationIframe = '';
		}
		var data = {
			'idLibrary': $scope.idLibrary,
			'location': $scope.locationIframe,
			'description':  $scope.descriptionNewBiama,
			'locationDescription': $scope.locationNewBiama
		}
		$http.post('/insertMyBiama', data);
		$scope.createdMyBiama = true;
		$scope.registUser = true;
		$scope.showBiamaInitPage = false;
		$scope.showMyBiamaConf = false;

	}

	/* created user: insert user on database */
	$scope.insertUser = function(name, username, email, birthdate, password) {

		if(name === undefined && username === undefined && email === undefined && birthdate === undefined && password === undefined) {
			$scope.emptyData=true;
		} else {
			var idUser = $scope.users[$scope.users.length-1].id;
			$scope.insertedIdUser=idUser;
			var data = {
				'idUser': parseInt(idUser)+1,
				'name': name,
				'email': email,
				'birthdate': birthdate.toLocaleDateString(), 
				'username': username,
				'password': password,
				'image': $scope.image
			}
			if($scope.image == undefined) {
				data.image='noImage';
			}

			var validData = $scope.validDataNotEquals(data.username, data.password);
			
			if(validData) {
				var validBirthdate = $scope.validDateOfBirth(data.birthdate);
				if(validBirthdate){
					$http.post('/insertUserDetails', data);

					var dataLibraryUser = {
						'idUser': data.idUser,
						'idLibrary': $scope.idLibrary
					}

					$http.post('/insertLibraryUser', dataLibraryUser);

				} else {
					$scope.underAge=true;
				}
			} else {
				$scope.usernameRepeated=true;
			}

			/* insert notification */
			debugger
			if($scope.createdMyBiama) {
				if($scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== '') {
					var data = {
						'id_notification': parseInt($scope.currentNotificationId)+1,
						'text_notification': 'A sua BiAMa foi criada pelo utilizador ' + name,
						'date_notification': 'Agora mesmo',
						'insert_notification': 'yes',
						'id_user': $scope.idUserLoggerIn
					}
				} else {
					var data = {
						'id_notification': parseInt($scope.currentNotificationId)+1,
						'text_notification': 'A sua BiAMa foi criada pelo utilizador ' + name,
						'date_notification': 'Agora mesmo',
						'insert_notification': 'yes',
						'id_user': parseInt(idUser)+1
					}
				}
				
				$http.post('/insertNotifications', data);
			}
		}

		$scope.insertMaterialOnLibraries();
	}

	/* validate if data not exists already */
	$scope.validDataNotEquals = function(username, password) {
		for(var index=0; index<$scope.users.length; ++index) {
			if(username === $scope.users[index].username) {
				return false;
			}
		}
		return true;
	}

	/* validate date of birth format */
	$scope.validDateOfBirth = function(dateOfBirth) {
		var resultBirth = dateOfBirth.split("/");

		var currentDate = new Date();
		currentDate=currentDate.toLocaleDateString();
		var resultCurrentDate = currentDate.split("/");

		var calculateYear = parseInt(resultCurrentDate[2]) - parseInt(resultBirth[2]);
		if(calculateYear < 18) {
			return false;
		}
		return true;
	}

	/* insert material that been inserted on new biama form  */
	$scope.insertMaterialOnLibraries = function() {
		
		var data = {
			'idMaterial': $scope.idMaterial,
			'type': $scope.typeMaterial,
			'color':  $scope.colorMaterial,
			'code': $scope.codeMaterial,
			'name': $scope.imageMaterial,
			'category': $scope.categoryMaterial,
			'description': $scope.descriptionMaterial,
		}

		$http.post('/insertMaterial', data);
		
		var dataLibraryMaterial = {
			'idLibrary': $scope.idLibrary,
			'idMaterial': data.idMaterial
		}

		$http.post('/insertLibraryMaterial', dataLibraryMaterial);

		window.setTimeout("location.href = 'http://localhost:8080'")
	}

	/* insert image on new biama form */
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

	/* filter of categories - shows all categories that are in database */
	$scope.allCategories = function() {
		
		if($scope.showAllCategories){
			$scope.showAllCategories = false;
        }else {
			$scope.showAllCategories = true;
			
        }
	}

	/* filter of colors - shows all colors that are in database */
	$scope.allColors = function() {
		
		if($scope.showAllColors){
			$scope.showAllColors = false;
        }else {
			$scope.showAllColors = true;
			
        }
	}
	/* -------------- END DESKTOP & MOBILE -------------- */

	/* search of colors */
	$scope.optionColors = ['preto', 'branco', 'cinzento', 'azul', 'beje', 'verde', 'rosa', 'laranja', 'castanho', 'amarelo', 'diamante', 'vermelho'];
	jQuery( function() {
		$scope.availableTags = $scope.optionColors;
	jQuery( "#colors" ).autocomplete({
		source: $scope.availableTags
	});
	});

	/* search of schools */
	$scope.locationBiama = ['Instituto Superior Técnico', 'Escola Superior de Educação de Lisboa', 'Instituto Superior de Engenharia de Lisboa'];
	jQuery( function() {
		$scope.availableTags = $scope.locationBiama;
	jQuery( "#location" ).autocomplete({
		source: $scope.availableTags
	});
	});

	/* init MainController  */
	$scope.viewType();
	$scope.initData();
    $scope.validateUserLoggedIn();
	$scope.getAllRequests();
}])

app.factory("MaterialsBiamaService", function($q, $http, $timeout){
	
	var getMaterial = function() {
		var deferred = $q.defer();

		$timeout(function() {
		  deferred.resolve($http.get('/materialsCategories'));
		}, 2000);
	
		return deferred.promise;
	  };
	
	  return {
		getMaterial: getMaterial
	  };
});

app.factory("MyBiAMaInfoService", function($q, $http, $timeout){
    
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

app.factory("UserMyBiamaService", function($q, $http, $timeout){
    
	var getUsers = function() {
		var deferred = $q.defer();
	
 		$timeout(function() {
		  deferred.resolve($http.get('/users',  {cache:true}));
		}, 2000); 

		return deferred.promise;
	};

	var getLibraryUserDetails = function() {
		
		var deferred = $q.defer();

		$timeout(function() {
			deferred.resolve($http.get('/getLibraryUser'));
		}, 2000);

		return deferred.promise;
	}

	return {
		getUsers: getUsers,
		getLibraryUserDetails: getLibraryUserDetails
	};
});

app.factory("NotificationMyBiamaService", function($q, $http, $timeout){
    var getMyNotifications = function(data) {
        var deferred = $q.defer();

        $timeout(function() {
        deferred.resolve($http.get('/myNotifications', 
        {params: {
            'data': data
        }}));
        }, 2000);

        return deferred.promise;
    };
	
	var getAllNotifications = function() {
		var deferred = $q.defer();
	
		$timeout(function() {
		  deferred.resolve($http.get('/allNotifications'));
		}, 2000);
	
		return deferred.promise;
	};

    return {
		getMyNotifications: getMyNotifications,
		getAllNotifications: getAllNotifications
    };
});