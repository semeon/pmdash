function StatsCtrl($scope, $rootScope, ProjectDataLoader) {
    var log_ctrl = ' - StatsCtrl: ';
    console.log('');
    console.log('StatsCtrl Controller started');

  	var appData = $rootScope.data;
    var userSettings = $rootScope.settings.userSettings;
    var redmineSettings = $rootScope.settings.redmineSettings;

    $scope.projects = appData.projects;

    $scope.convertDueDate = function(dueDate) {
      var dueStr = dueDate;
      if (dueStr == undefined) dueStr = 'No Date';
      return dueStr;
    }

    $scope.getTrackerName = function(trackerId) {
      var trackerName = '';
      console.log(log_ctrl + 'trackerId: ' + trackerId);
      trackerName = redmineSettings.issueTrackersMap[String(trackerId)].name;
      return trackerName;
    }

}
