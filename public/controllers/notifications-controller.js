app.controller("NotificationsController", ['$scope', "$http", "jQuery", function($scope, $http){
    
    /* hide footer of index page because of click in buttons footer reload page */
    jQuery("#footerMain").hide();
    /* my current page */
    $scope.namePage='notifications';
    $scope.notifications=[
        {
            text:'1'
        },
        {
            text:'2'
        },
        {
            text:'1'
        },
        {
            text:'2'
        },
        {
            text:'1'
        },
        {
            text:'2'
        },
        {
            text:'1'
        },
        {
            text:'2'
        },
        {
            text:'1'
        },
        {
            text:'2'
        },
        {
            text:'1'
        },
        {
            text:'2'
        }
    ];

}])