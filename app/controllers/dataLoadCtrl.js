function DataLoadCtrl($scope, $rootScope, $location, ProjectDataLoader){
    var log_ctrl = ' - DataLoadCtrl: ';
    console.log('');
    console.log('DataLoadCtrl Controller started');

  	var appData = $rootScope.data;
    var userSettings = $rootScope.settings.userSettings;
    var redmineSettings = $rootScope.settings.redmineSettings;

    $scope.startBtnClick = function() {
      console.log(log_ctrl + 'Start button click');
      $rootScope.loaded = true;
      ProjectDataLoader.startInitialDataLoad();
      $location.path('/main');
    }

}