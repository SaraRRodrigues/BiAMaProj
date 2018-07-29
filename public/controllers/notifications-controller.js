app.controller("NotificationsController", ['$scope', "NotificationService", "$http", "jQuery", function($scope,NotificationService, $http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='notifications';

    $scope.loading = true;
    $scope.getNotifications = NotificationService.getMyNotifications(function(infoNotification){});

    $scope.getNotifications.then(function(result) {
        $scope.loading = false;
        var data=result.data.notificationDetails;
        $scope.notifications=data;
        $scope.numberOfNotifications=$scope.notifications.length;
    });
}])

app.factory("NotificationService", function($q, $http, $timeout){
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

