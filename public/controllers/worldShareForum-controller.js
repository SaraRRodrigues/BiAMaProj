
app.controller("WorldShareForumController", ['$scope',"WorldSharesForumService", "MyBiamaService", "WorldSharesForumMaterialService","WorldShareForumBiamaService", "$http", "jQuery", function($scope,WorldSharesForumService,MyBiamaService, WorldSharesForumMaterialService, WorldShareForumBiamaService, $http){

    $scope.nameclick='forum'

    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMainMobile").hide();
    /* my current page */
  
    var window_width = $( window ).width();
    if(window_width <= 1024) {
      $scope.isMobileView=true;
    } else {
      $scope.isMobileView=false;
    }
    
    $scope.loading=true;
    $scope.showWorldShares=true;
    $scope.showWorldSharesDetails=false;
    $scope.resultSearch = [];
    $scope.showDetailsOfMaterial=false;
    $scope.miniSearchResults=false;

    var getMyBiamaInfo = MyBiamaService.getMyBiamaInfo(function(infoMyBiama){});
    getMyBiamaInfo.then(function(result) {
        $scope.loading = false;
        var data=result.data.biamaDetails;
        $scope.descriptionMyBiama=data[0].description;
    });

    var getWorldSharesForum = WorldSharesForumService.getWorldSharesForum(function(infoWorldSharesForum){});
    getWorldSharesForum.then(function(result) {
      $scope.loading = false;
      var data=result.data.worldShareForumDetails;

      $scope.worldShareItems=[];
      $scope.worldShareData=[];
      $scope.shareNumber=[];
      
      for(var index=0; index<data.length; ++index) {
          $scope.worldShareItems.push(data[index].image);
          $scope.worldShareData.push(data[index]);
      }
    });

    $scope.getMaterials = WorldSharesForumMaterialService.getMaterialComparation(function(infoMaterial){});
    $scope.getMaterials.then(function(result) {
      $scope.loading = false;
      var data=result.data.comparationDetails;
      $scope.materialsToSearch = data;
  
      });

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
        $scope.showAllQuestions=false;
        $scope.showQuestionDetails=false;

        $scope.showCuriosity=false;
        $scope.showWorldShares=false;
      }
    }

    
    $scope.clickUserDetails = function() {
      if($scope.userDetails){
        $scope.userDetails = false;
      }else {
        $scope.userDetails = true;
        $scope.showSearch = false;
      }
    }

    $scope.closeMaterial = function(){
      $scope.miniSearchResults=false;
      $scope.showDetailsOfMaterial=false;
      $scope.showLocation=true;
      $scope.showForum = true;
      $scope.showAllQuestions=true;
      $scope.showQuestionDetails=false;
      $scope.showCuriosity=true;
      $scope.showWorldShares=true;
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
      $scope.showAllQuestions=true;
      $scope.showQuestionDetails=false;
      $scope.showCuriosity=true;
      $scope.showWorldShares=true;
    }
  
    $scope.openMaterial = function(material) {
      $scope.miniSearchResults=false;
      $scope.showDetailsOfMaterial=true;
      $scope.showMaterials=false;
      $scope.openedMaterial=material;
      $scope.showLocation=false;
      $scope.showAllQuestions=false;
      $scope.showCuriosity=false;
      $scope.showWorldShares=false;
    }

    $scope.goToHomePage = function() {
      window.setTimeout("location.href = 'http://localhost:8080'")
    }

    $scope.clickTopSearch = function() {
      if($scope.showSearch){
        $scope.showSearch = false;
      }else {
        $scope.showSearch = true;
      }
    }
    
    $scope.openDetailsWorldShare = function(image) {
      for(var index=0; index<$scope.worldShareData.length; ++index) {
				if($scope.worldShareData[index].image === image){
            $scope.worldSharesInfo={
              'image':$scope.worldShareData[index].image,
              'description': $scope.worldShareData[index].descriptionShare,
              "share": index+1
            }
            $scope.showWorldSharesDetails=true;
            $scope.showWorldShares=false;
            break;
				}
			}
    }

    $scope.openBigImage = function(image) {
      $scope.showBigImage=true;
      $scope.showWorldSharesDetails=false;
      $scope.bigImage=image;
    }

    $scope.closeWorldShareImage = function() {
      $scope.showBigImage=false;
      $scope.showWorldSharesDetails=true;
    }
    $scope.showInitSessionDiv = function () {
      if($scope.showInitSession){
        $scope.showInitSession = false;
      }else {
        $scope.showInitSession = true;
      }
    }
  
    $scope.confirmSessionAction = function (username, password) {
  
      $scope.users = 'loadUser';
      var getAllUsers = WorldShareForumBiamaService.getUsers(function(users){});
      
      getAllUsers.then(function(usersDB) {
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
    
    $scope.getRequest = function(buttonClick) {
  
      if(buttonClick === 'favorites') {
        location.href = 'http://localhost:8080/BiAMa/favoritesMobile?userName=' + $scope.idUserLoggerIn;
      }
  
      if(buttonClick == 'questions') {
        location.href = 'http://localhost:8080/BiAMa/myQuestionsMobile?userName=' + $scope.idUserLoggerIn;
      }
  
      if(buttonClick == 'world_share') {
        location.href = 'http://localhost:8080/BiAMa/worldShareMobile?userName=' + $scope.idUserLoggerIn;
      }
  
      if(buttonClick == 'notification') {
        location.href = 'http://localhost:8080/BiAMa/notificationsMobile?userName=' + $scope.idUserLoggerIn;
      }
  
      if(buttonClick == 'perfil') {
        location.href = 'http://localhost:8080/BiAMa/perfilPageMobile?userId=' + $scope.idUserLoggerIn + '&userName=' 
        + $scope.userName + '&userPassword=' + $scope.userPassword + '&userImage=' + $scope.userImage + '&userBirthdate=' + $scope.dayBirth + '-' + $scope.monthBirth + '-' + $scope.yearBirth 
        + '&nameUser=' + $scope.nameUser + '&userEmail=' + $scope.userEmail;
      }
  
      if(buttonClick == 'compare') {
        location.href = 'http://localhost:8080/BiAMa/compareMobile?userName=' + $scope.idUserLoggerIn;
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
  
    $scope.logout = function(){
      $scope.confirmSession = false;
    }
  
    $scope.regist = function() {
      $scope.userDetails = false;
      $scope.registUser=true;
      $scope.search=false;
    }
}])

app.factory("WorldSharesForumService", function($q, $http, $timeout){

  var getWorldSharesForum = function() {
      var deferred = $q.defer();
  
      $timeout(function() {
        deferred.resolve($http.get('/worldSharesForum'));
      }, 2000);
  
      return deferred.promise;
    };
  
    return {
      getWorldSharesForum: getWorldSharesForum
    };
  });

app.factory("WorldSharesForumMaterialService", function($q, $http, $timeout){
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

app.factory("WorldShareForumBiamaService", function($q, $http, $timeout){
    
	var getUsers = function() {
		var deferred = $q.defer();
	
 		$timeout(function() {
		  deferred.resolve($http.get('/users',  {cache:true}));
		}, 2000); 

		return deferred.promise;
	};

	return {
		getUsers: getUsers
	};
});