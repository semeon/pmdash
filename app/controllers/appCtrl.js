function AppCtrl($scope, $rootScope) {
    var log_ctrl = ' - AppCtrl: ';
    console.log('');
    console.log('AppCtrl Controller started');

    $rootScope.settings = new Settings();
	$rootScope.data = new DataCtrl();
	$rootScope.data.projects = {};	
	

}
