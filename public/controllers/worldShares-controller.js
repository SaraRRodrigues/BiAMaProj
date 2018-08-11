app.controller("WorldShareController", ['$scope',"WorldSharesService", "ForumService", "$http", "jQuery", function($scope,WorldSharesService,ForumService,$http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='worldShares';	

    $scope.numberOfNewShares=[
        {
        'insert': true
        }
    ];
    $scope.descriptionWorldShare='';
    $scope.savePhoto=false;
    $scope.openWorldShareUploadLabel=false;

    var window_width = $( window ).width();
	if(window_width <= 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
    } 
    
    $scope.loading = true;
    $scope.showWorldShares=true;
    $scope.addWorldShare=false;
    $scope.getMyWorldShares = WorldSharesService.getAllMyWorldShares(function(infoMyWorldShares){});

    $scope.getMyWorldShares.then(function(result) {
      $scope.loading = false;
      var data=result.data.worldShareDetails;

      $scope.worldShareItems=[];
      $scope.worldShareData=[];
      $scope.shareNumber=[];
      for(var index=0; index<data.length; ++index) {
          $scope.worldShareItems.push(data[index].image);
          $scope.worldShareData.push(data[index]);
          $scope.forumType=data[index].type_forum; 

          if(index===data.length-1) {
            var result = (data[index].title).split("s");
            var numberTitle=result[1];
            $scope.title='ws' + (parseInt(numberTitle)+1);
          }
      } 
    });
    
    $scope.goToHomePage = function() {
        window.setTimeout("location.href = 'http://localhost:8080'")
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

    $scope.openAddWorldShare = function() {
        $scope.addWorldShare=true;
        $scope.showWorldShares=false;
    }

    $scope.openWorldShareUpload = function() {
        $scope.openWorldShareUploadLabel=true;
    }
    
    $scope.saveUploadFile = function () {
        $scope.savePhoto=true;
        var splitDeviceRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;
        var res = splitDeviceRe.exec(($("#uploadPictureWorldShare").val()));
        $scope.imageWorldShare=res[2];
        $scope.numberOfNewShares[0].insert=false;
        $scope.openWorldShareUploadLabel=false;

        for(var index=0; index<$scope.worldShareData.length; ++index) {
            if(index===$scope.worldShareData.length-1) {
              var result = ($scope.worldShareData[index].title).split("s");
              var numberTitle=result[1];
              $scope.title='ws' + (parseInt(numberTitle)+1);
            }
        } 
        //$scope.uploadedFile($scope.imageWorldShare)
    }
    
    $scope.cancelInsertWorldShare = function() {
        $scope.descriptionWorldShare='';
        $scope.imageWorldShare='';
        $scope.openWorldShareUploadLabel=true;
        $scope.savePhoto=false;
    }

    $scope.saveConfigInsertWorldShare = function (image, description) {  
        debugger
        if(image !== undefined) {
            var data = {
                'forumType': $scope.forumType, 
                'title': $scope.title,
                'image': image,
                'description': description
            }
            $http.post('/insertWorldShares', data);
        }
    }

    $scope.postUpload = function(valueInput) {
        console.log('x: ', valueInput);
        var inputResult = jQuery('#uploadPictureWorldShare');

        console.log('file: ', inputResult);
        var fd = new FormData();
        fd.append('file', inputResult);

        
    }
    $scope.uploadedFile=function(element) {
        if(element !== undefined || element !== null || element !== '') {
            $scope.currentFile = element.files[0];
            /* var reader = new FileReader();

            reader.onload = function(event) {
                var output = jQuery('#output');
                output.src = URL.createObjectURL(element.files[0]);
            }
            reader.readAsDataURL(element.files[0]); */
       

            var assetLocalPath=""+$scope.currentFile.name;
            var file = new File([""],assetLocalPath);
            alert(file.name);
        }
    }
}])

app.factory("WorldSharesService", function($q, $http, $timeout){

    var getAllMyWorldShares = function(data) {
        var deferred = $q.defer();

        $timeout(function() {
            deferred.resolve($http.get('/worldMyShares'));
        }, 2000);
        
        return deferred.promise;
      };
    
      return {
        getAllMyWorldShares: getAllMyWorldShares
      };
});

app.factory("ForumService", function($q, $http, $timeout){

    var getForum = function() {
        var deferred = $q.defer();
    
        $timeout(function() {
          deferred.resolve($http.get('/forum'));
        }, 2000);
    
        return deferred.promise;
      };
    
      return {
        getForum: getForum
      };
});