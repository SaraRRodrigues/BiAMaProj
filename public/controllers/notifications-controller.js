app.controller("NotificationsController", ['$scope', "NotificationService", "$http", "jQuery", function($scope,NotificationService, $http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='notifications';

    var window_width = $( window ).width();
	if(window_width <= 1024) {
		$scope.isMobileView=true;
	} else {
		$scope.isMobileView=false;
	}
}])


