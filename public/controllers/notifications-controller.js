app.controller("NotificationsController", ['$scope', "MyNotificationService", "$http", "jQuery", function($scope,MyNotificationService, $http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='notifications';
    $scope.loading = true;

    var window_width = $( window ).width();
	if(window_width <= 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
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

    $scope.getMyNotifications = MyNotificationService.getMyNotifications(function(infoNotification){});

    $scope.getMyNotifications.then(function(result) {
        $scope.loading = false;
        var data=result.data.notificationDetails;
        $scope.myNotifications=data;
		
    });
}])

app.factory("MyNotificationService", function($q, $http, $timeout){
    var getMyNotifications = function() {
        var deferred = $q.defer();

        $timeout(function() {
        deferred.resolve($http.get('/myNotifications'));
        }, 2000);

        return deferred.promise;
    };


    return {
        getMyNotifications: getMyNotifications
    };
});