function AppCtrl($scope, $rootScope, $route, $location) {
    var log_ctrl = ' - AppCtrl: ';
    console.log('');
    console.log('AppCtrl Controller started');

    $rootScope.settings = new Settings();
	$rootScope.data = {};
	$rootScope.data.projects = {};	

}