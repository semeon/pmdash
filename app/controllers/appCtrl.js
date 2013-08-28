function AppCtrl($scope, $rootScope, DBUtil) {
    var log_ctrl = ' - AppCtrl: ';
    console.log('');
    console.log('AppCtrl Controller started');

    $rootScope.settings = new Settings();
		$rootScope.data = new DataCtrl();
		$rootScope.data.projects = {};	

		$scope.fillDbClick= function () {
			console.log(log_ctrl + 'Fill DB click');
			DBUtil.runScript();
		}

}
