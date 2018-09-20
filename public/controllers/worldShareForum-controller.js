
app.controller("WorldShareForumController", ['$scope',"WorldSharesForumService", "WorldSharesForumMaterialService","WorldShareForumBiamaService", "$http", "$window", "jQuery", function($scope,WorldSharesForumService, WorldSharesForumMaterialService, WorldShareForumBiamaService, $http, $window){

    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMainMobile").hide();
    jQuery("#headerMain").hide();
    jQuery("#searchMain").hide();
    jQuery("#userDetailsMain").hide();
    jQuery("#divControllerMain").removeClass("divController");

    /* define view of app */
	  $scope.viewType = function() {
      var window_width = $( window ).width();
      if(window_width < 1024) {
        $scope.isMobileView=true;
      } else {
        $scope.isMobileView=false;
      }
    }

    /* init my variables data */
    $scope.initData = function() {
      /* my current page */
      $scope.nameclick='forum';
      $scope.loading=true;
      $scope.showWorldShares=true;
      $scope.showWorldSharesDetails=false;
      $scope.resultSearch = [];
      $scope.showDetailsOfMaterial=false;
      $scope.miniSearchResults=false;
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
  
      if($scope.idUserLoggerIn !== "" && $scope.idUserLoggerIn !== undefined && $scope.idUserLoggerIn !== "undefined" && $scope.idUserLoggerIn !== 'anonymous&redirect'  && $scope.idUserLoggerIn !== 'anonymous' ) {
        $scope.confirmSession=true;
      } else {
        $scope.loading = true;
        $scope.confirmSession=false;
      }
    }

    /* -------------- INIT DESKTOP & MOBILE -------------- */
    /* get information of world shares on forum to display */
    $scope.getAllRequests = function() {
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

        $scope.getMaterials = WorldSharesForumMaterialService.getMaterialComparation(function(infoMaterial){});
        $scope.getMaterials.then(function(result) {
          $scope.loading = false;
          var data=result.data.comparationDetails;
          $scope.materialsToSearch = data;
          
          $scope.getAllUsers = WorldShareForumBiamaService.getUsers(function(users){});
          $scope.getAllUsers.then(function(usersDB) {
            $scope.users = usersDB.data.users;
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
        });
      });
    }

    /* redirect to homepage with arrow */
    $scope.goToHomePage = function() {
      if($scope.idUserLoggerIn !== undefined) {
        if($scope.showWorldSharesDetails || $scope.showBigImage) {
          if(!$scope.isMobileView) {
            $window.location.href = 'https://biamaweb.herokuapp.com/BiAMa/worldSharesForum?userName=' + $scope.idUserLoggerIn + '&redirect';
          } else {
            $window.location.href = '/BiAMa/worldSharesForumMobile?userName=' + $scope.idUserLoggerIn;
          }
        } else {
          if(!$scope.isMobileView) {
            location.href = '/BiAMa/forumPage?userName=' + $scope.idUserLoggerIn + '&redirect';
  
          } else {
            location.href = '/BiAMa/forumPageMobile?userName=' + $scope.idUserLoggerIn;
          }
        }
      } else {
        if($scope.showWorldSharesDetails || $scope.showBigImage) {
          $window.location.href = '/BiAMa/worldSharesForum?userName=anonymous' + '&redirect';
        } else {
          $window.location.href = 'https://biamaweb.herokuapp.com?username=' + 'anonymous';
        }
      }
    }

    /* open details of world share when clicks on material world share */
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

    /* open big image of world share (large image size) */
    $scope.openBigImage = function(image) {
      $scope.showBigImage=true;
      $scope.showWorldSharesDetails=false;
      $scope.bigImage=image;
    }

    /* close the image that are opened */
    $scope.closeWorldShareImage = function() {
      $scope.showBigImage=false;
      $scope.showWorldSharesDetails=true;
    }
    /* -------------- END DESKTOP & MOBILE -------------- */

    /* -------------- INIT MOBILE -------------- */
	  /* open material of small search result */
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

    /* close material that are opened */
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
      $scope.showCategory=false;
      $scope.showMaterialDetails=false;
      $scope.showLocation=true;
      $scope.showForum = true;
      $scope.showAllQuestions=true;
      $scope.showQuestionDetails=false;
      $scope.showCuriosity=true;
      $scope.showWorldShares=true;
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
              'category': $scope.materialsToSearch[index].category,
              'code': $scope.materialsToSearch[index].code,
					    'description': $scope.materialsToSearch[index].description
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
  
      if($scope.isMobileView) {
        if(buttonClick === 'favorites') {
          $window.location.href = '/BiAMa/favoritesMobile?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'questions') {
          $window.location.href = '/BiAMa/myQuestionsMobile?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'world_share') {
          $window.location.href = '/BiAMa/worldShareMobile?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'notification') {
          $window.location.href = '/BiAMa/notificationsMobile?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'perfil') {
          $window.location.href = '/BiAMa/perfilPageMobile?userId=' + $scope.idUserLoggerIn;
        }
    
        if(buttonClick == 'compare') {
          $window.location.href = '/BiAMa/compareMobile?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
        
      } else {
        if(buttonClick === 'biamaPage') {
          $window.location.href = '/BiAMa/biamaPage?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick === 'whereWeAre') {
          $window.location.href = '/BiAMa/whereWeAre?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
  
        if(buttonClick === 'library') {
          $window.location.href = '/BiAMa/library?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
  
        if(buttonClick === 'myBiama') {
          $window.location.href = '/BiAMa/myBiama?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
  
        if(buttonClick === 'forum') {
          $window.location.href = '/BiAMa/forumPage?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
  
        if(buttonClick === 'favorites') {
          $window.location.href = '/BiAMa/favorites?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'questions') {
          $window.location.href = '/BiAMa/myQuestions?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'world_share') {
          $window.location.href = '/BiAMa/worldShare?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'notification') {
          $window.location.href = '/BiAMa/notifications?userName=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'perfil') {
          $window.location.href = '/BiAMa/perfilPage?userId=' + $scope.idUserLoggerIn + '&redirect';
        }
    
        if(buttonClick == 'compare') {
          $window.location.href = '/BiAMa/compare?userName=' + $scope.idUserLoggerIn + '&redirect';
        }

        if(buttonClick == 'regist') {
          $scope.regist();
          $window.location.href = '/BiAMa/registUser?userName=' + $scope.idUserLoggerIn + '&redirect';
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

    /* logout of user details section */
    $scope.logout = function(){
      $scope.confirmSession = false;
    }
  
    /* regist new user on user details section */
    $scope.regist = function() {
      $scope.userDetails = false;
      $scope.registUser=true;
      $scope.search=false;
    }
    /* -------------- END MOBILE -------------- */

    /* init QuestionsController  */
    $scope.viewType();
    $scope.initData();
    $scope.getAllRequests();
    $scope.validateUserLoggedIn();

}])

app.factory("WorldSharesForumService", function($q, $http, $timeout){

  var getWorldSharesForum = function() {
      var deferred = $q.defer();
  
      $http.get('/worldSharesForum').then(successCallback, errorCallback);

      function successCallback(response){
          //success code
          deferred.resolve(response);
      }
      function errorCallback(error){
          //error code
          deferred.reject(status);
      }
  
      return deferred.promise;
    };
  
    return {
      getWorldSharesForum: getWorldSharesForum
    };
});

app.factory("WorldSharesForumMaterialService", function($q, $http, $timeout){
    var getMaterialComparation = function() {
        var deferred = $q.defer();

        $http.get('/compareMaterials').then(successCallback, errorCallback);

        function successCallback(response){
            //success code
            deferred.resolve(response);
        }
        function errorCallback(error){
            //error code
            deferred.reject(status);
        }

        return deferred.promise;
    };

    return {
        getMaterialComparation: getMaterialComparation
    };
});

app.factory("WorldShareForumBiamaService", function($q, $http, $timeout){
    
	var getUsers = function() {
		var deferred = $q.defer();
    
    $http.get('/users').then(successCallback, errorCallback);

    function successCallback(response){
        //success code
        deferred.resolve(response);
    }
    function errorCallback(error){
        //error code
        deferred.reject(status);
    }

		return deferred.promise;
	};

	return {
		getUsers: getUsers
	};
});

