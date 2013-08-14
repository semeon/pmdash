function StatsCtrl($scope, $rootScope, ProjectDataLoader) {
    var log_ctrl = ' - StatsCtrl: ';
    console.log('');
    console.log('StatsCtrl Controller started');

  	var appData = $rootScope.data;
    var userSettings = $rootScope.settings.userSettings;
    var redmineSettings = $rootScope.settings.redmineSettings;

    $scope.projects = appData.projects;


}
