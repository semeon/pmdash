function MainCtrl($scope, $rootScope, $location, DB) {
    var log_ctrl = ' - DataLoadCtrl: ';
    console.log('');
    console.log('MainCtrl Controller started');

    if (!$rootScope.loaded) {
      $location.path('/welcome');
    }

	$scope.projListTemplate = 'app/views/projList.html';
	$scope.statsTemplate = 'app/views/stats.html';

}
