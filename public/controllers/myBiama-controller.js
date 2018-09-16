
app.controller("MyBiamaController", ['$scope', "MyBiamaService","MaterialsBiamaService", "MyBiAMaInfoService", "UserMyBiamaService","NotificationMyBiamaService","MyBiamaMaterialService", "$http", "$window", "jQuery",function($scope, MyBiamaService,MaterialsBiamaService,MyBiAMaInfoService, UserMyBiamaService,NotificationMyBiamaService, MyBiamaMaterialService, $http, $window){

	/* hide footer of index page because of click in buttons footer reload page */
	jQuery("#footerMain").hide();
	jQuery("#headerMain").hide();
	jQuery("#searchMain").hide();
	jQuery("#userDetailsMain").hide();
	jQuery("#divControllerMain").removeClass("divController");

	/* define view of app */
	$scope.viewType = function() {
		var window_width = $( window ).width();
		if(window_width <= 1009) {
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
		if(!$scope.isMobileView) {
			var splitLocation = location.href.split('=');
			var splitParams = splitLocation[1].split('&');
			$scope.idUserLoggerIn =splitParams[0];
			$scope.redirect = splitParams[1];
		  
		} else {
			var splitLocation = location.href.split('=');
			$scope.idUserLoggerIn =splitLocation[1];
		}
	
		if($scope.idUserLoggerIn !== "" && $scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect' ) {
			$scope.confirmSession=true;
		} else {
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
			$scope.loading=true;
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
			$scope.loading=false;
		});
	
		var getMyBiamaInfo = MyBiamaService.getMyBiamaInfo(function(infoMyBiama){});
		getMyBiamaInfo.then(function(result) {
			$scope.loading=true;
			$scope.biamaUp = true;
			var data=result.data.biamaDetails;
			$scope.descriptionsOfBiama=data;
			$scope.loading=false;
		});

		var getBiamaInfo = MyBiAMaInfoService.getBiAMaInfo(function(infoBiama){});
		getBiamaInfo.then(function(result) {
			$scope.loading=true;
			var data=result.data.biamaDetails;
			$scope.idLibrary=data[data.length-1].id_library+1;
			$scope.loading=false;
		});

		$scope.getUsersMyBiama = UserMyBiamaService.getUsers(function(users){});
		$scope.getUsersMyBiama.then(function(usersDB) {
			$scope.loading=true;
			$scope.users = usersDB.data.users;
			$scope.loading=false;
			for(var index=0; index<$scope.users.length; ++index){
				
				if($scope.users[index].id === $scope.idUserLoggerIn) {
					$scope.userName = $scope.users[index].username;
					$scope.userPassword = $scope.users[index].password;
					$scope.userLoggedIn=$scope.users[index].username;
					$scope.idUserLoggerIn=$scope.users[index].id;
					$scope.confirmSession = true;
					
					$scope.userImage = $scope.users[index].image;
					$scope.userEmail = $scope.users[index].email;
					$scope.nameUser=$scope.users[index].name;
					$scope.userBirthdate = $scope.users[index].birthdate;
	  
					var splitDateBirth = $scope.userBirthdate.split('/');
					$scope.dayBirth = splitDateBirth[0];
					$scope.monthBirth = splitDateBirth[1];
					$scope.yearBirth = splitDateBirth[2];
					break;
				}
			}
		});

		var getMyBiamaLibraryUser = UserMyBiamaService.getLibraryUserDetails(function(infoMyBiama){});
		getMyBiamaLibraryUser.then(function(result) {
			$scope.loading=true;
			var data=result.data.userLibrary;
			$scope.userLibrary=data;

			if($scope.idUserLoggerIn !== '' && $scope.idUserLoggerIn !== undefined ){
				for(var index=0; index<$scope.userLibrary.length; ++index) {
					if($scope.userLibrary[index].user_id === parseInt($scope.idUserLoggerIn)){
						$scope.myLibrary = $scope.userLibrary[index].library_id;
						break;
					}
				}
	
				for( var index=0; index <$scope.descriptionsOfBiama.length; ++index) {
					if($scope.descriptionsOfBiama[index].id_library === $scope.myLibrary){
						$scope.descriptionMyBiama = $scope.descriptionsOfBiama[index].description;
						break;
					}
				}
			} else {
				$scope.descriptionMyBiama = $scope.descriptionsOfBiama[0].description;
			}
			$scope.loading=false;
			
		});
		var getNotifications = NotificationMyBiamaService.getAllNotifications(function(infoNotification){});
			getNotifications.then(function(result) {
			$scope.loading=true;
			var data=result.data.notificationDetails;
			$scope.notifications=data;
			$scope.numberOfNotifications=$scope.notifications.length;
			$scope.currentNotificationId = $scope.notifications[$scope.notifications.length-1].id_notification;
			$scope.loading=false;
		});

		var getMaterials = MyBiamaMaterialService.getMaterialComparation(function(infoMaterial){});
		getMaterials.then(function(result) {
			$scope.loading=true;
			var data=result.data.comparationDetails;
			$scope.materialsToSearch = data;
			$scope.loading=false;
		});
	}
	
	/* redirect to homepage with arrow */
	$scope.goToHomePage = function() {
		if($scope.idUserLoggerIn !== undefined) {
			location.href = 'https://biamaweb.herokuapp.com?userName=' + $scope.idUserLoggerIn;
		} else {
			location.href = 'https://biamaweb.herokuapp.com?username=' + 'anonymous';
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
	$scope.saveInfo = function(descBiama, locationBiama, categoryMaterial, colorMaterial, codeMaterial,imageMaterial,descriptionMaterial) {
		$scope.showMaterials = false;

		$scope.categoryMaterial=categoryMaterial;
		
		if(descBiama !== '' && locationBiama !== '' && categoryMaterial !== ''
		&& colorMaterial !== '' && codeMaterial !== '' && imageMaterial !== '' && descriptionMaterial !== '') {
			$scope.codeMaterial = codeMaterial + "";
			$scope.descriptionNewBiama = descBiama;
			$scope.locationNewBiama = locationBiama;

			// Default export is a4 paper, portrait, using milimeters for units
			var doc = new jsPDF();
			
			doc.text('A sua BiAMa', 10, 10)

			/* INIT: description of my biama */
			doc.setFont("helvetica");
			doc.setFontType("bold");
			doc.text(20, 30, 'Descrição da sua BiAMa');

			doc.setFont("courier");
			doc.setFontType("normal");
			doc.text(25, 40, descBiama);
			/* END: description of my biama */

			/* INIT: location of my biama */
			doc.setFont("helvetica");
			doc.setFontType("bold");
			doc.text(20, 50, 'Localização da sua BiAMa');

			doc.setFont("courier");
			doc.setFontType("normal");
			doc.text(25, 60, locationBiama);
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
			doc.text(30, 90, categoryMaterial);
			/* END: category of my biama */

			/* Color of material */
			doc.setFont("helvetica");
			doc.setFontType("italic");
			doc.text(25, 100, 'Cor');

			doc.setFont("courier");
			doc.setFontType("normal");
			doc.text(30, 110, colorMaterial);
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
			doc.text(30, 200, descriptionMaterial);
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
		
		if($scope.idUserLoggerIn == undefined || $scope.idUserLoggerIn == '') {
			$scope.registUser = true;
		} else {
			var data = {
				'id_notification': parseInt($scope.currentNotificationId)+1,
				'text_notification': 'A sua BiAMa foi criada',
				'date_notification': 'Agora mesmo',
				'insert_notification': 'yes',
				'id_user': $scope.idUserLoggerIn
			}
			$http.post('/insertNotifications', data);
			window.setTimeout("location.href = 'https://biamaweb.herokuapp.com'")
		}

		$scope.showBiamaInitPage = false;
		$scope.showMyBiamaConf = false;

		setTimeout(function() {
			$(".myBiama").fadeOut().empty();
		}, 2000);

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
			if($scope.createdMyBiama) {
				if($scope.idUserLoggerIn == undefined || $scope.idUserLoggerIn == '') {
					var data = {
						'id_notification': parseInt($scope.currentNotificationId)+1,
						'text_notification': 'A sua BiAMa foi criada pelo utilizador ' + name,
						'date_notification': 'Agora mesmo',
						'insert_notification': 'yes',
						'id_user': 'anonymous'
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

		window.setTimeout("location.href = 'https://biamaweb.herokuapp.com'")
	}

	/* insert image on new biama form */
	$scope.insertImage = function(category,image) {
		if(category !== '') {
			
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
				'category': category
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

	/* -------------- INIT MOBILE -------------- */
	/* open material of small search result */
	$scope.openMaterial = function(material) {
		$scope.miniSearchResults=false;
		$scope.showDetailsOfMaterial=true;
		$scope.showMaterials=false;
		$scope.openedMaterial=material;
	}

	/* close material that are opened */
	$scope.closeMaterial = function(){
		$scope.miniSearchResults=false;
		$scope.showDetailsOfMaterial=false;
		$scope.showMaterialsCompare=true;
		$scope.showLabelCompare=true;
	}

	/* open and close the small search icon */
	$scope.clickTopSearch = function() {
        if($scope.showSearch){
            $scope.showSearch = false;
        }else {
            $scope.showSearch = true;
        }
	}
	
	/* close the results of small search */
	$scope.closeMiniSearch = function() {
		$scope.miniSearchResults = false;
		$scope.search=true;
		$scope.openMaterialDetail=false; 
		$scope.showInitSearch=true;
		$scope.showSearch=false;
		$scope.enableUserIcon=false;
		$scope.showMaterialsCompare=true;
		$scope.showInputToCompare=true;
		$scope.showDetailsOfMaterial=false;
		$scope.showLabelCompare=true;
	}

	/* action of click button "Ok" present on small search line */
    $scope.initMiniSearch = function() {

		$scope.resultSearch=[];
		var inputMiniValue = jQuery("#miniSearch").val(); 		
		var inputMini = inputMiniValue.toLowerCase();
		if(inputMini !== '') {
			for(var index=0; index < $scope.materialsToSearch.length; ++index) {
				var resultMaterial = {
					'name': $scope.materialsToSearch[index].name,
					'category': $scope.materialsToSearch[index].category
				}
				if(($scope.materialsToSearch[index].type).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(($scope.materialsToSearch[index].color).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(($scope.materialsToSearch[index].category).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				} else if(($scope.materialsToSearch[index].description).toLowerCase().indexOf(inputMini) !== -1) {
					$scope.resultSearch.push(resultMaterial);
				}
			}
	
			if($scope.resultSearch.length == 0) {
				$scope.noResultsOnSearch=true;
			} else {
				$scope.showInitSearch=false;
				$scope.showSearch=false;
				$scope.miniSearchResults = true;
				$scope.noResultsOnSearch=false;
				$scope.showResultsOfMiniSearch=true;
			}
		}
    }

	/* open and close the section of user details and search icon */
    $scope.clickUserDetails = function() {
		if($scope.userDetails){
			$scope.userDetails = false;
		}else {
			$scope.userDetails = true;
			$scope.showSearch = false;
		}
	}
	
	/* section of init session in user details section */
	$scope.showInitSessionDiv = function () {
		if($scope.showInitSession){
			$scope.showInitSession = false;
		}else {
			$scope.showInitSession = true;
		}
    }
    
    /* confirmed user logged in */
	$scope.confirmSessionAction = function (username, password) {

		$scope.users = 'loadUser';
		
		$scope.getAllUsers.then(function(usersDB) {
			$scope.users = usersDB.data.users;
			for(var index=0; index<$scope.users.length; ++index){
				$scope.userName = $scope.users[index].username;
				$scope.userPassword = $scope.users[index].password;
				$scope.userImage = $scope.users[index].image;
				$scope.userEmail = $scope.users[index].email;
				$scope.nameUser=$scope.users[index].name;
				$scope.userBirthdate = $scope.users[index].birthdate;

				var splitDateBirth = $scope.userBirthdate.split('/');
				$scope.dayBirth = splitDateBirth[0];
				$scope.monthBirth = splitDateBirth[1];
				$scope.yearBirth = splitDateBirth[2];

				if($scope.userName !== null && $scope.userName === username){
					if($scope.userPassword !== null && $scope.userPassword === password){
						$scope.userLoggedIn=$scope.users[index].username;
						$scope.idUserLoggerIn=$scope.users[index].id;
						$scope.confirmSession = true;
						break;
					}
				}
			}
        });
    }
	
	/* routes of click on links page */
	$scope.getRequest = function(buttonClick) {

		if(!$scope.isMobileView) {
			if(buttonClick === 'biamaPage') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/biamaPage?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick === 'whereWeAre') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/whereWeAre?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'library') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/library?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'myBiama') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/myBiama?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'forum') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/forumPage?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick === 'favorites') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/favorites?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick == 'questions') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/myQuestions?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick == 'world_share') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/worldShare?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick == 'notification') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/notifications?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
	
			if(buttonClick == 'perfil') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/perfilPage?userId=' + $scope.idUserLoggerIn + '&userName=' 
				+ $scope.userName + '&userPassword=' + $scope.userPassword + '&userImage=' + $scope.userImage + '&userBirthdate=' + $scope.dayBirth + '-' + $scope.monthBirth + '-' + $scope.yearBirth 
				+ '&nameUser=' + $scope.nameUser + '&userEmail=' + $scope.userEmail + '&redirect';
			}
	
			if(buttonClick == 'compare') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/compare?userName=' + $scope.idUserLoggerIn + '&redirect';
			}

			if(buttonClick == 'regist') {
				$scope.regist();
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/registUser?userName=' + $scope.idUserLoggerIn + '&redirect';
			}
		} else {

			if(buttonClick === 'favorites') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/favoritesMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'questions') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/myQuestionsMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'world_share') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/worldShareMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'notification') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/notificationsMobile?userName=' + $scope.idUserLoggerIn;
			}
	
			if(buttonClick == 'perfil') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/perfilPageMobile?userId=' + $scope.idUserLoggerIn + '&userName=' 
				+ $scope.userName + '&userPassword=' + $scope.userPassword + '&userImage=' + $scope.userImage + '&userBirthdate=' + $scope.dayBirth + '-' + $scope.monthBirth + '-' + $scope.yearBirth 
				+ '&nameUser=' + $scope.nameUser + '&userEmail=' + $scope.userEmail;
			}
	
			if(buttonClick == 'compare') {
				$window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/compareMobile?userName=' + $scope.idUserLoggerIn;
			}
		}
		
		if(buttonClick === 'notification') {
			$scope.userDetails = true;
			$scope.notificationNumber=true;
		} else {
			$scope.userDetails = false;
			$scope.notificationNumber = false;
		}
		$scope.search = false;
	}

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

	
    /* logout of user details section */
    $scope.logout = function(){
		$scope.confirmSession = false;
		/*firebase.auth().signOut().then(function() {
			// Sign-out successful.
		
		}, function(error) {
			// An error happened.
			console.log(error);

		});*/
    }
   
    /* regist new user on user details section */
	$scope.regist = function() {
		$scope.userDetails = false;
		$scope.registUser=true;
		$scope.search=false;
    }


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

app.factory("MyBiamaMaterialService", function($q, $http, $timeout){
    var getMaterialComparation = function() {
		var deferred = $q.defer();
		
        $timeout(function() {
        deferred.resolve($http.get('/compareMaterials'));
        }, 4000);

        return deferred.promise;
    };

    return {
        getMaterialComparation: getMaterialComparation
    };
});

app.factory("MyBiamaService", function($q, $http, $timeout){
    
	var getMyBiamaInfo = function() {
		var deferred = $q.defer();
	
 		$timeout(function() {
		  deferred.resolve($http.get('/myBiamaInfo',  {cache:true}));
		}, 2000); 

		return deferred.promise;
	};

	return {
		getMyBiamaInfo: getMyBiamaInfo
	};
});