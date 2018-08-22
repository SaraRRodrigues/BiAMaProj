
app.controller("CuriosityForumController", ['$scope', "$http", "CuriositiesService","CuriositiesMaterialService", "jQuery", function($scope, $http, CuriositiesService, CuriositiesMaterialService){

    $scope.nameclick='forum'

    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMainMobile").hide();
    /* my current page */
  
    $scope.loading=true;
    $scope.descriptionCuriosity=[];
    $scope.showCuriosity=true;
    $scope.showBigImage=false;
    $scope.resultSearch = [];
    $scope.showDetailsOfMaterial=false;
    $scope.miniSearchResults=false;

    var window_width = $( window ).width();
    if(window_width <= 1024) {
      $scope.isMobileView=true;
    } else {
      $scope.isMobileView=false;
    }

    var getCuriosities = CuriositiesService.getCuriosities(function(infoCuriosities){});
    getCuriosities.then(function(result) {
            $scope.loading = false;
            var data=result.data.curiosityDetails;
            for(var index=0; index<data.length; ++index){
              $scope.descriptionCuriosity.push(data[index]);
            }
    });

    $scope.getMaterials = CuriositiesMaterialService.getMaterialComparation(function(infoMaterial){});
    $scope.getMaterials.then(function(result) {
      $scope.loading = false;
      var data=result.data.comparationDetails;
      $scope.materialsToSearch = data;
  
      });

    $scope.goToForum = function() {
      window.setTimeout("location.href = 'http://localhost:8080'")
    } 

    $scope.clickTopSearch = function() {
      if($scope.showSearch){
        $scope.showSearch = false;
      }else {
        $scope.showSearch = true;
      }
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
        $scope.showAllQuestions=false;
        $scope.showQuestionDetails=false;

        $scope.showCuriosity=false;
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
    }
  
    $scope.openMaterial = function(material) {
      $scope.miniSearchResults=false;
      $scope.showDetailsOfMaterial=true;
      $scope.showMaterials=false;
      $scope.openedMaterial=material;
      $scope.showLocation=false;
      $scope.showAllQuestions=false;
      $scope.showCuriosity=false;
    }
    
    $scope.openDetailsCuriosity = function(image) {
      for(var index=0; index<$scope.descriptionCuriosity.length; ++index) {
				if($scope.descriptionCuriosity[index].image === image){
            $scope.curiosityInfo={
              'image':$scope.descriptionCuriosity[index].image,
              'description': $scope.descriptionCuriosity[index].descriptionCuriosity,
              "curiosity": index+1
            }
            $scope.showCuriosityDetails=true;
            $scope.showCuriosity=false;
            break;
				}
			}
    }

    $scope.openBigImage = function(image) {
      $scope.showBigImage=true;
      $scope.showCuriosityDetails=false;
      $scope.bigImage=image;
    }

    $scope.closeCuriosityImage = function() {
      $scope.showBigImage=false;
      $scope.showCuriosityDetails=true;
    }
}])

app.factory("CuriositiesService", function($q, $http, $timeout){

var getCuriosities = function() {
    var deferred = $q.defer();

    $timeout(function() {
      deferred.resolve($http.get('/curiosities'));
    }, 2000);

    return deferred.promise;
  };

  return {
    getCuriosities: getCuriosities
  };
});

app.factory("CuriositiesMaterialService", function($q, $http, $timeout){
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